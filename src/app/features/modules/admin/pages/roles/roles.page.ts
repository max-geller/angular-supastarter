import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Components
import { RolesTableComponent } from './tables/roles-table/roles-table';
@Component({
  standalone: true,
  imports: [RolesTableComponent],
  templateUrl: './roles.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesPage implements OnInit {
  ngOnInit(): void {}
}
