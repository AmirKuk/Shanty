import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataServService } from '../data-serv/data-serv.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-alerts-row',
  templateUrl: './alerts-row.component.html',
  styleUrls: ['./alerts-row.component.css']
})
export class AlertsRowComponent implements OnInit {

  tran:any = {
    "All":    "הכל",
    "Rent":   "ללא שותפים",
    "Mates":  "שותפים",
    "sablet": "סבלט"
  };

  objectKeys = Object.keys;
  contactForm: FormGroup;
  show:string = "הצג";
  aprt_type:string[] = ["All","Rent","Mates","sablet"];
  citys:string[] = ['באר שבע'];
  neighborhoods: any;
  more_options = false;

  @Input()
  data: any;

  @Output() changed: EventEmitter<boolean> =   new EventEmitter();

  constructor(private dtserv: DataServService,private fb: FormBuilder,public dialog: MatDialog) { }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  more(){
    this.more_options = !this.more_options;
    if(this.more_options){
      this.show = "הסתר";
    } else{
      this.show = "הצג";
    }
  }

  delete_alert(){
    this.data.is_deleted = true;
    this.changed.emit(true);
    this.dtserv.putSeerch(this.data).subscribe(
      data => {
        this.openDialog({message: "ההתראה נמחקה", title: "נמחק בהצלחה", type: "sucsess"});
        //alert(data);
      }
    );
  }

  active_alert(){
    this.data.Active = !this.data.Active;
    let m = ""
    if(this.data.Active){
      m = "התראה עבור חיפוש זה הופעלה בהצלחה"
    }
    else{
      m = "התראה עבור חיפוש זה הופסקה בהצלחה"
    }
    this.dtserv.putSeerch(this.data).subscribe(
      data => {
        this.openDialog({message: m, title: "עודכן בהצלחה", type: "sucsess"});
        //alert(data);
      }
    );
  }

  ngOnInit() {

    this.contactForm = this.fb.group({
      _id:[""],
      is_deleted:[""],
      enter_date_min:[""],
      enter_date_max:[""],
      city:['באר שבע'],
      Neighborhood:[],
      Street:[""],
      Ground:[""],
      Price_min: [""],
      Price_max: [""],
      Room_number_min: [""],
      Room_number_max: [""],
      Size_min: [""],
      Size_max: [""],
      Type: [""],
      animals:[{value:null,disabled:true}],
      alivator:[{value:null,disabled:true}]
    });


    switch (this.data.Ground) {
      case true:
        this.data.Ground = "true";
        break;
      case false:
        this.data.Ground = "false";
        break;
      case null:
        this.data.Ground = "";
        break;
      default:
        this.data.Ground = "";
    }

    this.contactForm.patchValue(this.data);

    for (var control in this.contactForm.controls) {
      this.contactForm.controls[control].disable();

    }

    this.contactForm.controls['Neighborhood'].enable();

    this.dtserv.getNeighborhoods().subscribe(
      data => {
        this.neighborhoods = data;
        function sortfunction(a, b){
          if(Object.keys(a)[1] == "אחר"){
            return 1;
          }
          if(Object.keys(b)[1] == "אחר"){
            return -1;
          }
          return (Object.keys(a)[1].localeCompare(Object.keys(b)[1]))
        }
        this.neighborhoods.sort(sortfunction)
      }
    );
  }
}
