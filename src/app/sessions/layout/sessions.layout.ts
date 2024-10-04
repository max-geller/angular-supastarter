import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginCarouselComponent } from './../../shared/components/login-carousel/login-carousel.component';
@Component({
  selector: 'sessions-layout',
  standalone: true,
  imports: [RouterOutlet, LoginCarouselComponent],
  templateUrl: './sessions.layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsLayout {}
