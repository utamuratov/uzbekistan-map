import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxUzbekistanMapLeafletComponent } from 'ngx-uzbekistan-map';
import { NgxUzbekistanMapComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/ngx-uzbekistan-map.component';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [NgxUzbekistanMapComponent, NgxUzbekistanMapLeafletComponent],
  template: `
    <div style="height: 100vh">
      <ngx-uzbekistan-map
        #uzbekistanMap
        (onSelectedProvince)="handleSelectedProvince($event)"
        (onSelectedDistrict)="handleSelectedDistrict($event)"
        (onSelectedUzbekistan)="handleSelectedUzbekistan()"
      ></ngx-uzbekistan-map>

      <ngx-uzbekistan-map-leaflet
        #uzbekistanMapLeaflet
        (onSelectedProvince)="handleSelectedProvince($event)"
        (onSelectedDistrict)="handleSelectedDistrict($event)"
        (onSelectedUzbekistan)="handleSelectedUzbekistan()"
      ></ngx-uzbekistan-map-leaflet>
    </div>
  `,
  styleUrl: './sample.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleComponent {
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
