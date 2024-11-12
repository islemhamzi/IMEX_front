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
  isLoading = false;  // To show loading indicator during login
  AuthUserSub!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Subscribe to the authenticated user state
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        if (user) {
          this.router.navigate(['home']); // Navigate to home if user is authenticated
        }
      },
      error: err => {
        this.errorMessage = 'An error occurred while checking authentication status';
      }
    });
  }

  onSubmitLogin(formLogin: NgForm) {
    // Check if the form is valid
    if (!formLogin.valid) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    this.isLoading = true; // Start loading spinner
    const matricule = formLogin.value.matricule;
    const password = formLogin.value.password;

    // Call login method in AuthService
    this.authService.login(matricule, password).subscribe({
      next: userData => {
        this.isLoading = false;  // Stop loading spinner
        this.router.navigate(['home']);  // Navigate to home on success
      },
      error: err => {
        this.isLoading = false;  // Stop loading spinner
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';  // Handle errors
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.AuthUserSub) {
      this.AuthUserSub.unsubscribe();
    }
  }
}
