import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../services/local-storage.service';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  highestScore: number;
  gameHistory: [Game];
  wordCount: number;
  score: number;
  accuracy: number;
  gameTime: number;
  highestWordCount: number;
  ratings: number;
  highestTimestamp: string;
  numberOfRestarts: number;
  totalNumberOfWordsAtHighest: number;
  gameTimeAtHighest: number;
  createdAt: any;
  timestamp: string;
}
export interface Game {
  wordCount: number;
  score: number;
  wordsPerMinute: number;
  accuracy: number;
  gameTime: number;
  timestamp: Date;
  totalNumberOfWords: number;
  isHighestScore: boolean;
}

@Component({
  selector: 'app-profile-page',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  faUser = faUser;
  usersRanked: [User] | undefined;
  faCrown = faCrown;
  username: string = '';

  avatar_base64: string | null = null;
  timeSpentGaming: string = '';
  JoinedAt: string | null = '';

  userInfo: any = {};
  gameHistory: [Game] | undefined;

  constructor(
    private localStorage: LocalStorageService,
    private database: DatabaseService,
    private datePipe: DatePipe,
    private router:Router
  ) {
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails: User = JSON.parse(userDetailsString);
      this.userInfo = userDetails;
      this.gameHistory = userDetails.gameHistory;
      const createdAt = new Date(userDetails.createdAt);
      this.JoinedAt = this.datePipe.transform(createdAt, 'MMMM d,y');

      const totalSecondsSpentGaming = userDetails.gameHistory.reduce(
        (acc: number, current: any) => {
          return (acc = current.gameTime + acc);
        },
        0
      );
      let time = {
        hours: Math.floor(totalSecondsSpentGaming / 3600),
        minutes: Math.floor((totalSecondsSpentGaming % 3600) / 60),
        seconds: (totalSecondsSpentGaming % 3600) % 60,
      };
      this.timeSpentGaming = `${time.hours
        .toString()
        .padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
    } else {
      console.error('User details not found in localStorage.');
    }
  }

  handleAvatarUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File | null = (target.files && target.files[0]) || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof reader.result === 'string') {
          this.avatar_base64 = reader.result.split(',')[1];
          this.database
            .updateAvatar({ avatar: this.avatar_base64 })
            .subscribe((data: any) => {
              this.localStorage.setItem('userDetails', JSON.stringify(data));
              this.router.navigate(['profile'])
            });
        }
      };
      reader.readAsDataURL(file);
    }
  }
  getRoundedValue(number: number) {
    return Number(number.toPrecision(4));
  }

  checkHighestGame(score:number){
    return this.userInfo.gameHistory.some(
      (game:Game) => {
        return score<game.score ;
      }
    );
  }
  formattTimestamp(timestamp: Date, date?: string) {
    const createdAt = new Date(timestamp);
    if (date) {
      return this.datePipe.transform(createdAt, 'MMMM d,y');
    }
    else{
      return this.datePipe.transform(createdAt, 'hh:mm a');
    }
  }
}
