import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faShuffle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'scrabbi';
  faShuffle = faShuffle;
  selectedLetters: string[] = [];

  onClick(event: any) {
   if(this.selectedLetters?.length<7){
    this.selectedLetters?.push(event.target.innerText);
   }
  }
}
