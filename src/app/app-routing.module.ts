import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Components/login/login.component';
import { RegisterComponent } from './Auth/Components/register/register.component';
import { BookListComponent } from './Book/Components/BookList/BookList.component';
import { noAuthGuard } from './Auth/guard/no-auth.guard';
import { ProfileComponent } from './Client/Components/profile/profile.component';
import {authGuard} from './Auth/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Books/All', pathMatch: 'full' },
  { path: 'Auth/Login', canActivate: [noAuthGuard], component: LoginComponent },
  { path: 'Auth/Register', canActivate: [noAuthGuard], component: RegisterComponent },
  { path: 'Books/All', component: BookListComponent },
  { path: 'Client/Profile', canActivate: [authGuard()],component:  ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
