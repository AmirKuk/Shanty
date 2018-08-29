import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { GoogleLoginProvider, FacebookLoginProvider, SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxGalleryModule } from 'ngx-gallery';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MaterialModule } from './material.module';
import { BootstrapModule } from './bootstrap.module';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxSpinnerModule } from 'ngx-spinner';

//
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { LoginComponent } from './login/login.component';
import { ApartmentInfoComponent } from './apartment-info/apartment-info.component';
import { PackagesComponent } from './packages/packages.component';
import { DialogComponent } from './dialog/dialog.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AlertsRowComponent } from './alerts-row/alerts-row.component';
import { GetAlertsComponent } from './get-alerts/get-alerts.component';
import { MoreOptionsComponent } from './more-options/more-options.component';

import { AuthGuardService } from "./auth/auth-guard.service";
import { AuthService } from "./auth/auth.service";
import { DataServService } from "./data-serv/data-serv.service"
//

import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he'
registerLocaleData(localeHe);

// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("52343849103-dfk9cvmq3pf2qpkof9hrp6pjie84jot6.apps.googleusercontent.com")
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("2043801035691201")
      }
    ]
);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ToolBarComponent,
    LoginComponent,
    ApartmentInfoComponent,
    PackagesComponent,
    DialogComponent,
    GetAlertsComponent,
    AlertsComponent,
    AlertsRowComponent,
    GetAlertsComponent,
    MoreOptionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SocialLoginModule,
    HttpClientModule,
    NgxPayPalModule,
    NgxGalleryModule,
    NouisliderModule,
    ClipboardModule,
    //ModalGalleryModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxSpinnerModule,
    BootstrapModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { provide: LOCALE_ID,
      useValue: 'he'
    },
    AuthService,
    AuthGuardService,
    DataServService
  ],
  entryComponents: [DialogComponent, GetAlertsComponent, MoreOptionsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
