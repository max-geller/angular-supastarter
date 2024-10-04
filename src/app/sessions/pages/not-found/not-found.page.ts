import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './not-found.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage implements OnInit {
  ngOnInit(): void {}
}
