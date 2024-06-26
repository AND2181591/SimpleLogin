import { Component, OnInit, inject } from '@angular/core';
import { LoginRegisterService } from '../services/login-register.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public user!: User;

  private loginRegisterService = inject(LoginRegisterService);

  constructor() {
    this.loginRegisterService.userObservable.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    setTimeout(() => {
      alert(`Welcome Home ${this.user.displayName}!`);
    }, 500);
  }
}
