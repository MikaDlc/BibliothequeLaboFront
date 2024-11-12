import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LoginComponent } from './Auth/Components/login/login.component';
import { NavBarComponent } from './shared/Components/nav-bar/nav-bar.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from './Auth/Components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { BookComponent } from './Book/Components/Book/Book.component';
import { BookListComponent } from './Book/Components/BookList/BookList.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AddButtonComponent } from './Book/Components/add-button/add-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    BookComponent,
    BookListComponent,
    AddButtonComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FloatLabelModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    TabMenuModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
