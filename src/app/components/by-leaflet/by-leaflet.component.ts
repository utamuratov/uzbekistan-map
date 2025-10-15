import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { NgxUzbekistanMapLeafletComponent } from 'ngx-uzbekistan-map';
import { NgxUzbekistanMapLeafletComponent } from '../../../../projects/ngx-uzbekistan-map/src/public-api';
import { LoadingBlockComponent } from '../loading/loading-block/loading-block.component';

@Component({
  selector: 'app-by-leaflet',
  standalone: true,
  imports: [NgxUzbekistanMapLeafletComponent, LoadingBlockComponent],
  template: `
    <div style="height: calc(100vh - 100px)">
      @defer {
        <ngx-uzbekistan-map-leaflet
          #uzbekistanMapLeaflet
          (onSelectedProvince)="handleSelectedProvince($event)"
          (onSelectedDistrict)="handleSelectedDistrict($event)"
          (onSelectedUzbekistan)="handleSelectedUzbekistan()"
        ></ngx-uzbekistan-map-leaflet>
      } @placeholder {
        <div style="height: calc(100vh - 100px); position: relative;">
          <app-loading-block />
        </div>
      }
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
