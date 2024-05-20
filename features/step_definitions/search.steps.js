const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, chooseSeat } = require("../../lib/commands.js");

setDefaultTimeout(120000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://qamid.tmweb.ru${string}`, {
    setTimeout: 45000,
  });
});

When("user goes to the page of the {string} hall", async function (string) {
  await clickElement(this.page, "a:nth-child(2)");
  await page.mouse.wheel({deltaY: 700});
  await clickElement(this.page, "a[data-seance-id='199']");
  return await clickElement(this.page, string);
});

When("selects a {string} ticket", async function (string) {
  return await chooseSeat(this.page, string);
});

When("presses the {string} to buying a ticket", async function (string) {
  return await clickElement(this.page, string);
});

When("presses the {string} to confirm the reservation", async function (string) {
  return await clickElement(this.page, string);
});

Then("user sees the {string}", async function (string) {
  const actual = await this.page.waitForSelector('.ticket__info-qr', { visible: true, });
  const expected = await this.page.waitForSelector(string, { visible: true, });
  expect(actual).contains(expected);
});

Then("user stays on the {string} page", async function (string) {
  const actual = await this.page.url();
  const expected = await this.page.url(string);
  expect(actual).contains(expected);
});

