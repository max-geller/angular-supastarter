import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './docs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPage implements OnInit {

  ngOnInit(): void { }

}
