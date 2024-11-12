import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/Components/login/login.component';
import { RegisterComponent } from './Auth/Components/register/register.component';
import { BookListComponent } from './Book/Components/BookList/BookList.component';

const routes: Routes = [
  { path: '', redirectTo: 'Books/All', pathMatch: 'full' },
  { path: 'Auth/Login', component: LoginComponent },
  { path: 'Auth/Register', component: RegisterComponent },
  { path: 'Books/All', component: BookListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
