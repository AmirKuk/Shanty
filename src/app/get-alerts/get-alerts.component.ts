import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  email: string;
}

@Component({
  selector: 'app-get-alerts',
  templateUrl: './get-alerts.component.html',
  styleUrls: ['./get-alerts.component.css']
})
export class GetAlertsComponent implements OnInit {

  form: FormGroup;
  showReq:boolean = false;
  showPhoneReq:boolean =false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<GetAlertsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public closeDialog(){
    this.dialogRef.close();
  }

  /*check_phone(num):boolean{
    "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$"
    return true;
  }*/

  save() {
    //if(this.form.value)
    debugger;
    if((this.form.value.Enable_phone == null ||
        this.form.value.Enable_phone == false) &&
      (this.form.value.Enable_email == null ||
        this.form.value.Enable_email == false)){
      this.showReq = true;
      this.showPhoneReq = false;
    }
    else {
      //if(this.form.value.Enable_phone && !this.check_phone(this.form.value.Phone)){
      if(this.form.value.Enable_phone && this.form.status == "INVALID"){
        this.showReq = false;
        this.showPhoneReq = true;
      }
      else{
        //debugger;
        this.dialogRef.close(this.form.value);
      }
    }

  }

  ngOnInit() {
    this.form = this.fb.group({
      Email:[this.data.email],
      Phone:["",[Validators.minLength(10),Validators.pattern(/^05\d([-]{0,1})\d{7}$/)]],
      site_alerts:[{value:"",disabled:true}],
      Enable_phone:[],
      Enable_email:[]
    });

  }

}
