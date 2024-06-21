import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private http = inject(HttpClient);

  constructor() { }

  public login(user: IUserLogin) {
    
  }
}
