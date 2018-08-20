import { Injectable } from '@angular/core';
//import { JwtHelperService } from 'angular2-jwt';
//import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AuthService {
  //constructor(public jwtHelper: JwtHelper) {}
  constructor() {}
  //jwtHelper: JwtHelper = new JwtHelper();
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    let id = localStorage.getItem("id");
    if (id == null){
      //this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
