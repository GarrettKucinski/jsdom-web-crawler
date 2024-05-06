import { JSDOM } from 'jsdom';

const removeProtocol = url => url.replace(/https?:\/\//ig, '')
const removeTrailingSlash = url => url.replace(/\/$/g, '');
const removeWWW = url => url.replace(/^www\./ig, '')
const removeQueryParam = url => url.replace(/\?.*/, '')

function normalizeURL (url) {
  return removeWWW(removeTrailingSlash(removeProtocol(removeQueryParam(url.toLowerCase()))));
}

function getUrlsFromHtml(htmlBody, baseUrl) {
  const dom = new JSDOM(htmlBody);
  const urls = [...dom.window.document.querySelectorAll('a')];

  return urls.map(url => {
    const href = url.getAttribute('href');
    try {
      // convert any relative URLs to absolute URLs
      return new URL(href, baseUrl).href;
    } catch(err) {
      return href;
    }
  });
}

async function fetchHtmlFor(currentUrl) {
  try {
    const res = await fetch(currentUrl);

    if (res.status >= 400 || !res.headers.get('content-type').includes('text/html')) {
      throw Error('Error crawling page');
    }

    const html = await res.text();

    return html;
  } catch (err) {
    console.log(err.message);
  }
}

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {
  // if this is an offsite URL, bail immediately
  const currentUrlObj = new URL(currentUrl)
  const baseUrlObj = new URL(baseUrl)
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages
  }

  const normalizedCurrentUrl = normalizeURL(currentUrl);

  if (pages[normalizedCurrentUrl] > 0) {
    pages[normalizedCurrentUrl] += 1;
    return pages;
  }

  pages[normalizedCurrentUrl] = 1

  console.log(`crawling ${currentUrl}`)
  let html = '';

  try {
    html = await fetchHtmlFor(currentUrl);
  } catch (err) {
    return pages;
  }

  const urls = getUrlsFromHtml(html, baseUrl);
  for (const url of urls) {
    pages = await crawlPage(baseUrl, url, pages);
  }

  return pages;
}

export { normalizeURL, getUrlsFromHtml, crawlPage };
