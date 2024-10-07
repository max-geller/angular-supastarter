import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from './environments/environment';


// Import Services
import { AppInitService } from './app/core/services/app-init.service';


// Import Third-Party Libraries
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

function initializeApp(appInitService: AppInitService) {
  return () => {
    return appInitService.initializeApp().then(() => {});
  };
}

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideCharts(withDefaultRegisterables()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitService],
      multi: true,
    },
    {
      provide: 'ENVIRONMENT',
      useValue: environment
    }
  ],
});
