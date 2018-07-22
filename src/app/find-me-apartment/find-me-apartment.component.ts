import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataServService } from '../data-serv/data-serv.service'
import { SocialUser, AuthService } from "angularx-social-login";

export interface PeriodicElement {
  עיר: string;
  שכונה: string;
  רחובות: string[];
  זמין: boolean;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {זמין: false, עיר: 'Hydrogen',   שכונה: 'Hydrogen',  רחובות: ['Hydrogen', 'Hydrogen' ], weight: 1.0079, symbol: 'H'},
  {זמין: true , עיר: 'Helium',     שכונה: 'Helium',    רחובות: ['Helium',   'Helium'   ], weight: 4.0026, symbol: 'He'},
  {זמין: false, עיר: 'Lithium',    שכונה: 'Lithium',   רחובות: ['Lithium',  'Lithium'  ], weight: 6.941, symbol: 'Li'},
  {זמין: false, עיר: 'Beryllium',  שכונה: 'Beryllium', רחובות: ['Beryllium','Beryllium'], weight: 9.0122, symbol: 'Be'},
  {זמין: true,  עיר: 'Boron',      שכונה: 'Boron',     רחובות: ['Boron',    'Boron'    ], weight: 10.811, symbol: 'B'},
  {זמין: false, עיר: 'Carbon',     שכונה: 'Carbon',    רחובות: ['Carbon',   'Carbon'   ], weight: 12.0107, symbol: 'C'},
  {זמין: false, עיר: 'Nitrogen',   שכונה: 'Nitrogen',  רחובות: ['Nitrogen', 'Nitrogen' ], weight: 14.0067, symbol: 'N'},
  {זמין: false, עיר: 'Oxygen',     שכונה: 'Oxygen',    רחובות: ['Oxygen',   'Oxygen'   ], weight: 15.9994, symbol: 'O'},
  {זמין: false, עיר: 'Fluorine',   שכונה: 'Fluorine',  רחובות: ['Fluorine', 'Fluorine' ], weight: 18.9984, symbol: 'F'},
  {זמין: false, עיר: 'Neon',       שכונה: 'Neon',      רחובות: ['Neon',     'Neon'     ], weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-find-me-apartment',
  templateUrl: './find-me-apartment.component.html',
  styleUrls: ['./find-me-apartment.component.css']
})
export class FindMeApartmentComponent implements OnInit {
  user: SocialUser;
  contactForm : FormGroup;
  toppings = new FormControl();
  enterDate = new FormControl();
  aprtType = new FormControl();
  sms = new FormControl();
  email = new FormControl();
  site_alerts = new FormControl();
  sms_alerts = new FormControl();
  email_alerts = new FormControl();
  price = new FormControl();
  rooms = new FormControl();
  size = new FormControl();
  panelOpenState: boolean;
  checked : boolean = false;
  disabled : boolean = true;


  search_re: any;
  streets: any;

  aprt_types: string[] = [
    "קרקע","קומות","לא משנה"
  ];

  displayedColumns: string[] = ['זמין', 'עיר', 'שכונה','רחובות','זמן כניסה','בעלי חיים','מעלית','מספר חדרים','מחיר מקסימלי', 'התראות באתר', 'טלפון', 'Email' ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  data: PeriodicElement[] = ELEMENT_DATA;

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

  constructor(private fb: FormBuilder, private dtserv: DataServService, private authService: AuthService){
  }


  submit(){
    this.search_re = {
      'Street' : this.toppings.value,
      'id' : this.user.id,
      'enter_date' : this.enterDate.value,
      'Floor' : this.aprtType.value,
      'email' : this.user.email,
      'email_enable' : this.email_alerts.value,
      'phone' : this.sms.value,
      'sms_enable' : this.sms_alerts.value,
      'size' : this.size.value,
      'site_enable': this.site_alerts.value,
      'price': this.price.value,
      'rooms': this.rooms.value
    };
    this.dtserv.postSeerch(this.search_re);
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    this.dtserv.getStreets().subscribe(
      data => {
        this.streets = data;
      }
    );

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }
}
