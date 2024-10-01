import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
@Component({
  selector: 'template-colors',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent {
  palettes = [
    {
      paletteName: 'azure',
      colors: [
        {
          name: 'primary',
          value: '#000000',
        },
        {
          name: 'secondary',
          value: '#FFFFFF',
        },
        {
          name: 'tertiary',
          value: '#FF0000',
        },
        {
          name: 'warning',
          value: '#FF0000',
        },
      ],
    },
    {
      paletteName: 'violet',
      colors: [
        {
          name: 'primary',
          value: '#000000',
        },
        {
          name: 'secondary',
          value: '#FFFFFF',
        },
        {
          name: 'tertiary',
          value: '#FF0000',
        },
        {
          name: 'warning',
          value: '#FF0000',
        },
      ],
    },
  ];
}
