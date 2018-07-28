import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataServService } from '../data-serv/data-serv.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  contactForm : FormGroup;

  constructor(private fb: FormBuilder, private dtserv: DataServService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      email: [""],
      name: [""],
      title: [""],
      content: [""]
    });

  }

  submit(){
    this.dtserv.postConnectus(this.contactForm.value).subscribe(
        data => {
          // refresh the list
          alert("נשלח")
          return true;
        },
        error => {
          alert("Error saving!");
          console.log(error);
          return false;
          //return Observable.throw(error);
        });
    }


}
