import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataServService } from '../data-serv/data-serv.service';
import { SocialUser, AuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { GetAlertsComponent } from '../get-alerts/get-alerts.component';
import { MoreOptionsComponent } from '../more-options/more-options.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


const translate = {
  'רחובות' :'Street'     ,
  'רחוב' :'Street'     ,
  'עיר': 'city',
  'שכונה': 'Neighborhood',
  "כניסה":'enter_date' ,
  "קומה":'Floor'      ,
   "מייל":'Email'      ,
   "טלפון":'Phone'      ,
   "גודל":'Size'       ,
   "מחיר":'Price'      ,
   "חדרים":'Room_number',
   "זמין" : "Active",
  "בעלי חיים":"animals",
  "מעלית":"alivator",
  "ערוך":"edit",
  "תאריך":"date",
  "סוג":"Type",
  "חפש":"search",
  "All": "הכל",
  "Rent": "ללא שותפים",
  "Mates": "שותפים",
  "sablet": "סבלט",
  "Package has been expired":"החבילה פגה תוקף קנה חבילה חדשה",
  "Search already exists": "החיפוש כבר קיים",
  "You have reached your search limit":"עברת את כמות החיפושים המותרת בחבילתך",
};

@Component({
  selector: 'app-find-me-apartment',
  templateUrl: './find-me-apartment.component.html',
  styleUrls: ['./find-me-apartment.component.css']
})
export class FindMeApartmentComponent implements OnInit {
  user: SocialUser;
  contactForm: FormGroup;
  userinfoForm: FormGroup;

  translate:any = translate;
  streets: any;
  all_streets: any;
  neighborhoods:any;
  show:string = "הצג";
  more_options: boolean = false;

  aprt_type:string[]=["All","Rent","Mates","sablet"];
  citys:string[] = ['באר שבע'];
  objectKeys = Object.keys;
  get_alerts = true;
  showNoRe:boolean = false;

  temp:any;
  days:number;

  table_data: any = [];

  error: string = "";

  constructor(private router: Router,
              private fb: FormBuilder,
              private dtserv: DataServService,
              private authService: AuthService,
              public dialog: MatDialog,
              private spinner: NgxSpinnerService,
              private _scrollToService: ScrollToService){ }

  more2(): void {
    const dialogRef = this.dialog.open(MoreOptionsComponent, {
      width: '300px',
      data: this.contactForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      this.contactForm.patchValue(result);
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

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openGetAlerts(data): void {
    const dialogRef = this.dialog.open(GetAlertsComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.postAlert(result);
    });
  }

  postAlert(parms){
    let post_s = Object.assign({}, this.contactForm.value, parms);
    //debugger;
    if (parms) {
      for (var i in post_s) {

        if (post_s[i] == "" || post_s[i] == null) {
          post_s[i] = null;
        }

        if (post_s[i] == "false") {
          post_s[i] = false;
        }

        if (post_s[i] == "true") {
          post_s[i] = true;
        }

          if (i == "_id" || i == 'Street') {
            delete post_s[i];
          }
        }
      post_s = Object.assign({}, post_s, {"id":localStorage.getItem("id")});

      this.dtserv.postSeerch(post_s).subscribe(
          data => {
            this.openDialog({message: "עידכוני דירות כבר בדרך אליך", title: "נשמר בהצלחה", type: "sucsess"});
            return true;
          },
          error => {
            console.error("Error saving!");
            console.log(error);
            let m =  "החיפוש שלך לא נשמר";
            if (this.translate[error.error]){
              m = this.translate[error.error]
            }
            this.openDialog({message:m, title: "יש כאן בעיה", type: "error"});
            return false;
          });
    }
  }

  onChange($event) {

    let t = [];
    let o = [];
    if ($event.length == 0){
      t = this.all_streets;
    }
    for (var n in $event) {
      let a = this.objectKeys($event[n]);
      for (var i in a) {
        if (a[i] != '_id') {
          for (var j in $event[n][a[i]]) {
            o.push($event[n][a[i]][j]);
            t.push({'name': $event[n][a[i]][j]});
          }
        }
      }
    }
    this.streets = t;
    this.contactForm.patchValue({"Street":o});
  }

  redirect(item) {
    this.router.navigate(['./search_apartment/'+item["_id"]]);
  }

  getSearches() {
   /* this.dtserv.getSearches(localStorage.getItem("id")).subscribe(
      data => {
        this.data = data;
      }
    );*/
  }

  getAlerts(){
    if (this.validate()) {
      this.openGetAlerts({email: localStorage.getItem("email")});
    }
  }

  getApartments(params){
    let to_send = Object.assign({}, params);
    delete to_send['Street'];
    delete to_send['Active'];
    delete to_send['is_deleted'];

    for (var i in to_send){
      if (to_send[i] === "" || to_send[i] === null || to_send[i] === "null"){
        to_send[i] = null;
      }

      if (to_send[i] == "false") {
        to_send[i] = false;
      }

      if (to_send[i] == "true") {
        to_send[i] = true;
      }

      if (i == "_id" || i == "city"){
        delete to_send[i];
      }
    }
    this.spinner.show();
    this.table_data = [];
    this.showNoRe = false;
    this.dtserv.getApartments(to_send).subscribe(
      data => {
        this.table_data = data;
        this.spinner.hide();
        if(this.table_data.length == 0){
          this.showNoRe = true;
        }

        const config: ScrollToConfigOptions = {
          target: 'res'
        };

        this._scrollToService.scrollTo(config);
        //this.searched = true;
      },
      error => {
        this.spinner.hide();
        this.table_data = [];
      }
    );
  }

  edit(data){
    //this.setStep(0);
    this.contactForm.patchValue(data);
  }

  edit_alert(data,row){
    let post_s = row;

    for (var i in post_s){
      if (post_s[i] == "" ||post_s[i] == null){
        post_s[i] = null;
      }
    }
    post_s['Active'] = data['checked'];
    this.dtserv.putSeerch(post_s).subscribe(
      data => {
        this.openDialog({message:"החיפוש של עודכן",title:"עודכן בהצלחה",type:"sucsess"});
        return true;
      },
      error => {
        console.error("Error saving!");
        console.log(error);
        this.openDialog({message:"החיפוש שלך לא עודכן",title:"יש כאן בעיה",type:"error"});
        return false;
      }
    );
  }

  //search(data){
  search() {
    //this.contactForm.patchValue(data);
    if (this.validate()) {
      this.getApartments(this.contactForm.value);
    }
  }

  validate(){
    if (this.contactForm.value.Room_number_min && this.contactForm.value.Room_number_max){
      if (this.contactForm.value.Room_number_min > this.contactForm.value.Room_number_max){
        this.error ="הכנס מספר חדרים חוקי";
        return false;
      }
    }
    if (this.contactForm.value.Price_min && this.contactForm.value.Price_max){
      if (this.contactForm.value.Price_min > this.contactForm.value.Price_max){
        this.error ="הכנס מחיר חוקי";
        return false;
      }
    }
    if (this.contactForm.value.Size_min && this.contactForm.value.Size_max){
      if (this.contactForm.value.Size_min > this.contactForm.value.Size_max){
        this.error ="הכנס גודל חוקי";
        return false;
      }
    }

    if (this.contactForm.value.enter_date_min && this.contactForm.value.enter_date_max){
      if (this.contactForm.value.enter_date_min > this.contactForm.value.enter_date_max){
        this.error ="הכנס תאריך חוקי";
        return false;
      }
    }

    this.error = "";
    return true;
  }

  ngOnInit() {

    this.dtserv.getPackage(localStorage.getItem("id")).subscribe(
      data => {
        this.temp = data;
        this.days = this.temp.Expire_in;
        //this.days = 0;
      }
    );

    this.spinner.show();
    this.dtserv.getApartments({}).subscribe(
      data => {
        this.table_data = data;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.table_data = [];
      }
    );

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

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.getSearches()
    });

    this.userinfoForm = this.fb.group({
      id:[localStorage.getItem("id")],
      Phone:[""],
      Email:[localStorage.getItem("email")],
      site_alerts:[true],
      Enable_phone: [true],
      Enable_email: [true],
      Active:[true]
    });

    this.contactForm = this.fb.group({
      _id:[""],
      Active:[true],
      is_deleted:[false],
      city:['באר שבע'],
      Neighborhood:[""],
      Street:[""],
      Room_number_min: ["",[Validators.min(0)]],
      Room_number_max: [""],
      Price_min: [""],
      Price_max: [""],
      Type: [""],
      Ground:[""],
      enter_date_min:[""],
      enter_date_max:[""],
      Size_min: [""],
      Size_max: [""],
      animals:[{value:null,disabled:true}],
      alivator:[{value:null,disabled:true}]
    });
  }
}
