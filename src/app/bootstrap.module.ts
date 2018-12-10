import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbTooltipModule,
  NgbAlertModule
      } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      NgbTooltipModule,
      NgbAlertModule
    ],
    exports: [
      NgbTooltipModule,
      NgbAlertModule
    ]
  })


export class BootstrapModule {}
