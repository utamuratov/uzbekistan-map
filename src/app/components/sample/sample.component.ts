import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxUzbekistanMapComponent } from 'ngx-uzbekistan-map';

@Component({
  selector: 'app-sample',
  standalone: true,
  imports: [NgxUzbekistanMapComponent],
  template: `
    <div style="height: 100vh">
      <ngx-uzbekistan-map
        #uzbekistanMapPro
        (onSelectedProvince)="handleSelectedProvince($event)"
        (onSelectedDistrict)="handleSelectedDistrict($event)"
        (onSelectedUzbekistan)="handleSelectedUzbekistan()"
      ></ngx-uzbekistan-map>
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
