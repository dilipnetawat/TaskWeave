import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Workflow, WorkflowStep, WorkflowResult, Tool, ActivityEvent, UserPreferences } from '../types';
import { 
  loadWorkflows, 
  saveWorkflows, 
  loadActivity, 
  saveActivity, 
  loadTools, 
  saveTools, 
  loadPreferences, 
  savePreferences,
  resetAllData 
} from '../lib/storage';
import { mockEngine } from '../lib/mock-engine';

interface WorkflowContextType {
  workflows: Workflow[];
  activeWorkflow: Workflow | null;
  activityEvents: ActivityEvent[];
  tools: Tool[];
  preferences: UserPreferences;
  isExecuting: boolean;
  activeStepIndex: number;
  setActiveWorkflow: (workflow: Workflow | null) => void;
  createWorkflow: (request: string) => Workflow;
  updateWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  executeWorkflow: (workflowId: string, options?: { simulateFailureAtStep?: number }) => Promise<void>;
  cancelExecution: () => void;
  retryWorkflow: (workflowId: string) => Promise<void>;
  toggleTool: (toolId: string) => void;
  updatePreferences: (newPrefs: Partial<UserPreferences>) => void;
  clearAllActivity: () => void;
  resetToDefaults: () => void;
  addActivityEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>(() => loadWorkflows());
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>(() => loadActivity());
  const [tools, setTools] = useState<Tool[]>(() => loadTools());
  const [preferences, setPreferences] = useState<UserPreferences>(() => loadPreferences());
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Sync state to storage
  useEffect(() => {
    saveWorkflows(workflows);
  }, [workflows]);

  useEffect(() => {
    saveActivity(activityEvents);
  }, [activityEvents]);

  useEffect(() => {
    saveTools(tools);
  }, [tools]);

  useEffect(() => {
    savePreferences(preferences);

    // Apply dark class to <html>
    const root = document.documentElement;
    if (preferences.theme === 'dark') {
      root.classList.add('dark');
    } else if (preferences.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [preferences]);

  const addActivityEvent = useCallback((event: Omit<ActivityEvent, 'id' | 'timestamp'>) => {
    const newEvent: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    setActivityEvents(prev => [newEvent, ...prev.slice(0, 199)]); // keep last 200 events
  }, []);

  const createWorkflow = useCallback((request: string): Workflow => {
    const newWf = mockEngine.createWorkflowFromRequest(request);
    setWorkflows(prev => [newWf, ...prev]);
    setActiveWorkflow(newWf);

    addActivityEvent({
      workflowId: newWf.id,
      workflowTitle: newWf.title,
      category: 'workflow_created',
      status: 'info',
      message: `Created workflow: "${newWf.title}"`,
      details: `Request: ${request}`
    });

    return newWf;
  }, [addActivityEvent]);

  const updateWorkflow = useCallback((updated: Workflow) => {
    setWorkflows(prev => prev.map(w => w.id === updated.id ? updated : w));
    if (activeWorkflow?.id === updated.id) {
      setActiveWorkflow(updated);
    }
  }, [activeWorkflow]);

  const deleteWorkflow = useCallback((id: string) => {
    const wf = workflows.find(w => w.id === id);
    setWorkflows(prev => prev.filter(w => w.id !== id));
    if (activeWorkflow?.id === id) {
      setActiveWorkflow(null);
    }
    if (wf) {
      addActivityEvent({
        workflowId: id,
        workflowTitle: wf.title,
        category: 'system',
        status: 'warning',
        message: `Deleted workflow: "${wf.title}"`
      });
    }
  }, [workflows, activeWorkflow, addActivityEvent]);

  const executeWorkflow = useCallback(async (
    workflowId: string, 
    options?: { simulateFailureAtStep?: number }
  ) => {
    const targetWf = workflows.find(w => w.id === workflowId);
    if (!targetWf) return;

    setIsExecuting(true);
    setActiveStepIndex(0);

    // Set workflow state to running
    const runningWf: Workflow = {
      ...targetWf,
      status: 'running',
      currentStepIndex: 0,
      steps: targetWf.steps.map(s => ({ ...s, status: 'pending', executionLogs: [] }))
    };
    updateWorkflow(runningWf);

    let speedMs = 1100;
    if (preferences.stepSpeed === 'fast') speedMs = 600;
    if (preferences.stepSpeed === 'thorough') speedMs = 1800;

    await mockEngine.runWorkflow(runningWf, {
      onStepStart: (index, step) => {
        setActiveStepIndex(index);
        setWorkflows(prev => prev.map(w => {
          if (w.id !== workflowId) return w;
          const newSteps = [...w.steps];
          newSteps[index] = step;
          return { ...w, steps: newSteps, currentStepIndex: index };
        }));
        if (activeWorkflow?.id === workflowId) {
          setActiveWorkflow(curr => curr ? {
            ...curr,
            currentStepIndex: index,
            steps: curr.steps.map((s, idx) => idx === index ? step : s)
          } : null);
        }
      },
      onStepProgress: (index, log) => {
        setWorkflows(prev => prev.map(w => {
          if (w.id !== workflowId) return w;
          const newSteps = [...w.steps];
          const currStep = newSteps[index];
          newSteps[index] = {
            ...currStep,
            executionLogs: [...(currStep.executionLogs || []), log]
          };
          return { ...w, steps: newSteps };
        }));
        if (activeWorkflow?.id === workflowId) {
          setActiveWorkflow(curr => curr ? {
            ...curr,
            steps: curr.steps.map((s, idx) => idx === index ? {
              ...s,
              executionLogs: [...(s.executionLogs || []), log]
            } : s)
          } : null);
        }
      },
      onStepComplete: (index, step) => {
        setWorkflows(prev => prev.map(w => {
          if (w.id !== workflowId) return w;
          const newSteps = [...w.steps];
          newSteps[index] = step;
          return { ...w, steps: newSteps };
        }));
        if (activeWorkflow?.id === workflowId) {
          setActiveWorkflow(curr => curr ? {
            ...curr,
            steps: curr.steps.map((s, idx) => idx === index ? step : s)
          } : null);
        }
      },
      onStepFail: (index, step, reason) => {
        setIsExecuting(false);
        const failedWf: Workflow = {
          ...targetWf,
          status: 'failed',
          currentStepIndex: index,
          steps: targetWf.steps.map((s, idx) => idx === index ? step : (idx < index ? { ...s, status: 'completed' } : s)),
          updatedAt: new Date().toISOString()
        };
        updateWorkflow(failedWf);
      },
      onWorkflowComplete: (completedWf, result) => {
        setIsExecuting(false);
        updateWorkflow(completedWf);
      },
      onWorkflowCancel: () => {
        setIsExecuting(false);
        const cancelledWf: Workflow = {
          ...targetWf,
          status: 'cancelled',
          updatedAt: new Date().toISOString()
        };
        updateWorkflow(cancelledWf);
      },
      onActivityEvent: (event) => {
        addActivityEvent(event);
      }
    }, {
      stepDelayMs: speedMs,
      simulateFailureAtStep: options?.simulateFailureAtStep
    });
  }, [workflows, activeWorkflow, preferences.stepSpeed, updateWorkflow, addActivityEvent]);

  const cancelExecution = useCallback(() => {
    mockEngine.cancel();
    setIsExecuting(false);
  }, []);

  const retryWorkflow = useCallback(async (workflowId: string) => {
    cancelExecution();
    const wf = workflows.find(w => w.id === workflowId);
    if (!wf) return;

    // Reset steps to pending
    const resetWf: Workflow = {
      ...wf,
      status: 'ready',
      currentStepIndex: 0,
      steps: wf.steps.map(s => ({ ...s, status: 'pending', executionLogs: [], failedReason: undefined }))
    };
    updateWorkflow(resetWf);
    await executeWorkflow(workflowId);
  }, [workflows, cancelExecution, updateWorkflow, executeWorkflow]);

  const toggleTool = useCallback((toolId: string) => {
    setTools(prev => prev.map(t => {
      if (t.id === toolId) {
        const nextState = !t.isEnabled;
        addActivityEvent({
          category: 'tool_invoked',
          status: 'info',
          message: `Tool [${t.name}] was ${nextState ? 'enabled' : 'disabled'}.`
        });
        return { ...t, isEnabled: nextState };
      }
      return t;
    }));
  }, [addActivityEvent]);

  const updatePreferencesState = useCallback((newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPrefs }));
  }, []);

  const clearAllActivity = useCallback(() => {
    setActivityEvents([]);
    saveActivity([]);
  }, []);

  const resetToDefaults = useCallback(() => {
    mockEngine.cancel();
    resetAllData();
    setWorkflows(loadWorkflows());
    setActivityEvents(loadActivity());
    setTools(loadTools());
    setPreferences(loadPreferences());
    setActiveWorkflow(null);
    setIsExecuting(false);
  }, []);

  return (
    <WorkflowContext.Provider value={{
      workflows,
      activeWorkflow,
      activityEvents,
      tools,
      preferences,
      isExecuting,
      activeStepIndex,
      setActiveWorkflow,
      createWorkflow,
      updateWorkflow,
      deleteWorkflow,
      executeWorkflow,
      cancelExecution,
      retryWorkflow,
      toggleTool,
      updatePreferences: updatePreferencesState,
      clearAllActivity,
      resetToDefaults,
      addActivityEvent
    }}>
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
