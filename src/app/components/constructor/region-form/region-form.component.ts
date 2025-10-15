import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ERegionNames, IArea, REGIONS_DATA } from 'ngx-uzbekistan-map';

@Component({
  selector: 'app-region-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      <fieldset style="background-color: #e8f4fc;">
        <legend>Muhim!</legend>
        <p>
          Ma'lumotlarga o'zgartirish kiritgach ularni yo'qotmaslik uchun Saqlash
          tushmasi bosib qo'ying
        </p>
        <button (click)="save()">Saqlash</button>
        <button (click)="clear()">Clear storage</button>
      </fieldset>
      <form [formGroup]="form">
        @for (key of regionKeys; track $index) {
          <!-- @defer (on viewport) { -->
          <fieldset>
            <legend>{{ key }}</legend>
            <div [formGroupName]="key">
              <div>
                <label for="{{ key }}_new_id">new_id:</label>
                <input formControlName="new_id" id="{{ key }}_new_id" />
              </div>
              <div>
                <label for="{{ key }}_soato">soato:</label>
                <input formControlName="soato" id="{{ key }}_soato" />
              </div>
              <div>
                <label for="{{ key }}_name_uz">name_uz:</label>
                <input formControlName="name_uz" id="{{ key }}_name_uz" />
              </div>
              <div>
                <label for="{{ key }}_name_ru">name_ru:</label>
                <input formControlName="name_ru" id="{{ key }}_name_ru" />
              </div>
              <div>
                <label for="{{ key }}_soato">name_uzl:</label>
                <input formControlName="name_uzl" id="{{ key }}_soato" />
              </div>
            </div>
          </fieldset>
          <!-- } @placeholder {
            <div style="height: 200px;"></div>
          } -->
        }
      </form>
    </div>
  `,
  styleUrl: './region-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionFormComponent {
  readonly STORAGE_KEY_REGION = 'region';
  form: FormGroup = this.fb.group({});

  get regionFromStorage() {
    return localStorage.getItem(this.STORAGE_KEY_REGION);
  }
  data = this.regionFromStorage
    ? JSON.parse(this.regionFromStorage)
    : REGIONS_DATA;
  regionKeys = Object.keys(this.data) as ERegionNames[];

  constructor(private fb: FormBuilder) {
    const controls: any = {};
    for (const region of this.regionKeys) {
      const fields = this.data[region];
      this.form.addControl(region, this.createFormGroup(fields));
    }
  }

  createFormGroup(region: IArea) {
    return this.fb.group({
      id: [region.id],
      new_id: [region['new_id']],
      parent_id: [region.parent_id],
      name_uz: [region.name_uz],
      name_ru: [region.name_ru],
      name_uzl: [region.name_uzl],
      soato: [region['soato']],
      center: [region['center']],
      map_id: [region['map_id']],
      bounds: [region['bounds']],
    });
  }

  save() {
    localStorage.setItem(
      this.STORAGE_KEY_REGION,
      JSON.stringify(this.form.getRawValue()),
    );
  }

  clear() {
    const userConfirm = confirm('Tozalashga aminmisiz?');
    if (userConfirm) {
      localStorage.removeItem(this.STORAGE_KEY_REGION);
      this.data = REGIONS_DATA;
      this.form.reset(this.data);
    }
  }
}
