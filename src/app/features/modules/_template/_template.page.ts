import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './_template.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatePage implements OnInit {
  ngOnInit(): void {}
}
