import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: FormGroup;
  enviando = false;
  mensajeEnviado = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarMensaje() {
    if (this.contactForm.invalid) {
      return;
    }

    this.enviando = true;
    
    // Simular envío del formulario
    setTimeout(() => {
      console.log('Datos del formulario:', this.contactForm.value);
      
      // Aquí se podría integrar con un servicio real de envío de emails
      // Por ahora solo simulamos el envío exitoso
      
      this.enviando = false;
      this.mensajeEnviado = true;
      this.contactForm.reset();
    }, 2000);
  }

  cerrarMensaje() {
    this.mensajeEnviado = false;
  }
} 