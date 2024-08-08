import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../_services/activity-log.service';
import { ActivityLog } from '../_models/activity-log.model';

@Component({
  selector: 'app-journal-activite',
  templateUrl: './journal-activite.component.html',
  styleUrls: ['./journal-activite.component.css']
})
export class JournalActiviteComponent implements OnInit {
  activityLogs: ActivityLog[] = [];

  constructor(private activityLogService: ActivityLogService) { }

  ngOnInit(): void {
    this.activityLogService.getActivityLogs().subscribe({
      next: (logs: ActivityLog[]) => {
        this.activityLogs = logs;
      },
      error: (err) => console.error(err)
    });
  }
}
