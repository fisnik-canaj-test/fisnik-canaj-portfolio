import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions, withInMemoryScrolling, type RouterFeatures } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const doc = typeof document !== 'undefined' ? document : null;
const routerFeatures: RouterFeatures[] = [
  withInMemoryScrolling({
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
  })
];

const supportsViewTransitions =
  !!doc &&
  'startViewTransition' in doc &&
  doc.visibilityState === 'visible';

if (supportsViewTransitions) {
  routerFeatures.unshift(
    withViewTransitions({
      skipInitialTransition: true,
      onViewTransitionCreated: ({ transition }) => {
        transition.ready.catch((error: Error) => {
          if (error?.name !== 'InvalidStateError') {
            console.error(error);
          }
        });
      },
    })
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, ...routerFeatures),
    provideClientHydration(withEventReplay()),
  ],
};
