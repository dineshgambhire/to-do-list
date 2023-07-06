import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  isUserLoggedIn(): any{
    const user = localStorage.getItem("loggedInUser");
    if(user){
      return JSON.parse(user);
    }
    return false;
  }
}
