import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "./user.model";

export interface respLogin {
   idToken: string;
   email: string;
   refreshToken: string;
   expiresIn: string;
   localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
   constructor(private http: HttpClient,
               private router: Router) { }

   apiKey: string = environment.API_KEY;
   urlSignUp: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
   urlSignIn: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

   private setTimeOutId;

   user = new BehaviorSubject<User>(null);

   signUp = (email: string, password: string) => {
      return this.http
      .post<respLogin>(this.urlSignUp, {
         email : email,
         password : password,
         returnSecureToken: true
      })
      .pipe(
         catchError(this.handleError),
         tap(this.handleAuth)
      )
      //.subscribe((val) => { console.log(val) });
   }

   signIn = (email: string, password: string) => {
      return this.http
      .post<respLogin>(this.urlSignIn, {
         email: email,
         password: password,
         returnSecureToken: true
      })
      .pipe(
         catchError(this.handleError),
         tap(this.handleAuth)
      )
   }

   logOut = () => {
      this.user.next(null)
      if (this.setTimeOutId) {
         clearTimeout(this.setTimeOutId)
      }
      this.setTimeOutId = null;
      localStorage.removeItem('userData')
      this.router.navigate(['/auth'])
      console.log('logout');
   }

   private handleError = (err: HttpErrorResponse) => {
      let error = 'Unknow Error';

      if (!err.error || !err.error.error) {
         return throwError(() => new Error(error))
      }

      switch(err.error.error.message) {
         case 'EMAIL_EXISTS':
            error = 'Email exist'; break;
         case 'INVALID_PASSWORD':
            error = 'Invalid password'; break;
         case 'EMAIL_NOT_FOUND':
            error = 'Email not found'; break;
     }

     return throwError(() => new Error(error))
   }

   private handleAuth = (res: respLogin) => {
      const expireDate = new Date(new Date().getTime() + +res.expiresIn)
      const user = new User(res.email, res.localId, res.idToken, expireDate)
      
      this.user.next(user)
      this.autoLogout(+res.expiresIn)
      localStorage.setItem('userData', JSON.stringify(user))
   }

   autoLogin = () => {
      const user: {
         email: string, 
         id: string, 
         _token: string, 
         _tokenExpireDate: Date
      } = JSON.parse(localStorage.getItem('userData'))
      if (user) { 
         const loadedUser = new User(
            user.email, 
            user.id, 
            user._token, 
            user._tokenExpireDate)
            if (loadedUser.token) {
               this.user.next(loadedUser)
               const duration = new Date(user._tokenExpireDate).getTime() - new Date().getTime()
               this.autoLogout(duration)
            }
         }
      return;
   }

   autoLogout = (expireTime: number) => {
      console.log(expireTime);
      this.setTimeOutId = setTimeout(() => {
         this.logOut();
      }, expireTime)
   }
}