import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './login/login.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { AuthGuardService } from "./auth/auth-guard.service";
import { AuthService } from "./auth/auth.service";
//import  { JwtHelperService }  from '@auth0/angular-jwt';

import { HttpClientModule } from '@angular/common/http';



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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
