
import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

describe('Test the normalizeUrl function', () => {
  const output = 'blog.boot.dev/path';

  test('url should not include protocol', () => {
    const url = 'https://blog.boot.dev/path';
    const url2 = 'https://blog.boot.dev/path';

    expect(normalizeURL(url)).toEqual(output);
    expect(normalizeURL(url2)).toEqual(output);
  });

  test('url should not end in a forward slash', () => {
    const url = 'http://blog.boot.dev/path/';
    const url2 = 'http://blog.boot.dev/path/';

    expect(normalizeURL(url)).toEqual(output);
    expect(normalizeURL(url2)).toEqual(output);
  });

  test('url should not contain www', () => {
    const url = 'www.blog.boot.dev/path/';
    const url2 = 'www.blog.boot.dev/path/';
    const url3 = 'https://www.blog.boot.dev/path/';

    expect(normalizeURL(url)).toEqual(output);
    expect(normalizeURL(url2)).toEqual(output);
    expect(normalizeURL(url3)).toEqual(output);
  });

  test('url should not containe query params', () => {
    const url = 'http://blog.boot.dev/path/?page=1&limit=25';
    expect(normalizeURL(url)).toEqual(output);
  });
  test('url should be all lower case', () => {
    const url = 'http://BLOG.boot.dev/path/?page=1&limit=25';
    expect(normalizeURL(url)).toEqual(output);
  });
})
