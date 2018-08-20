import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

export interface DialogData {
  Ground:any;
  enter_date_min:any;
  enter_date_max:any;
  Size_min: number;
  Size_max: number;
  animals:any;
  alivator:any;
}

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.css']
})
export class MoreOptionsComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<MoreOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public closeDialog(){
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit() {
    this.form = this.fb.group({
      Ground:[""],
      enter_date_min:[""],
      enter_date_max:[""],
      Size_min: [""],
      Size_max: [""],
      animals:[{value:null,disabled:true}],
      alivator:[{value:null,disabled:true}]
    });

    this.form.patchValue(this.data);
  }
}

