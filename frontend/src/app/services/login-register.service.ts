import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { LOGIN_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private http = inject(HttpClient);

  constructor() { }

  public login(user: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, user).pipe(
      tap({
        next: (user) => {
          
        }, 
        error: (errorResponse) => {
          alert(errorResponse);
        }
      })
    );
  }
}
