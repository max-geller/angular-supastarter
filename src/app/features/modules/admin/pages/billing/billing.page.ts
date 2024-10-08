import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './billing.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillingPage implements OnInit {

  ngOnInit(): void { }

}
