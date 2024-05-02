import { Component,ChangeDetectorRef,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WordOfTheDayServiceService } from './services/word-of-the-day-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowRightFromBracket,
  faBook,
  faCrown,
  faInfo,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { LocalStorageService } from './services/local-storage.service';
import { User } from './leader-board-page/leader-board-page.component';
import { DatabaseService } from './services/database.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const fadeTrans = transition(':enter', [
  style({
    opacity: 0,
  }),
  animate('1s ease-in-out', style({ opacity: 1 })),
]);
const fadeIn = trigger('fadeIn', [fadeTrans]);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  animations: [fadeIn],
  templateUrl: './app.component.html',

  providers: [WordOfTheDayServiceService],
})
export class AppComponent {
  title = 'scrabbi';
  faBook = faBook;
  faInfo = faInfo;
  faCrown = faCrown;
  faUser = faUser;
  faLogout = faArrowRightFromBracket;

  userInfo !: User;
  avatar!:SafeHtml

  constructor(
    private cdr:ChangeDetectorRef,
    private router: Router,
    private wod: WordOfTheDayServiceService,
    private localStorage: LocalStorageService,
    private database:DatabaseService,
    private sanitizer:DomSanitizer
  ) {
  
    if (!localStorage.getItem('userDetails')) {
      this.router.navigate(['login']);
    }
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails: User = JSON.parse(userDetailsString);
      this.userInfo = userDetails;

      console.log(this.userInfo.avatar.includes('width="100"'))
      this.userInfo.avatar=this.userInfo.avatar.replace('width="60"','width="40"')
      this.userInfo.avatar=this.userInfo.avatar.replace('height="60"','height="40"')
      this.avatar = this.sanitizer.bypassSecurityTrustHtml(this.userInfo.avatar) ;

    } else {
      this.database.getUserProfile()?.subscribe((data: any) => {
        this.localStorage.setItem('userDetails', JSON.stringify(data));
        const userDetailsString= this.localStorage.getItem('leaderBoard');
        if (userDetailsString) {
          const userDetails = JSON.parse(userDetailsString);
          this.userInfo = userDetails;
        }    })
  }
  
  }
ngOnInit():void{}
 
  logout(){
    this.localStorage.clear();
    window.location.reload()
    this.router.navigate(['login'])
  }
  checkLocalHost() {
    return this.localStorage.getItem('userDetails')?true:false;
  }}
