import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  correo: string = '';
  password: string = '';
  showPass: boolean = false;

  constructor(private router: Router) {}

  onLogin() {
    // Aquí iría la lógica de autenticación
    console.log('Login attempt:', { correo: this.correo, password: this.password });
    
    // Por ahora, redirigir al inicio
    this.router.navigate(['/inicio']);
  }
} 