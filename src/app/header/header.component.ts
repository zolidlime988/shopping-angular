import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSave() {
    this.dataService.storedRecipes();
  }

  onFetch() {
    this.dataService.getRecipes().subscribe()
  }
}
