import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { WordOfTheDayServiceService } from './services/word-of-the-day-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook, faCrown, faInfo } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

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
  imports: [RouterOutlet, CommonModule, RouterModule, FontAwesomeModule, ReactiveFormsModule],
  animations: [fadeIn],
  templateUrl: './app.component.html',

  providers: [WordOfTheDayServiceService],
})
export class AppComponent {
  title = 'scrabbi';
  faBook = faBook;
  faInfo = faInfo;
  faCrown = faCrown;

  constructor(router: Router, wod: WordOfTheDayServiceService) {
    if (wod.checkTimestampExpired()) {
      router.navigate(['wod']);
    }
  }
}
