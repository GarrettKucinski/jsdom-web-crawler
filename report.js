function sortPages(pages) {
  return Object.entries(pages).sort((a, b) => {
    const [,nameA] = a;
    const [,nameB] = b;
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
}

export default function printReport(pages) {
  console.log("Starting crawl report")
  const sortedPages = sortPages(pages);
  for (const [key, val] of Object.entries(sortedPages)) {
    console.log(`Found ${val} for url ${key}`)
  }
}
