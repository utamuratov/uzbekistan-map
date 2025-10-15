import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MapComponent } from '../map/map.component';

import { JsonPipe } from '@angular/common';
import {
  ERegionIds,
  REGIONS_DATA,
} from '../../../../projects/ngx-uzbekistan-map/src/public-api';
import { RegionFormComponent } from './region-form/region-form.component';
import { DistrictFormComponent } from './district-form/district-form.component';
import { ERegionNames, IArea } from 'ngx-uzbekistan-map';
import { LoadingBlockComponent } from '../loading/loading-block/loading-block.component';

type AreaType = 'province' | 'district';

@Component({
  selector: 'em-constructor',
  standalone: true,
  imports: [
    JsonPipe,
    MapComponent,
    RegionFormComponent,
    DistrictFormComponent,
    LoadingBlockComponent,
  ],
  template: `
    <div class="container">
      <div class="content">
        <div class="map-section">
          <button
            (click)="
              doIt(
                regionForm.form.getRawValue(),
                districtForm.form.getRawValue()
              )
            "
            class="action-btn"
          >
            DO IT
          </button>
          @defer {
            <em-map class="map"></em-map>
          } @placeholder {
            <div class="map" style="position: relative;">
              <app-loading-block />
            </div>
          }
          <div class="textarea-wrapper">
            <textarea
              class="textarea wide"
              [value]="newSvg"
              readonly
            ></textarea>
            <button class="copy-btn" (click)="copyToClipboard(newSvg)">
              Copy
            </button>
          </div>
        </div>

        <div class="card medium" style="position: relative;">
          @defer {
            <app-region-form #regionForm />
          } @placeholder {
            <app-loading-block />
          }
        </div>

        <div class="card medium" style="position: relative;">
          @defer {
            <app-district-form #districtForm />
          } @placeholder {
            <app-loading-block />
          }
        </div>

        <!-- <textarea
          class="textarea medium"
          [value]="REGIONS | json"
          readonly
        ></textarea>

        <textarea
          class="textarea medium"
          [value]="DISTRICTS | json"
          readonly
        ></textarea> -->
      </div>
    </div>
  `,
  styleUrls: ['./constructor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructorComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild(RegionFormComponent) regionForm!: RegionFormComponent;
  @ViewChild(DistrictFormComponent) districtForm!: DistrictFormComponent;
  // TODO: DEAD CODE
  // readonly REGIONS = REGIONS_DATA;
  // readonly DISTRICTS = DISTRICTS_BY_REGION;
  // readonly REGIONS_ARRAY = Object.values(REGIONS_DATA);

  newSvg = '';

  doIt(
    regions: Record<ERegionNames, IArea>,
    districts: Record<ERegionIds, IArea[]>,
  ) {
    const map = this.mapComponent.map.nativeElement as SVGElement;
    const regionsArray = Object.values(regions);
    if (map) {
      const gWrapper = map.children[0];
      const regions = gWrapper.children;
      for (let regionIndex = 0; regionIndex < regions.length; regionIndex++) {
        const regionGrouped = regions[regionIndex];
        // console.log('regionGrouped', regionGrouped);
        const regionDistricts = regionGrouped.children[0].children;
        const regionSvgPath = regionGrouped.children[1] as SVGPathElement;
        // console.log('region', region);
        const region = regionsArray[regionIndex];
        regionSvgPath.setAttribute('id', region.id);
        regionSvgPath.setAttribute('data-name_uz', region.name_uz);
        regionSvgPath.setAttribute('data-name_uzl', region.name_uzl);
        regionSvgPath.setAttribute('data-name_ru', region.name_ru);
        regionSvgPath.setAttribute('data-type', 'province' as AreaType);
        // NEW DATA
        regionSvgPath.setAttribute('data-new_id', region['new_id']);
        regionSvgPath.setAttribute('data-soato', region['soato']);
        // SET TOOLTIP
        regionSvgPath.setAttribute('appCustomTooltip', region.name_uz);

        const districtsByRegion = districts[region.id as ERegionIds];
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
            // NEW DATA
            districtSvgPath.setAttribute('data-new_id', district['new_id']);
            districtSvgPath.setAttribute('data-soato', district['soato']);
            // SET TOOLTIP
            districtSvgPath.setAttribute('appCustomTooltip', district.name_uz);
          }
        }
      }

      this.newSvg = map.outerHTML;
      console.log(map);
    }
  }

  copyToClipboard(value: string): void {
    if (!value) return;

    navigator.clipboard
      .writeText(value)
      .then(() => {
        console.log('Copied to clipboard');
      })
      .catch((err) => {
        console.error('Copy failed:', err);
      });
  }
}
