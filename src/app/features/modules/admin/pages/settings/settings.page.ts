import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './settings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPage implements OnInit {

  ngOnInit(): void { }

}
