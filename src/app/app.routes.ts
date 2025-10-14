import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sample' },
  {
    path: 'sample',
    loadComponent: () =>
      import('./components/sample/sample.component').then(
        (m) => m.SampleComponent
      ),
  },
  {
    path: 'by-leaflet',
    loadComponent: () =>
      import('./components/by-leaflet/by-leaflet.component').then(
        (m) => m.ByLeafletComponent
      ),
  },
  {
    path: 'constructor',
    loadComponent: () =>
      import('./components/constructor/constructor.component').then(
        (m) => m.ConstructorComponent
      ),
  },
];
