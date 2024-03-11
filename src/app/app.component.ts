import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { WordOfTheDayServiceService } from './services/word-of-the-day-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule,HttpClientModule,FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[WordOfTheDayServiceService]
})
export class AppComponent {
  title = 'scrabbi';
  faBook=faBook;

  constructor(private router:Router,private wod:WordOfTheDayServiceService){
    if(wod.checkTimestampExpired()==true){
      router.navigate(['wod'])
    }

  }
}
