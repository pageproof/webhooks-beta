export enum FileType {
  StaticDocument = 'static_document',
  StaticImage = 'static_image',
  AnimatedImage = 'animated_image',
  MediaVideo = 'media_video',
  MediaAudio = 'media_audio',
  WebArchive = 'web_archive',
  WebsiteUrl = 'website_url',
  EmailArchive = 'email_archive',
  StaticArchive = 'static_archive',
}

export enum EventType {
  ProofCreated = 'proof_created',
  ProofStatusReached = 'proof_status_reached',
  ProofDeleted = 'proof_deleted',
  WorkflowStepReached = 'workflow_step_reached',
  ProofOverdue = 'proof_overdue',
}

export enum ProofStatus {
  New = 'new',
  InProofing = 'in_proofing',
  WithApprover = 'with_approver',
  TodosRequested = 'todos_requested',
  AwaitingNewVersion = 'awaiting_new_version',
  HasNewVersion = 'has_new_version',
  Approved = 'approved',
}

export enum TriggerType {
  System = 'system',
  User = 'user',
}

export type ProofCreatedWebhookEvent = {
  type: EventType.ProofCreated;
}

export type ProofDeletedWebhookEvent = {
  type: EventType.ProofDeleted;
}

export type ProofStatusReachedWebhookEvent = {
  type: EventType.ProofStatusReached;
  condition: {
    proofStatuses: ProofStatus[];
  };
}

export type WorkflowStepReachedWebhookEvent = {
  type: EventType.WorkflowStepReached;
  condition: {
    workflowStepName: string;
  };
}

export type ProofOverdueWebhookEvent = {
  type: EventType.ProofOverdue;
}

export type ProofStatusReachedTriggerEvent = {
  type: EventType.ProofStatusReached;
  date: string;
  proofStatus: ProofStatus;
}

export type WorkflowStepReachedTriggerEvent = {
  type: EventType.WorkflowStepReached;
  date: string;
  stepName: string;
}

export type ProofCreatedTriggerEvent = {
  type: EventType.ProofCreated;
  date: string;
}

export type ProofDeletedTriggerEvent = {
  type: EventType.ProofDeleted;
  date: string;
}

export type ProofOverdueTriggerEvent = {
  type: EventType.ProofOverdue;
  date: string;
}

export type IntegrationReference = {
  referenceId: string;
  referenceType:
    | 'airtableRecord'
    | 'asanaProject'
    | 'asanaTask'
    | 'canvaDesign'
    | 'clickupTask'
    | 'trelloBoard'
    | 'trelloCard'
    | 'mondayBoard'
    | 'mondayGroup'
    | 'mondayItem'
    | 'slackPrivateChannel'
    | 'slackPublicChannel'
  referenceLabel?: string;
  referenceUrl?: string;
}

export type Proof = {
  id: string;
  status: string;
  name: string;
  versionNumber: number;
  reference: string | null;
  tags: string[];
  integrationReferences: IntegrationReference[];
  createdDate: string;
  approvedDate: string;
  commentCounts: {
    unmarked: number;
    todo: number;
    done: number;
  };
  file: null | {
    id: string;
    type: FileType | null;
    name: string;
  };
  workflow: null | {
    id: string;
    name: string;
  };
}

type WebhookEventMap = {
  [EventType.ProofCreated]: ProofCreatedWebhookEvent;
  [EventType.ProofDeleted]: ProofDeletedWebhookEvent;
  [EventType.ProofStatusReached]: ProofStatusReachedWebhookEvent;
  [EventType.WorkflowStepReached]: WorkflowStepReachedWebhookEvent;
  [EventType.ProofOverdue]: ProofOverdueWebhookEvent;
}

type ProofMap = {
  [EventType.ProofCreated]: Proof;
  [EventType.ProofDeleted]: Pick<Proof, 'id'>;
  [EventType.ProofStatusReached]: Proof;
  [EventType.WorkflowStepReached]: Proof;
  [EventType.ProofOverdue]: Proof;
}

type TriggerEventMap = {
  [EventType.ProofCreated]: ProofCreatedTriggerEvent;
  [EventType.ProofDeleted]: ProofDeletedTriggerEvent;
  [EventType.ProofStatusReached]: ProofStatusReachedTriggerEvent;
  [EventType.WorkflowStepReached]: WorkflowStepReachedTriggerEvent;
  [EventType.ProofOverdue]: ProofOverdueTriggerEvent;
};

export type Payload<T extends EventType> = {
  webhook: {
    id: string;
    name: string;
    event: WebhookEventMap[T];
  };
  trigger: (
    | { type: TriggerType.System; id: null }
    | { type: TriggerType.User; id: string }
  ) & {
    event: TriggerEventMap[T];
  };
  proof: ProofMap[T];
}
