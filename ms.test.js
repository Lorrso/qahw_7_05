const { expect } = require("chai");
const { clickElement, chooseSeat } = require("./lib/commands.js");

let page;

jest.setTimeout(120000);
beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, "a:nth-child(2)");
    await page.mouse.wheel({deltaY: 700});
    await clickElement(page, "a[data-seance-id='199']");
});

afterEach(() => {
  page.close();
});

describe("Movie service testing", () => {
    test("Buying a standart ticket", async () => {
        await chooseSeat(page, "standart");
        await clickElement(page, '.acceptin-button'); 
        expect(page.url()).equal('http://qamid.tmweb.ru/client/payment.php'); 
        await clickElement(page, '.acceptin-button'); 
        expect(page.url()).equal('http://qamid.tmweb.ru/client/ticket.php');
        await page.waitForSelector('.ticket__info-qr', { visible: true, });
    });
  
    test("Buying a VIP ticket", async () => {
        await chooseSeat(page, "vip");
        await clickElement(page, '.acceptin-button');
        expect(page.url()).equal('http://qamid.tmweb.ru/client/payment.php');
        await clickElement(page, '.acceptin-button');
        expect(page.url()).equal('http://qamid.tmweb.ru/client/ticket.php');
        await page.waitForSelector('.ticket__info-qr', { visible: true, });
    });
  
    test("Trying to buy an already purchased ticket", async () => {
        await chooseSeat(page, "disabled");
        await clickElement(page, '.acceptin-button');
        expect(page.url()).equal('http://qamid.tmweb.ru/client/hall.php');
    });
  });