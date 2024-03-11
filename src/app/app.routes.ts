import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/sample/sample.component').then(
        (m) => m.SampleComponent
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
