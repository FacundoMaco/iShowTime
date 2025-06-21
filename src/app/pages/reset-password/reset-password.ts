import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatchError: boolean = false;
  showSuccessScreen: boolean = false;

  constructor(private router: Router) { }

  resetPassword(): void {
    this.passwordMismatchError = false;
    this.showSuccessScreen = false;

    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatchError = true;
      return;
    }

    console.log('Contraseña restablecida para:', this.email);
    this.showSuccessScreen = true;
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
} 