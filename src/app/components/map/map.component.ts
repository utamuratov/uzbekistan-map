import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'em-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent {
  @ViewChild('map') map!: ElementRef;
}
