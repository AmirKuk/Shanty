import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DataServService } from '../data-serv/data-serv.service';

const translate = {
  'רחובות' :'street'     ,
  "כניסה":'enter_date' ,
  "קומה":'floor'      ,
  "מייל":'email'      ,
  "טלפון":'phone'      ,
  "גודל":'size'       ,
  "מחיר":'price'      ,
  "חדרים":'rooms',
  "זמין" : "active",
  "בעלי חיים":"animals",
  "מעלית":"alivator",
  "ערוך":"edit"
}


@Component({
  selector: 'app-search-apartment',
  templateUrl: './search-apartment.component.html',
  styleUrls: ['./search-apartment.component.css']
})
export class SearchApartmentComponent implements OnInit {

  objectKeys = Object.keys;
  disabled : boolean = true;
  contactForm : FormGroup;
  toppings = new FormControl();
  toppings2 = new FormControl();
  translate:any = translate;

  streets: any;

  table_data: any = ELEMENT_DATA;

  aprt_types: string[] = [
"קרקע","קומות","גמיש"
  ];

  constructor(private fb: FormBuilder, private dtserv: DataServService) {
    this.contactForm = fb.group({
      firstName: '',
      lastName: '',
      email: ''
    });
  }

  displayedColumns: string[] = ['עיר','רחוב','שכונה','חדרים','מחיר','גודל','מעלית','בעלי חיים','כניסה'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  getApartments(params){
    this.dtserv.getApartments(params).subscribe(
      data => {
        this.table_data = data;
      }
    );
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getApartments({});
    this.dtserv.getStreets().subscribe(
      data => {
        this.streets = data;
      }
    );
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: any[] = [
  {
    '_id': "23213bdsewbssdfdbfdsfbfdsb",
    'street': "AA",
    'enter_date': "22/22/22",
    'floor': "קרקע",
    'phone': "0545054040",
    'size': 50,
    'price': 1000,
    'rooms': 5
  }
];
