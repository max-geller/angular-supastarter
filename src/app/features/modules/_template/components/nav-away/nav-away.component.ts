import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavAwayService } from '../../../../../core/services/nav-away.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { ContextMenuService } from './../../../../../core/services/context-menu.service';

@Component({
  selector: 'template-nav-away',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './nav-away.component.html',
  styleUrl: './nav-away.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavAwayComponent {
  form: FormGroup;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private navAwayService: NavAwayService,
    private fb: FormBuilder,
    private contextMenuService: ContextMenuService
  ) {
    this.form = this.fb.group({
      setting1: [''],
      setting2: [''],
    });
  }
  ngOnInit(): void {
    this.formSubscription = this.form.valueChanges.subscribe(() => {
      this.navAwayService.setHasUnsavedChanges(this.form.dirty);
    });
  }

  ngOnDestroy(): void {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  navigateAway(): void {
    this.router.navigate(['/features/template/components']);
  }

  saveForm(): void {
    // Implement your save logic here
    console.log('Form saved:', this.form.value);
    this.form.markAsPristine();
    this.navAwayService.setHasUnsavedChanges(false);
  }
  onContextMenu(event: MouseEvent): void {
    event.preventDefault();
    this.contextMenuService.openMenu({
      x: event.clientX,
      y: event.clientY,
      items: [
        { label: 'Option 1', action: () => console.log('Option 1 clicked') },
        { label: 'Option 2', action: () => console.log('Option 2 clicked') },
      ],
    });
  }
}
