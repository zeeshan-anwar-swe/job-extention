export enum NotificationType {
  //Stripe
  SUBSCRIBE = 'subscribe',
  RESUBSCRIBE = 'resubscribe',
  CANCEL = 'cancel',
  CHANGE_PLAN = 'change_plan',
  SUBSCRIPTION_EXPIRED = 'subscription_expired',
  SUBSCRIPTION_UPDATED = 'subscription_updated',
  PAYMENT_SUCCESS = 'payment_success',
  PAYMENT_FAILED = 'payment_failed',

  //User-Invite-SignUp
  NEW_USER = 'new_user',
  INVITE_CLIENT = 'invite_client',
  INVITE_TEAM = 'invite_team',

  //Job Related
  ASSIGN_JOB_TO_CLIENT = 'assign_job_client',
  ASSIGN_JOB_TO_TEAM = 'assign_job_team',
  ASSIGN_CANDIDATES = 'assign_candidates',
  JOB_STATUS = 'job_status',
  ASSIGN_CLIENT = 'assign_client',

  NEW_FEEDBACK = 'new_feedback',
  CANDIDATE_STATUS_CHANGE = 'candidate_status_change',

  BUG = 'bug',
  OTHER = 'other'
}