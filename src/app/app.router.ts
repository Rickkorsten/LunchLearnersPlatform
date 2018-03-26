import { EmployeeOverviewComponent } from './../views/admin/componenten/employee-overview/employee-overview.component';
import { SettingsComponent } from './../views/settings/settings.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { AdminComponent } from './../views/admin/admin.component';
import { LoginComponent } from './../views/login/login.component';
import { CompanyOverviewComponent } from './../views/admin/componenten/companies-overview/companies-overview.component';
import { UsersOverviewComponent } from './../views/admin/componenten/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../views/admin/componenten/books-overview/books-overview.component';
import { ExportOverviewComponent } from './../views/admin/componenten/export-overview/export-overview.component';
import { ReviewsOverviewComponent } from './../views/admin/componenten/reviews-overview/reviews-overview.component';


export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'library', component: LibraryComponent },
    { path: 'store', component: StoreComponent },
    { path: 'login', component: LoginComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'admin', component: AdminComponent, children: [
        { path: '', component: BooksOverviewComponent, outlet: 'admin' },
        { path: 'books', component: BooksOverviewComponent, outlet: 'admin' },
        { path: 'companies', component: CompanyOverviewComponent, outlet: 'admin' },
        { path: 'users', component: UsersOverviewComponent, outlet: 'admin' },
        { path: 'employees', component: EmployeeOverviewComponent, outlet: 'admin' },
        { path: 'reviews', component: ReviewsOverviewComponent, outlet: 'admin' },
        { path: 'export', component: ExportOverviewComponent, outlet: 'admin' }
    ]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
