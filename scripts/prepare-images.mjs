import sharp from 'sharp';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
const selections = [
 {name:'storefront', file:'WhatsApp Image 2026-11-09 at 1.35.48 AM.jpeg', reason:'Strongest wide exterior: clear signage, warm evening light, complete produce display.'},
 {name:'corner', file:'WhatsApp Image 2026-11-09 at 1.35.47 AM (1).jpeg', reason:'Vertical streetscape frames the traditional Brussels building and corner shop.'},
 {name:'aisle', file:'WhatsApp Image 2026-11-09 at 1.35.49 AM (5).jpeg', reason:'Clean aisle perspective, useful detail of grocery and household selection.'},
 {name:'shelves', file:'WhatsApp Image 2026-11-09 at 1.35.49 AM (9).jpeg', reason:'Colourful, legible snack shelves; stronger composition than repetitive angled shots.'},
 {name:'omar', file:'WhatsApp Image 2026-11-09 at 1.35.49 AM (12).jpeg', reason:'Warm, natural expression behind the counter; identity and photo use confirmed by the user.'},
];
await mkdir('public/images',{recursive:true});
try { await access('Pictures'); } catch {
 for(const photo of selections)for(const width of [480,768,1200,1600])await access(`public/images/${photo.name}-${width}.webp`);
 await access('public/images/social.jpg');
 console.log('Original Pictures folder absent; using existing optimized assets.');
 process.exit(0);
}
for (const photo of selections) {
 for(const width of [480,768,1200,1600]) await sharp(path.join('Pictures',photo.file)).rotate().resize({width,withoutEnlargement:true}).webp({quality:82,effort:5}).toFile(`public/images/${photo.name}-${width}.webp`);
}
await sharp(path.join('Pictures',selections[0].file)).rotate().resize(1200,630,{fit:'cover',position:'centre'}).jpeg({quality:85}).toFile('public/images/social.jpg');
await writeFile('photo-selection.json', JSON.stringify({note:'All 25 original images inspected on contact sheet. Five selected; originals unchanged. Web exports remove EXIF metadata. Portrait use confirmed by user.',photos:selections},null,2)+'\n');
console.log('Prepared 20 responsive WebP photographs and social image.');
