import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';
import { HttpClientModule } from '@angular/common/http';
import {AlertComponent} from './directives/alert.component';
import {AuthenticationService} from './services/authentication.service';
import {FileService} from './services/file.service';
import {FileListService} from './services/file.list.service';
import {AlertService} from './services/alert.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {Notifier} from './notifier/notifier';
import {NotifierComponent} from './notifier/notifier.component';
import {EventService} from './services/event.service';
import {NotificationService} from './services/notification.service';
import {FileManageService} from './services/file.manage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    AlertComponent,
    NotifierComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    NotifierComponent
  ],
  providers: [
    Notifier,
    AuthenticationService,
    FileService,
    FileListService,
    EventService,
    NotificationService,
    FileManageService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
