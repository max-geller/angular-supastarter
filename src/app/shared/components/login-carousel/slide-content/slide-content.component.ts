import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface SlideContent {
  id: number;
  backgroundImage: string;
  headerImage: string;
  title: string;
  description: string;
  alignment: 'left' | 'right' | 'center';
}

export const slides: SlideContent[] = [
  {
    id: 1,
    backgroundImage: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/1.jpg?t=2024-10-02T21%3A16%3A30.717Z',
    headerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLH-gVtwIqMJXdIPMcErqrFwPFl21ZXKM1MA&s',
    title: 'Angular 18 Starter',
    description: 'Welcome to the Angular 18 Starter',
    alignment: 'left',
  },
  {
    id: 2,
    backgroundImage: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/2.jpg?t=2024-10-02T21%3A16%3A39.267Z',
    headerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLH-gVtwIqMJXdIPMcErqrFwPFl21ZXKM1MA&s',
    title: 'Angular 18 Starter',
    description: 'Welcome to the Angular 18 Starter',
    alignment: 'right',
  },
  {
    id: 3,
    backgroundImage: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/3.jpg?t=2024-10-02T21%3A16%3A45.949Z',
    headerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLH-gVtwIqMJXdIPMcErqrFwPFl21ZXKM1MA&s',
    title: 'Angular 18 Starter',
    description: 'Welcome to the Angular 18 Starter',
    alignment: 'center',
  },
  {
    id: 4,
    backgroundImage: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/4.jpg?t=2024-10-02T21%3A16%3A58.932Z',
    headerImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLH-gVtwIqMJXdIPMcErqrFwPFl21ZXKM1MA&s',
    title: 'Angular 18 Starter',
    description: 'Welcome to the Angular 18 Starter',
    alignment: 'left',
  },
];

@Component({
  selector: 'login-slide-content',
  standalone: true,
  imports: [],
  templateUrl: './slide-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideContentComponent {
  @Input() slide!: SlideContent;
}
