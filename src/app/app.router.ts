import { EmployeeOverviewComponent } from './../views/admin/componenten/employee-overview/employee-overview.component';
import { SettingsComponent } from './../views/settings/settings.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { AdminComponent } from './../views/admin/admin.component';
import { LoginComponent } from './../views/login/login.component';
import { CompanyOverviewComponent } from './../views/admin/componenten/companies-overview/companies-overview.component';
import { UsersOverviewComponent } from './../views/admin/componenten/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../views/admin/componenten/books-overview/books-overview.component';
import { ExportOverviewComponent } from './../views/admin/componenten/export-overview/export-overview.component';
import { ReviewsOverviewComponent } from './../views/admin/componenten/reviews-overview/reviews-overview.component';
import { BookInfoComponent } from './../views/book-info/book-info.component';
import { PresentationComponent } from './../views/presentation/presentation.component';
import { ReviewFormComponent } from './../views/review-form/review-form.component';
import { VideoComponent } from './../views/video/video.component';
import { ReviewBuilderComponent } from './../views/admin/componenten/review-builder/review-builder.component';
import { ContactComponent } from './../views/contact/contact.component';
import { MessageOverviewComponent } from './../views/admin/componenten/message-overview/message-overview.component';

// This file defines all the URL's of the application, this is done with the path: '...'
// The after the path we define the component we want to go to when this URL is called
// The canActivate: [AuthGuard] makes sure people need to be logged in for this URL

export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
    { path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
    { path: 'book-info/:uid', component: BookInfoComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
    { path: 'bookpresentation/:book', component: PresentationComponent, canActivate: [AuthGuard] },
    { path: 'review/:bookcode', component: ReviewFormComponent},
    { path: 'video/:bookcode', component: VideoComponent, canActivate: [AuthGuard] },
    // The admin path also has childeren, these define the paths of the admin router outlet inside of the admin component
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] , children: [
        { path: '', redirectTo: 'books', pathMatch: 'full' },
        { path: 'books', component: BooksOverviewComponent },
        { path: 'companies', component: CompanyOverviewComponent },
        { path: 'users', component: UsersOverviewComponent },
        { path: 'employees', component: EmployeeOverviewComponent },
        { path: 'reviews', component: ReviewsOverviewComponent },
        { path: 'export', component: ExportOverviewComponent },
        { path: 'reviewbuilder', component: ReviewBuilderComponent },
        { path: 'messages', component: MessageOverviewComponent }
    ]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
