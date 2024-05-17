import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule, DatePipe } from '@angular/common';

import { faCrown, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface User {
  avatar: string;
  _id: string;
  streak:number;
  username: string;
  highestScore: number;
  gameHistory: [any];
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
  timestamp: string;
}

@Component({
  selector: 'app-leader-board-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './leader-board-page.component.html',
  styleUrl: './leader-board.component.css',
})
export class LeaderBoardPageComponent implements OnInit {
  usersRanked: [User] | undefined;

  showDailyRanked:boolean=false
  dailyUsersRanked: any;
  avatarsRanked: any[] = [];
  faUser = faUser;
  faCrown = faCrown;
  userID: string = '';

  constructor(
    private datePipe: DatePipe,
    private sanitizer: DomSanitizer,
    private database: DatabaseService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    const leaderBoard = this.localStorage.getItem('leaderBoard');

    if (leaderBoard) {
      const leaderBoardDetails = JSON.parse(leaderBoard);
      this.usersRanked = leaderBoardDetails.map((user: any) => {
        user.avatar = user.avatar.replace('width="60"', 'width="20"');
        user.avatar = user.avatar.replace('height="60"', 'height="20"');
        user.avatar = user.avatar.replace(
          'hover:bg-gray-900 p-2 rounded-lg',
          ''
        );
        user.avatar = user.avatar.replace(
          'border-2 active:scale-95 border-gray-800',
          ''
        );
        user.avatar = user.avatar.replace('bg-fuchsia-500/20', '');

        this.avatarsRanked.push(
          this.sanitizer.bypassSecurityTrustHtml(user.avatar)
        );
        return user;
      });
      const userDetailsString = this.localStorage.getItem('userDetails');
      if (userDetailsString !== null) {
        const userDetails = JSON.parse(userDetailsString);
        this.userID = userDetails._id;
      } else {
        console.error('User details not found in localStorage.');
      }
      // filtering highscorers in a day
      this.dailyUsersRanked= this.usersRanked?.filter((user) => {
        return this.datePipe.transform(new Date(Date.now()), 'shortDate')==user.highestTimestamp.split("&")[0];
  
      });
     
    } else {
      this.database.getLeaderBoard()?.subscribe((data: any) => {
        this.localStorage.setItem('leaderBoard', JSON.stringify(data));
        const leaderBoard = this.localStorage.getItem('leaderBoard');
        if (leaderBoard) {
          const leaderBoardDetails = JSON.parse(leaderBoard);

          this.usersRanked = leaderBoardDetails.map((user: any) => {
            user.avatar = user.avatar.replace('width="60"', 'width="40"');
            user.avatar = user.avatar.replace('height="60"', 'height="40"');
            user.avatar = user.avatar.replace(
              'hover:bg-gray-900 p-2 rounded-lg',
              ''
            );
            user.avatar = user.avatar.replace(
              'border-2 active:scale-95 border-gray-800',
              ''
            );
            user.avatar = user.avatar.replace('bg-fuchsia-500/20', '');

            this.avatarsRanked.push(
              this.sanitizer.bypassSecurityTrustHtml(user.avatar)
            );
            return user;
          });
      
        }
        const userDetailsString = this.localStorage.getItem('userDetails');
        if (userDetailsString !== null) {
          const userDetails = JSON.parse(userDetailsString);
          this.userID = userDetails._id;
        } else {
          console.error('User details not found in localStorage.');
        }

        console.log(this.avatarsRanked[0]);
      });
    }
  }

  getRoundedValue(number: number) {
    return Number(number.toPrecision(4));
  }
}
