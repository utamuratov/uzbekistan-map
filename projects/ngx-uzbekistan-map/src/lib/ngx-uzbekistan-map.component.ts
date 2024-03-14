import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WheelProDirective } from './directives/wheel-pro.directive';
import { DOCUMENT } from '@angular/common';
import { IArea } from './models/area.interface';

@Component({
  selector: 'ngx-uzbekistan-map',
  templateUrl: 'ngx-uzbekistan-map.component.html',
  styleUrls: ['ngx-uzbekistan-map.component.less'],
  standalone: true,
  imports: [CdkDrag, MatTooltipModule, WheelProDirective],
})
export class NgxUzbekistanMapComponent {
  @ViewChild('svgMap') svgElementRef!: ElementRef;

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

  get svg() {
    return this.svgElementRef.nativeElement as SVGElement;
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

  dragging = false;
  lastSelectedProvince?: IArea;
  lastSelectedDistrict?: IArea;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    // IF DRAGGING, DO NOTHING
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    const target = event.target;
    if (target instanceof SVGPathElement) {
      this.onSelectProvinceOrDistrict(target);
      return;
    }

    // WHEN CLICKED OUTSIDE (NOT DISTRICT OR PROVINCE)
    if (target instanceof SVGElement) {
      this.onSelectUzbekistan();
      return;
    }
  }

  private onSelectUzbekistan() {
    if (this.lastSelectedProvincePath || this.lastSelectedDistrictPath) {
      this.onSelectedUzbekistan.emit();
    }
    this.lastSelectedDistrictPath = undefined;
    this.lastSelectedProvincePath = undefined;
    this.lastSelectedDistrict = undefined;
    this.lastSelectedProvince = undefined;
    this.svg.style.transform = `translate(${0}px, ${0}px)`;
    this.svg.style.scale = `${1.5}`;
    this.setPathsStrokeWidth('revert-layer');
  }

  private onSelectProvinceOrDistrict(path: SVGPathElement) {
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

      // ZOOM AND MOVE TO SELECTED PROVINCE
      this.moveToCenter(path);

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
    this.svg.style.transform = `translate(${tx}px, ${ty}px)`;
    // this.svg.style.transitionDuration = Math.ceil(scale / 10) * 0.2 + 's';
    this.svg.style.scale = `${scale}`;
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
}
