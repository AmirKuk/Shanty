import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatInputModule,
  MatProgressSpinnerModule, MatCardModule ,MatSliderModule,
  MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
  MatSidenavModule, MatOptionModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatExpansionModule, MatIconModule
      } from '@angular/material';

@NgModule({
    imports: [
      MatButtonModule, MatToolbarModule, MatInputModule,
      MatProgressSpinnerModule, MatCardModule, MatSliderModule,
      MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
      MatSidenavModule, MatOptionModule, MatSelectModule,
      MatDatepickerModule, MatNativeDateModule, MatTableModule,
      MatPaginatorModule, MatExpansionModule, MatIconModule
    ],
    exports: [
      MatButtonModule, MatToolbarModule, MatInputModule,
      MatProgressSpinnerModule, MatCardModule, MatSliderModule,
      MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
      MatSidenavModule, MatOptionModule, MatSelectModule,
      MatDatepickerModule, MatNativeDateModule, MatTableModule,
      MatPaginatorModule, MatExpansionModule, MatIconModule
    ]
  })


export class MaterialModule {}
