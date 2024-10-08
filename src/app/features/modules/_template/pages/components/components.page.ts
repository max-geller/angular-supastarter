import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

// Import Angular Material Components
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Import Components
import { TemplateButtonsComponent } from './../../components/buttons/buttons.component';
import { SampleTableComponent } from './../../components/sample-table/sample-table.component';
import { TypographyComponent } from './../../components/typography/typography.component';

@Component({
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    SampleTableComponent,
    TypographyComponent,
    TemplateButtonsComponent,
  ],
  templateUrl: './components.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsPage implements OnInit {
  ngOnInit(): void {}
}
