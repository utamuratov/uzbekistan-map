import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
// import { NgxUzbekistanMapComponent } from 'ngx-uzbekistan-map';
import { NgxUzbekistanMapComponent } from '../../../../projects/ngx-uzbekistan-map/src/lib/ngx-uzbekistan-map.component';
import { LoadingBlockComponent } from '../loading/loading-block/loading-block.component';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [NgxUzbekistanMapComponent, LoadingBlockComponent],
  template: `
    <div style="height: calc(100vh - 100px)">
      @defer {
        <ngx-uzbekistan-map
          #uzbekistanMap
          (onSelectedProvince)="handleSelectedProvince($event)"
          (onSelectedDistrict)="handleSelectedDistrict($event)"
          (onSelectedUzbekistan)="handleSelectedUzbekistan()"
        ></ngx-uzbekistan-map>
      } @placeholder {
        <div style="height: calc(100vh - 100px); position: relative;">
          <app-loading-block />
        </div>
      }
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
