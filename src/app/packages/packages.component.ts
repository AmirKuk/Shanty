import { Component, OnInit, ViewChild, Inject  } from '@angular/core';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { DataServService } from '../data-serv/data-serv.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

declare let paypal: any;

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  addScript: boolean = false;
  paypalLoad: boolean = true;
  more_options: boolean[] = [false,false,false];

  finalAmount: number = 80;


  public payPalConfig?: PayPalConfig;

  openDialog(data): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //this.func = openDialog;

  private initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: 'Ae7ZLP-9M_cgyayUVZUaTK5uosNDp0gZNV0q4nTGz3nF2kzUp1zUwY_q7uqAmqznav9qKnQBvnPo1One'
      },
      button: {
        label: 'paypal',
        size: 'medium',
        shape: 'rect',
        color: 'blue',
        tagline: false,

      },
      onPaymentComplete: (data, actions) => {
        data["id"] = localStorage.getItem("id");
        switch (this.finalAmount) {
          case 10:
            data["type"] = "Basic";
            break;
          case 20:
            data["type"] = "Premium";
            break;
          case 30:
            data["type"] = "Expert";
            break;
          default:
            data["type"] = "No value found";
        }
        //data["type"] = this.finalAmount;
        console.log('OnPaymentComplete');
        this.dtserv.postPackage(data).subscribe(
          data => {
            this.openDialog({message:"הנתונים הוזנו בהצלחה",title:"הידד!",type:"sucsess"});

            return true;
          },
          error => {
            console.error("Error saving!");
            this.openDialog({message:"בעיה בשמירה",title:"יש כאן בעיה",type:"error"});
            console.log(error);
            return false;
            //return Observable.throw(error);
          });
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
        this.openDialog({message:"הפעולה בוטלה",title:"יש כאן בעיה",type:"error"});
      },
      onError: (err) => {
        console.log('OnError');
        this.openDialog({message:"יש בעיה paypal נסו שוב בעוד כמה רגעים",title:"יש כאן בעיה",type:"error"});
        //alert("Get erorr try agin in few moments");
      },
      transactions: [{
        amount: {
          currency: 'ILS',
          total: this.finalAmount
        }
      }]
    });
  }

  constructor( private dtserv: DataServService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initConfig();
  }

  showError(error : string) : void {
    this.dialog.open(DialogComponent, {
      data: {message: error} ,width : '250px'
    });
  }

  more(i){
    this.more_options[i] = !this.more_options[i];
  }

}

