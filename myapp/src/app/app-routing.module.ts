import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
    // { path: '', component: HomeComponent },
    { path: 'home', redirectTo: '' },
    { path: 'login', component: LoginComponent },

    { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
