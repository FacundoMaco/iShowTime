import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Recuperar el estado de login desde el localStorage al iniciar la app
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = localStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        this._isLoggedIn.next(true);
      }
    }
  }

  login(): void {
    // Simular un inicio de sesión exitoso
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.next(true);
      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  logout(): void {
    // Simular un cierre de sesión
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.next(false);
      localStorage.removeItem('isLoggedIn');
    }
  }
} 