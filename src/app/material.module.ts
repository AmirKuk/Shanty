import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatToolbarModule, MatInputModule,
  MatProgressSpinnerModule, MatCardModule ,MatSliderModule,
  MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
  MatSidenavModule, MatOptionModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatTableModule,
  MatPaginatorModule, MatExpansionModule, MatIconModule,
  MatTooltipModule, MatAutocompleteModule
      } from '@angular/material';

@NgModule({
    imports: [
      MatButtonModule, MatToolbarModule, MatInputModule,
      MatProgressSpinnerModule, MatCardModule, MatSliderModule,
      MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
      MatSidenavModule, MatOptionModule, MatSelectModule,
      MatDatepickerModule, MatNativeDateModule, MatTableModule,
      MatPaginatorModule, MatExpansionModule, MatIconModule,
      MatTooltipModule, MatAutocompleteModule
    ],
    exports: [
      MatButtonModule, MatToolbarModule, MatInputModule,
      MatProgressSpinnerModule, MatCardModule, MatSliderModule,
      MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
      MatSidenavModule, MatOptionModule, MatSelectModule,
      MatDatepickerModule, MatNativeDateModule, MatTableModule,
      MatPaginatorModule, MatExpansionModule, MatIconModule,
      MatTooltipModule, MatAutocompleteModule
    ]
  })


export class MaterialModule {}
