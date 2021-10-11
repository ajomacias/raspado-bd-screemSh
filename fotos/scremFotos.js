const fs = require("fs");
const puppeteer = require("puppeteer")
const randomUseragent = require("random-useragent");

let importar = fs.readFileSync('pag.json');
let paginas = JSON.parse(importar);

const tomarFoto = async () => { 


    for (let i = 0; i < paginas.length; i++) {
        console.log("loding...    ")
        const header = randomUseragent.getRandom();
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setUserAgent(header);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(paginas[i]);

        await page.waitForSelector("#views_block");
        item = await page.$("#view_full_size");
        const objetoLink = await item.$("#bigpic")
        const obtenerLink = await page.evaluate(objetoLink => objetoLink.getAttribute("src"), objetoLink);
        await page.close();
        const page1 = await browser.newPage();
        await page1.setUserAgent(header);
        await page1.setViewport({ width: 1920, height: 1080 });
        await page1.goto(obtenerLink);

        const nuevo = obtenerLink.replace("https://okfarma.es/", "");
        await page1.screenshot({ path: "./productos/imagen" + i + ".png" })
        await page1.close();
        console.log("sucsess..    ")
        console.log("add imagen" + i + ".png ")
        await browser.close()

    }


}

tomarFoto();