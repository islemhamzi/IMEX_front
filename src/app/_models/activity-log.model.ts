//src\app\_models\activity-log.model.ts
export interface ActivityLog {
  action: string;
  date: string;
  user: string;
  role: string;
  ip: string;
  username: string;
}
