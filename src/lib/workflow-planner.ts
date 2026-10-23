import { WorkflowStep, WorkflowResult } from '../types';

export interface PlanTemplate {
  category: string;
  keywords: string[];
  title: string;
  steps: Array<{
    title: string;
    description: string;
    toolId: string;
    toolName: string;
    estimatedDuration: string;
  }>;
  generateResult: (request: string) => WorkflowResult;
}

export const WORKFLOW_TEMPLATES: PlanTemplate[] = [
  // 1. Weekly Organization & Project Checklist (Primary Demo Flow)
  {
    category: 'weekly_planning',
    keywords: ['week', 'organize', 'checklist', 'plan my week', 'schedule', 'organize my week'],
    title: 'Weekly Alignment & Project Action Plan',
    steps: [
      {
        title: 'Deconstruct weekly goals into actionable milestones',
        description: 'Analyzes priority objectives, identifies blockers, and establishes execution sequence.',
        toolId: 'tool-planner',
        toolName: 'Goal Decomposer & Planner',
        estimatedDuration: '1.2s'
      },
      {
        title: 'Synthesize project requirements and deliverables',
        description: 'Scans deliverable criteria to form structured verification items and success boundaries.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        estimatedDuration: '1.5s'
      },
      {
        title: 'Generate prioritized, categorized action checklist',
        description: 'Creates itemized checklist separated into Immediate, Scheduled, and Review phases.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        estimatedDuration: '1.8s'
      },
      {
        title: 'Map milestones into calendar deep-work focus blocks',
        description: 'Distributes high-cognitive tasks into peak morning slots and administrative items to late day.',
        toolId: 'tool-calendar',
        toolName: 'Calendar & Schedule Optimizer',
        estimatedDuration: '1.1s'
      }
    ],
    generateResult: (_request: string): WorkflowResult => ({
      summary: 'Successfully converted weekly objectives into a structured 4-phase execution plan with 8 prioritized tasks and calendar time-slots.',
      toolsUsed: ['Goal Decomposer', 'Document Synthesizer', 'Checklist Generator', 'Calendar Optimizer'],
      executionTimeSeconds: 5.6,
      checklist: [
        { id: 'c1', text: 'Define Sprint 4 MVP deliverables & signoff criteria', done: true, category: 'Monday Morning · High Priority', priority: 'high' },
        { id: 'c2', text: 'Coordinate Alexa+ voice intent schemas with API contracts', done: true, category: 'Monday Afternoon · Deep Work', priority: 'high' },
        { id: 'c3', text: 'Review pull requests and run integration test suite', done: false, category: 'Tuesday · Engineering', priority: 'medium' },
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
- **Friday**: Production sign-off and retro recap

#### 🎯 Key Action Items
1. **Critical Path**: Lock in API endpoints before starting frontend integrations.
2. **Risk Mitigation**: Verify MCP server tool bindings locally prior to running live orchestrator chains.
3. **Execution Confidence**: 96% based on estimated time vs allocated blocks.`
    })
  },

  // 2. Document & Research Summarizer
  {
    category: 'document_summary',
    keywords: ['summarize', 'paper', 'document', 'article', 'research', 'pdf', 'text', 'notes'],
    title: 'Executive Document Synthesis & Action Extraction',
    steps: [
      {
        title: 'Parse document structure and identify conceptual pillars',
        description: 'Extracts section hierarchy, abstracts core hypotheses, and maps argumentative flow.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        estimatedDuration: '1.4s'
      },
      {
        title: 'Extract critical findings, trade-offs, and metrics',
        description: 'Isolates empirical data, performance benchmarks, and known limitations.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        estimatedDuration: '1.6s'
      },
      {
        title: 'Synthesize actionable takeaway checklist for team',
        description: 'Converts abstract conclusions into concrete implementation decisions.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        estimatedDuration: '1.2s'
      }
    ],
    generateResult: (_request: string): WorkflowResult => ({
      summary: 'Extracted 5 key architectural principles, quantified performance benchmarks, and generated an action checklist from the source document.',
      toolsUsed: ['Document Synthesizer', 'Checklist Generator'],
      executionTimeSeconds: 4.2,
      checklist: [
        { id: 'c1', text: 'Adopt lightweight schema validation at the tool integration boundary', done: true, category: 'Architecture', priority: 'high' },
        { id: 'c2', text: 'Implement fallback responses when agent confidence dips below 85%', done: false, category: 'Reliability', priority: 'high' },
        { id: 'c3', text: 'Standardize structured tool output schema for deterministic frontend rendering', done: false, category: 'Developer Experience', priority: 'medium' },
        { id: 'c4', text: 'Add token telemetry logging for step execution analytics', done: false, category: 'Observability', priority: 'low' }
      ],
      markdownReport: `### Document Synthesis Report

**Executive Summary**
The analyzed material demonstrates that multi-agent systems benefit significantly from strict boundary definitions between intention decomposition, tool resolution, and visual execution.

#### 📌 Core Insights
- **Tool Protocol**: Decoupling tool discovery from orchestration increases system resilience by 40%.
- **Latency Optimization**: Pre-caching common execution trees reduces perceived user latency to sub-second thresholds.
- **Human-in-the-Loop**: Allowing step editing prior to execution increases end-user task completion rate by 65%.`
    })
  },

  // 3. Project Launch & Risk Checklist
  {
    category: 'project_launch',
    keywords: ['launch', 'project', 'release', 'deploy', 'production', 'v1', 'prep'],
    title: 'Product Launch Readiness & Risk Mitigation Plan',
    steps: [
      {
        title: 'Audit system components, configurations, and dependencies',
        description: 'Scans package integrity, environment variables, and build health.',
        toolId: 'tool-code-auditor',
        toolName: 'Code & Dependency Auditor',
        estimatedDuration: '1.8s'
      },
      {
        title: 'Identify deployment risks, rollbacks, and dependencies',
        description: 'Compiles risk matrix covering external integrations and failover contingencies.',
        toolId: 'tool-planner',
        toolName: 'Goal Decomposer & Planner',
        estimatedDuration: '1.5s'
      },
      {
        title: 'Generate pre-flight release checklist with gating checks',
        description: 'Produces itemized verification runbook for engineering, design, and product.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        estimatedDuration: '1.3s'
      },
      {
        title: 'Schedule launch sequence and notification intervals',
        description: 'Maps the release countdown into discrete time-boxed operational phases.',
        toolId: 'tool-calendar',
        toolName: 'Calendar & Schedule Optimizer',
        estimatedDuration: '1.0s'
      }
    ],
    generateResult: (_request: string): WorkflowResult => ({
      summary: 'Release plan generated: 4 gating phases, 0 critical blockers detected, and a comprehensive pre-flight verification checklist ready.',
      toolsUsed: ['Code & Dependency Auditor', 'Goal Decomposer', 'Checklist Generator', 'Calendar Optimizer'],
      executionTimeSeconds: 5.6,
      checklist: [
        { id: 'c1', text: 'Verify environment configuration variables & secret rotations', done: true, category: 'Security & Config', priority: 'high' },
        { id: 'c2', text: 'Run end-to-end integration test passes across all supported routes', done: true, category: 'Quality Assurance', priority: 'high' },
        { id: 'c3', text: 'Confirm zero console runtime errors in production preview build', done: false, category: 'Frontend Health', priority: 'high' },
        { id: 'c4', text: 'Inspect mobile viewport touch targets and responsive breakpoints', done: false, category: 'UX & Design', priority: 'medium' },
        { id: 'c5', text: 'Prepare release communication announcement and demo recording', done: false, category: 'Go-to-market', priority: 'medium' }
      ],
      markdownReport: `### Launch Readiness Assessment

**Status: READY FOR SIGN-OFF**

- **Build Integrity**: Passed. Zero unresolved module bundle warnings.
- **Rollback Window**: 15-minute SLA on rollback protocol.
- **Verification Gates**: 5 critical checklist items mapped to responsible leads.`
    })
  },

  // 4. Study & Learning Plan
  {
    category: 'study_plan',
    keywords: ['study', 'learn', 'course', 'exam', 'session', 'master', 'reading'],
    title: 'Focused Mastery & Study Schedule',
    steps: [
      {
        title: 'Curate learning curriculum and core knowledge topics',
        description: 'Breaks down complex syllabus into digestible 45-minute thematic focus blocks.',
        toolId: 'tool-planner',
        toolName: 'Goal Decomposer & Planner',
        estimatedDuration: '1.1s'
      },
      {
        title: 'Extract core definitions, formulas, and conceptual anchors',
        description: 'Identifies high-frequency assessment areas and essential mental models.',
        toolId: 'tool-summarizer',
        toolName: 'Document Synthesizer',
        estimatedDuration: '1.3s'
      },
      {
        title: 'Construct active-recall practice checklist & self-tests',
        description: 'Generates progressive testing checkpoints to validate comprehension.',
        toolId: 'tool-checklist',
        toolName: 'Structured Checklist Generator',
        estimatedDuration: '1.4s'
      }
    ],
    generateResult: (request: string): WorkflowResult => ({
      summary: `Structured study path formulated for "${request.slice(0, 40)}..." featuring spaced-repetition milestones and recall prompts.`,
      toolsUsed: ['Goal Decomposer', 'Document Synthesizer', 'Checklist Generator'],
      executionTimeSeconds: 3.8,
      checklist: [
        { id: 'c1', text: 'Core Architecture Deep Dive: Intent parsing and dispatch pipeline', done: true, category: 'Session 1 · Deep Focus', priority: 'high' },
        { id: 'c2', text: 'Hands-on Exercise: Implement simulated tool callback response', done: false, category: 'Session 2 · Practical', priority: 'high' },
        { id: 'c3', text: 'Active Recall Checkpoint: Explain MCP architectural boundaries without notes', done: false, category: 'Session 3 · Review', priority: 'medium' },
        { id: 'c4', text: 'Synthesize 1-page cheatsheet of core failure recovery patterns', done: false, category: 'Session 4 · Retention', priority: 'low' }
      ],
      markdownReport: `### Study Strategy & Spaced Repetition Plan

**Cognitive Load Balance**
- Maximum session length: 50 minutes with 10-minute rest intervals.
- Priority: Conceptual grounding first, followed by direct tactile code synthesis.
- Assessment metric: Ability to articulate system trade-offs fluently.`
    })
  }
];

// Fallback generator for custom inputs
export function generatePlanForRequest(request: string): {
  title: string;
  steps: WorkflowStep[];
  resultGenerator: (req: string) => WorkflowResult;
} {
  const normalized = request.toLowerCase().trim();

  // Try to match against templates
  const matchedTemplate = WORKFLOW_TEMPLATES.find(template => 
    template.keywords.some(kw => normalized.includes(kw))
  );

  if (matchedTemplate) {
    const steps: WorkflowStep[] = matchedTemplate.steps.map((s, idx) => ({
      id: `step-${Date.now()}-${idx + 1}`,
      stepNumber: idx + 1,
      title: s.title,
      description: s.description,
      toolId: s.toolId,
      toolName: s.toolName,
      status: 'pending',
      estimatedDuration: s.estimatedDuration,
      executionLogs: []
    }));

    return {
      title: matchedTemplate.title,
      steps,
      resultGenerator: matchedTemplate.generateResult
    };
  }

  // Intelligent Fallback for arbitrary goals
  const title = request.length > 50 
    ? `${request.slice(0, 47)}... Execution Plan` 
    : `Execution Plan: ${request}`;

  const steps: WorkflowStep[] = [
    {
      id: `step-${Date.now()}-1`,
      stepNumber: 1,
      title: `Decompose goal: "${request.slice(0, 36)}${request.length > 36 ? '...' : ''}"`,
      description: 'Breaks the natural language request down into sequential milestones and constraints.',
      toolId: 'tool-planner',
      toolName: 'Goal Decomposer & Planner',
      status: 'pending',
      estimatedDuration: '1.2s',
      executionLogs: []
    },
    {
      id: `step-${Date.now()}-2`,
      stepNumber: 2,
      title: 'Analyze operational requirements & prerequisites',
      description: 'Synthesizes necessary resources, required inputs, and expected outcomes.',
      toolId: 'tool-summarizer',
      toolName: 'Document Synthesizer',
      status: 'pending',
      estimatedDuration: '1.4s',
      executionLogs: []
    },
    {
      id: `step-${Date.now()}-3`,
      stepNumber: 3,
      title: 'Formulate structured execution checklist',
      description: 'Generates verified action items with distinct priority tiers and verification checks.',
      toolId: 'tool-checklist',
      toolName: 'Structured Checklist Generator',
      status: 'pending',
      estimatedDuration: '1.6s',
      executionLogs: []
    },
    {
      id: `step-${Date.now()}-4`,
      stepNumber: 4,
      title: 'Establish timeline and execution milestones',
      description: 'Allocates concrete sequence windows and follow-up checkpoints.',
      toolId: 'tool-calendar',
      toolName: 'Calendar & Schedule Optimizer',
      status: 'pending',
      estimatedDuration: '1.0s',
      executionLogs: []
    }
  ];

  const resultGenerator = (req: string): WorkflowResult => ({
    summary: `Synthesized a 4-phase execution framework for "${req.slice(0, 60)}...". All steps mapped to verified tooling.`,
    toolsUsed: ['Goal Decomposer', 'Document Synthesizer', 'Checklist Generator', 'Calendar Optimizer'],
    executionTimeSeconds: 5.2,
    checklist: [
      { id: 'c1', text: `Initiate Phase 1 preparation for: ${req.slice(0, 40)}`, done: true, category: 'Immediate Priority', priority: 'high' },
      { id: 'c2', text: 'Review prerequisites and resolve any environmental dependencies', done: true, category: 'Setup', priority: 'high' },
      { id: 'c3', text: 'Execute primary milestone tasks and verify intermediate deliverables', done: false, category: 'Execution', priority: 'medium' },
      { id: 'c4', text: 'Review final output against original success criteria', done: false, category: 'Quality Check', priority: 'medium' },
      { id: 'c5', text: 'Document outcomes and archive project artifacts for reference', done: false, category: 'Wrap-up', priority: 'low' }
    ],
    markdownReport: `### TaskWeave Custom Plan: ${req}

**Outcome Summary**
Your request has been processed into a structured action blueprint. Each step is connected to appropriate tooling abstractions ready for simulated or live execution.

#### 📋 Execution Directives
- **Primary Objective**: ${req}
- **Status**: Completed simulation run
- **Recommended Cadence**: Review checklist items sequentially and check off milestones as completed.`
  });

  return { title, steps, resultGenerator };
}
