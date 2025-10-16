# O'zbekiston xaritasi [Angular]

Biror loiyhalarda ishlash jarayonida siz dasturchidan O'zbekiston xaritasini ko'rsatishni va hududlar bo'yicha statistikalarni ko'rsatib berishni so'rashadi. Ushbu repository Angularda yuqoridagi masalada yordam berish uchun qilingan.

# Kutubxona

Loyihadagi asosiy kod projects/ngx-uzbekistan-map ichida yozilgan. Bu kutubxona bo'lib npm ga ham paket ko'rinishida [joylangan](https://www.npmjs.com/package/ngx-uzbekistan-map)
Kutubxona 2 ta komponentni taklif qiladi:

1. Juda oddiy bo'lib sizga karta ko'rnib turadi va biror regionni ustiga kelishiz(hover chiqadi), uni tanlashiz mumkin(tumanlar chiqadi).
2. Ikkinchi komponent Leafletga asoslangan bo'lib unda zoom, pan, drag tushunchalari mavjud va bu bilan kartadan foydalanish yanda qulaylashadi.
   > Leafletga asoslangan komponentni ishlatish uchun loyihangizga `npm install leaflet` komondasi orqali leafletni o'rnatishiz va angular.json fayldagi assets massiviga `"./node_modules/leaflet/dist/leaflet.css"` ni qo'shib qo'yishiz kerak bo'ladi. Buni ham ushbu loyihadan solishtirib qanday qilinganini ko'rib olsangiz bo'ladi.

# Ishga tushirish

Loyihani yuklab olib `ng serve` komandasi orqali ishga tushirsangiz bo'ladi. Sizda 3 ta menudan iborat sahifa chiqadi:

1. **Sample** (Oddiy komponentni qanday ishlatish)
2. **By Leaflet** (Leaflet orqali qilingan komponentni qanday ishlatish)
3. **Constructor**
   Ushbu bo'lim siz uchun juda foydali bo'ladi. Ya'ni bu bo'lim bilan kartani dinamik qilsa bo'ladi. **Qanday qilinadi?** Tepada o'ng tarafda 2 ta forma mavjud. Bittasi hududlar, ikkinchisi tumanlar ma'lumotlarini o'z ichiga oladi. Formalarda sizning tizimingizdagi hudud va tumanlar idlarini bo'glash uchun inputlar mavjud. Ushbu inputlarga mos idlarni yozasiz(ora-orada Saqlash tugmasini bosib ketsangiz ma'lumotlarni yo'qotib qo'ymaysiz) va shundan keyin _Do it_ tugmasini bosasiz va pastki qismdagi textareada loyihadagi o'zgarmas svg (`map.svg`), region va tumanlarning datalari birlashgan yangi svgning matni hosil bo'ladi. Buni nusxalab olib kutubxonadagi `ngx-uzbekistan-map.component.html` faylga va `_svg.ts` ga qo'yishingiz kerak bo'ladi. Shunda kutubxona yangi datalarga moslashgan ko'rinishda paydo bo'ladi.

# Demo

Demo [bu yerda](https://map.utamuratov.uz/)

# Qo'llanma

Qo'llanma [bu yerda](https://youtu.be/9kGOf40SpcA)

# Imkoniyatlar

- Selectable
- Drag
- Zoom In/Out
- Pan

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

# Xulosa

- kartaga tegishli barcha logikalar ushbu loyiha ichidagi kutubxonada yotadi;
- ikki xil uslubdagi kartalar mavjud (oddiy va leafletga asoslangan);
- kartalardan qanday foydalanishni Sample, By Leaflet componentlaridan kodni o'qish orqali bilib olsa bo'ladi;
- Constructor component orqali formalardagi datalar asosida O'zbeksiton xaritasi svg siga ma'lumot yozsa va uni kutubxonaga qo'shsa bo'ladi. Kutubxona kodini (oddiy komponentni yoki leafletga asoslangan komponentni) o'zingizni loyihangizga nusxalab oling va shu ustida bemalol o'zgarish qilaverasiz!

# Donat uchun

Loyiha sizga foydali bo'lgan bo'lsa muallifni qo'llab [quvvatlang](https://tirikchilik.uz/utamuratovs)
