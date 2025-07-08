import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Importa tu servicio de usuario aquí cuando esté disponible
// import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  accountForm: FormGroup = new FormGroup({});
  memberSince = new Date(2025, 6, 8); // Simulado, reemplazar por dato real
  userId = 'user_vyh...'; // Simulado, reemplazar por dato real

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      profileName: ['', [Validators.required, Validators.minLength(2)]],
      userType: ['usuario', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(6)]]
    });
    // Aquí deberías cargar los datos reales del usuario y setearlos en el formulario
    // this.loadUserData();
  }

  onSubmit() {
    if (this.accountForm.invalid) return;
    // Aquí iría la lógica para actualizar los datos del usuario
    // this.userService.updateUser(this.accountForm.value).subscribe(...)
    alert('Cambios guardados (simulado)');
  }

  onCancel() {
    // Lógica para cerrar el modal o volver atrás
    window.history.back();
  }

  // loadUserData() {
  //   // Cargar datos reales del usuario y setear en el formulario
  // }
}
export default AccountSettingsComponent; 