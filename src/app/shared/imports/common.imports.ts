// Common imports for standalone components
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

// UI Components
import { ButtonComponent } from '../../public/components/ui/button/button.component';
import { InputComponent } from '../../public/components/ui/input/input.component';
import { CardComponent } from '../../public/components/ui/card/card.component';
import { ModalComponent } from '../../public/components/ui/modal/modal.component';

// Common imports that are frequently used together
export const COMMON_IMPORTS = [
  CommonModule,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
] as const;

// Form-related imports
export const FORM_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule
] as const;

// UI component imports
export const UI_IMPORTS = [
  ButtonComponent,
  InputComponent,
  CardComponent,
  ModalComponent
] as const;

// Complete set for complex components
export const FULL_IMPORTS = [
  ...COMMON_IMPORTS,
  ...FORM_IMPORTS,
  ...UI_IMPORTS
] as const;
