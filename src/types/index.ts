export type WorkflowStatus = 
  | 'draft' 
  | 'planning' 
  | 'ready' 
  | 'running' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

export type StepStatus = 
  | 'pending' 
  | 'running' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  toolId: string;
  toolName: string;
  status: StepStatus;
  estimatedDuration: string;
  executionLogs?: string[];
  outputData?: string;
  failedReason?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
  category?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface WorkflowResult {
  summary: string;
  checklist?: ChecklistItem[];
  structuredData?: Record<string, any>;
  markdownReport: string;
  executionTimeSeconds: number;
  toolsUsed: string[];
}

export interface Workflow {
  id: string;
  title: string;
  request: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  steps: WorkflowStep[];
  result?: WorkflowResult;
  toolsUsed: string[];
  currentStepIndex?: number;
  simulateFailure?: boolean;
  failureStepIndex?: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'planning' | 'productivity' | 'analysis' | 'integration' | 'data';
  icon: string;
  status: 'simulated' | 'planned' | 'connected';
  isEnabled: boolean;
  mcpCompatible: boolean;
  exampleInput: string;
  exampleOutput: string;
  parameters: {
    name: string;
    type: string;
    description: string;
    required: boolean;
  }[];
}

export type EventCategory = 
  | 'workflow_created' 
  | 'plan_generated' 
  | 'step_started' 
  | 'step_completed' 
  | 'execution_failed' 
  | 'workflow_cancelled' 
  | 'workflow_completed' 
  | 'tool_invoked'
  | 'system';

export interface ActivityEvent {
  id: string;
  timestamp: string;
  workflowId?: string;
  workflowTitle?: string;
  category: EventCategory;
  status: 'info' | 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  confirmBeforeExecution: boolean;
  stepSpeed: 'fast' | 'normal' | 'thorough';
}
