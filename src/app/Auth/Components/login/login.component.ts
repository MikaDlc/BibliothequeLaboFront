import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  private $message: MessageService = inject(MessageService);
  
  private _AuthServices: AuthService = inject(AuthService);
  private $router = inject(Router);
  visible: string = "password";
  fg: FormGroup;
  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  isvisible() {
    if (this.visible == 'password') {
      this.visible = 'text';
    } else {
      this.visible = 'password';
    }
  }
  
  ValidLogin() {
    this._AuthServices.login(this.fg.value.email, this.fg.value.password).subscribe({
      error: (error) => {
        this.$message.add({ severity: 'error', summary: 'Error', detail: 'Login or password is invalid' });
      }
    });
  }

  Register() {
    this.$router.navigate(['/', 'auth', 'register']);
  }

  get f () {
    return this.fg.controls;
  }
}
