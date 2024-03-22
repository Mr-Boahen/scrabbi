import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class WordOfTheDayServiceService {
  

  constructor(private http:HttpClient,private LocalStorage:LocalStorageService ) { }

  getWordOfTheDay():Observable<object>{
    
    
   
    this.LocalStorage.setItem("timeStamp",`${new Date().getDay()}`)
    
    
    return this.http.get(`${environment.apiUrl}`)
  }
  checkTimestampExpired(){
    return (this.LocalStorage.getItem("timeStamp") == new Date().getDay().toString())? false:true
  }
}
