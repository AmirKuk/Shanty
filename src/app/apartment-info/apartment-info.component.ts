import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServService } from '../data-serv/data-serv.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

const translate = {
  "Contact":"איש קשר",
  "Floor":"קומה",
  "Phone":"טלפון",
  "city":"עיר",
  "Price":"מחיר",
  "Room_number":"חדרים",
  "Size":"גודל",
  "Street":"רחוב",
  "enter_date":"תאריך כניסה",
  "Type":"סוג",
  "Neighborhood":"שכונה",
  "Ground":"קרקע",
  "All": "הכל",
  "Rent": "ללא שותפים",
  "Mates": "שותפים",
  "sablet": "סבלט"
};

@Component({
  selector: 'app-apartment-info',
  templateUrl: './apartment-info.component.html',
  styleUrls: ['./apartment-info.component.css']
})
export class ApartmentInfoComponent implements OnInit {
  @Input() aprtData: any;
  @Input() markId: string;
  @Input() test: any;
  @Input() check: any;
  @Output() hi = new EventEmitter<boolean>();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  name: string;
  panelOpenState = true;
  aprtId:any;
  data:any;
  objectKeys = Object.keys;
  translate = translate;
  show_data:boolean = false;
  mouseOvered:boolean = false;
  text:string;

  displayedColumns: string[] = ['name', 'weight', 'symbol', 'position'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private route: ActivatedRoute,
              private dtserv: DataServService) {
    this.route.params.subscribe(res =>
      this.aprtId = res.id);
  }

  show_info(){
    this.hi.emit(this.aprtData._id);
  }
  
  markIt(){
    if(this.aprtId){
      return true;
    }

    if(this.aprtData.mark){
      return true;
    }
    return false;
  }

  initdata(data){
    this.data = data;
    this.galleryImages = [];
    for (let i = 0; i < this.data.photos.length; i++) {
      this.galleryImages.push(
        { // modal
          small: this.data.photos[i],
          medium: this.data.photos[i],
          big: this.data.photos[i]
        });
    }
    this.text = "https://my-shanty.com/search_apartment/" + this.data._id;

  }

  openMassage(){
    window.open(this.data.Messanger_link);
    //window.open( "https://www.facebook.com/messanger/t/130172107903565");
  }

  openWhatsapp(){
    window.open('https://wa.me/?text='+this.text)
  }

  openFacebook(){
    window.open('https://www.facebook.com/sharer/sharer.php?u='+this.text)
  }

  callPhone(){
    window.open("tel:" + this.data['Phone']);
  }



  copyText(){

    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.text;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnInit() {

    this.galleryOptions = [
      {
        width: '100%',
        height: '300px',
        thumbnails: false,
        "imageArrowsAutoHide": true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '200px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        //height: '200px',
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-big.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-big.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg'
      }
    ];
    if (!this.aprtData) {
      this.dtserv.getApartments({"_id": this.aprtId}).subscribe(
        data => {
          this.initdata(data);
          this.aprtData = {mark: true};
        },
      error => {
          console.log(error);
          return false;
        });
    }
    else {
      this.initdata(this.aprtData);
    }

  }


}
