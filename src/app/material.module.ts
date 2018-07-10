import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatInputModule,
         MatProgressSpinnerModule, MatCardModule ,MatSliderModule,
         MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
         MatSidenavModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatInputModule,
              MatProgressSpinnerModule, MatCardModule, MatSliderModule,
              MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
              MatSidenavModule, MatOptionModule, MatSelectModule],
    exports: [MatButtonModule, MatToolbarModule, MatInputModule,
              MatProgressSpinnerModule, MatCardModule, MatSliderModule,
              MatSlideToggleModule, MatRadioModule, MatCheckboxModule,
              MatSidenavModule, MatOptionModule, MatSelectModule]
  })


export class MaterialModule {}
