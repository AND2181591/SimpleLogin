import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../shared/models/User';
import { LoginRegisterService } from '../services/login-register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public user!: User;
  public isMenuOpen = false;

  private loginRegisterService = inject(LoginRegisterService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loginRegisterService.userObservable.subscribe(newUser => this.user = newUser);
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  public onSignOut(): void {
    this.loginRegisterService.logout();
    this.router.navigateByUrl('/login');
  }
}
