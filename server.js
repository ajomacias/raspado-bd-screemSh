const puppeteer = require('puppeteer');
const randomUseragent = require('random-useragent');

const init = async () => {
  const header = randomUseragent.getRandom();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setUserAgent(header);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto("https://okfarma.es/medicamentos#/page-21");
  await page.click(".icon-table");
  await page.waitForSelector("#center_column");
  await page.waitForSelector("#product_list");
  const listaItems = await page.$$(".ajax_block_product")
  

  const lista = [];

  for (const item of listaItems) {


    const objetoPrecio = await item.$(".product-price");

    //const objetoImagen = await item.$(".img-responsive");

    const objetoTexto = await item.$(".product-name");

    const obtenerPrecio = await page.evaluate(objetoPrecio => objetoPrecio.innerText, objetoPrecio);
    const obtenerTexto = await page.evaluate(objetoTexto => objetoTexto.innerText, objetoTexto);


    //const obtenerImagen = await page.evaluate(objetoImagen => objetoImagen.getAttribute("src"), objetoImagen);
    lista.push({ nombre: obtenerTexto, precio: obtenerPrecio });

  }
  await browser.close();
  return JSON.stringify(lista);
  
}
init().then(data => {
  console.log(data);
});