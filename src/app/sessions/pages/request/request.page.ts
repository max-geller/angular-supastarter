import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './request.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPage implements OnInit {
  ngOnInit(): void {}
}
