import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { interval, Subscription } from 'rxjs';
import { SlideContent, slides } from './slide-content/slide-content.component';

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
export class LoginCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  slides: SlideContent[] = slides;

  currentIndex = 0;
  private timerSubscription: Subscription | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('ngOnInit called');
    console.log('Slides:', this.slides);
    this.startTimer();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called');
    this.stopTimer();
  }

  startTimer() {
    this.timerSubscription = interval(10000).subscribe(() => {
      this.next();
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.cdr.detectChanges();
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.cdr.detectChanges();
  }

  goToSlide(index: number) {
    this.currentIndex = index;
    this.cdr.detectChanges();
  }

  onImageError(event: ErrorEvent, type: 'background' | 'header') {
    console.error(`Failed to load ${type} image:`, (event.target as HTMLImageElement).src);
  }

  ngAfterViewInit() {
    this.slides.forEach((slide, index) => {
      const img = new Image();
      img.onload = () => console.log(`Slide ${index + 1} background image loaded successfully`);
      img.onerror = () => console.error(`Failed to load slide ${index + 1} background image`);
      img.src = slide.backgroundImage;
    });
  }
}
