import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import Services
import { AuthService } from './core/services/auth.service';

// Import Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  session: any;

  constructor(private readonly auth: AuthService) {
    this.session = this.auth.session;
  }

  ngOnInit() {
    this.auth.authChanges((_, session) => (this.session = session));
  }
}
