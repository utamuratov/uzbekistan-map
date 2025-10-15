import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DISTRICTS_BY_REGION, ERegionIds, IArea } from 'ngx-uzbekistan-map';

@Component({
  selector: 'app-district-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <fieldset style="background-color: #e8f4fc;">
      <legend>Muhim!</legend>
      <p>
        Ma'lumotlarga o'zgartirish kiritgach ularni yo'qotmaslik uchun Saqlash
        tushmasi bosib qo'ying
      </p>
      <button (click)="save()">Saqlash</button>
      <button (click)="clear()">Clear storage</button>
    </fieldset>

    <form [formGroup]="form" class="p-4">
      @for (regionKey of regionKeys; track regionKey) {
        <div>
          <fieldset
            style="margin-bottom: 1.5rem; border: 1px solid #ccc; padding: 1rem;"
          >
            <legend>
              <strong>{{ getRegionKeyById(regionKey) }}</strong>
              <span
                style="cursor: pointer; font-size: 12px; margin-left: 4px"
                (click)="hideRegion[regionKey] = !hideRegion[regionKey]"
                >hide/show</span
              >
            </legend>

            <div
              [hidden]="hideRegion[regionKey]"
              formArrayName="{{ regionKey }}"
            >
              @for (
                district of getDistrictArray(regionKey).controls;
                track i;
                let i = $index
              ) {
                <!-- @defer (on viewport) { -->
                <div
                  [formGroupName]="i"
                  style="margin-bottom: 1rem; border: 1px dashed #ccc; padding: 1rem;"
                >
                  <label for="{{ i }}_newId">New ID:</label>
                  <input
                    formControlName="new_id"
                    class="input"
                    id="{{ i }}_newId"
                  /><br />

                  <label>SOATO:</label>
                  <input formControlName="soato" class="input" /><br />

                  <label>Name (uz):</label>
                  <input formControlName="name_uz" class="input" /><br />

                  <label>Name (ru):</label>
                  <input formControlName="name_ru" class="input" /><br />

                  <label>Name (uzl):</label>
                  <input formControlName="name_uzl" class="input" /><br />
                </div>
                <!-- } @placeholder {
                  <div style="height: 200px;"></div>
                } -->
              }
            </div>
          </fieldset>
        </div>
      }
    </form>
  `,
  styleUrl: './district-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictFormComponent {
  readonly ERegionIds = ERegionIds;
  readonly STORAGE_KEY_DISTRICT = 'districtByRegion';
  form: FormGroup;

  get regionFromStorage() {
    return localStorage.getItem(this.STORAGE_KEY_DISTRICT);
  }
  data = this.regionFromStorage
    ? JSON.parse(this.regionFromStorage)
    : DISTRICTS_BY_REGION;
  regionKeys = Object.keys(this.data) as ERegionIds[];

  hideRegion: Record<ERegionIds, boolean> = {} as Record<ERegionIds, boolean>;

  constructor(private fb: FormBuilder) {
    const regionGroups: Record<string, FormArray> = {};

    for (const regionKey of this.regionKeys) {
      const districtArray = this.data[regionKey].map((district: IArea) =>
        this.fb.group({
          id: [district.id],
          parent_id: [district.parent_id],
          name_uz: [district.name_uz],
          name_ru: [district.name_ru],
          name_uzl: [district.name_uzl],
          new_id: [district['new_id']],
          soato: [district['soato']],
        }),
      );

      regionGroups[regionKey] = this.fb.array(districtArray);
    }

    this.form = this.fb.group(regionGroups);
  }

  getDistrictArray(regionKey: string): FormArray {
    return this.form.get(regionKey) as FormArray;
  }

  getRegionKeyById(id: string): keyof typeof ERegionIds | undefined {
    const entry = Object.entries(ERegionIds).find(([_, value]) => value === id);
    return entry ? (entry[0] as keyof typeof ERegionIds) : undefined;
  }

  save() {
    localStorage.setItem(
      this.STORAGE_KEY_DISTRICT,
      JSON.stringify(this.form.getRawValue()),
    );
  }

  clear() {
    const userConfirm = confirm('Tozalashga aminmisiz?');
    if (userConfirm) {
      localStorage.removeItem(this.STORAGE_KEY_DISTRICT);
      this.data = DISTRICTS_BY_REGION;
      this.form.reset(this.data);
    }
  }
}
