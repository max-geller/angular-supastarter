import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './tenants.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TenantsPage implements OnInit {

  ngOnInit(): void { }

}
