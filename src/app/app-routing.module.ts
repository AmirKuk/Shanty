import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindMeApartmentComponent } from './find-me-apartment/find-me-apartment.component';
import { AboutComponent } from './about/about.component';
import { SearchApartmentComponent } from './search-apartment/search-apartment.component';
import { ApartmentInfoComponent } from './apartment-info/apartment-info.component'
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { AlertsComponent } from './alerts/alerts.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'find_me_apartment', component: FindMeApartmentComponent, canActivate:[AuthGuard]},
  { path: 'about', component: AboutComponent, canActivate:[AuthGuard]},
  { path: 'search_apartment/:id', component: ApartmentInfoComponent, canActivate:[AuthGuard] },
  //{ path: 'search_apartment', component: SearchApartmentComponent},
  { path: 'packages', component: PackagesComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'login/:url', component: LoginComponent},
  { path: 'alerts', component: AlertsComponent, canActivate:[AuthGuard]},
  { path: 'wsdfL32432d_giUgyJ9vTQioNhnhDy32adasdasfrevgtbvdfllofkmkdddsafdslmfsdf42342_DSfsfsdsaj32423d24rfdiow4dsfsdfdddddddddddsdfsdf43st6646m6p694j06j468jojerlsjtsjdflisdfhjdslkfnw4ksjdfnldsjfldskjfdslkfnsducndsjlcnsdldjfnsdjlncjudsljcndsjlcnsdjlcnsdjlncsdjlncljsdncljdsncsdofslkdfmdslkfjdslkfdddddddddddddddddsvdscsdfsdfdssddsfdsfdsfsdfewwe',
    redirectTo: '/login/wsdfL32432d_giUgyJ9vTQioNhnhDy32adasdasfrevgtbvdfllofkmkdddsafdslmfsdf42342_DSfsfsdsaj32423d24rfdiow4dsfsdfdddddddddddsdfsdf43st6646m6p694j06j468jojerlsjtsjdflisdfhjdslkfnw4ksjdfnldsjfldskjfdslkfnsducndsjlcnsdldjfnsdjlncjudsljcndsjlcnsdjlcnsdjlncsdjlncljsdncljdsncsdofslkdfmdslkfjdslkfdddddddddddddddddsvdscsdfsdfdssddsfdsfdsfsdfewwe'},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponents = [FindMeApartmentComponent, AboutComponent,
                                  SearchApartmentComponent, LoginComponent,
                                  ApartmentInfoComponent, PackagesComponent,
                                  AlertsComponent];
