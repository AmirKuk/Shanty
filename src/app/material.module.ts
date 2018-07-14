import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
         MatProgressSpinnerModule, MatCardModule ,MatSliderModule,
         MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
         MatSidenavModule, MatOptionModule, MatSelectModule,
         MatDatepickerModule, MatNativeDateModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatInputModule,
              MatProgressSpinnerModule, MatCardModule, MatSliderModule,
              MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
              MatSidenavModule, MatOptionModule, MatSelectModule,
              MatDatepickerModule, MatNativeDateModule],
    exports: [MatButtonModule, MatToolbarModule, MatInputModule,
              MatProgressSpinnerModule, MatCardModule, MatSliderModule,
              MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
              MatSidenavModule, MatOptionModule, MatSelectModule,
              MatDatepickerModule, MatNativeDateModule]
  })


export class MaterialModule {}
