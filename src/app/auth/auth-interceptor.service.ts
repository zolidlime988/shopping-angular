import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
   constructor(private auth: AuthService){}

   storedKey

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.auth.user.pipe(
        take(1),
        exhaustMap( (user) => {
         if (!user) return next.handle(req)

         let modReq = req.clone({params: new HttpParams().set('auth', user.token)})
         return next.handle(modReq)
        }))
   }
}