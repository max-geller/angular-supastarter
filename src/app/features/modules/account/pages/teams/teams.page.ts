import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import Angular Material Components
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './teams.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsPage implements OnInit {
  ngOnInit(): void {}
}
