import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Angular Material Components
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './docs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPage implements OnInit {

  ngOnInit(): void { }

}
