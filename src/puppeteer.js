import puppeteer from "puppeteer";

const getArtists = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://clashfinder.com/m/g2024/?user=14ar4g.s4", {
    waitUntil: "domcontentloaded",
  });
};

console.log(getArtists());
