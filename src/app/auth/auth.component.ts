import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, respLogin } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private authService: AuthService, private router: Router) {}
    isLogin: boolean = false;
    isLoading: boolean = false;
    error = ''
    

    onSwitch = () => { this.isLogin = !this.isLogin }
    onSubmit = (form: NgForm) => { 
        let authObs: Observable<respLogin>
        if (!form.valid) { return alert("Cheating is not allowed!!") }
        this.isLoading = true;
        if (this.isLogin) {
            authObs = this.authService.signUp(form.value.email, form.value.password)
        } else {
            authObs = this.authService.signIn(form.value.email, form.value.password)
        }
        form.reset();
        authObs.subscribe(
            val => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, error => {
                this.error = error;
                this.isLoading = false;
                console.log(error);
            }
        )
    }

}