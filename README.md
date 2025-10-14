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
   Ushbu bo'lim siz uchun juda foydali bo'ladi. Ya'ni bu bo'lim bilan kartani dinamik qilsa bo'ladi. **Qanday qilinadi?** Tepada o'ng tarafda ikkita textarea bo'lib hudud va tumanlar haqidagi kerakli ma'lumotlarni ya'ni turli xil tildagi nomlarini va ularning id larini ushlab turadi. Agar viloyat yoki tuman nomlari o'zgaradigan bo'lsa, sizdagi id lar boshqacha bo'lsa ushbu json ma'lumotlarni o'zizga nusxalab olib keraklicha to'g'irlab olishingiz kerak bo'ladi. Shundan keyin _Do it_ tugmasini bosasiz va pastki qismdagi textareada loyihadagi o'zgarmas svg (map.svg), region va tumanlarning json datalari birlashgan yangi svgning matni hozil bo'ladi. Buni nusxalab olib kutubxonadagi `ngx-uzbekistan-map.component.html` faylga va `_svg.ts` ga qo'yishingiz kerak bo'ladi. Shunda kutubxona yangi datalarga moslashgan ko'rinishda paydo bo'ladi. Demak kutubxonadagi karta ma'lumotlari(asosan ID) sizga mos kelmasa kodni bemalol nusxalab olib o'zizga moslaysiz yoki shu datalarga loyihangizni moslaysiz.

# Demo

Shu yerda link bo'ladi demoga ;)

# Xulosa

- kartaga tegishli barcha logikalar ushbu loyiha ichidagi kutubxonada yotadi;
- ikki xil uslubdagi kartalar mavjud (oddiy va leafletga asoslangan);
- kartalardan qanday foydalanishni Sample, By Leaflet componentlaridan kodni o'qish orqali bilib olsa bo'ladi;
- Constructor component orqali esa json datadan O'zbeksiton xaritasi svg siga ma'lumot yozsa va uni kutubxonaga qo'shsa bo'ladi.

# Donat uchun

Loyiha sizga foydali bo'lgan bo'lsa muallifni qo'llab [quvvatlang](https://tirikchilik.uz/utamuratovs)
