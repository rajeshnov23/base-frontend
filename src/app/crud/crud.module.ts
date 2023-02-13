import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { TestCrudComponent } from './test-crud/test-crud.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrudComponent, TestCrudComponent],
  imports: [CommonModule, CrudRoutingModule, ReactiveFormsModule],
})
export class CrudModule {}
