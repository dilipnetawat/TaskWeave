import { Workflow, ActivityEvent, UserPreferences, Tool } from '../types';
import { INITIAL_TOOLS } from './tools-data';

const STORAGE_KEYS = {
  WORKFLOWS: 'taskweave_workflows_v1',
  ACTIVITY: 'taskweave_activity_v1',
  PREFERENCES: 'taskweave_preferences_v1',
  TOOLS: 'taskweave_tools_v1',
};

// Seed Workflows for first-time visitors (realistic historical workflows)
const SEED_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-seed-01',
    title: 'Weekly Alignment & Project Action Plan',
    request: 'Help me organize my week and prepare a project checklist.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 3 + 6000).toISOString(),
    toolsUsed: ['Goal Decomposer', 'Document Synthesizer', 'Checklist Generator', 'Calendar Optimizer'],
    steps: [
      {
        id: 's1',
        stepNumber: 1,
        title: 'Deconstruct weekly goals into actionable milestones',
        description: 'Analyzes priority objectives, identifies blockers, and establishes execution sequence.',
        toolId: 'tool-planner',
        toolName: 'Goal Decomposer & Planner',
        status: 'completed',
        estimatedDuration: '1.2s',
        executionLogs: [
          'Decomposer initialized with goal constraints',
          'Identified 3 primary workstreams: Architecture, QA, Go-to-market',
          'Milestone dependencies locked'
        ]
      },
      {
        id: 's2',
        stepNumber: 2,
        title: 'Synthesize project requirements and deliverables',
        description: 'Scans deliverable criteria to form structured verification items and success boundaries.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        status: 'completed',
        estimatedDuration: '1.5s',
        executionLogs: [
          'Parsing deliverable criteria',
          'Verified compliance with Alexa+ hackathon tracks',
          'Extracted 7 distinct gating checkpoints'
        ]
      },
      {
        id: 's3',
        stepNumber: 3,
        title: 'Generate prioritized, categorized action checklist',
        description: 'Creates itemized checklist separated into Immediate, Scheduled, and Review phases.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        status: 'completed',
        estimatedDuration: '1.8s',
        executionLogs: [
          'Compiling high-impact checklist items',
          'Assigned verification criteria per item',
          'Interactive checklist rendered successfully'
        ]
      },
      {
        id: 's4',
        stepNumber: 4,
        title: 'Map milestones into calendar deep-work focus blocks',
        description: 'Distributes high-cognitive tasks into peak morning slots and administrative items to late day.',
        toolId: 'tool-calendar',
        toolName: 'Calendar & Schedule Optimizer',
        status: 'completed',
        estimatedDuration: '1.1s',
        executionLogs: [
          'Analyzing calendar availability constraints',
          'Reserved morning focus windows for sprint critical path',
          'Schedule optimization complete'
        ]
      }
    ],
    result: {
      summary: 'Successfully converted weekly objectives into a structured 4-phase execution plan with 7 prioritized tasks and calendar time-slots.',
      toolsUsed: ['Goal Decomposer', 'Document Synthesizer', 'Checklist Generator', 'Calendar Optimizer'],
      executionTimeSeconds: 5.6,
      checklist: [
        { id: 'c1', text: 'Define Sprint 4 MVP deliverables & signoff criteria', done: true, category: 'Monday Morning · High Priority', priority: 'high' },
        { id: 'c2', text: 'Coordinate Alexa+ voice intent schemas with API contracts', done: true, category: 'Monday Afternoon · Deep Work', priority: 'high' },
        { id: 'c3', text: 'Review pull requests and run integration test suite', done: true, category: 'Tuesday · Engineering', priority: 'medium' },
        { id: 'c4', text: 'Conduct mid-week architecture sync with tooling lead', done: false, category: 'Wednesday · Sync', priority: 'medium' },
        { id: 'c5', text: 'Draft customer release changelog and demo walkthrough script', done: false, category: 'Thursday · Docs', priority: 'medium' },
        { id: 'c6', text: 'Final verification run on staging deployment environment', done: false, category: 'Friday Morning · Release', priority: 'high' },
        { id: 'c7', text: 'Publish retrospective notes and backlog triage', done: false, category: 'Friday Afternoon · Wrap-up', priority: 'low' }
      ],
      markdownReport: `### TaskWeave Execution Plan: Weekly Alignment

**Overview**
Your weekly objectives have been decomposed into 4 distinct phases with clear milestone verification criteria. 

#### 📅 Recommended Time Allocations
- **Monday**: Strategic planning & Alexa+ contract validation (9:00 AM - 1:00 PM)
- **Tuesday**: Core implementation & test verification (10:00 AM - 4:00 PM)
- **Wednesday - Thursday**: Team integration, documentation, and staging testing
- **Friday**: Production sign-off and retro recap`
    }
  },
  {
    id: 'wf-seed-02',
    title: 'Research Paper Synthesis: Agent Orchestration Patterns',
    request: 'Summarize a research paper on multimodal agent workflows and synthesize actionable principles.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 12 + 4200).toISOString(),
    toolsUsed: ['Document Synthesizer', 'Checklist Generator'],
    steps: [
      {
        id: 's2-1',
        stepNumber: 1,
        title: 'Parse document structure and identify conceptual pillars',
        description: 'Extracts section hierarchy, abstracts core hypotheses, and maps argumentative flow.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        status: 'completed',
        estimatedDuration: '1.4s'
      },
      {
        id: 's2-2',
        stepNumber: 2,
        title: 'Extract critical findings, trade-offs, and metrics',
        description: 'Isolates empirical data, performance benchmarks, and known limitations.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        status: 'completed',
        estimatedDuration: '1.6s'
      },
      {
        id: 's2-3',
        stepNumber: 3,
        title: 'Synthesize actionable takeaway checklist for team',
        description: 'Converts abstract conclusions into concrete implementation decisions.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        status: 'completed',
        estimatedDuration: '1.2s'
      }
    ],
    result: {
      summary: 'Extracted 4 key architectural insights and generated a 4-point implementation checklist.',
      toolsUsed: ['Document Synthesizer', 'Checklist Generator'],
      executionTimeSeconds: 4.2,
      checklist: [
        { id: 'c2-1', text: 'Adopt lightweight schema validation at tool integration boundary', done: true, category: 'Architecture', priority: 'high' },
        { id: 'c2-2', text: 'Implement fallback responses when agent confidence dips below 85%', done: true, category: 'Reliability', priority: 'high' },
        { id: 'c2-3', text: 'Standardize structured tool output schema for deterministic frontend rendering', done: false, category: 'DX', priority: 'medium' },
        { id: 'c2-4', text: 'Add token telemetry logging for step execution analytics', done: false, category: 'Observability', priority: 'low' }
      ],
      markdownReport: 'Synthesized 12-page preprint into 4 operational guidelines.'
    }
  },
  {
    id: 'wf-seed-03',
    title: 'Staging Environment Health Audit',
    request: 'Audit dependencies, test passes, and security alerts before team demo.',
    status: 'failed',
    createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 24 + 3100).toISOString(),
    toolsUsed: ['Code & Dependency Auditor'],
    steps: [
      {
        id: 's3-1',
        stepNumber: 1,
        title: 'Scan package lockfile and dependency tree',
        description: 'Inspects local modules for integrity check and version mismatches.',
        toolId: 'tool-code-auditor',
        toolName: 'Code & Dependency Auditor',
        status: 'completed',
        estimatedDuration: '1.5s'
      },
      {
        id: 's3-2',
        stepNumber: 2,
        title: 'Verify endpoint connectivity to simulated tool servers',
        description: 'Pings active mock adapters to confirm readiness.',
        toolId: 'tool-code-auditor',
        toolName: 'Code & Dependency Auditor',
        status: 'failed',
        failedReason: 'Simulated connection timeout: remote endpoint was marked offline for testing purposes.',
        estimatedDuration: '1.6s'
      }
    ]
  }
];

const SEED_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-seed-1',
    timestamp: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
    workflowId: 'wf-seed-01',
    workflowTitle: 'Weekly Alignment & Project Action Plan',
    category: 'workflow_completed',
    status: 'success',
    message: 'Workflow completed successfully. Result generated in 5.6s.',
    details: 'All 4 steps finished without errors. 7 checklist items ready.'
  },
  {
    id: 'act-seed-2',
    timestamp: new Date(Date.now() - 3600 * 1000 * 3 - 5000).toISOString(),
    workflowId: 'wf-seed-01',
    workflowTitle: 'Weekly Alignment & Project Action Plan',
    category: 'step_completed',
    status: 'success',
    message: 'Step 4: "Map milestones into calendar deep-work focus blocks" finished.',
    details: 'Tool: Calendar & Schedule Optimizer'
  },
  {
    id: 'act-seed-3',
    timestamp: new Date(Date.now() - 3600 * 1000 * 3 - 10000).toISOString(),
    workflowId: 'wf-seed-01',
    workflowTitle: 'Weekly Alignment & Project Action Plan',
    category: 'plan_generated',
    status: 'info',
    message: 'Plan generated with 4 sequential execution steps.',
    details: 'Matched weekly planning template'
  },
  {
    id: 'act-seed-4',
    timestamp: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    workflowId: 'wf-seed-02',
    workflowTitle: 'Research Paper Synthesis',
    category: 'workflow_completed',
    status: 'success',
    message: 'Workflow completed: 4 architectural takeaways extracted.',
    details: 'Execution time: 4.2s'
  },
  {
    id: 'act-seed-5',
    timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    workflowId: 'wf-seed-03',
    workflowTitle: 'Staging Environment Health Audit',
    category: 'execution_failed',
    status: 'error',
    message: 'Execution halted at Step 2: Simulated connection timeout.',
    details: 'Controlled test failure in verification phase.'
  }
];

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  reducedMotion: false,
  confirmBeforeExecution: false,
  stepSpeed: 'normal'
};

// Safe storage accessors
export function loadWorkflows(): Workflow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKFLOWS);
    if (!raw) {
      saveWorkflows(SEED_WORKFLOWS);
      return SEED_WORKFLOWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error reading workflows:', e);
    return SEED_WORKFLOWS;
  }
}

export function saveWorkflows(workflows: Workflow[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKFLOWS, JSON.stringify(workflows));
  } catch (e) {
    console.warn('LocalStorage error saving workflows:', e);
  }
}

export function loadActivity(): ActivityEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVITY);
    if (!raw) {
      saveActivity(SEED_ACTIVITY);
      return SEED_ACTIVITY;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error reading activity:', e);
    return SEED_ACTIVITY;
  }
}

export function saveActivity(events: ActivityEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(events));
  } catch (e) {
    console.warn('LocalStorage error saving activity:', e);
  }
}

export function loadTools(): Tool[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TOOLS);
    if (!raw) {
      saveTools(INITIAL_TOOLS);
      return INITIAL_TOOLS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.warn('LocalStorage error reading tools:', e);
    return INITIAL_TOOLS;
  }
}

export function saveTools(tools: Tool[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
  } catch (e) {
    console.warn('LocalStorage error saving tools:', e);
  }
}

export function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) {
      return DEFAULT_PREFERENCES;
    }
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('LocalStorage error reading preferences:', e);
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(prefs: UserPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
  } catch (e) {
    console.warn('LocalStorage error saving preferences:', e);
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.WORKFLOWS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    localStorage.removeItem(STORAGE_KEYS.TOOLS);
  } catch (e) {
    console.warn('LocalStorage error resetting data:', e);
  }
}
