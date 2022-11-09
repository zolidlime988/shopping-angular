import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataService: DataStorageService,
              private authService: AuthService) { }
  
  subScriber: Subscription;
  isAuth: boolean = false;

  ngOnInit(): void {
    this.subScriber = this.authService.user.subscribe(
      user => { this.isAuth = !!user }
    )
  }

  onSave() {
    this.dataService.storedRecipes();
  }

  onFetch() {
    this.dataService.getRecipes().subscribe()
  }

  ngOnDestroy() {
    this.subScriber.unsubscribe()
  }

  logout() {
    this.authService.logOut();
    localStorage.removeItem('userData');
  }
}
