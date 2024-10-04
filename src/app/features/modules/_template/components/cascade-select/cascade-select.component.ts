import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import RxJS Operators
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../../../core/services/supabase/category.service';

@Component({
  selector: 'template-cascade-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './cascade-select.component.html',
  styleUrls: ['./cascade-select.component.scss'],
  providers: [CategoryService], // Provide CategoryService here
})
export class CascadeSelectComponent implements OnInit, OnDestroy {
  categoriesI: any[] = [];
  categoriesII: any[] = [];
  categoriesIII: any[] = [];

  selectedCategoryI: number | null = null;
  selectedCategoryII: number | null = null;
  selectedCategoryIII: number | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategoriesI();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadCategoriesI() {
    const sub = this.categoryService
      .getCategoriesI()
      .pipe(
        catchError((error) => {
          console.error('Error fetching categories I:', error);
          return [];
        })
      )
      .subscribe((data) => {
        this.categoriesI = data;
      });
    this.subscriptions.push(sub);
  }

  onCategoryIChange() {
    console.log('Category I changed:', this.selectedCategoryI);
    if (this.selectedCategoryI) {
      const sub = this.categoryService
        .getCategoriesII(this.selectedCategoryI)
        .pipe(
          catchError((error) => {
            console.error('Error fetching categories II:', error);
            if (error.error && error.error.message) {
              console.error('Supabase error message:', error.error.message);
            }
            return [];
          })
        )
        .subscribe(
          (data) => {
            this.categoriesII = data;
            this.categoriesIII = [];
            this.selectedCategoryII = null;
            this.selectedCategoryIII = null;
          },
          (error) => console.error('Subscription error:', error)
        );
      this.subscriptions.push(sub);
    }
  }

  onCategoryIIChange() {
    console.log('Category II changed:', this.selectedCategoryII);
    if (this.selectedCategoryII) {
      const sub = this.categoryService
        .getCategoriesIII(this.selectedCategoryII)
        .pipe(
          catchError((error) => {
            console.error('Error fetching categories III:', error);
            return [];
          })
        )
        .subscribe((data) => {
          console.log('Categories III loaded:', data);
          this.categoriesIII = data;
          this.selectedCategoryIII = null;
        });
      this.subscriptions.push(sub);
    }
  }

  // Optional: Method to demonstrate fetching items
  fetchItems() {
    console.log('Fetching items for category III:', this.selectedCategoryIII);
    if (this.selectedCategoryIII) {
      const sub = this.categoryService
        .getItemsByCategoryIII(this.selectedCategoryIII)
        .pipe(
          catchError((error) => {
            console.error('Error fetching items:', error);
            return [];
          })
        )
        .subscribe((items) => {
          console.log('Items for selected category III:', items);
          // Here you can handle the fetched items, e.g., emit them to a parent component
        });
      this.subscriptions.push(sub);
    }
  }
}
