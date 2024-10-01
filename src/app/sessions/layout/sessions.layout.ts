import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'sessions-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './sessions.layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsLayout {}
