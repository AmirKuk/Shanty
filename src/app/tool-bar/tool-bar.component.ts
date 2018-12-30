import { Component, OnInit } from '@angular/core';
import { AuthService ,SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';
import { DataServService } from '../data-serv/data-serv.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  user: SocialUser;
  isCollapsed: boolean;
  static days:any;
  temp:any;

  constructor(private authService: AuthService, public router: Router, private dtserv: DataServService) {
    this.isCollapsed = true;
    let id = localStorage.getItem("id");

    this.getPackge(id);
  }

  getPackge(id){
    this.dtserv.getPackage(id).subscribe(
      data => {
        this.temp = data;
        ToolBarComponent.days = this.temp.Expire_in;
      },
      error => {
        console.log(error);
        return false;
        //return Observable.throw(error);
      }
    );
  }

  signOut(): void {
    this.authService.signOut().then((user) => {
      localStorage.clear();
      this.router.navigate(['login']);
    });

  }

  get staticDays(){
    return ToolBarComponent.days;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      let id = localStorage.getItem("id");
      if (id == null){
        //this.router.navigate(['login']);
      }
    });

  }

}
