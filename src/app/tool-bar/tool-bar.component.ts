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
  days:number;

  constructor(private authService: AuthService, public router: Router, private dtserv: DataServService) {
    this.isCollapsed = true;
  }

  signOut(): void {
    this.authService.signOut().then((user) => {
      localStorage.clear();
      this.router.navigate(['login']);
    });

  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      let id = localStorage.getItem("id");
      if (id == null){
        //this.router.navigate(['login']);
      }
      this.dtserv.getPackage(id).subscribe(
        data => {
          alert(data)
        }
      );
    });

  }

}
