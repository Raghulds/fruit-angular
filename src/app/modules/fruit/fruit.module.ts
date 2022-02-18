import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FruitRoutingModule } from './fruit-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    FruitRoutingModule,
    FormsModule
  ]
})
export class FruitModule { }
