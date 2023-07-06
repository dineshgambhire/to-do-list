import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  users!: User[];
  userNameError!: string;
  passwordError!: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    // debugger;
    if (this.loginForm.valid) {
      const usersString = localStorage.getItem("users");
      if (usersString) {
        this.users = JSON.parse(usersString);
      } else {
        this.users = [];
      }
      const currentUsername = this.loginForm.value.userName;
      const currentUser = this.users.find((u) => currentUsername === u.userName);
      if (currentUser) {
        const currentPassword = this.loginForm.value.password;
        if (currentPassword === currentUser.password) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("loggedInUser");
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
          this.router.navigate(["/to-do-list"]);
        } else {
          this.passwordError = "Invalid password";
          return;
        }
      } else {
        this.userNameError = "Invalid username";
        return;
      }
      
    } 
  }
}