import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {
  
  private $message: MessageService = inject(MessageService);
  private $router = inject(Router);
  private _AuthServices: AuthService = inject(AuthService);
  visible: string = "password";
  fg: FormGroup;
  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      name: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: [this.matchPassword]
    });
  }

  matchPassword(control: AbstractControl): ValidationErrors | null {

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        // Appliquer l'erreur sur le champ spécifique
        confirmPassword.setErrors({ 'passwordMatch': true });

        // Erreur sur le formulaire entier
        return { 'passwordMatch': true };
    }
    return null;
  }
  
  isvisible() {
    if (this.visible == 'password') {
      this.visible = 'text';
    } else {
      this.visible = 'password';
    }
  }

  ValidRegister() {
    const user = {
      name: this.fg.value.name,
      firsName: this.fg.value.firstName,
      email: this.fg.value.email,
      password: this.fg.value.password
    }
    this._AuthServices.register(user).subscribe({
      next: () => {
        this.Login();
      },
      error: (error) => {
        this.$message.add({ severity: 'error', summary: 'Error', detail: 'Register failed' });
      }
    });
  }

  get f () {
    return this.fg.controls;
  }

  Login() {
    this.$router.navigate(['/', 'Auth', 'Login']);
  }
}
