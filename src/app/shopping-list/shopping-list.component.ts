import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscriber = this.shoppingListService.ingredientChanged.subscribe((ingredient: Ingredients[]) => {
      this.ingredients = ingredient;
    })
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
