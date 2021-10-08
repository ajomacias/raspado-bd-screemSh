const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const init = async ()=>{
    const header = randomUseragent.getRandom();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(header);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("https://listado.mercadolibre.com.ec/iphon#D[A:iphon]");
    //await page.screenshot({ path: "image.png" });
    await page.waitForSelector(".ui-search-results")
    const listaItems = await page.$$(".ui-search-layout__item")

    for (const item of listaItems) {
        const objetoPrecio = await item.$(".price-tag-fraction");
        const objetoNombre = await item.$(".ui-search-item__title");

        const obtenerPrecio = await page.evaluate(objetoPrecio => objetoPrecio.innerText, objetoPrecio)
        const obtenerNombre = await page.evaluate(objetoNombre => objetoNombre.innerText, objetoNombre)

        console.log(`---${obtenerPrecio}---${obtenerNombre} `)
    }
    //await browser.close();

}

init();