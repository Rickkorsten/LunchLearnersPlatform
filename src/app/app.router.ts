import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LibraryComponent } from './../components/library/library.component';
import { StoreComponent } from './../components/store/store.component';

export const router: Routes = [
    { path: '', redirectTo: 'library', pathMatch: 'full' },
    { path: 'library', component: LibraryComponent },
    { path: 'store', component: StoreComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

