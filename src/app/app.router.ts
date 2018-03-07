import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { AdminComponent } from './../views/admin/admin.component';
import { CompanyListComponent } from './../components/admin/company-list/company-list.component';
import { UsersOverviewComponent } from './../components/admin/users-overview/users-overview.component';
import { BooksOverviewComponent } from './../components/admin/books-overview/books-overview.component';
import { ExportComponent } from './../components/admin/export/export.component';

import { AuthGuard } from './core/auth.guard';

export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'library', component: LibraryComponent },
    { path: 'store', component: StoreComponent },
    { path: 'admin', component: AdminComponent, children: [
        { path: '', component: CompanyListComponent, outlet: 'admin' },
        { path: 'books', component: BooksOverviewComponent, outlet: 'admin' },
        { path: 'companies', component: CompanyListComponent, outlet: 'admin' },
        { path: 'users', component: UsersOverviewComponent, outlet: 'admin' },
        { path: 'export', component: ExportComponent, outlet: 'admin' }
    ]}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
