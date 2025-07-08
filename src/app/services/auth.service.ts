import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  bio?: string;
  joinDate: string;
  eventsCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _userProfile = new BehaviorSubject<UserProfile | null>(null);
  
  isLoggedIn$ = this._isLoggedIn.asObservable();
  userProfile$ = this._userProfile.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Recuperar el estado de login desde el localStorage al iniciar la app
    if (isPlatformBrowser(this.platformId)) {
      const loggedIn = localStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        this._isLoggedIn.next(true);
        this.loadUserProfile();
      }
    }
  }

  login(): void {
    // Simular un inicio de sesión exitoso
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.next(true);
      localStorage.setItem('isLoggedIn', 'true');
      this.loadUserProfile();
    }
  }

  logout(): void {
    // Simular un cierre de sesión
    if (isPlatformBrowser(this.platformId)) {
      this._isLoggedIn.next(false);
      this._userProfile.next(null);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userProfile');
    }
  }

  private loadUserProfile(): void {
    // Simular fetch de datos del usuario
    const mockUserProfile: UserProfile = {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      avatar: 'assets/img/team/default-avatar-M.png',
      phone: '+51 999 888 777',
      bio: 'Apasionado por los eventos y la tecnología. Me encanta crear experiencias únicas.',
      joinDate: '2024-01-15',
      eventsCount: 12
    };
    
    this._userProfile.next(mockUserProfile);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userProfile', JSON.stringify(mockUserProfile));
    }
  }

  getCurrentUser(): UserProfile | null {
    return this._userProfile.value;
  }

  updateUserProfile(profile: Partial<UserProfile>): void {
    const currentProfile = this._userProfile.value;
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, ...profile };
      this._userProfile.next(updatedProfile);
      
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      }
    }
  }
} 