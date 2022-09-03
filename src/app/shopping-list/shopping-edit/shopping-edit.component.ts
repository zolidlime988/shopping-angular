import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @Output() newIngredient = new EventEmitter<Ingredients>();

  @ViewChild('nameInput' , {static: false}) nameInputRef: ElementRef;
  @ViewChild('amountInput' , {static: false}) amountInputRef: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(name: HTMLInputElement, amount: HTMLInputElement) {

    this.newIngredient.emit({name: name.value, amount : Number(amount.value)});
  }

  addItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredients(ingName, ingAmount);
    this.newIngredient.emit(newIngredient);
  }
}
