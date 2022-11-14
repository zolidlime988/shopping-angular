import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredients[];
  subscriber: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscriber = this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredients[]) => {
      this.ingredients = ingredient;
    })
    this.loggingService.printlog('log from shopping list')
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  onEditItem(i: number) {
    this.shoppingListService.startedEditing.next(i)
  }
}
