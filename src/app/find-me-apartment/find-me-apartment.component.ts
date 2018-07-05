import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-find-me-apartment',
  templateUrl: './find-me-apartment.component.html',
  styleUrls: ['./find-me-apartment.component.css']
})
export class FindMeApartmentComponent implements OnInit {

  answer: string = '';
  answerDisplay: string = '';
  showSpinner: boolean = false;

  constructor() { }

  ngOnInit() {

  }
  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }


}
