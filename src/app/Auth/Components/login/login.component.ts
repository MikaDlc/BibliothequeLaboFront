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
  loading: boolean = false;

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
    this.loading = true;
    this._AuthServices.login(this.fg.value.email, this.fg.value.password).subscribe({
      next: () => {
        this._AuthServices.emitIsConnected();
        this.loading = false;
      },
      error: () => {
        this.$message.add({ severity: 'error', summary: 'Error', detail: 'Login or password is invalid' });
        this.loading = false;
      }
    });
    this.$router.navigate(['/', 'Books', 'All']);
  }

  Register() {
    this.$router.navigate(['/', 'Auth', 'Register']);
  }

  get f () {
    return this.fg.controls;
  }
}
