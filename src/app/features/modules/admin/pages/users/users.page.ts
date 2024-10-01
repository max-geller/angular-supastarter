import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Components

@Component({
  standalone: true,
  imports: [],
  templateUrl: './users.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPage implements OnInit {

  ngOnInit(): void { }

}
