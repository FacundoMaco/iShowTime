import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, UserProfile } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit, OnDestroy {
  isSlidebarOpen = false;
  userProfile: UserProfile | null = null;
  isLoading = false;
  private authSubscription: Subscription | null = null;
  private profileSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loadUserProfile();
      } else {
        this.userProfile = null;
      }
    });

    this.profileSubscription = this.authService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }

  toggleSlidebar(): void {
    this.isSlidebarOpen = !this.isSlidebarOpen;
    
    if (this.isSlidebarOpen) {
      document.body.classList.add('slidebar-open');
    } else {
      document.body.classList.remove('slidebar-open');
    }
  }

  closeSlidebar(): void {
    this.isSlidebarOpen = false;
    document.body.classList.remove('slidebar-open');
  }

  private loadUserProfile(): void {
    this.isLoading = true;
    // El perfil se carga automáticamente desde el AuthService
  }

  onEditProfile(): void {
    // Lógica para editar perfil
    console.log('Editar perfil');
  }

  onLogout(): void {
    this.closeSlidebar();
    this.authService.logout();
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeSlidebar();
    }
  }
} 