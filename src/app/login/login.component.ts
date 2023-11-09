import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signInForm: FormGroup;
  showErrorMessages = false; 

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form submitted');
      this.showErrorMessages = false; 
    } else {
      this.showErrorMessages = true; 
    }
  }
  

  getErrorMessage(controlName: string) {
    const control = this.signInForm.get(controlName);
  
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
  
    if (controlName === 'email' && control?.hasError('email')) {
      return 'Invalid email format';
    }
  
    if (controlName === 'password') {
      if (control!.hasError('required')) {
        return 'Password is required';
      } else if (control!.hasError('minlength')) {
        return 'Password must be at least 6 characters';
      }
    }
  
    return '';
}
}