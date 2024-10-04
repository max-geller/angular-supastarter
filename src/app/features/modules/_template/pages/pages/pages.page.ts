import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [MatGridListModule, MatCardModule],
  templateUrl: './pages.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesPage implements OnInit {
  ngOnInit(): void {}
}
