import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VkbmaskService } from './../../services/vkbmask.service';
import { VkbMaskDirective } from './vkb-mask.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    VkbMaskDirective
  ],
  declarations: [VkbMaskDirective],
  providers: [VkbmaskService]
})
export class DirectivesModule { }
