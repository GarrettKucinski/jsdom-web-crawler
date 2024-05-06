import { argv } from 'node:process';
import { crawlPage } from './crawl.js';
import printReport from './report.js';

function main() {
  const [,,...rest] = argv;
  if (rest.length === 1) {
    const [url] = rest;
    console.log(`Starting crawl at ${url}`)
    crawlPage(url).then(printReport);
  } else {
    console.log("Error: only one url is accepted as an argument");
  }
}

main()
