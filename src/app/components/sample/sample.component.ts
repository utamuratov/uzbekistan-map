import { ChangeDetectionStrategy, Component } from '@angular/core';
// import {
//   NgxUzbekistanMapLeafletComponent,
//   NgxUzbekistanMapComponent,
// } from 'ngx-uzbekistan-map';
import { NgxUzbekistanMapComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/ngx-uzbekistan-map.component';
import { NgxUzbekistanMapLeafletComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/uzbekistan-map-leaflet/ngx-uzbekistan-map-leaflet.component';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [NgxUzbekistanMapComponent, NgxUzbekistanMapLeafletComponent],
  template: `
    <div style="height: 100vh">
      <ngx-uzbekistan-map
        #uzbekistanMap
        [defaultProvinceOrDistrictId]="'00s0eed0000region000174'"
        [permission]="'full'"
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
