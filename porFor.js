const fs = require("fs");
const puppeteer = require("puppeteer");
const randomUseragent = require("random-useragent");

const importar = fs.readFileSync("./fotos/productList.json")
const listPags = JSON.parse(importar);

const init = async () => {
    const lista = [];
    for (let i = 0; i < listPags.length; i++) {
        const header = randomUseragent.getRandom();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent(header);
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(listPags[i]);
        await page.click(".icon-table");
        await page.screenshot({ path: "porFor.png" });
        await page.waitForSelector("#center_column");
        await page.waitForSelector("#product_list");
        const listaItems = await page.$$(".ajax_block_product")


        for (const item of listaItems) {
            const objetoPrecio = await item.$(".product-price");
            const objetoTexto = await item.$(".product-name");
            const obtenerPrecio = await page.evaluate(objetoPrecio => objetoPrecio.innerText, objetoPrecio);
            const obtenerTexto = await page.evaluate(objetoTexto => objetoTexto.innerText, objetoTexto);
            lista.push({ nombre: obtenerTexto, precio: obtenerPrecio });

        }
        await browser.close();
        console.log("pag: ", i, " acabada")
    }

    return lista;
}

init().then((data)=>{
    const cadena = JSON.stringify(data);
    fs.writeFile('lista.json', cadena, (err) => {
        if (err) throw err;
        console.log('Data written to file');
      });
});
