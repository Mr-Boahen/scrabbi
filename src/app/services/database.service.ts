import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http:HttpClient,private LocalStorage:LocalStorageService) {
   
   }
   updateGameHistory(data:any):Observable<object>{
      const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM0MmEyMDE3ODlmMWEwNDYwZDY2ZCIsImlhdCI6MTcxMTAzMDk0NiwiZXhwIjoxNzEzNjIyOTQ2fQ.4ibiL3CGpFNiGUR2SBuXUtpOwT1QCwtQktjPjPtPI6s'

    return this.http.post(`${environment.databaseUrl}/updateGameHistory`,data,{headers:{
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    }})
   }
}
