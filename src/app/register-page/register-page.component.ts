import { Component } from '@angular/core';
import {ReactiveFormsModule,FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../services/database.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, RouterModule } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule,RouterModule,FontAwesomeModule],
  templateUrl: './register-page.component.html',
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
export class RegisterPageComponent {
  registerationForm:FormGroup;
  errorMessage:object | undefined;

  faEye=faEye
  faEyeSlash=faEyeSlash


  showPassword:boolean=false;
  constructor(private fb:FormBuilder,private db:DatabaseService,private localStorage:LocalStorageService,private router:Router){
    this.registerationForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(8)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  get username(){
    return this.registerationForm.get('username')
  }
onSubmit(event:any){
    if(this.registerationForm?.valid){
      this.db.registerUser(this.registerationForm.value).subscribe((data)=>{
          this.localStorage.setItem('userDetails',JSON.stringify(data))
          this.router.navigate([''])

      },(error)=>{
this.errorMessage=error.error.message
      })
    }
}
}
