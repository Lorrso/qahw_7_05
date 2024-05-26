module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  chooseSeat: async function (page, string) {
    try {
      const scheme = 'div[class="buying-scheme__wrapper"]';
      const row = 'div[class="buying-scheme__row"]';
      const seat = `span[class="buying-scheme__chair buying-scheme__chair_${string}"]`;
      await page.waitForTimeout(5000);
      await page.waitForSelector(scheme);
      await page.click(scheme);
      await page.waitForSelector(row);
      await page.click(row);
      await page.waitForSelector(seat);
      await page.click(seat);
    } catch (error) {
      throw new Error(`Seat cannot be found: ${seat}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
};
