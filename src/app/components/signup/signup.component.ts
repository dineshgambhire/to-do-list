import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrationForm!: FormGroup;
  users!: User[];
  message!: string;


  constructor(private formBuilder: FormBuilder,
              private router: Router
    ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/), this.startWithLetterValidator]],
      
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z ]+$/)]]
      
    });
  }

  onSubmit() {
    // debugger;
    if (this.registrationForm.valid) {
      // Form is valid
      //check username already exists or not
      const usersString = localStorage.getItem("users");
      if (usersString) {
        this.users = JSON.parse(usersString);
      } else {
        this.users = [];
      }
      const currentUsername = this.registrationForm.value.userName;
      const isUsernamePresent = this.users.find((u) => currentUsername === u.userName);
      if (isUsernamePresent) {
        this.message = "This username is already registered please try with other username";
        return;
      } else {
        this.message = "";
      }
      const user: User = {
        userId: this.generateUniqueId(),
        userName: this.registrationForm.value.userName,
        password: this.registrationForm.value.password,
        name: this.registrationForm.value.name,
        isActive: true
      };
      
      this.users.push(user);
      localStorage.removeItem("users");
      localStorage.setItem("users",JSON.stringify(this.users));
      alert("Registration successful.");
      this.router.navigate(['/login']);
    } else {
      // Form is invalid, show error messages
      this.markAllFieldsAsTouched(this.registrationForm);
    }
  }

  markAllFieldsAsTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)!;
      if (control instanceof FormGroup) {
        this.markAllFieldsAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  
  isFieldInvalid(fieldName: string) {
    const control = this.registrationForm.get(fieldName)!;
    return control.invalid && control.touched;
  }

  startWithLetterValidator(control : AbstractControl) {
    if (control && !/^[A-Za-z]/.test(control.value)) {
      return { startWithLetter: true };
    }
    return null;
  }

  passwordValidator(control: AbstractControl) {
    if (control) {
      const value = control.value;
      const hasLowercase = /[a-z]/.test(value);
      const hasUppercase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
  
      if (value.length < 8 || !hasLowercase || !hasUppercase || !hasNumber) {
        return { passwordRequirements: true };
      }
    }
    return null;
  }

  generateUniqueId(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    //padded with leading zeros using padStart() to ensure it has a fixed length of 6 digits.
    return timestamp + random;
  }

}