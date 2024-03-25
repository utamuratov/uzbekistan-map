# NgxUzbekistanMap [DEMO](https://stackblitz.com/edit/stackblitz-starters-sfphfr)

O'zbekiston kartasi (svg)

- Selectable
- Drag
- Zoom In/Out

# Versions

Angular 16 dan tepada ishlaydi (moslasa bo'ladi talab bo'lsa)

# Dependencies

Leafletni o'rnatish kerak:

1. `npm install leaflet`
2. "./node_modules/leaflet/dist/leaflet.css" ni angular.jsonga qoshish kerak

# Extra

- < 0.1.0 Leaflet yo'q. Bundan tepa versiyalarda leaflet bor. Kamchilik tooltip yoq va tashqaridan region bosilsa regionga bormaydi(zoom va pan yoq)
- 2.0.0 versiyadan tepada ikki xil map bor: <ngx-uzbekistan-map /> va <ngx-uzbekistan-map-leaflet />
- 3.0.0 dan boshlab default tanlangan bo'lish va permission

## Inputs (ngx-uzbekistan-map)

| Inputs                      | Vazifasi                                                                                                              | Default   |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| defaultProvinceOrDistrictId | Tuman yoki viloyatni idsi berilsa kartada o'sha tuman yoki viloyat tanlangan bo'lib qoladi                            | undefined |
| permission                  | Ushbu input qiymatiga qarab kartani tanlay olasiz. Quyidagi qiymatlar bo'lishi mumkin: 'full', 'province', 'district' | 'full'    |
| scale                       | Kartani zoomi                                                                                                         | '1.5'     |
| zoomForDistrict             | Tanlangan tuman uchun zoom va centre ga olib kelish                                                                   | false     |

## Outputs (ngx-uzbekistan-map)

| Outputs              | Vazifasi                                                                   | Output |
| -------------------- | -------------------------------------------------------------------------- | ------ |
| onSelectedProvince   | Viloyat tanlanganda emit bo'ladi                                           | IArea  |
| onSelectedDistrict   | Tuman tanlanganda emit bo'ladi                                             | IArea  |
| onSelectedUzbekistan | Butun O'zbekiston tanlanganda(ya'ni tashqari click bo'lganda) emit bo'ladi | void   |
