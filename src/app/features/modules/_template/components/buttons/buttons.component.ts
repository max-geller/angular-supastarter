import { ChangeDetectionStrategy, Component } from '@angular/core';

// Import Angular Material Components
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// Import Services
import { ToastService } from '../../../../../core/services/toast.service';

@Component({
  selector: 'template-buttons',
  standalone: true,
  imports: [MatButtonModule, MatDivider, MatIconModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateButtonsComponent {
  constructor(private toastService: ToastService) {}
  showSuccessMessage() {
    this.toastService.showToast('Operation successful!', 5000, 'top', 'right');
  }
}
