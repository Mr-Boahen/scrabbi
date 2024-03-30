import { Component } from '@angular/core';
import { ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  animations: [
    trigger('fadeInAndPop', [
      transition(':enter', [
        style({ opacity: 0, }),
        animate('300ms 300ms ease-in', style({ opacity: 1})),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0,  })),
      ]),
    ]), 
    trigger('fadeInAndPopPasswordError', [
      transition(':enter', [
        style({ opacity: 0, }),
        animate('300ms  ease-in', style({ opacity: 1})),
      ]),
      transition(':leave', [
        animate('100ms ease-in', style({ opacity: 0,  })),
      ]),
    ]), 
  ],
})
export class LoginPageComponent {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private db:DatabaseService,private localStorage:LocalStorageService,private router:Router){
    this.loginForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(8)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  get username(){
    return this.loginForm.get('username')
    
  }
onSubmit(){
    if(this.loginForm?.valid){
      this.db.loginUser(this.loginForm.value).subscribe((data)=>{
          this.localStorage.setItem('userDetails',JSON.stringify(data))
          
          this.router.navigate([''])

      },(error)=>{console.error('An error occured:',error)})
    }
}
}
