import { Component, OnInit } from '@angular/core';
import { DataServService } from '../data-serv/data-serv.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  data: any;
  show_count: number;

  constructor(private dtserv: DataServService) { }

  getSearches() {
    this.dtserv.getSearches(localStorage.getItem("id")).subscribe(
      data => {
        this.data = data;
        this.show_count = this.data.length;
        for (var i in this.data){
          if(data[i].is_deleted){
            this.show_count--;
          }
        }
      });}

  countChangedHandler(count: boolean) {
    if(count){
      this.show_count--;
    }
  }

  ngOnInit() {

    this.getSearches();

  }

}
