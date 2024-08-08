import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage!: string;
  AuthUserSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['home']);
        }
      }
    });
  }

  onSubmitLogin(formLogin: NgForm) {
    if (!formLogin.valid) {
      return;
    }
    const matricule = formLogin.value.matricule;
    const password = formLogin.value.password;

    this.authService.login(matricule, password).subscribe({
      next: userData => {
        this.router.navigate(['home']);
      },
      error: err => {
        this.errorMessage = err.message;
      }
    });
  }

  ngOnDestroy() {
    this.AuthUserSub.unsubscribe();
  }
}
