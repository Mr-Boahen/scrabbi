import { Component, HostListener, Input,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { wordDatabase } from './wordDatabase';
import { HttpClientModule } from '@angular/common/http';

import { WodDialogComponent } from './wod-dialog/wod-dialog.component';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule, HttpClientModule,WodDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'scrabbi';
  faShuffle = faShuffle;
  //Tile selection variables
  selectedLetterIndex: number[] = [];
  @Input() selectedLetters: string[] = [];
  tileHasBeenClicked: boolean = false;
  //Game variables
  

  randomTiles: string[] = ['A', 'B', 'C', 'A', 'E', 'F', 'A'];
  submittedWords: string[] = [];
  //This piece of creates an object with each letter and it's number of occurences in the randomTiles Array
  letterCount: { [key: string]: number } = this.randomTiles.reduce(
    (acc: { [key: string]: number }, current) => {
      acc[current] = (acc[current] || 0) + 1;
      return acc;
    },
    {}
  );

  score: number = 0;

  wordLengthAndScores: { [key: number]: number } = {
    '2': 100,
    '3': 400,
    '4': 1200,
    '5': 2000,
    '6': 3000,
    '7': 4000,
  };
  //countDown Variables
  countDown: number = 30;
  setIntervalID: any;

  startCountdown() {
    this.setIntervalID = setInterval(() => {
      if (this.countDown > 0) {
        this.countDown--;
      } else {
        this.submitWord();
        this.stopCountdown();
      }
    }, 1000);
  }
  stopCountdown() {
    clearInterval(this.setIntervalID);
  }

  shuffleTiles() {
    //Needed to clear the selectedTiles to make the shuffling sensible
    this.selectedLetters = [];
    this.selectedLetterIndex = [];
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
    this.letterCount[this.selectedLetters[index]] += 1;

    this.selectedLetters.splice(index, 1);
    this.selectedLetterIndex.splice(index, 1);
    this.letterCount[
      this.selectedLetters[this.selectedLetters.length - 1]
    ] += 1;
  }

  //This an input method which allows a user to select tiles by clicking on it

  @HostListener('window:keydown', ['$event']) onTilePress(
    event: KeyboardEvent
  ) {
    if (this.countDown > 0) {
      const key = event.key.toUpperCase();
      //This piece of code creates an array that holds the indexes where a tile occures in the randomTiles array

      if (key != 'BACKSPACE') {
        const allIndexOfOccurence = this.randomTiles.reduce(
          (acc: number[], current, index) => {
            current == key && acc.push(index);

            return acc;
          },
          []
        );
        if (this.randomTiles.includes(key) && this.letterCount[key] != 0) {
          //Starts the CountDown when a Tile is selected
          if (this.selectedLetters.length == 0 && this.countDown == 30) {
            this.startCountdown();
          }

          this.selectedLetterIndex.push(
            allIndexOfOccurence[
              allIndexOfOccurence.length - this.letterCount[key]
            ]
          );
          this.selectedLetters.push(key);
          this.letterCount[key] = this.letterCount[key] - 1;
        }
      }

      if (event.key == 'Backspace') {
        this.letterCount[
          this.selectedLetters[this.selectedLetters.length - 1]
        ] += 1;
        this.selectedLetters.pop();
        this.selectedLetterIndex.pop();
      }
      if (event.key == 'Enter') {
        this.submitWord();
      }
    }
  }
  //This an input method which allows a user to select tiles by clicking on it
  onTileClick(event: any, index: number) {
    if (this.countDown > 0) {
      const key = event.target.innerText;

      if (this.randomTiles.includes(key) && this.letterCount[key] != 0) {
        //Starts the CountDown when a Tile is selected
        if (this.selectedLetters.length == 0 && this.countDown == 30) {
          this.startCountdown();
        }

        this.selectedLetterIndex.push(index);
        this.selectedLetters.push(key);
        this.letterCount[key] = this.letterCount[key] - 1;
      }
    }
  }

  submitWord() {
    if (this.selectedLetters.length != 0) {
      //Checking if word is found inside Databse Array and has not been already submitted
      if (
        wordDatabase[this.selectedLetters.join('')] &&
        !this.submittedWords.includes(this.selectedLetters.join(''))
      ) {
        this.submittedWords.push(this.selectedLetters.join(''));
        this.score +=
          this.wordLengthAndScores[this.selectedLetters.join('').length];
      }

      this.selectedLetters = [];
      this.selectedLetterIndex = [];
      //I brought this here so that when you submit a word it resets the letter count to the original value
      this.letterCount = this.randomTiles.reduce(
        (acc: { [key: string]: number }, current) => {
          acc[current] = (acc[current] || 0) + 1;
          return acc;
        },
        {}
      );
    }
  }
}
