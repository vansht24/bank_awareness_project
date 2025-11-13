import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Circular } from '../client/src/components/CircularCard';

// Define a simple in-memory cache
let circularCache: Circular[] = [];
let lastFetched = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const RBI_NOTIFICATIONS_URL = 'https://www.rbi.org.in/Scripts/NotificationUser.aspx';

export async function getCirculars(): Promise<Circular[]> {
  const now = Date.now();
  if (now - lastFetched < CACHE_DURATION && circularCache.length > 0) {
    console.log('✅ Returning cached circulars:', circularCache.length);
    return circularCache;
  }

  try {
    console.log('🔄 Fetching from RBI website...');
    const { data } = await axios.get(RBI_NOTIFICATIONS_URL);
    console.log('✅ HTML fetched, length:', data.length);
    
    const $ = cheerio.load(data);
    const scrapedCirculars: Circular[] = [];

    let currentDate = '';

    // The structure is: date headers followed by notification links
    $('table.tablebg tr').each((_i, el) => {
      const row = $(el);
      const tds = row.find('td');
      
      // Single column rows contain dates
      if (tds.length === 1) {
        const text = $(tds[0]).text().trim();
        // Check if it's a date (format like "Jun 06, 2025" or "May 27, 2025")
        if (text.match(/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}$/)) {
          currentDate = text;
          console.log('📅 Found date header:', currentDate);
        }
      }
      
      // Two column rows contain the notification title and file size
      if (tds.length === 2 && currentDate) {
        const titleCell = $(tds[0]);
        const sizeText = $(tds[1]).text().trim();
        
        // Find the link
        const linkEl = titleCell.find('a').first();
        const title = linkEl.text().trim();
        let link = linkEl.attr('href') || '';
        
        console.log('📝 Processing:', {
          title: title.substring(0, 60),
          link: link.substring(0, 50),
          date: currentDate,
          size: sizeText
        });

        if (title && link && currentDate) {
          // Fix relative links
          if (link.startsWith('/')) {
            link = `https://www.rbi.org.in${link}`;
          } else if (!link.startsWith('http')) {
            link = `https://www.rbi.org.in/${link}`;
          }

          scrapedCirculars.push({
            id: link, // Use link as a unique ID
            number: '', // The list page doesn't provide a number
            title: title,
            summary: `File size: ${sizeText}`, // Use file size as summary
            fullContent: link, // Store the link for the iframe
            date: currentDate,
            category: 'RBI Notification',
            authority: 'Reserve Bank of India',
          });
          
          console.log('✅ Added circular:', title.substring(0, 60));
        }
      }
    });

    console.log('📊 Total circulars scraped:', scrapedCirculars.length);

    // Update cache
    circularCache = scrapedCirculars.slice(0, 50); // Store latest 50
    lastFetched = now;

    console.log('💾 Cached', circularCache.length, 'circulars');
    return circularCache;

  } catch (error) {
    console.error('❌ Error scraping RBI website:', error);
    // If scraping fails, return the (possibly stale) cache to avoid crashing
    return circularCache;
  }
}