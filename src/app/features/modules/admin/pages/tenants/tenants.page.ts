import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Components
import { TenantsTableComponent } from './components/tenants.table/tenants.table';

@Component({
  standalone: true,
  imports: [TenantsTableComponent],
  templateUrl: './tenants.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsPage implements OnInit {

  ngOnInit(): void { }

}
