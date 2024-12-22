import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User | null = null;
  @Input() isClosed = false;  // Default to open sidebar
  @Output() toggle = new EventEmitter<void>();
  isChatbotVisible : boolean = false ;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.AuthenticatedUser$.subscribe((user: User | null) => {
      this.user = user;
    });
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
    this.toggle.emit();
  }

  openSidebar() {
    this.isClosed = false;
    this.toggle.emit();
  }

  toggleChatbot() {
    this.isChatbotVisible = !this.isChatbotVisible;
  }
}
