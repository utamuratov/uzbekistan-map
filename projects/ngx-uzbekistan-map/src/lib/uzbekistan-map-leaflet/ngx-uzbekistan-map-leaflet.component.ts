import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IArea } from './../models/area.interface';

import * as L from 'leaflet';
import { SVGString } from './data/_svg';
import { CustomTooltipDirective } from '../directives/custom-tooltip.directive';

@Component({
  selector: 'ngx-uzbekistan-map-leaflet',
  templateUrl: 'ngx-uzbekistan-map-leaflet.component.html',
  styleUrls: ['ngx-uzbekistan-map-leaflet.component.less'],
  standalone: true,
  imports: [CustomTooltipDirective],
})
export class NgxUzbekistanMapLeafletComponent {
  private _provinceOrDistrictId: string | undefined;
  public get provinceOrDistrictId(): string | undefined {
    return this._provinceOrDistrictId;
  }
  @Input()
  public set provinceOrDistrictId(v: string | undefined) {
    this._provinceOrDistrictId = v;

    if (this.provinceOrDistrictId) {
      const path = this.document.getElementById(this.provinceOrDistrictId);
      if (path instanceof SVGPathElement) {
        this.onSelectProvinceOrDistrict(path);
      }
      return;
    }

    if (v === undefined) {
      this.onSelectUzbekistan();
    }
  }

  @Output()
  onSelectedProvince = new EventEmitter<IArea>();

  @Output()
  onSelectedDistrict = new EventEmitter<IArea>();

  @Output()
  onSelectedUzbekistan = new EventEmitter<void>();

  private _svg!: SVGElement;
  public get svg(): SVGElement {
    return this._svg;
  }
  public set svg(v: SVGElement) {
    this._svg = v;
  }

  private _lastSelectedProvincePath: SVGPathElement | undefined;
  public get lastSelectedProvincePath(): SVGPathElement | undefined {
    return this._lastSelectedProvincePath;
  }
  public set lastSelectedProvincePath(v: SVGPathElement | undefined) {
    if (this._lastSelectedProvincePath) {
      this._lastSelectedProvincePath.style.display = 'block';
    }

    this._lastSelectedProvincePath = v;
  }

  private _lastSelectedDistrictPath: SVGPathElement | undefined;
  public get lastSelectedDistrictPath(): SVGPathElement | undefined {
    return this._lastSelectedDistrictPath;
  }
  public set lastSelectedDistrictPath(v: SVGPathElement | undefined) {
    if (this._lastSelectedDistrictPath) {
      this._lastSelectedDistrictPath.classList.remove('active-district');
    }

    this._lastSelectedDistrictPath = v;
  }

  lastSelectedProvince?: IArea;
  lastSelectedDistrict?: IArea;

  private map!: L.Map;
  readonly LEAFLET_DEFAULT_CENTER = [23.8282, -114.9795] as L.LatLngExpression;
  readonly LEAFLET_DEFAULT_ZOOM = 5;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  private onSelectUzbekistan(isClickedLeaflet?: boolean) {
    if (this.lastSelectedProvincePath || this.lastSelectedDistrictPath) {
      this.onSelectedUzbekistan.emit();
    }
    this.lastSelectedDistrictPath = undefined;
    this.lastSelectedProvincePath = undefined;
    this.lastSelectedDistrict = undefined;
    this.lastSelectedProvince = undefined;
    if (!isClickedLeaflet) {
      this.svg.style.transform = `translate(${0}px, ${0}px)`;
      this.svg.style.scale = `${1.5}`;
    }
    this.setPathsStrokeWidth('revert-layer');
  }

  private onSelectProvinceOrDistrict(
    path: SVGPathElement,
    leafletMouseEvent?: L.LeafletMouseEvent
  ) {
    const { title, type, name_uz, name_uzl, name_ru } = path.dataset;
    const id = path.id;
    console.log('id', id);
    console.log('title', title);
    console.log('type', type);
    console.log('name_uz', name_uz);
    console.log('name_uzl', name_uzl);
    console.log('name_ru', name_ru);

    // WHEN CLICKED PROVINCE
    if (type === 'province') {
      // REMOVE ACTIVE DISTRICT
      this.lastSelectedDistrictPath = undefined;

      this.lastSelectedProvincePath = path;

      if (leafletMouseEvent) {
        // ON LEAFLET CLICK
        this.setView(path, leafletMouseEvent.latlng);
      } else {
        // TODO: REMOVE OR IMPLEMENT
        // ZOOM AND MOVE TO SELECTED PROVINCE
        this.moveToCenter(path);
      }

      // HIDE SELECTED PROVINCE PATH
      path.style.display = 'none';

      this.lastSelectedProvince = { id, name_ru, name_uzl, name_uz } as IArea;
      this.onSelectedProvince.emit(this.lastSelectedProvince);
      return;
    }

    // WHEN CLICKED DISTRICT
    this.lastSelectedDistrictPath = path;
    path.classList.add('active-district');
    this.lastSelectedDistrict = { id, name_ru, name_uzl, name_uz } as IArea;
    this.onSelectedDistrict.emit(this.lastSelectedDistrict);
  }

  private moveToCenter(clickedPath: SVGPathElement) {
    // const svgContainer = event.currentTarget as HTMLElement;
    // const clickedPath = event.target as SVGPathElement;
    // Get the bounding box of the clicked path
    const bbox = clickedPath.getBBox();

    // Calculate the translation required to center the path
    const tx = this.svg.clientWidth / 2 - (bbox.x + bbox.width / 2);
    const ty = this.svg.clientHeight / 2 - (bbox.y + bbox.height / 2);

    // Apply the translation to the SVG container
    const scale = this.svg.clientHeight / bbox.height;
    // TODO: REMOVE OR IMPLEMENT
    // this.svg.style.transform = `translate(${tx}px, ${ty}px)`;
    // this.svg.style.transitionDuration = Math.ceil(scale / 10) * 0.2 + 's';
    // this.svg.style.scale = `${scale}`;
    this.setPathsStrokeWidth(`${1 / scale}px`);
  }

  /**
   *
   * @param strokeWidth 0.2px | 'revert-layer'
   */
  private setPathsStrokeWidth(strokeWidth: string) {
    const paths = this.svg.getElementsByTagName('path');
    for (let index = 0; index < paths.length; index++) {
      const element = paths[index];
      element.style.strokeWidth = `${strokeWidth}`;
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.LEAFLET_DEFAULT_CENTER,
      zoom: this.LEAFLET_DEFAULT_ZOOM,
      attributionControl: false,
    });

    this.setSvgOverlay();

    this.map.on('click', (e) => {
      const target = e.originalEvent?.target;
      if (target instanceof SVGPathElement) {
        // Calculate the translation required to center the path

        this.onSelectProvinceOrDistrict(target, e);
      } else {
        // WHEN CLICKED OUTSIDE (NOT DISTRICT OR PROVINCE)
        this.map.setView(
          this.LEAFLET_DEFAULT_CENTER,
          this.LEAFLET_DEFAULT_ZOOM,
          {
            animate: true,
            duration: 0.2,
          }
        );

        this.onSelectUzbekistan(true);
      }
    });
  }

  private setSvgOverlay() {
    var latLngBounds = L.latLngBounds([
      [32, -130],
      [13, -100],
    ]);
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svg.setAttribute('viewBox', '0 0 466 304');
    this.svg.setAttribute('id', 'svgMap');
    this.svg.innerHTML = SVGString;
    L.svgOverlay(this.svg, latLngBounds as any).addTo(this.map);
  }

  private setView(path: SVGPathElement, latLng: L.LatLngExpression) {
    const bbox = path.getBBox();
    // Apply the translation to the SVG container
    const scale =
      this.document.getElementById('map')!.clientHeight / bbox.height;
    this.setPathsStrokeWidth(`${1 / scale}px`);
    // this.map.setZoom(scale / 3);
    let zoom = 6;
    if (scale < 10) {
      zoom = 6;
    } else if (scale < 50) {
      zoom = 8;
    } else if (scale < 100) {
      zoom = 9;
    } else {
      zoom = 10;
    }

    this.map.setView(latLng, zoom, {
      animate: true,
      duration: 0.2,
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }
}
