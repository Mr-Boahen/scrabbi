import { Component } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',

})
export class RegisterPageComponent {
  registerationForm:FormGroup;
  constructor(private fb:FormBuilder){
    this.registerationForm=this.fb.group({
      username:['',[Validators.required,Validators.minLength(8)]],
      password:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  get formControls(){
    return this.registerationForm?.controls
  }
onSubmit(event:any){
    if(this.registerationForm?.valid){
      console.log("Form submitted:", this.registerationForm.value)
    }else{
      console.error('Invalid form data.Please check the fields')
    }
}
}
