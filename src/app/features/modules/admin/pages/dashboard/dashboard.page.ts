import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Import Services
import { UserService } from '../../../../../core/services/user.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './dashboard.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.logCurrentUser();
  }

  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  openStaging(): void {
    window.open('https://angular-18-staging.netlify.app/', '_blank');
  }

  openProduction(): void {
    window.open('https://angular-18.netlify.app/', '_blank');
  }

  openRepository(): void {
    window.open('https://github.com/max-geller/angular-18-starter', '_blank');
  }

  logCurrentUser(): void {
    this.userService.getUserProfile().subscribe((user) => {});
  }
}
