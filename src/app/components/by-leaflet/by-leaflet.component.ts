import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxUzbekistanMapLeafletComponent } from '../../../../projects/ngx-uzbekistan-map/src/public-api';

@Component({
  selector: 'app-by-leaflet',
  standalone: true,
  imports: [NgxUzbekistanMapLeafletComponent],
  template: `
    <div style="height: 100vh">
      <ngx-uzbekistan-map-leaflet
        #uzbekistanMapLeaflet
        (onSelectedProvince)="handleSelectedProvince($event)"
        (onSelectedDistrict)="handleSelectedDistrict($event)"
        (onSelectedUzbekistan)="handleSelectedUzbekistan()"
      ></ngx-uzbekistan-map-leaflet>
    </div>
  `,
  styleUrl: './by-leaflet.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByLeafletComponent {
  handleSelectedProvince(e: any) {
    console.log(e);
  }

  handleSelectedDistrict(e: any) {
    console.log(e);
  }

  handleSelectedUzbekistan() {
    console.log('uzbekistan selected');
  }
}
