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
  ProofArchived = 'proof_archived',
  ProofUnarchived = 'proof_unarchived',
  UserMentioned = 'user_mentioned',
  ReviewerDecision = 'reviewer_decision',
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

export enum ReviewerDecision {
  NoDecision = 'No decision',
  Approved = 'Approved',
  ChangesPlease = 'Changes please',
  ApprovedWithChanges = 'Approved with changes',
  TodosRequested = 'To-dos requested',
}

export enum ReviewerRole {
  Reviewer = 'reviewer',
  Mandatory = 'mandatory',
  Gatekeeper = 'gatekeeper',
  Approver = 'approver',
  UnlistedReviewer = 'unlisted-reviewer',
  Owner = 'owner',
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

export type ProofArchivedWebhookEvent = {
  type: EventType.ProofArchived;
}

export type ProofUnarchivedWebhookEvent = {
  type: EventType.ProofUnarchived;
}

export type UserMentionedWebhookEvent = {
  type: EventType.UserMentioned;
}

export type ReviewerDecisionWebhookEvent = {
  type: EventType.ReviewerDecision;
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

export type ProofArchivedTriggerEvent = {
  type: EventType.ProofArchived;
  date: string;
}

export type ProofUnarchivedTriggerEvent = {
  type: EventType.ProofUnarchived;
  date: string;
}

export type ProofUserMentionedTriggerEvent = {
  type: EventType.UserMentioned;
  date: string;
  usersMentioned: { id: string, email: string, name?: string }[];
  commentId: string;
  pageNumber: number;
}

export type ProofReviewerDecisionTriggerEvent = {
  type: EventType.ReviewerDecision;
  date: string;
  decision: ReviewerDecision
  role: ReviewerRole;
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
  teamId: string;
  status: string;
  name: string;
  versionNumber: number;
  previousVersionProofId: string | null;
  reference: string | null;
  tags: string[];
  integrationReferences: IntegrationReference[];
  createdDate: string;
  approvedDate: string;
  dueDate: string;
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
  [EventType.ProofArchived]: ProofArchivedWebhookEvent;
  [EventType.ProofUnarchived]: ProofUnarchivedWebhookEvent;
  [EventType.UserMentioned]: ProofUserMentionedTriggerEvent;
  [EventType.ReviewerDecision]: ProofReviewerDecisionTriggerEvent;
}

type ProofMap = {
  [EventType.ProofCreated]: Proof;
  [EventType.ProofDeleted]: Pick<Proof, 'id'>;
  [EventType.ProofStatusReached]: Proof;
  [EventType.WorkflowStepReached]: Proof;
  [EventType.ProofOverdue]: Proof;
  [EventType.ProofArchived]: Proof;
  [EventType.ProofUnarchived]: Proof;
  [EventType.UserMentioned]: Proof;
  [EventType.ReviewerDecision]: Proof;
}

type TriggerEventMap = {
  [EventType.ProofCreated]: ProofCreatedTriggerEvent;
  [EventType.ProofDeleted]: ProofDeletedTriggerEvent;
  [EventType.ProofStatusReached]: ProofStatusReachedTriggerEvent;
  [EventType.WorkflowStepReached]: WorkflowStepReachedTriggerEvent;
  [EventType.ProofOverdue]: ProofOverdueTriggerEvent;
  [EventType.ProofArchived]: ProofArchivedTriggerEvent;
  [EventType.ProofUnarchived]: ProofUnarchivedTriggerEvent;
  [EventType.UserMentioned]: ProofUserMentionedTriggerEvent;
  [EventType.ReviewerDecision]: ProofReviewerDecisionTriggerEvent;
};

export type Payload<T extends EventType> = {
  webhook: {
    id: string;
    name: string;
    event: WebhookEventMap[T];
  };
  trigger: (
    | { type: TriggerType.System; id: null }
    | { type: TriggerType.User; id: string, name: string | null, email: string | null }
  ) & {
    event: TriggerEventMap[T];
  };
  proof: ProofMap[T];
}
