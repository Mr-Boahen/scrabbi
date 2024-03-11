import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WordOfTheDayServiceService } from '../services/word-of-the-day-service.service';

@Component({
  selector: 'app-wod-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wod-dialog.component.html',
  providers: [WordOfTheDayServiceService],
})
export class WodDialogComponent {
  public wordOfTheDay: any;
  showWod:boolean=false;

  constructor(private WordOfTheDayService: WordOfTheDayServiceService) {}

  ngOnInit() {
   
    const timeStamp=this.WordOfTheDayService?.getWordOfTheDay();
    if(timeStamp){
      timeStamp.subscribe((data:object) => {
       
       this.wordOfTheDay = data;
       this.wordOfTheDay={...this.wordOfTheDay,word:(this.wordOfTheDay.word.charAt(0).toUpperCase() +this.wordOfTheDay.word.slice(1))}
      
     })
     this.showWod=true
    }
   
  }
  closeWodModal(){
    this.showWod=false
  }
}
