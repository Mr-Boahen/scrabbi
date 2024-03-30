import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule, DatePipe } from '@angular/common';

import { faCrown, faPerson, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  username: string;
  highestScore: number;
  gameHistory: [object];
  wordCount: number;
  score: number;
  accuracy: number;
  gameTime: number;
  highestWordCount: number;
  ratings: number;
  highestTimestamp: string;
  totalNumberOfWordsAtHighest:number,
  gameTimeAtHighest:number,
  timestamp: string;
}

@Component({
  selector: 'app-leader-board-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  providers: [DatePipe],
  templateUrl: './leader-board-page.component.html',
  styleUrl:'./leader-board.component.css'
})
export class LeaderBoardPageComponent {
  usersRanked: [User] | undefined;
  faUser = faUser;
  faCrown = faCrown;
  username: string = '';

  constructor( private database: DatabaseService,
    private router: Router,
    private localStorage: LocalStorageService,
    ) {
    this.database.getLeaderBoard().subscribe((data: any) => {
      this.localStorage.setItem('leaderBoard', JSON.stringify(data));
    });
    const leaderBoard = this.localStorage.getItem('leaderBoard');
    if (leaderBoard !== null) {
      const leaderBoardDetails = JSON.parse(leaderBoard);
      this.usersRanked = leaderBoardDetails;
     
    } else {
      console.error('User details not found in localStorage.');
    }
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails = JSON.parse(userDetailsString);
      this.username = userDetails.username;
    } else {
      console.error('User details not found in localStorage.');
    }
  }

  getRoundedValue(number:number){
    return Number(number.toPrecision(4))
  }
}
