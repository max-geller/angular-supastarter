import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'login-carousel',
  templateUrl: './login-carousel.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('carouselAnimation', [
      transition('* => *', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginCarouselComponent implements OnInit, OnDestroy {
  images = [
    {
      url: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/1.jpg?t=2024-10-02T21%3A16%3A30.717Z',
      alt: 'Image 1',
    },
    {
      url: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/2.jpg?t=2024-10-02T21%3A16%3A39.267Z',
      alt: 'Image 2',
    },
    {
      url: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/3.jpg?t=2024-10-02T21%3A16%3A45.949Z',
      alt: 'Image 3',
    },
    {
      url: 'https://trjpswwqoubcpszecyin.supabase.co/storage/v1/object/public/wallpapers/4.jpg?t=2024-10-02T21%3A16%3A58.932Z',
      alt: 'Image 3',
    },
  ];

  currentIndex = 0;
  private timerSubscription: Subscription | undefined;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.timerSubscription = interval(5000).subscribe(() => {
      this.next();
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }
}
