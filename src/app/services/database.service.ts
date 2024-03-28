import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}
  registerUser(data: any): Observable<object> {
    return this.http.post(`${environment.databaseUrl}/register`, data);
  }
  loginUser(data: any): Observable<object> {
    return this.http.post(`${environment.databaseUrl}/login`, data);
  }
  updateGameHistory(data: any): any {
   
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails = JSON.parse(userDetailsString);
      return this.http.post(
        `${environment.databaseUrl}/updateGameHistory`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      ); // Access userDetails object
    } else {
      console.error('User details not found in localStorage.');
    }
  }
  getLeaderBoard():any{
    const userDetailsString = this.localStorage.getItem('userDetails');
    if (userDetailsString !== null) {
      const userDetails = JSON.parse(userDetailsString);
      return this.http.get(
        `${environment.databaseUrl}/getLeaderBoard`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userDetails.token}`,
          },
        }
      ); // Access userDetails object
    } else {
      console.error('Could not get LeaderBoard');
    }
  }
}
