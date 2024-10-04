import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import RxJS Operators
import { Observable, combineLatest, map } from 'rxjs';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

// Import Services

@Component({
  standalone: true,
  selector: 'settings-page',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatCardModule],
  templateUrl: './settings.page.html',
})
export class SettingsPage {}
