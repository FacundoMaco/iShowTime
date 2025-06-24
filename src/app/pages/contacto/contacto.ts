import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  contactoForm: FormGroup;
  mensajeEnviado = false;
  enviando = false;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      this.enviando = true;
      
      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactoForm.value);
        this.mensajeEnviado = true;
        this.enviando = false;
        this.contactoForm.reset();
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 5000);
      }, 2000);
    }
  }

  abrirLibroReclamaciones() {
    window.open('https://www.gob.pe/libro-de-reclamaciones', '_blank');
  }

  abrirWhatsApp() {
    const telefono = '51999999999';
    const mensaje = 'Hola, me gustaría obtener más información sobre iShowTime';
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  }

  enviarEmail() {
    const email = 'info@showtime.com';
    const asunto = 'Consulta sobre iShowTime';
    const url = `mailto:${email}?subject=${encodeURIComponent(asunto)}`;
    window.open(url);
  }
} 