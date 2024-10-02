import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'login-carousel',
  templateUrl: './login-carousel.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  animations: [
    trigger('carouselAnimation', [
      state('active', style({ opacity: 1 })),
      state('inactive', style({ opacity: 0 })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
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
      alt: 'Image 4',
    },
  ];

  currentIndex = 0;
  private timerSubscription: Subscription | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('ngOnInit called');
    this.startTimer();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    this.stopTimer();
  }

  startTimer() {
    console.log('startTimer called');
    this.timerSubscription = interval(10000).subscribe(() => {
      console.log('Timer tick');
      this.next();
    });
  }

  stopTimer() {
    console.log('stopTimer called');
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  next() {
    console.log('next called, current index:', this.currentIndex);
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    console.log('new index:', this.currentIndex);
    this.cdr.detectChanges();
  }

  prev() {
    console.log('prev called, current index:', this.currentIndex);
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    console.log('new index:', this.currentIndex);
    this.cdr.detectChanges();
  }

  goToSlide(index: number) {
    console.log('goToSlide called with index:', index);
    this.currentIndex = index;
    this.cdr.detectChanges();
  }
}
