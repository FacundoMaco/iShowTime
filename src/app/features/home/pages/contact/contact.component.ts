import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ContactInfo {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  color: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;

  contactInfo: ContactInfo[] = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'info@showtime.com',
      link: 'mailto:info@showtime.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Teléfono',
      value: '+51 999 123 456',
      link: 'tel:+51999123456'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Ubicación',
      value: 'Lima, Perú',
      link: 'https://maps.google.com/?q=Lima,Peru'
    },
    {
      icon: 'fas fa-clock',
      title: 'Horario de Atención',
      value: 'Lun - Vie: 9:00 AM - 6:00 PM'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      platform: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: 'https://facebook.com/showtime',
      color: '#1877f2'
    },
    {
      platform: 'Instagram',
      icon: 'fab fa-instagram',
      url: 'https://instagram.com/showtime',
      color: '#e4405f'
    },
    {
      platform: 'Twitter',
      icon: 'fab fa-twitter',
      url: 'https://twitter.com/showtime',
      color: '#1da1f2'
    },
    {
      platform: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://linkedin.com/company/showtime',
      color: '#0077b5'
    }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      university: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;

      // Simular envío del formulario
      setTimeout(() => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.contactForm.reset();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.contactForm.get(fieldName);

    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (control.errors['email']) {
        return 'Ingresa un email válido';
      }
      if (control.errors['minlength']) {
        const requiredLength = control.errors['minlength'].requiredLength;
        return `Mínimo ${requiredLength} caracteres`;
      }
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      email: 'Email',
      subject: 'Asunto',
      message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}
