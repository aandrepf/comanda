import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

import { MatCustomPaginator } from './mat-custom-paginator';


@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  declarations: [],
  exports: [
    NgxSpinnerModule,
    MatTabsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: forwardRef(() => MatCustomPaginator)
    }
  ]
})
export class MaterialModule { }
