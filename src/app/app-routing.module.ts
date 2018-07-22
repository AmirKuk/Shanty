import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindMeApartmentComponent } from './find-me-apartment/find-me-apartment.component';
import { AboutComponent } from './about/about.component';
import { SearchApartmentComponent } from './search-apartment/search-apartment.component';
import { ApartmentInfoComponent } from './apartment-info/apartment-info.component'
import { LoginComponent } from './login/login.component';
import { PackagesComponent } from './packages/packages.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'find_me_apartment', component: FindMeApartmentComponent},
  { path: 'about', component: AboutComponent},
  { path: 'search_apartment/:id', component: ApartmentInfoComponent },
  { path: 'search_apartment', component: SearchApartmentComponent},
  { path: 'packages', component: PackagesComponent },
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponents = [FindMeApartmentComponent, AboutComponent,
                                  SearchApartmentComponent, LoginComponent,
                                  ApartmentInfoComponent, PackagesComponent];
