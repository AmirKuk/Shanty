import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataServService } from '../data-serv/data-serv.service'
import { SocialUser, AuthService } from "angularx-social-login";

const translate = {
  'רחובות' :'street'     ,
  'רחוב' :'street'     ,
  'עיר': 'city',
  'שכונה': 'neighborhood',
  "כניסה":'enter_date' ,
  "קומה":'Floor'      ,
   "מייל":'Email'      ,
   "טלפון":'Phone'      ,
   "גודל":'Size'       ,
   "מחיר":'Price'      ,
   "חדרים":'Room_number',
   "זמין" : "active",
  "בעלי חיים":"animals",
  "מעלית":"alivator",
  "ערוך":"edit",
  "תאריך":"date",
  "חפש":"search"
};

const ELEMENT_DATA: any[] = [
  {
    '_id': "23213bdsewbssdfdbfdsfbfdsb",
    'street': ["AA","BB"],
    'neighborhood':"נחל עשן",
    'city':"באר שבע",
    'enter_date': "22/22/22",
    'Floor': "קרקע",
    'Email': "amr@mail.com",
    'email_enable': true,
    'phone': "0545054040",
    'sms_enable': true,
    'site_enable': false,
    'size': 50,
    'price': 1000,
    'rooms': 5,
    'active':true,
    'date': new Date().toLocaleDateString()
  },
  {
    '_id': "23213bdsewbssdfdbfdsfbfdsb",
    'street': ["אבוחצירא","ריינס","ריינס","ריינס","ריינס"],
    'neighborhood':"נחל עשן",
    'city':"באר שבע",
    'enter_date': "22/22/22",
    'Floor': "קרקע",
    'Email': "amr@mail.com",
    'email_enable': true,
    'phone': "0545054040",
    'sms_enable': true,
    'site_enable': false,
    'size': 50,
    'price': 1000,
    'rooms': 5,
    'active':true,
    'date': new Date().toLocaleDateString()
  }
];



@Component({
  selector: 'app-find-me-apartment',
  templateUrl: './find-me-apartment.component.html',
  styleUrls: ['./find-me-apartment.component.css']
})
export class FindMeApartmentComponent implements OnInit {
  user: SocialUser;
  contactForm : FormGroup;
  searched: boolean = false;
  checked : boolean = false;
  disabled : boolean = true;
  sub_type: string = "יאללה חפש";
  search_re: any;
  streets: any;

  table_data: any;
  displayedColumnsData: string[] = ['עיר','רחוב','שכונה','חדרים','מחיר','גודל','מעלית','בעלי חיים','כניסה'];
  displayedColumns: string[] = ['זמין', 'עיר', 'שכונה','רחובות','כניסה','גודל','בעלי חיים','מעלית','חדרים','מחיר', 'התראות באתר', 'טלפון', 'מייל',"ערוך" ];
  displayedColumns2: string[] = ['זמין','תאריך','עיר','שכונה','רחובות','ערוך','חפש']
  columnsToDisplay: string[] = this.displayedColumns2.slice();
  columnsToDisplayData: string[] = this.displayedColumnsData.slice();
  //data: any = ELEMENT_DATA;
  data: any;
  translate:any = translate;
  step = 0;


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  //@ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: FormBuilder, private dtserv: DataServService, private authService: AuthService, private changeDetectorRefs: ChangeDetectorRef){ }

  getSearches() {
    this.dtserv.getSearches(this.user.id).subscribe(
      data => {
        this.data = data;
        this.changeDetectorRefs.detectChanges();
      }
    );
  }

  getApartments(params){
    this.dtserv.getApartments(params).subscribe(
      data => {
        debugger
        this.table_data = data;

        this.changeDetectorRefs.detectChanges();
        this.searched = true;
      }
    );
  }

  edit(data){
    this.sub_type = "שמור";
    this.setStep(0);
    this.contactForm.patchValue(data);
    this.changeDetectorRefs.detectChanges();

  }

  search(data){
    this.contactForm.patchValue(data);
    this.changeDetectorRefs.detectChanges();
    this.searched = true;
  }

  submit(){
    if (this.sub_type == "יאללה חפש") {
      this.dtserv.postSeerch(this.contactForm.value).subscribe(
        data => {
          // refresh the list
          this.getSearches();

          this.getApartments({});
          return true;
        },
        error => {
          console.error("Error saving!");
          console.log(error);

          this.getApartments({});
          return false;
          //return Observable.throw(error);
        });
    }
    else{
      this.dtserv.putSeerch(this.search_re).subscribe(
        data => {
          // refresh the list
          this.getSearches();

          this.getApartments({});

          return true;
        },
        error => {
          console.error("Error saving!");
          console.log(error);
          //this.searched = true;

          this.getApartments({});
          return false;
          //return Observable.throw(error);
        }
      );
    }
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    this.sub_type = "יאללה חפש"
    this.dtserv.getStreets().subscribe(
      data => {
        this.streets = data;
      }
    );

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.getSearches()
    });

    this.contactForm = this.fb.group({
      _id:[""],
      Phone:[""],
      Email:[""],
      enter_date:[""],
      city:[{value:"באר שבע",disabled:true}],
      neighborhood:[{value:"",disabled:true}],
      street:[""],
      Floor:[""],
      site_alerts:[true],
      Enable_phone: [true],
      Enable_email: [true],
      Price: [""],
      Room_number: [""],
      Size: [""],
      animals:[{value:null,disabled:true}],
      alivator:[{value:null,disabled:true}]
    });
  }
}
