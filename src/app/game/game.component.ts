import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { wordDatabase } from '../wordDatabase';

import { RouterModule } from '@angular/router';

import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { DatabaseService } from '../services/database.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './game.component.html',
 
  animations: [
    trigger('fadeInAndPop', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate('100ms ease-in', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0, transform: 'scale(0)' })),
      ]),
    ]),
    trigger('shakeOnError', [
      transition('*=>shake', [
        animate(
          '300ms ease-in',
          keyframes([
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.1 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.2 }),
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.3 }),
            style({ transform: 'translate3d(10px, 0, 0)', offset: 0.4 }),
            style({ transform: 'translate3d(-10px, 0, 0)', offset: 0.5 }),
            style({ transform: 'translate3d(0, 0, 0)', offset: 0.6 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class GameComponent implements OnInit {
  faShuffle = faShuffle;
  faRotate = faRotateRight;
  faClock = faClock;

  animationState: string = '';

  //Tile selection variables
  selectedLetterIndex: number[] = [];
  @Input() selectedLetters: string[] = [];
  tileHasBeenClicked: boolean = false;
  //Game variables
  selectedTime: number | undefined;
  randomTiles: string[] = [];
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
  setIntervalID: any = 0;

  constructor(private database: DatabaseService, router:Router,private localStorage:LocalStorageService) {
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails = JSON.parse(userDetailsString);
      this.selectedTime=userDetails.gameHistory[userDetails.gameHistory.length-1].gameTime
      this.countDown=userDetails.gameHistory[userDetails.gameHistory.length-1].gameTime
    } else {
      console.error('User details not found in localStorage.');
    }
    
    
    if(!localStorage.getItem('userDetails')){
      router.navigate(['login'])
    }

  }

  ngOnInit(): void {
    this.generateRandomTiles();

  }

  generateRandomTiles() {
    const scrabbleLetters =
      'AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTUUUUVVWWXYYZ';
    for (let i = 0; i < 7; i++) {
      this.randomTiles.push(
        scrabbleLetters[Math.floor(Math.random() * scrabbleLetters.length)]
      );
    }
  }

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
    this.setIntervalID = 0;
    this.database.updateGameHistory({
      wordCount: this.submittedWords.length,
      score: this.score,
      wordsPerMinute: 0,
      accuracy: 0,
      gameTime:this.selectedTime,
      timestamp:Date.now()
    }).subscribe((data:any)=>console.log(data));
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
    if (
      this.setIntervalID == 0 &&
      (this.countDown == 15 ||
        this.countDown == 30 ||
        this.countDown == 60 ||
        this.countDown == 120)
    ) {
      this.startCountdown();
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

  //KeyBoard Input method

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
          if (
            this.setIntervalID == 0 &&
            (this.countDown == 15 ||
              this.countDown == 30 ||
              this.countDown == 60 ||
              this.countDown == 120)
          ) {
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
  //Mouse Input method
  onTileClick(event: any, index: number) {
    if (this.countDown > 0 && !this.selectedLetterIndex.includes(index)) {
      const key = event.target.innerText;

      if (this.randomTiles.includes(key) && this.letterCount[key] != 0) {
        //Starts the CountDown when a Tile is selected
        if (
          this.setIntervalID == 0 &&
          (this.countDown == 15 ||
            this.countDown == 30 ||
            this.countDown == 60 ||
            this.countDown == 120)
        ) {
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
      } else {
        this.animationState = 'shake';
        setTimeout(() => {
          this.animationState = '';
        }, 300);
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

  restartGame() {
    this.score = 0;
    this.selectedLetterIndex = [];
    this.selectedLetters = [];
    this.randomTiles = [];
    this.generateRandomTiles();
    this.submittedWords = [];
    this.stopCountdown();
    if (this.selectedTime) {
      this.countDown = this.selectedTime;
    }
  }

  setTimer(time: number) {
    if (
      this.setIntervalID == 0 &&
      (this.countDown == 15 ||
        this.countDown == 30 ||
        this.countDown == 60 ||
        this.countDown == 120)
    ) {
      this.countDown = time;
      this.selectedTime = time;
    }
  }
}
