import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { HttpClient } from '@angular/common/http';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { LOGIN_URL, REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  private http = inject(HttpClient);

  constructor() {
    this.userObservable = this.userSubject.asObservable();
  }

  public login(user: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, user).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        }, 
        error: (errorResponse) => {
          alert(errorResponse);
        }
      })
    );
  }

  public register(user: IUserRegister): Observable<User> {
    return this.http.post<User>(REGISTER_URL, user).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        }, 
        error: (errorResponse) => {
          alert(errorResponse);
        }
      })
    )
  }

  public logout(): void {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
  }

  public setUserToLocalStorage(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : new User();
  }
}
