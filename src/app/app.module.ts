import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LoginComponent } from './Auth/Components/login/login.component';
import { NavBarComponent } from './shared/Components/nav-bar/nav-bar.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { RegisterComponent } from './Auth/Components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { BookComponent } from './Book/Components/Book/Book.component';
import { BookListComponent } from './Book/Components/BookList/BookList.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { AddButtonComponent } from './Book/Components/add-button/add-button.component';
import { DialogModule } from 'primeng/dialog';
import { NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { tokenInterceptor } from './Auth/Interceptors/token.interceptor';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProfileComponent } from './Client/Components/profile/profile.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    BookComponent,
    BookListComponent,
    AddButtonComponent,
    ProfileComponent,
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
    TabMenuModule,
    ButtonGroupModule,
    DialogModule,
    NgOptimizedImage,
    InputTextModule,
    InputNumberModule,
    ChipsModule,
    DropdownModule,
    ConfirmPopupModule,
    IconFieldModule,
    InputIconModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
  ],
  providers: [
    provideHttpClient(
    withInterceptors([tokenInterceptor]),
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
