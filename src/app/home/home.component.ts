import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from "../_services/user.service";
import { AuthService } from "../_services/auth.service";
import { User } from "../_models/user.model";
import { Subscription } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  pubContent: string = '';
  user!: User;
  AuthUserSub!: Subscription;
  content: string = '';
  isClosed: boolean = false;  // Default to open sidebar

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        if (user) this.user = user;
      }
    });

    this.route.url.subscribe(url => {
      if (url[0].path.includes('documents')) {
        this.loadDocuments(url[0].path);
      } else {
        this.loadPublicContent();
      }
    });
  }

  loadDocuments(path: string): void {
    switch (path) {
      case 'documents/user':
        this.content = 'Documents pour USER';
        break;
      case 'documents/admin':
        this.content = 'Documents pour ADMIN';
        break;
      case 'documents/tfjo':
        this.content = 'Documents TFJO';
        break;
      case 'documents/transactionnels':
        this.content = 'Documents Transactionnels';
        break;
      default:
        this.content = 'Contenu non trouvé';
    }
  }

  loadPublicContent(): void {
    this.userService.getUserPublicContent().subscribe({
      next: (content: string) => {
        this.pubContent = content;
      },
      error: err => console.log(err)
    });
  }

  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }

  toggleSidebar() {
    this.isClosed = !this.isClosed;
  }
}
