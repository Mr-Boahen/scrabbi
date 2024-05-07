import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../services/database.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-avatar-select',
  standalone: true,
  imports: [FontAwesomeModule,CommonModule],
  templateUrl: './avatar-select.component.html',
  styleUrl: './avatar-select.component.css',
})
export class AvatarSelectComponent {
  faUser = faUser;
  showAvatars = false;
  selectedAvatar = '';
  @Output() onToggleAvatars: EventEmitter<[string,boolean]> = new EventEmitter();
  constructor(
    private localStorage: LocalStorageService,
    private database: DatabaseService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  selectAvatar(event: any) {

    if (event.target?.localName == 'svg') {
  
      document
        .getElementsByClassName('bg-fuchsia-500/20')[0]
        ?.classList.remove('bg-fuchsia-500/20');
      event.target.classList.add('bg-fuchsia-500/20');
      this.selectedAvatar = event.target.outerHTML;
      
    } else if(event.target?.localName == 'div'){
      document
        .getElementsByClassName('bg-fuchsia-500/20')[0]
        ?.classList.remove('bg-fuchsia-500/20');
    this.selectedAvatar = '';
    }
     else {
      console.log(event)
      document
        .getElementsByClassName('bg-fuchsia-500/20')[0]
        ?.classList.remove('bg-fuchsia-500/20');
      event.target.ownerSVGElement.classList.add('bg-fuchsia-500/20');
      this.selectedAvatar = event.target.ownerSVGElement.outerHTML;
    }
  }
  saveAvatar() {
    this.database
      .updateAvatar({ avatar: this.selectedAvatar })
      .subscribe((data: any) => {
        this.localStorage.setItem('userDetails', JSON.stringify(data));
        this.onToggleAvatars.emit(['refresh',false]);
      });
  }
  // @HostListener('window:click', ['$event']) onClick(
  //   event: MouseEvent
  // ) {
  //   const avatarModal=document.getElementById('avatar-modal')
  //   if(!avatarModal?.contains(event.target as Node)){
  //     this.onToggleAvatars.emit(['',false])
  //   }
  // }
}
