import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-block',
  standalone: true,
  imports: [],
  template: `<div class="loading-overlay">
    <div class="spinner"></div>
  </div>`,
  styleUrl: './loading-block.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBlockComponent {}
