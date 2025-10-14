import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
// import {
//   NgxUzbekistanMapLeafletComponent,
//   NgxUzbekistanMapComponent,
// } from 'ngx-uzbekistan-map';
import { NgxUzbekistanMapComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/ngx-uzbekistan-map.component';
import { NgxUzbekistanMapLeafletComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/uzbekistan-map-leaflet/ngx-uzbekistan-map-leaflet.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [NgxUzbekistanMapComponent],
  template: `
    <div style="height: 100vh">
      <ngx-uzbekistan-map
        #uzbekistanMap
        (onSelectedProvince)="handleSelectedProvince($event)"
        (onSelectedDistrict)="handleSelectedDistrict($event)"
        (onSelectedUzbekistan)="handleSelectedUzbekistan()"
      ></ngx-uzbekistan-map>
    </div>
  `,
  styleUrl: './sample.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleComponent implements AfterViewInit {
  @ViewChild('uzbekistanMap') uzbekistanMap!: NgxUzbekistanMapComponent;

  handleSelectedProvince(e: any) {
    console.log(e);
  }

  handleSelectedDistrict(e: any) {
    console.log(e);
  }

  handleSelectedUzbekistan() {
    console.log('uzbekistan selected');
  }

  ngAfterViewInit(): void {
    // *FOR SELECT DISTRICT WITH STRICT MODE
    // this.uzbekistanMap.strictMode('00s0eed0000region000174', 'district');
  }
}
