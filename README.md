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

# Xulosa

- kartaga tegishli barcha logikalar ushbu loyiha ichidagi kutubxonada yotadi;
- ikki xil uslubdagi kartalar mavjud (oddiy va leafletga asoslangan);
- kartalardan qanday foydalanishni Sample, By Leaflet componentlaridan kodni o'qish orqali bilib olsa bo'ladi;
- Constructor component orqali formalardagi datalar asosida O'zbeksiton xaritasi svg siga ma'lumot yozsa va uni kutubxonaga qo'shsa bo'ladi. Kutubxona kodini (oddiy komponentni yoki leafletga asoslangan komponentni) o'zingizni loyihangizga nusxalab oling va shu ustida bemalol o'zgarish qilaverasiz!

# Donat uchun

Loyiha sizga foydali bo'lgan bo'lsa muallifni qo'llab [quvvatlang](https://tirikchilik.uz/utamuratovs)
