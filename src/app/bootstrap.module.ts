import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NgbTooltipModule
      } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
      NgbTooltipModule
    ],
    exports: [
      NgbTooltipModule
    ]
  })


export class BootstrapModule {}
