import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LibraryComponent } from './../views/library/library.component';
import { StoreComponent } from './../views/store/store.component';
import { AdminComponent } from './../views/admin/admin.component';

import { AuthGuard } from './core/auth.guard';

export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'library', component: LibraryComponent },
    { path: 'store', component: StoreComponent },
    { path: 'admin', component: AdminComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
