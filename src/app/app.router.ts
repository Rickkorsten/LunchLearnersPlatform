import { SettingsComponent } from './../views/settings/settings.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { AdminComponent } from './../views/admin/admin.component';
import { LoginComponent } from './../views/login/login.component';
import { CompanyListComponent } from './../views/admin/componenten/companies-overview/companies-overview.component';
import { UsersOverviewComponent } from './../views/admin/componenten/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../views/admin/componenten/books-overview/books-overview.component';
import { ExportComponent } from './../views/admin/componenten/export/export.component';

export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'library', component: LibraryComponent },
    { path: 'store', component: StoreComponent },
    { path: 'login', component: LoginComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'admin', component: AdminComponent, children: [
        { path: '', component: CompanyListComponent, outlet: 'admin' },
        { path: 'books', component: BooksOverviewComponent, outlet: 'admin' },
        { path: 'companies', component: CompanyListComponent, outlet: 'admin' },
        { path: 'users', component: UsersOverviewComponent, outlet: 'admin' },
        { path: 'export', component: ExportComponent, outlet: 'admin' }
    ]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
