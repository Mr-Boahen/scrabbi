import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WordOfTheDayServiceService } from '../services/word-of-the-day-service.service';

@Component({
  selector: 'app-wod-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wod-dialog.component.html',
  styleUrl: './wod-dialog.component.css',
  providers: [WordOfTheDayServiceService],
})
export class WodDialogComponent {
  public wordOfTheDay: any;
  showWod:boolean=true;
  scrollAmount:number=0;

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
  scrollToDetails(amount:number){
    this.scrollAmount=amount
    document.querySelector('.word-of-the-day-scrollbar')?.scroll({
      top: 0,
      left: amount,
      behavior: "smooth",
    });
  }
  closeWodModal(){
    this.router.navigate([''])
  }
}
