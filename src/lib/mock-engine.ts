import { Workflow, WorkflowStep, WorkflowResult, ActivityEvent } from '../types';
import { generatePlanForRequest } from './workflow-planner';

export interface ExecutionCallbacks {
  onStepStart: (stepIndex: number, step: WorkflowStep) => void;
  onStepProgress: (stepIndex: number, log: string) => void;
  onStepComplete: (stepIndex: number, step: WorkflowStep) => void;
  onStepFail: (stepIndex: number, step: WorkflowStep, reason: string) => void;
  onWorkflowComplete: (workflow: Workflow, result: WorkflowResult) => void;
  onWorkflowCancel: () => void;
  onActivityEvent: (event: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
}

export class MockExecutionEngine {
  private activeTimers: ReturnType<typeof setTimeout>[] = [];
  private isCancelled: boolean = false;
  private isPaused: boolean = false;

  public cancel(): void {
    this.isCancelled = true;
    this.clearAllTimers();
  }

  public clearAllTimers(): void {
    this.activeTimers.forEach(t => clearTimeout(t));
    this.activeTimers = [];
  }

  public createWorkflowFromRequest(request: string): Workflow {
    const { title, steps } = generatePlanForRequest(request);
    const id = `wf-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    const uniqueTools = Array.from(new Set(steps.map(s => s.toolName)));

    return {
      id,
      title,
      request,
      status: 'ready',
      createdAt: now,
      updatedAt: now,
      steps,
      toolsUsed: uniqueTools,
      currentStepIndex: 0
    };
  }

  public async runWorkflow(
    workflow: Workflow,
    callbacks: ExecutionCallbacks,
    options: {
      stepDelayMs?: number;
      simulateFailureAtStep?: number; // 1-indexed, e.g. 3 means fail at step 3
    } = {}
  ): Promise<void> {
    this.isCancelled = false;
    this.isPaused = false;
    this.clearAllTimers();

    const delay = options.stepDelayMs || 1000;
    const failAtStep = options.simulateFailureAtStep;

    const { resultGenerator } = generatePlanForRequest(workflow.request);

    callbacks.onActivityEvent({
      workflowId: workflow.id,
      workflowTitle: workflow.title,
      category: 'workflow_created',
      status: 'info',
      message: `Workflow "${workflow.title}" execution started.`,
      details: `${workflow.steps.length} sequential execution steps scheduled.`
    });

    const updatedSteps = [...workflow.steps];

    for (let i = 0; i < updatedSteps.length; i++) {
      if (this.isCancelled) {
        callbacks.onWorkflowCancel();
        callbacks.onActivityEvent({
          workflowId: workflow.id,
          workflowTitle: workflow.title,
          category: 'workflow_cancelled',
          status: 'warning',
          message: `Execution cancelled by user at step ${i + 1}.`,
          details: `Step: ${updatedSteps[i].title}`
        });
        return;
      }

      const step = { ...updatedSteps[i], status: 'running' as const };
      callbacks.onStepStart(i, step);

      callbacks.onActivityEvent({
        workflowId: workflow.id,
        workflowTitle: workflow.title,
        category: 'step_started',
        status: 'info',
        message: `Step ${i + 1} started: "${step.title}"`,
        details: `Invoking simulated tool: ${step.toolName}`
      });

      // Emit intermediate simulated logs
      await this.sleep(Math.floor(delay * 0.35));
      if (this.isCancelled) return;

      const logMsg = `Allocated task parameters to [${step.toolName}]. Initializing execution container...`;
      callbacks.onStepProgress(i, logMsg);

      await this.sleep(Math.floor(delay * 0.4));
      if (this.isCancelled) return;

      // Check if this step is configured for simulated failure
      if (failAtStep && failAtStep === i + 1) {
        const failureReason = `Controlled Test Failure: [${step.toolName}] simulated network timeout / validation exception for test demonstration.`;
        const failedStep = {
          ...step,
          status: 'failed' as const,
          failedReason: failureReason,
          executionLogs: [...(step.executionLogs || []), logMsg, `[ERROR] ${failureReason}`]
        };
        callbacks.onStepFail(i, failedStep, failureReason);

        callbacks.onActivityEvent({
          workflowId: workflow.id,
          workflowTitle: workflow.title,
          category: 'execution_failed',
          status: 'error',
          message: `Step ${i + 1} failed: ${step.title}`,
          details: failureReason
        });
        return;
      }

      // Finish step normally
      const completedStep = {
        ...step,
        status: 'completed' as const,
        executionLogs: [
          ...(step.executionLogs || []),
          logMsg,
          `Tool [${step.toolName}] executed in ${step.estimatedDuration}. Output validated.`
        ]
      };
      updatedSteps[i] = completedStep;
      callbacks.onStepComplete(i, completedStep);

      callbacks.onActivityEvent({
        workflowId: workflow.id,
        workflowTitle: workflow.title,
        category: 'step_completed',
        status: 'success',
        message: `Step ${i + 1} completed: "${step.title}"`,
        details: `Duration: ${step.estimatedDuration}`
      });

      // Brief gap between steps
      await this.sleep(Math.floor(delay * 0.25));
    }

    if (this.isCancelled) return;

    // All steps completed! Generate rich result
    const result = resultGenerator(workflow.request);

    const completedWorkflow: Workflow = {
      ...workflow,
      status: 'completed',
      steps: updatedSteps,
      result,
      updatedAt: new Date().toISOString()
    };

    callbacks.onWorkflowComplete(completedWorkflow, result);

    callbacks.onActivityEvent({
      workflowId: workflow.id,
      workflowTitle: workflow.title,
      category: 'workflow_completed',
      status: 'success',
      message: `Workflow completed successfully: "${workflow.title}"`,
      details: `Generated ${result.checklist?.length || 0} actionable checklist items.`
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => {
      const timer = setTimeout(() => {
        resolve();
      }, ms);
      this.activeTimers.push(timer);
    });
  }
}

export const mockEngine = new MockExecutionEngine();
