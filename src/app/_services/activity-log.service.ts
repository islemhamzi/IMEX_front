import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityLog } from '../_models/activity-log.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private apiUrl = `${environment.apiUrl}/api/v1/activity-logs`;

  constructor(private http: HttpClient) {}

  getActivityLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(this.apiUrl);
  }

  logActivity(activityLog: ActivityLog): Observable<void> {
    return this.http.post<void>(this.apiUrl, activityLog);
  }
}
