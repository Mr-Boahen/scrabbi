import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  showWod:boolean=true;

  constructor(private WordOfTheDayService: WordOfTheDayServiceService,private router:Router) {}

  ngOnInit() {
   
    const timeStamp=this.WordOfTheDayService?.getWordOfTheDay();
    if(timeStamp){
      timeStamp.subscribe((data:object) => {
       
       this.wordOfTheDay = data;
       this.wordOfTheDay={...this.wordOfTheDay,word:(this.wordOfTheDay.word.charAt(0).toUpperCase() +this.wordOfTheDay.word.slice(1))}
      
     })
     
    }
    if(this.WordOfTheDayService.checkTimestampExpired()){
      this.router.navigate(['wod'])
    }
  }
  closeWodModal(){
    this.router.navigate([''])
  }
}
