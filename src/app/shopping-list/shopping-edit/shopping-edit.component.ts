import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editIndex: number;
  editItem;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index)
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
    )
  }

  addItem(form: NgForm) {
    const val = form.value;
    const newIngredient = new Ingredients(val.name, val.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.editMode = false;
    this.form.reset();
  }

}
