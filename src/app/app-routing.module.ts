import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindMeApartmentComponent } from './find-me-apartment/find-me-apartment.component';
import { AboutComponent } from './about/about.component';
import { SearchApartmentComponent } from './search-apartment/search-apartment.component';

const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'find_me_apartment', component: FindMeApartmentComponent},
  { path: 'about', component: AboutComponent},
  { path: 'search_apartment', component: SearchApartmentComponent},
  { path: '**', redirectTo: '/about' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const RoutingComponents = [FindMeApartmentComponent, AboutComponent, SearchApartmentComponent]
