import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true});
const baseUrl=process.env.QA_URL || 'http://127.0.0.1:3010';
const errors=[]; const results=[];
for(const width of [320,375,390,768,1024,1440,1920]){
 const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1}); const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(baseUrl,{waitUntil:'networkidle'});
 await page.evaluate(async()=>{await document.fonts.ready;for(const image of document.images){image.loading='eager';}await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
 await page.emulateMedia({reducedMotion:'reduce'}); await page.evaluate(()=>document.fonts.ready);
 const state=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),phoneLinks:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>a.getAttribute('href')),brokenAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(1))).map(a=>a.getAttribute('href')),h1:document.querySelectorAll('h1').length,fonts:document.fonts.status}));
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 results.push({width,status:response.status(),...state,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
 await page.evaluate(()=>document.activeElement?.blur());
 if([390,1440].includes(width))await page.screenshot({path:`qa/${width}-full.png`,fullPage:true});
 if(width===1440){await page.screenshot({path:'qa/desktop-opening.png'}); await page.locator('#omar').screenshot({path:'qa/desktop-story.png'}); await page.locator('#essentials').screenshot({path:'qa/desktop-essentials.png'});} if(width===390){await page.screenshot({path:'qa/mobile-opening.png'}); await page.locator('#omar').screenshot({path:'qa/mobile-story.png'});}
 await context.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(baseUrl);const noJsVisible=await nojs.locator('#omar h2').isVisible();await nojs.close();
const key=await browser.newPage();await key.goto(baseUrl);await key.keyboard.press('Tab');const skipFocused=await key.locator('.skip-link').evaluate(e=>e===document.activeElement);await key.keyboard.press('Enter');const skipTarget=await key.evaluate(()=>location.hash);await key.locator('.nav-visit').click();await key.waitForTimeout(100);const visitTarget=await key.evaluate(()=>location.hash);await key.close();
await browser.close();
const report={results,errors,noJsVisible,skipFocused,skipTarget,visitTarget};await writeFile('qa/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));if(errors.length||results.some(r=>r.overflow||r.brokenImages.length||r.brokenAnchors.length||r.violations.length)||!noJsVisible||!skipFocused||visitTarget!=='#visit')process.exitCode=1;

