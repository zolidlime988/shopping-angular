import { Component, OnDestroy, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthService, respLogin } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    constructor(
        private authService: AuthService, 
        private router: Router) {}
    isLogin: boolean = false;
    isLoading: boolean = false;
    error: string;
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
    alertComp: ViewContainerRef;
    closeSub: Subscription;

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
                this.error = error.message;
                this.isLoading = false;
                this.showError()
                console.log(this.error);
            }
        )
    }

    onHandle = () => { this.error = null }

    private showError = () => {
        this.alertComp = this.alertHost.containerRef;
        const instances = this.alertComp.createComponent(AlertComponent);
        instances.instance.message = this.error;
        this.closeSub = instances.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            this.alertComp.clear();
        })
    }

    ngOnDestroy = () => {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}