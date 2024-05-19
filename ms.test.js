const { expect } = require("chai");
const { clickElement } = require("./lib/commands.js");

let page;

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
        await clickElement(page, 'div[class="buying-scheme__wrapper"] div:nth-child(1) span:nth-child(3)'); // выбор первого свободного места
        await clickElement(page, '.acceptin-button'); // нажали на кнопку "Подтвердить"
        expect(page.url()).equal('http://qamid.tmweb.ru/client/payment.php'); // проверили, что перешли на страницу брони
        await clickElement(page, '.acceptin-button'); // нажали на кнопку "Подтвердить"
        expect(page.url()).equal('http://qamid.tmweb.ru/client/ticket.php'); // проверили, что перешли на страницу билета
        await page.waitForSelector('.ticket__info-qr', { visible: true, }); // проверка на видимость qr
    });
  
    test("Buying a VIP ticket", async () => {
        await clickElement(page, 'div[class="buying-scheme__wrapper"] div:nth-child(1) span:nth-child(6)'); // выбор места
        await clickElement(page, '.acceptin-button'); // нажали на кнопку "Подтвердить"
        expect(page.url()).equal('http://qamid.tmweb.ru/client/payment.php'); // проверили, что перешли на страницу брони
        await clickElement(page, '.acceptin-button'); // нажали на кнопку "Подтвердить"
        expect(page.url()).equal('http://qamid.tmweb.ru/client/ticket.php'); // проверили, что перешли на страницу билета
        await page.waitForSelector('.ticket__info-qr', { visible: true, }); // проверка на видимость qr
    });
  
    test("Trying to buy an already purchased ticket", async () => {
        await clickElement(page, 'div[class="buying-scheme"] div:nth-child(2) span:nth-child(8)'); // выбор первого забронированного места
        await clickElement(page, '.acceptin-button'); // нажали на кнопку "Подтвердить"
        expect(page.url()).equal('http://qamid.tmweb.ru/client/hall.php'); // проверили, что остались на странице
    });
  });