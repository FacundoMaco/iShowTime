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
  erroresFormulario: string[] = [];

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      telefono: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]],
      tipoConsulta: ['general', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      this.enviando = true;
      this.erroresFormulario = [];
      
      // Simular envío del formulario
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactoForm.value);
        this.mensajeEnviado = true;
        this.enviando = false;
        this.contactoForm.reset({
          tipoConsulta: 'general'
        });
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 5000);
      }, 2000);
    } else {
      this.marcarCamposComoTocados();
      this.obtenerErroresFormulario();
    }
  }

  marcarCamposComoTocados() {
    Object.keys(this.contactoForm.controls).forEach(key => {
      const control = this.contactoForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  obtenerErroresFormulario() {
    this.erroresFormulario = [];
    Object.keys(this.contactoForm.controls).forEach(key => {
      const control = this.contactoForm.get(key);
      if (control?.invalid && control?.touched) {
        const errores = control.errors;
        if (errores) {
          Object.keys(errores).forEach(errorKey => {
            switch (errorKey) {
              case 'required':
                this.erroresFormulario.push(`El campo ${this.getNombreCampo(key)} es requerido`);
                break;
              case 'email':
                this.erroresFormulario.push('Ingresa un email válido');
                break;
              case 'minlength':
                this.erroresFormulario.push(`${this.getNombreCampo(key)} debe tener al menos ${errores[errorKey].requiredLength} caracteres`);
                break;
              case 'maxlength':
                this.erroresFormulario.push(`${this.getNombreCampo(key)} no puede exceder ${errores[errorKey].requiredLength} caracteres`);
                break;
              case 'pattern':
                this.erroresFormulario.push(`${this.getNombreCampo(key)} tiene un formato inválido`);
                break;
            }
          });
        }
      }
    });
  }

  getNombreCampo(key: string): string {
    const nombres: { [key: string]: string } = {
      nombre: 'Nombre',
      email: 'Email',
      asunto: 'Asunto',
      mensaje: 'Mensaje',
      telefono: 'Teléfono',
      tipoConsulta: 'Tipo de consulta'
    };
    return nombres[key] || key;
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
    const email = 'info&#64;showtime.com';
    const asunto = 'Consulta sobre iShowTime';
    const url = `mailto:${email}?subject=${encodeURIComponent(asunto)}`;
    window.open(url);
  }

  limpiarFormulario() {
    this.contactoForm.reset({
      tipoConsulta: 'general'
    });
    this.erroresFormulario = [];
  }
} 