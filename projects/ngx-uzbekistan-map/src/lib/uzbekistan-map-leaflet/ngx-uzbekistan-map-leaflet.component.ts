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
  private svgOverlay!: L.SVGOverlay;

  // Uzbekiston uchun haqiqiy koordinatalar
  readonly LEAFLET_DEFAULT_CENTER = [41.3, 64.5] as L.LatLngExpression;
  readonly LEAFLET_DEFAULT_ZOOM = 6;

  // Debounce timer
  private strokeWidthTimer: any;

  // Tooltip element
  private tooltipElement!: HTMLDivElement;

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
      // Smooth animation bilan default view ga qaytish
      this.map.flyTo(this.LEAFLET_DEFAULT_CENTER, this.LEAFLET_DEFAULT_ZOOM, {
        duration: 0.5,
        easeLinearity: 0.5,
      });
    }

    this.updateStrokeWidth();
  }

  private onSelectProvinceOrDistrict(
    path: SVGPathElement,
    leafletMouseEvent?: L.LeafletMouseEvent
  ) {
    const { title, type, name_uz, name_uzl, name_ru, soato, new_id } =
      path.dataset;
    const id = path.id;

    // WHEN CLICKED PROVINCE
    if (type === 'province') {
      // REMOVE ACTIVE DISTRICT
      this.lastSelectedDistrictPath = undefined;
      this.lastSelectedProvincePath = path;

      if (leafletMouseEvent) {
        // ON LEAFLET CLICK - smooth zoom va pan
        this.setView(path, leafletMouseEvent.latlng);
      }

      // HIDE SELECTED PROVINCE PATH
      path.style.display = 'none';

      this.lastSelectedProvince = {
        id,
        name_ru,
        name_uzl,
        name_uz,
        soato,
        new_id,
      } as IArea;
      this.onSelectedProvince.emit(this.lastSelectedProvince);
      return;
    }

    // WHEN CLICKED DISTRICT
    this.lastSelectedDistrictPath = path;
    path.classList.add('active-district');
    this.lastSelectedDistrict = {
      id,
      name_ru,
      name_uzl,
      name_uz,
      soato,
      new_id,
    } as IArea;
    this.onSelectedDistrict.emit(this.lastSelectedDistrict);
  }

  /**
   * Stroke width ni zoom level ga qarab yangilash (debounced)
   */
  private updateStrokeWidth() {
    clearTimeout(this.strokeWidthTimer);
    this.strokeWidthTimer = setTimeout(() => {
      const zoom = this.map.getZoom();
      // Zoom level ga qarab stroke width ni hisoblash (ingichka)
      // Yuqori zoom da yanada ingichka
      const baseWidth = 0.8;
      const zoomFactor = Math.pow(2, zoom - this.LEAFLET_DEFAULT_ZOOM);
      const strokeWidth = Math.max(0.15, baseWidth / zoomFactor);

      this.setPathsStrokeWidth(`${strokeWidth}px`);
    }, 100);
  }

  /**
   * Barcha path elementlarning stroke width ni o'zgartirish
   */
  private setPathsStrokeWidth(strokeWidth: string) {
    if (!this.svg) return;

    // requestAnimationFrame bilan performance yaxshilash
    requestAnimationFrame(() => {
      const paths = this.svg.getElementsByTagName('path');
      for (let i = 0; i < paths.length; i++) {
        paths[i].style.strokeWidth = strokeWidth;
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.LEAFLET_DEFAULT_CENTER,
      zoom: this.LEAFLET_DEFAULT_ZOOM,
      attributionControl: false,
      zoomControl: true, // Zoom buttonlarni yoqish
      scrollWheelZoom: true, // Mouse wheel zoom
      doubleClickZoom: true, // Double click zoom
      touchZoom: true, // Touch zoom
      boxZoom: true, // Box zoom
      keyboard: true, // Keyboard navigation
      dragging: true, // Drag/pan
      zoomSnap: 0.5, // Smooth zoom uchun
      zoomDelta: 0.5, // Zoom qadamlari
      wheelPxPerZoomLevel: 100, // Mouse wheel sensitivity
      zoomAnimation: true,
      zoomAnimationThreshold: 4,
      fadeAnimation: true,
      markerZoomAnimation: true,
      // Performance optimizatsiyasi
      preferCanvas: false, // SVG uchun false
      renderer: L.svg({ padding: 0.5 }),
    });

    this.setSvgOverlay();

    // Click event - optimized
    this.map.on('click', (e) => {
      const target = e.originalEvent?.target;
      if (target instanceof SVGPathElement) {
        this.onSelectProvinceOrDistrict(target, e);
      } else {
        // WHEN CLICKED OUTSIDE (NOT DISTRICT OR PROVINCE)
        this.map.flyTo(this.LEAFLET_DEFAULT_CENTER, this.LEAFLET_DEFAULT_ZOOM, {
          duration: 0.5,
          easeLinearity: 0.5,
        });
        this.onSelectUzbekistan(true);
      }
    });

    // Zoom event - stroke width ni yangilash
    this.map.on('zoomend', () => {
      this.updateStrokeWidth();
    });

    // Zoom animatsiyasi boshlanganida
    this.map.on('zoomanim', () => {
      this.updateStrokeWidth();
    });

    // Initial stroke width
    this.updateStrokeWidth();
  }

  private setSvgOverlay() {
    // Uzbekiston uchun haqiqiy geografik chegaralar
    const latLngBounds = L.latLngBounds([
      [37.2, 55.9], // Janubi-g'arbiy burchak
      [45.6, 73.2], // Shimoli-sharqiy burchak
    ]);

    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    this.svg.setAttribute('viewBox', '0 0 466 304');
    this.svg.setAttribute('id', 'svgMap');

    // Performance uchun
    this.svg.style.pointerEvents = 'auto';
    this.svg.style.transform = 'translateZ(0)'; // GPU acceleration

    this.svg.innerHTML = SVGString;

    // Tooltip yaratish
    this.createTooltip();

    // Hover eventlarni qo'shish
    this.addHoverEvents();

    // SVG overlay yaratish
    this.svgOverlay = L.svgOverlay(this.svg, latLngBounds, {
      interactive: true, // Click eventlarni yoqish
      bubblingMouseEvents: true, // Event propagation
    });

    this.svgOverlay.addTo(this.map);
  }

  private setView(path: SVGPathElement, latLng: L.LatLngExpression) {
    const bbox = path.getBBox();
    const mapContainer = this.document.getElementById('map');

    if (!mapContainer) return;

    // Map container o'lchamlarini olish
    const mapWidth = mapContainer.clientWidth;
    const mapHeight = mapContainer.clientHeight;

    // Path o'lchamlarini olish
    const pathWidth = bbox.width;
    const pathHeight = bbox.height;

    // Ikkala yo'nalish bo'yicha scale hisoblash
    const scaleX = mapWidth / pathWidth;
    const scaleY = mapHeight / pathHeight;

    // Kichikroq scale ni tanlash (to'liq ko'rinishi uchun)
    const scale = Math.min(scaleX, scaleY) * 0.6; // 0.6 - padding uchun

    // Scale ga asoslangan zoom level hisoblash
    let zoom: number;

    if (scale < 5) {
      zoom = 7;
    } else if (scale < 15) {
      zoom = 8;
    } else if (scale < 30) {
      zoom = 9;
    } else if (scale < 60) {
      zoom = 10;
    } else if (scale < 120) {
      zoom = 11;
    } else {
      zoom = 12;
    }

    // Juda kichik hududlar uchun (Toshkent shahri kabi)
    if (pathWidth < 10 && pathHeight < 10) {
      zoom = Math.max(zoom, 11); // Minimum zoom 11
    } else if (pathWidth < 20 && pathHeight < 20) {
      zoom = Math.max(zoom, 10); // Minimum zoom 10
    }

    console.log(
      'Path size:',
      pathWidth,
      'x',
      pathHeight,
      'Scale:',
      scale.toFixed(2),
      'Zoom:',
      zoom
    );

    // Smooth animation bilan zoom va pan
    this.map.flyTo(latLng, zoom, {
      duration: 0.6,
      easeLinearity: 0.5,
    });
  }

  /**
   * Tooltip elementi yaratish
   */
  private createTooltip() {
    this.tooltipElement = this.document.createElement('div');
    this.tooltipElement.className = 'map-custom-tooltip';
    this.tooltipElement.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.85);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      pointer-events: none;
      z-index: 1000;
      display: none;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: opacity 0.2s ease;
    `;
    this.document.body.appendChild(this.tooltipElement);
  }

  /**
   * Hover eventlarni barcha path elementlarga qo'shish
   */
  private addHoverEvents() {
    const paths = this.svg.getElementsByTagName('path');

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];

      // Mouse enter
      path.addEventListener('mouseenter', (e) => {
        const target = e.target as SVGPathElement;
        const tooltipText =
          target.dataset['tooltip'] ||
          target.dataset['name_uz'] ||
          target.dataset['title'] ||
          '';

        if (tooltipText) {
          this.showTooltip(tooltipText);
          // Path ni highlight qilish
          target.style.opacity = '0.8';
        }
      });

      // Mouse move - tooltip pozitsiyasini yangilash
      path.addEventListener('mousemove', (e) => {
        this.updateTooltipPosition(e as MouseEvent);
      });

      // Mouse leave
      path.addEventListener('mouseleave', (e) => {
        const target = e.target as SVGPathElement;
        this.hideTooltip();
        // Highlight ni olib tashlash
        target.style.opacity = '';
      });
    }
  }

  /**
   * Tooltip ni ko'rsatish
   */
  private showTooltip(text: string) {
    this.tooltipElement.textContent = text;
    this.tooltipElement.style.display = 'block';
    // Smooth appear
    setTimeout(() => {
      this.tooltipElement.style.opacity = '1';
    }, 10);
  }

  /**
   * Tooltip ni yashirish
   */
  private hideTooltip() {
    this.tooltipElement.style.display = 'none';
    this.tooltipElement.style.opacity = '0';
  }

  /**
   * Tooltip pozitsiyasini yangilash
   */
  private updateTooltipPosition(event: MouseEvent) {
    const offset = 15; // Cursor dan masofa
    const tooltipWidth = this.tooltipElement.offsetWidth;
    const tooltipHeight = this.tooltipElement.offsetHeight;

    let left = event.clientX + offset;
    let top = event.clientY + offset;

    // Ekrandan chiqib ketmaslik uchun
    if (left + tooltipWidth > window.innerWidth) {
      left = event.clientX - tooltipWidth - offset;
    }

    if (top + tooltipHeight > window.innerHeight) {
      top = event.clientY - tooltipHeight - offset;
    }

    this.tooltipElement.style.left = `${left}px`;
    this.tooltipElement.style.top = `${top}px`;
  }

  ngAfterViewInit(): void {
    // Leaflet kutubxonasi to'liq yuklanganini ta'minlash
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  ngOnDestroy(): void {
    // Memory leak oldini olish
    if (this.strokeWidthTimer) {
      clearTimeout(this.strokeWidthTimer);
    }

    // Tooltip ni o'chirish
    if (this.tooltipElement && this.tooltipElement.parentNode) {
      this.tooltipElement.parentNode.removeChild(this.tooltipElement);
    }

    if (this.map) {
      this.map.remove();
    }
  }
}
