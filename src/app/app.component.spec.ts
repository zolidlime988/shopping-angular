import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('Recipe Book', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
  });

  it('adds the selected recipe ingredients to the shopping list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();

    expect(app.textContent).toContain('please select a recipe');
    app.querySelector<HTMLElement>('app-recipe-item a')!.click();
    fixture.detectChanges();

    expect(app.querySelector('app-recipe-detail h1')?.textContent).toBe('A test recipe');
    const recipeMenu = app.querySelector<HTMLButtonElement>('app-recipe-detail .dropdown-toggle')!;
    recipeMenu.click();
    fixture.detectChanges();
    expect(recipeMenu.getAttribute('aria-expanded')).toBe('true');

    app.querySelector<HTMLButtonElement>('app-recipe-detail .dropdown-item')!.click();
    fixture.detectChanges();
    expect(recipeMenu.getAttribute('aria-expanded')).toBe('false');

    app.querySelectorAll<HTMLAnchorElement>('app-header a.nav-link')[1].click();
    fixture.detectChanges();
    expect(app.querySelector('app-shopping-list .list-group')?.textContent).toContain('French Fries (20)');
  });

  it('shows a manually added ingredient without leaving the shopping list', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();

    app.querySelectorAll<HTMLAnchorElement>('app-header a.nav-link')[1].click();
    fixture.detectChanges();

    app.querySelector<HTMLInputElement>('#name')!.value = 'Rice';
    app.querySelector<HTMLInputElement>('#amount')!.value = '2';
    app.querySelector<HTMLButtonElement>('button[type="submit"]')!.click();
    fixture.detectChanges();

    expect(app.querySelector('app-shopping-list .list-group')?.textContent).toContain('Rice (2)');
  });
});
