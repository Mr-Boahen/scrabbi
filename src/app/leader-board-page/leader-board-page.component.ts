import { Component } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { CommonModule } from '@angular/common';


export interface User{
  id:number,
  username:string,
  highestScore:number,
  gameHistory:[object],
  wordCount:number,
  score:number,
  accuracy:number,
  gameTime:number,
  ratings:number,
  timestamp:string
}

@Component({
  selector: 'app-leader-board-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leader-board-page.component.html',

})
export class LeaderBoardPageComponent {
  usersRanked:[User] | undefined ;

constructor(private localStorage:LocalStorageService){
  const leaderBoard = this.localStorage.getItem('leaderBoard');
  if (leaderBoard !== null) {
      const leaderBoardDetails = JSON.parse(leaderBoard);
      this.usersRanked=leaderBoardDetails
      console.log(this.usersRanked)

   
 
  } else {
    console.error('User details not found in localStorage.');
  }
}
}
