const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, chooseSeat, getText } = require("../../lib/commands.js");

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
    setTimeout: 60000,
  });
});

When("user select next date", async function () {
  return await clickElement(this.page, "a:nth-child(2)");
});

When("user goes to the page of the Micky Mouse hall", async function () {
  await this.page.mouse.wheel({deltaY: 700});
  return await clickElement(this.page, "a[data-seance-id='199']");
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

Then("user sees {string} title", async function (string) {
  const actual = await getText(this.page, "h2[class='ticket__check-title']");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user stays on the {string} page", async function (string) {
  const actual = await this.page.url();
  const expected = await this.page.url(string);
  expect(actual).contains(expected);
});

