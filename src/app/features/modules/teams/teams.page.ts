import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './teams.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsPage implements OnInit {

  ngOnInit(): void { }

}
