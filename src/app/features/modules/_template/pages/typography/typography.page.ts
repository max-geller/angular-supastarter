import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Components
import { TypographyComponent } from '../../components/typography/typography.component';

@Component({
  standalone: true,
  imports: [TypographyComponent],
  templateUrl: './typography.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyPage implements OnInit {
  ngOnInit(): void {}
}
