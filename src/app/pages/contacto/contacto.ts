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
  enviando = false;
  mensajeEnviado = false;
  erroresFormulario: string[] = [];

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]{7,15}$/)]],
      tipoConsulta: ['', Validators.required],
      asunto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    });
  }

  async onSubmit() {
    if (this.contactoForm.valid) {
      this.enviando = true;
      this.erroresFormulario = [];
      
      try {
        // Simular envío al backend
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular respuesta exitosa
        this.mensajeEnviado = true;
        this.contactoForm.reset();
        this.announceToScreenReader('Mensaje enviado exitosamente. Gracias por contactarnos.');
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 5000);
        
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
        this.erroresFormulario.push('Error al enviar el mensaje. Por favor, intenta nuevamente.');
        this.announceToScreenReader('Error al enviar el mensaje. Por favor, intenta nuevamente.');
      } finally {
        this.enviando = false;
      }
    } else {
      this.marcarCamposComoTocados();
      this.validarFormulario();
      this.announceToScreenReader('Por favor, corrige los errores en el formulario.');
    }
  }

  limpiarFormulario() {
    this.contactoForm.reset();
    this.erroresFormulario = [];
    this.mensajeEnviado = false;
    this.announceToScreenReader('Formulario limpiado. Todos los campos han sido borrados.');
  }

  marcarCamposComoTocados() {
    Object.keys(this.contactoForm.controls).forEach(key => {
      const control = this.contactoForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  validarFormulario() {
    this.erroresFormulario = [];
    
    if (this.contactoForm.errors) {
      this.erroresFormulario.push('El formulario contiene errores de validación.');
    }
  }

  // Función para anunciar mensajes a lectores de pantalla
  private announceToScreenReader(message: string) {
    const statusElement = document.getElementById('submit-status');
    if (statusElement) {
      statusElement.textContent = message;
      // Limpiar el mensaje después de un breve delay
      setTimeout(() => {
        statusElement.textContent = '';
      }, 3000);
    }
  }

  // Función para obtener mensaje de error específico
  getErrorMessage(controlName: string): string {
    const control = this.contactoForm.get(controlName);
    if (control && control.errors) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(controlName)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['minlength']) {
        return `${this.getFieldLabel(controlName)} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `${this.getFieldLabel(controlName)} no puede exceder ${control.errors['maxlength'].requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        return this.getPatternErrorMessage(controlName);
      }
    }
    return '';
  }

  private getFieldLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      nombre: 'El nombre',
      email: 'El email',
      telefono: 'El teléfono',
      tipoConsulta: 'El tipo de consulta',
      asunto: 'El asunto',
      mensaje: 'El mensaje'
    };
    return labels[controlName] || controlName;
  }

  private getPatternErrorMessage(controlName: string): string {
    const messages: { [key: string]: string } = {
      nombre: 'El nombre solo puede contener letras y espacios',
      telefono: 'Ingresa un teléfono válido (formato: +51 999 999 999)'
    };
    return messages[controlName] || 'Formato inválido';
  }

  // Funciones de contacto rápido con mejor accesibilidad
  abrirWhatsApp() {
    const numero = '+51999999999';
    const mensaje = encodeURIComponent('Hola, necesito información sobre sus servicios.');
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    this.announceToScreenReader('Abriendo WhatsApp en una nueva ventana');
  }

  enviarEmail() {
    const email = 'info@showtime.com';
    const asunto = encodeURIComponent('Consulta desde iShowTime');
    const url = `mailto:${email}?subject=${asunto}`;
    window.location.href = url;
    this.announceToScreenReader('Abriendo aplicación de email');
  }

  abrirLibroReclamaciones() {
    // URL del libro de reclamaciones (ejemplo)
    const url = 'https://www.consumidor.gob.pe/libro-de-reclamaciones';
    window.open(url, '_blank', 'noopener,noreferrer');
    this.announceToScreenReader('Abriendo libro de reclamaciones en una nueva ventana');
  }
} 