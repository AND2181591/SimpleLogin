import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRegisterService } from '../services/login-register.service';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../shared/validators/confirm-password.validator';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required), 
    lastName: new FormControl('', Validators.required), 
    email: new FormControl('', [Validators.required, Validators.email]), 
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required), 
  }, { validators: confirmPasswordValidator });

  private loginRegisterService = inject(LoginRegisterService);
  private router = inject(Router);

  ngOnInit(): void {
    
  }

  register() {
    if (this.registerForm.invalid) return;
    
    const user: IUserRegister = { 
      firstName: this.registerForm.get('firstName')?.value!, 
      lastName: this.registerForm.get('lastName')?.value!, 
      email: this.registerForm.get('email')?.value!, 
      password: this.registerForm.get('password')?.value! 
    }

    this.loginRegisterService.register(user).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
