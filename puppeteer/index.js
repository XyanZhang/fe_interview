import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage({headless: true});

  // Navigate the page to a URL
  await page.goto('https://www.huajin.com/');
  // Set screen size
  await page.setViewport({width: 1920, height: 3000});
  // 截取屏幕截图并保存为图片文件
  await page.screenshot({ path: 'screenshot.png' });

  // 关闭浏览器实例
  await browser.close();
  return 

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();