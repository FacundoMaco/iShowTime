import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserConfigModalComponent } from './user-config-modal.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, UserConfigModalComponent],
  templateUrl: './app.html'
})
export class AppComponent {
  title = 'iShowTime';

  user: any = null;
  showUserMenu = false;
  showConfigModal = false;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  openConfigModal() {
    this.showConfigModal = true;
    this.showUserMenu = false;
  }

  closeConfigModal(updatedUser: any) {
    this.showConfigModal = false;
    if (updatedUser) {
      this.userService.setUser(updatedUser);
    }
  }

  logout() {
    this.userService.clearUser();
    this.showUserMenu = false;
  }
}
