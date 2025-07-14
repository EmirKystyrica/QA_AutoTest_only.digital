const { test, expect } = require('@playwright/test');
test('Проверяем футер и хэддер сайта Only', async ({ page }) => {
  test.setTimeout(30000);

  await page.goto('https://only.digital/en', { 
    waitUntil: 'domcontentloaded',
    timeout: 30000
  });

  await expect(page).toHaveURL(/en/);
  console.log('Страница загрузилась');

  // Хэд
  console.log(' Проверяем наличие элементов хэдера ');
  const headerLinks = [
    '/en/projects',
    '/en/company',
    '/en/fields',
    '/en/job',
    '/en/blog',
    '/en/contacts'
  ];
  for (const href of headerLinks) {
    const links = page.locator(`a[href="${href}"]`);
    const count = await links.count();
    if (count > 0) {
      console.log(`✅ Found ${count} links for ${href}`);
    } else {
      console.log(`❌ No links found for ${href}`);
    }
  }
  // Фут
  console.log('\n Проверяем наличие элементов футера ');
  const footer = page.locator('footer');
  await expect.soft(footer).toBeVisible();
  console.log('✅ Footer is visible');
  const externalLinks = [
    'https://t.me/onlydigitalagency',
    'https://t.me/onlycreativedigitalagency',
    'https://vk.com/onlydigitalagency',
    'https://www.behance.net/onlydigitalagency'
  ];
  for (const href of externalLinks) {
    const links = footer.locator(`a[href="${href}"]`);
    const count = await links.count();
    if (count > 0) {
      console.log(`✅ Found ${count} external links for ${href}`);
    } else {
      console.log(`❌ No external links found for ${href}`);
    }
  }
  console.log('\n Проверяем контактные данные');
  const emailLink = footer.locator('a[href^="mailto:"]').first();
  const emailHref = await emailLink.getAttribute('href');
  if (emailHref && emailHref.includes('@only.digital')) {
    console.log(`✅ Email found: ${emailHref}`);
  } else {
    console.log(`❌ Email not found or invalid`);
  }
  const phoneLink = footer.locator('a[href^="tel:"]').first();
  const phoneHref = await phoneLink.getAttribute('href');
  const phoneDigits = phoneHref ? phoneHref.replace(/\D/g, '') : '';
  if (phoneDigits.includes('74957409979')) {
    console.log(`✅ Phone found: ${phoneHref}`);
  } else {
    console.log(`❌ Phone not found or invalid`);
  }
  console.log('\n Проверяем выгрузку ПДФ файла Политики конфиденциальности ');
  const pdfLinks = footer.locator('a[href$=".pdf"]');
  const pdfCount = await pdfLinks.count();
  console.log(`Found ${pdfCount} PDF documents`);
});