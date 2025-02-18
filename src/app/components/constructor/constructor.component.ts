import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

import { JsonPipe } from '@angular/common';
import {
  DISTRICTS_BY_REGION,
  ERegionIds,
  REGIONS_DATA,
} from '../../../../projects/ngx-uzbekistan-map/src/public-api';

type AreaType = 'province' | 'district';

@Component({
  selector: 'em-constructor',
  standalone: true,
  imports: [JsonPipe, MapComponent],
  template: `
    <div class="flex">
      <button (click)="doIt()" mat-stroked-button>DO IT</button>
    </div>
    <div class="flex gap-2 p-4">
      <div class="border p-4">
        <em-map></em-map>
      </div>

      <textarea
        name=""
        id=""
        cols="50"
        rows="10"
        [value]="REGIONS | json"
      ></textarea>
      <textarea
        name=""
        id=""
        cols="50"
        rows="10"
        [value]="DISTRICTS | json"
      ></textarea>
    </div>
    <textarea name="" id="" cols="100" rows="10" [value]="newSvg"></textarea>
  `,
  styleUrls: ['./constructor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  readonly REGIONS = REGIONS_DATA;
  readonly DISTRICTS = DISTRICTS_BY_REGION;
  readonly REGIONS_ARRAY = Object.values(REGIONS_DATA);

  newSvg = '';

  doIt() {
    const map = this.mapComponent.map.nativeElement as SVGElement;
    if (map) {
      const gWrapper = map.children[0];
      const regions = gWrapper.children;
      for (let regionIndex = 0; regionIndex < regions.length; regionIndex++) {
        const regionGrouped = regions[regionIndex];
        // console.log('regionGrouped', regionGrouped);
        const regionDistricts = regionGrouped.children[0].children;
        const regionSvgPath = regionGrouped.children[1] as SVGPathElement;
        // console.log('region', region);
        const region = this.REGIONS_ARRAY[regionIndex];
        regionSvgPath.setAttribute('id', region.id);
        regionSvgPath.setAttribute('data-name_uz', region.name_uz);
        regionSvgPath.setAttribute('data-name_uzl', region.name_uzl);
        regionSvgPath.setAttribute('data-name_ru', region.name_ru);
        regionSvgPath.setAttribute('data-type', 'province' as AreaType);
        // SET TOOLTIP
        regionSvgPath.setAttribute('matTooltip', region.name_uz);

        const districtsByRegion = DISTRICTS_BY_REGION[region.id as ERegionIds];
        for (
          let districtIndex = 0;
          districtIndex < regionDistricts.length;
          districtIndex++
        ) {
          const districtSvgPath = regionDistricts[
            districtIndex
          ] as SVGPathElement;
          const district = districtsByRegion[districtIndex];
          //   TODO: IMPLEMENT ALL DISTRCITS FROM SVG AND VISE VERSA
          if (district) {
            districtSvgPath.setAttribute('id', district.id);
            districtSvgPath.setAttribute('data-name_uz', district.name_uz);
            districtSvgPath.setAttribute('data-name_uzl', district.name_uzl);
            districtSvgPath.setAttribute('data-name_ru', district.name_ru);
            districtSvgPath.setAttribute('data-type', 'district' as AreaType);
            // SET TOOLTIP
            districtSvgPath.setAttribute('matTooltip', district.name_uz);
          }
        }
      }

      this.newSvg = map.outerHTML;
      console.log(map);
    }
  }
}
