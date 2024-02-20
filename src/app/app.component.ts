import { Component, HostListener, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { KeyObject } from 'crypto';

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
  selectedLetterIndex:number[]=[];
  @Input() selectedLetters: string[] = [];
  tileHasBeenClicked: boolean = false;
  randomTiles: string[] = ['A', 'B', 'C', 'A', 'E', 'F', 'A'];
  submittedWords: string[][] = [];
  letterCount: { [key: string]: number } = this.randomTiles.reduce(
    (acc: { [key: string]: number }, current) => {
      acc[current] = (acc[current] || 0) + 1;
      return acc;
    },
    {}
  );
  
  //countDown Variables
  countDown: number = 30;
  setIntervalID: any;

  startCountdown() {
    this.setIntervalID = setInterval(() => {
      if (this.countDown > 0) {
        this.countDown--;
      } else {
        this.stopCountdown();
      }
    }, 1000);
  }
  stopCountdown() {
    clearInterval(this.setIntervalID);
  }

  shuffleTiles() {
    //Needed to clear the selectedTiles to make the shuffling sensible
    this.selectedLetters=[];
    this.selectedLetterIndex=[];
    //Using the Fisher-Yates Algorithm to shuffle the array
    for (let i = this.randomTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.randomTiles[i], this.randomTiles[j]] = [
        this.randomTiles[j],
        this.randomTiles[i],
      ];
    }
  }

  removeSelectedTiles(index: number) {
    this.selectedLetters.splice(index, 1);
  }

  //This an input method which allows a user to select tiles by clicking on it

  @HostListener('window:keydown', ['$event']) onTilePress(
    event: KeyboardEvent
  ) {
   
    const key = event.key.toUpperCase();
    const tileIndex=this.randomTiles.indexOf(key);
    const allIndexOfOccurence=this.randomTiles.reduce((acc:number[],current,index)=>{
      current==key && acc.push(index);
      
      return acc},[])
 
    if (event.key == 'Backspace') {
      this.selectedLetters.pop();
    }
    if (event.key == 'Enter') {
      this.submitWord()
    }

    if (this.randomTiles.includes(key) && this.letterCount[key] != 0) {
      //Starts the CountDown when a Tile is selected
      if (this.selectedLetters.length == 0 && this.countDown == 30) {
        this.startCountdown();
      }
       
        this.selectedLetterIndex.push(allIndexOfOccurence[allIndexOfOccurence.length-this.letterCount[key]])
        this.selectedLetters.push(key);
        this.letterCount[key] = this.letterCount[key] - 1;
      
    }
  }
  //This an input method which allows a user to select tiles by clicking on it
  onTileClick(event: any,i:number) {
    //Starts the CountDown when a Tile is selected
  
    if (this.selectedLetters.length == 0 && this.countDown == 30) {
      this.startCountdown();
    }

    //Checking if it was the letter that was clicked or the actual Div
    if (!event.target.classList.contains('letter-in-tile')) {
      if (
        this.selectedLetters?.length < 8 &&
        event.target?.classList.contains('border-purple-950')
      ) {
        event.preventDefault();
      } else if (
        this.selectedLetters?.length < 8 &&
        !event.target.classList.contains('border-purple-950')
      ) {
        //THIS ADDS THE SELECTED TILE TO AN ARRAY
    this.selectedLetterIndex.push(i);
        this.selectedLetters?.push(event.target.innerText);
      
        //THIS DEACTIVATES THE TILES WHEN CLICKED
        event.target.classList.remove('border-purple-900');
        event.target.classList.add('border-purple-950');

        event.target.children[0].classList.remove('text-purple-500');
        event.target.children[0].classList.add('text-purple-900');
      }
    } else {
      if (
        this.selectedLetters?.length < 8 &&
        event.target.offsetParent.classList.contains('border-purple-950')
      ) {
        event.preventDefault();
      } else if (
        this.selectedLetters?.length < 8 &&
        !event.target.offsetParent.classList.contains('border-purple-950')
      ) {
        //THIS ADDS THE SELECTED TILE TO AN ARRAY
        this.selectedLetters?.push(event.target.innerText);
        //THIS DEACTIVATES THE TILES WHEN CLICKED
        event.target.offsetParent.classList.remove('border-purple-900');
        event.target.offsetParent.classList.add('border-purple-950');

        event.target.classList.remove('text-purple-500');
        event.target.classList.add('text-purple-900');
      }
    }
  }

  submitWord() {
    if (this.selectedLetters.length != 0) {
      this.submittedWords.push(this.selectedLetters);
      this.selectedLetters = [];
      this.selectedLetterIndex=[];
    }
  }
}
