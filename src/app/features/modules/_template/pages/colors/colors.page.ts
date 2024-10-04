import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ColorsComponent } from '../../components/colors/colors.component';

@Component({
  standalone: true,
  imports: [ColorsComponent],
  templateUrl: './colors.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsPage implements OnInit {
  ngOnInit(): void {}
}
