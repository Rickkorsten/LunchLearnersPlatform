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
import { RatingModule } from 'ngx-rating';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropZoneDirective } from './directives/dropZone/drop-zone.directive';
import { VideoDropzoneComponent } from './../components/video-dropzone/video-dropzone.component';

import { CoreModule } from './core/core.module';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './../views/admin/admin.component';
import { CompanyDialogComponent } from './../views/admin/componenten/dialogs/company-dialog/company-dialog.component';
import { BookDialogComponent } from './../views/admin/componenten/dialogs/book-dialog/book-dialog.component';
import { CompanyOverviewComponent } from './../views/admin/componenten/companies-overview/companies-overview.component';
import { UsersOverviewComponent } from './../views/admin/componenten/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../views/admin/componenten/books-overview/books-overview.component';
import { ExportOverviewComponent } from './../views/admin/componenten/export-overview/export-overview.component';
import { MenuContainerComponent } from '../components/menu-container/menu-container.component';
import { MenuItemComponent } from '../components/menu-item/menu-item.component';
import { SettingsComponent } from './../views/settings/settings.component';
import { EmployeeOverviewComponent } from './../views/admin/componenten/employee-overview/employee-overview.component';
import { ReviewsOverviewComponent } from './../views/admin/componenten/reviews-overview/reviews-overview.component';
import { SettingsCardComponent } from './../views/settings/components/settings-card/settings-card.component';
import { BookInfoComponent } from './../views/book-info/book-info.component';

// import { FirebaseCallsService } from './../app/services/firebaseCalls/firebase-calls.service';
import { PresentationComponent } from './../views/presentation/presentation.component';
import { SectionButtonComponent } from './../components/section-button/section-button.component';
import { ButtonComponent } from './../components/button/button.component';
import { DraggableModule } from './directives/draggable/draggable.module';
import { ReviewFormComponent } from './../views/review-form/review-form.component';
import { BookInfoHeaderComponent } from './../components/book-info-header/book-info-header.component';
import { VideoComponent } from './../views/video/video.component';

import { FirebaseCallsService } from './../app/services/firebaseCalls/firebase-calls.service';
import { BooksService } from './../app/services/books/books.service';
import { BookCardComponent } from './../components/book-card/book-card.component';
import { ReviewDialogComponent } from './../views/presentation/dialogs/review-dialog/review-dialog.component';
import { ReviewBuilderComponent } from './../views/admin/componenten/review-builder/review-builder.component';
import { ContactComponent } from './../views/contact/contact.component';

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
    CompanyOverviewComponent,
    UsersOverviewComponent,
    BooksOverviewComponent,
    ExportOverviewComponent,
    MenuContainerComponent,
    MenuItemComponent,
    SettingsComponent,
    EmployeeOverviewComponent,
    ReviewsOverviewComponent,
    SettingsCardComponent,
    BookInfoComponent,
    PresentationComponent,
    SectionButtonComponent,
    ButtonComponent,
    ReviewFormComponent,
    BookInfoHeaderComponent,
    VideoComponent,
    BookCardComponent,
    ReviewDialogComponent,
    ReviewBuilderComponent,
    ContactComponent,
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
    DraggableModule,
    RatingModule,
  ],
  providers: [
    FirebaseCallsService,
    BooksService
  ],
  entryComponents: [
    BookDialogComponent,
    CompanyDialogComponent,
    ReviewDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
