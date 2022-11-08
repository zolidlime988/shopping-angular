import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm : FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id']? true: false;
        this.initForm();
      }
    )
  }
  
  private initForm(): void {
    let recipeName: string = '';
    let recipeImg: string = '';
    let recipeDesc: string = '';
    let recipeIng = new FormArray([]);

    let recp = this.recipeService.getRecipe(this.id)
    if (this.editMode) {
      recipeName = recp.name
      recipeImg = recp.imagePath
      recipeDesc = recp.description
      if (recp.ingredients) {
        for (let i of recp.ingredients) {
          recipeIng.push(
            new FormGroup({
              'name': new FormControl(i.name, Validators.required),
              'amount': new FormControl(i.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImg, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients' : recipeIng
    })

  }

  onSubmit() {
    // const newRecp = new Recipe(
    //   this.recipeForm.value["name"],
    //   this.recipeForm.value["description"],
    //   this.recipeForm.value["imagePath"],
    //   this.recipeForm.value["ingredients"])
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
      this.router.navigate(['../'], { relativeTo: this.route })
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
      this.router.navigate(['../'], { relativeTo: this.route })
    }
  }

  get ingredients() {
    return this.recipeForm.controls["ingredients"] as FormArray;
    // return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
    // (<FormArray>this.recipeForm.get('ingredients')).controls.push(
      // new FormGroup({
      //   'name': new FormControl(null, Validators.required),
      //   'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      // })
    // )
    console.log(this.recipeForm);
  }

  onCancel = () => {
    this.initForm()
  }

  onDelete = (index: number) => {
    (this.recipeForm.controls["ingredients"] as FormArray).removeAt(index)
    this.recipeForm.markAllAsTouched();
  }
}
