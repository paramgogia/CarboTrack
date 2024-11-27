const puppeteer = require('puppeteer');

async function scrapeAmazonProducts(url) {
  try {
    console.log('Starting browser...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    console.log('Navigating to Amazon...');
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    console.log('Waiting for products to load...');
    await page.waitForSelector('[data-component-type="s-search-result"]');
    
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('[data-component-type="s-search-result"]');
      
      return Array.from(items).map(item => {
        const priceElement = item.querySelector('.a-price-whole');
        const ratingElement = item.querySelector('.a-icon-star-small .a-icon-alt');
        const imageElement = item.querySelector('.s-image');
        
        return {
          price: priceElement ? `₹${priceElement.textContent.trim()}` : 'N/A',
          rating: ratingElement ? ratingElement.textContent.split(' ')[0] : 'N/A',
          imageUrl: imageElement ? imageElement.getAttribute('src') : 'N/A',
          productUrl: item.querySelector('h2 a') ? 'https://www.amazon.in' + item.querySelector('h2 a').getAttribute('href') : 'N/A'
        };
      });
    });
    
    await browser.close();
    return products;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Main execution function
async function main() {
    const url = 'https://www.amazon.in/s?k=sustainable+products&crid=34ZNNP5D9AQEF&sprefix=sustainable+%2Caps%2C213&ref=nb_sb_ss_ts-doa-p_1_12';
    
    try {
        console.log('Starting scraping process...');
        const products = await scrapeAmazonProducts(url);
        
        // Save to file
        const fs = require('fs');
        const filename = 'amazon-products.json';
        
        fs.writeFileSync(filename, JSON.stringify(products, null, 2));
        
        // Display results in terminal
        console.log('\nScraping completed successfully!');
        console.log(`Total products found: ${products.length}`);
        console.log('\nProduct Details:');
        products.forEach((product, index) => {
            console.log(`\nProduct ${index + 1}:`);
            console.log('Price:', product.price);
            console.log('Rating:', product.rating);
            console.log('Image URL:', product.imageUrl);
            console.log('Product URL:', product.productUrl);
            console.log('-'.repeat(50));
        });
        
        console.log(`\nData has been saved to ${filename}`);
        
    } catch (error) {
        console.error('Failed to scrape products:', error);
    }
}

// Execute the script
main();