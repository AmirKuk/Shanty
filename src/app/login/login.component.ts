import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser, AuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { DataServService } from '../data-serv/data-serv.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  url:any;
  re:any;

  constructor(private authService: AuthService , private dtserv: DataServService, public router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(res =>
      this.url = res.url

    );

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.re = params.returnUrl || 'find_me_apartment';

      });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user != null){
        localStorage.setItem("token", this.user.authToken);
        localStorage.setItem("id", this.user.id);
        if(this.user.email){
          localStorage.setItem("email", this.user.email);
        }
        else {
          localStorage.setItem("email", "");
        }

        this.dtserv.postUser(user).subscribe(
          data => {
              if(this.url){
                debugger;
                this.dtserv.postTrial({id:this.user.id, url:this.url} ).subscribe(
                  data => {
                    debugger;
                    console.log(data);
                    this.router.navigate([this.re]);
                    return true;
                    },
                  error =>{
                    console.log(error);
                    debugger;
                    return false;
                  });
              }
              else {
                debugger;
                this.router.navigate([this.re]);
                return true;
              }

          },
          error => {
            console.error("Error saving!");
            console.log(error);
            return false;
          }
        );
      }
    });
  }
}
