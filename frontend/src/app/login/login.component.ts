import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { LoginRegisterService } from '../services/login-register.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  private loginRegisterService = inject(LoginRegisterService);

  login() {
    if (this.loginForm.invalid) return;

    const user: IUserLogin = { 
      email: this.loginForm.get('email')?.value!, 
      password: this.loginForm.get('password')?.value! 
    }

    this.loginRegisterService.login(user);

    //alert('Calling backend to login');
  }
}
