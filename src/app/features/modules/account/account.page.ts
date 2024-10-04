import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './account.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPage implements OnInit {
  ngOnInit(): void {}
}
