import { test, expect } from "@jest/globals";
import { getUrlsFromHtml } from "./crawl.js";

describe('Test the normalizeUrl function', () => {
  const output = 'blog.boot.dev/path';

  test('it should get all urls and convert them to absolute urls', () => {
    const html = `<!DOCTYPE html> <html> <head><title></title></head> <body> <p>Hello world</p> <div> <a href="/somewhere">link one</a> <p><a href="/linktwo/linkcontent">Link Two</a></p> </div> <section> <div> <span> <a href="/buriedlink/deepinthepage">Link Three</a> </span> </div> </section> </body> </html>`;

    const urls = getUrlsFromHtml(html, 'https://somewhere.com')
    const actual = [
      'https://somewhere.com/somewhere',
      'https://somewhere.com/linktwo/linkcontent',
      'https://somewhere.com/buriedlink/deepinthepage'
    ];
    
    expect(urls).toEqual(actual);
    expect(urls.length).toEqual(3);
  });

  test('it should not convert absolute urls', () => {
    const html = `<!DOCTYPE html> <html> <head><title></title></head> <body> <p>Hello world</p> <div> <a href="https://somewhereelse.com/somewhere">link one</a> <p><a href="/linktwo/linkcontent">Link Two</a></p> </div> <section> <div> <span> <a href="/buriedlink/deepinthepage">Link Three</a> </span> </div> </section> </body> </html>`;

    const urls = getUrlsFromHtml(html, 'https://somewhere.com')
    const actual = [
      'https://somewhereelse.com/somewhere',
      'https://somewhere.com/linktwo/linkcontent',
      'https://somewhere.com/buriedlink/deepinthepage'
    ];
    
    expect(urls).toEqual(actual);
    expect(urls.length).toEqual(3);
  });
});
