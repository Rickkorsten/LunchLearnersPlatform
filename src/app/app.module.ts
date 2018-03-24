import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { LoginComponent } from './../views/login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropZoneDirective } from './directives/dropZone/drop-zone.directive';
import { VideoDropzoneComponent } from './../components/video-dropzone/video-dropzone.component';

import { CoreModule } from './core/core.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './../views/admin/admin.component';
import { CompanyDialogComponent } from './../views/admin/componenten/dialogs/company-dialog/company-dialog.component';
import { BookDialogComponent } from './../views/admin/componenten/dialogs/book-dialog/book-dialog.component';
import { CompanyListComponent } from './../views/admin/componenten/companies-overview/companies-overview.component';
import { UsersOverviewComponent } from './../views/admin/componenten/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../views/admin/componenten/books-overview/books-overview.component';
import { ExportComponent } from './../views/admin/componenten/export/export.component';
import { MenuContainerComponent } from '../components/menu-container/menu-container.component';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { SettingsComponent } from './../views/settings/settings.component';


const firebaseConfig = {
  apiKey: 'AIzaSyBR3HJduE1qTWlz7D7LiLlVDPda3Vu3wBk',
  authDomain: 'lunchlearners.firebaseapp.com',
  databaseURL: 'https://lunchlearners.firebaseio.com',
  projectId: 'lunchlearners',
  storageBucket: 'lunchlearners.appspot.com',
  messagingSenderId: '89316466478'
};

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    StoreComponent,
    DropZoneDirective,
    VideoDropzoneComponent,
    LoginComponent,
    AdminComponent,
    CompanyDialogComponent,
    BookDialogComponent,
    CompanyListComponent,
    UsersOverviewComponent,
    BooksOverviewComponent,
    ExportComponent,
    MenuContainerComponent,
    MenuItemComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    BookDialogComponent,
    CompanyDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
