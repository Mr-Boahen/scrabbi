import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  faUser = faUser;
  avatar_base64: string | null = null;

  userInfo: any = {};

  constructor(
    private localStorage: LocalStorageService,
    private database: DatabaseService
  ) {
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails = JSON.parse(userDetailsString);
      this.userInfo = userDetails;
    } else {
      console.error('User details not found in localStorage.');
    }
  }

  handleAvatarUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files && target.files[0]) || null;
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.avatar_base64 = reader.result.split(',')[1];
          this.database
            .updateAvatar({ avatar: this.avatar_base64 })
            .subscribe((data: any) => {
              this.localStorage.setItem('userDetails', JSON.stringify(data));
            });
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
