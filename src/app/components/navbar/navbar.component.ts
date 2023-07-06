import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor( public loginService: LoginService,
    public router: Router){}

  logout(){
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    this.router.navigate(["/login"]);
  }
}
