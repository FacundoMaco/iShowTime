import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-config-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="closeModal()"></div>
    <div class="modal-content">
      <div class="modal-avatar">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c3e50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"/>
        </svg>
      </div>
      <h2>Configuración de usuario</h2>
      <form (ngSubmit)="save()" #configForm="ngForm">
        <div class="form-group">
          <label for="nombre">Nombre completo</label>
          <input id="nombre" type="text" [(ngModel)]="userData.nombre" name="nombre" required maxlength="40" />
        </div>
        <div class="form-group" *ngIf="userData.tipo === 'organizador'">
          <label for="organizacion">Organización</label>
          <input id="organizacion" type="text" [(ngModel)]="userData.organizacion" name="organizacion" maxlength="40" />
        </div>
        <div class="form-group">
          <label for="bio">Bio <span class="bio-hint">(máx. 80 caracteres)</span></label>
          <textarea id="bio" [(ngModel)]="userData.bio" name="bio" maxlength="80" rows="2" placeholder="Algo breve sobre ti"></textarea>
        </div>
        <div class="modal-actions">
          <button type="button" (click)="closeModal()">Cerrar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0,0,0,0.25); z-index: 1000;
    }
    .modal-content {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: #fff; padding: 2.2rem 1.5rem 1.5rem 1.5rem; border-radius: 18px;
      box-shadow: 0 8px 32px rgba(44,62,80,0.18); z-index: 1001;
      min-width: 320px; max-width: 95vw;
      animation: modalIn 0.25s cubic-bezier(.39,.575,.565,1) both;
      font-family: 'Manrope', sans-serif;
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      box-sizing: border-box;
    }
    @keyframes modalIn {
      0% { opacity: 0; transform: translate(-50%, -40%) scale(0.95); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    .modal-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.2rem;
    }
    .modal-avatar svg {
      background: #f4f7f6;
      border-radius: 50%;
      padding: 0.5rem;
      box-shadow: 0 2px 8px rgba(44,62,80,0.08);
    }
    h2 {
      margin-top: 0; color: #2c3e50; text-align: center;
      font-size: 1.6rem; font-weight: 800; letter-spacing: 0.5px;
      margin-bottom: 0.5rem;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1.1rem;
      width: 100%;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      width: 100%;
    }
    .form-group label {
      color: #2c3e50;
      font-weight: 700;
      font-size: 1.08rem;
      margin-bottom: 0.1rem;
      letter-spacing: 0.01em;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .bio-hint {
      color: #b2b2b2;
      font-size: 0.95em;
      font-weight: 400;
      margin-left: 0.5em;
    }
    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 0.85rem 1.1rem;
      border: 1.5px solid #e0e0e0;
      border-radius: 11px;
      font-size: 1.08rem;
      background: #fff;
      transition: border-color 0.2s, box-shadow 0.2s;
      outline: none;
      font-family: 'Manrope', sans-serif;
      box-shadow: 0 1px 4px rgba(44,62,80,0.04);
      box-sizing: border-box;
    }
    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #2c3e50;
      box-shadow: 0 0 0 2px #b2d8d8;
      background: #f4f7f6;
    }
    .form-group textarea {
      resize: vertical;
      min-height: 38px;
      max-height: 90px;
    }
    .modal-actions {
      display: flex; justify-content: flex-end; gap: 1.2rem; margin-top: 0.7rem;
      align-items: center;
    }
    button {
      background: #2c3e50; color: #fff; border: none; border-radius: 10px;
      padding: 0.9rem 2.1rem; font-weight: 700; font-size: 1.08rem;
      transition: background 0.18s, box-shadow 0.18s;
      font-family: 'Manrope', sans-serif;
      box-shadow: 0 2px 8px rgba(44,62,80,0.08);
    }
    button[type="button"] { background: #b2d8d8; color: #2c3e50; }
    button:hover { background: #1a252f; color: #fff; }
    @media (max-width: 900px) {
      .modal-content {
        min-width: 200px;
        padding: 1rem 0.5rem;
        gap: 0.7rem;
      }
      h2 { font-size: 1.1rem; }
      .form-group label { font-size: 0.98rem; }
      .form-group input,
      .form-group textarea { font-size: 0.98rem; padding: 0.7rem 0.7rem; }
      button { font-size: 0.98rem; padding: 0.7rem 1.2rem; }
    }
  `]
})
export class UserConfigModalComponent {
  @Input() user: any;
  @Output() close = new EventEmitter<any>();

  userData: any = {};

  ngOnInit() {
    this.userData = { ...this.user };
  }

  save() {
    this.close.emit(this.userData);
  }

  closeModal() {
    this.close.emit(null);
  }
} 