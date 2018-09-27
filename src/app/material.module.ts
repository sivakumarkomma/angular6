import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule, MatSnackBarModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
})
export class CustomMaterialModule {
}
