const removeProtocol = url => url.replace(/https?:\/\//ig, '')
const removeTrailingSlash = url => url.replace(/\/$/g, '');
const removeWWW = url => url.replace(/^www\./ig, '')
const removeQueryParam = url => url.replace(/\?.*/, '')

function normalizeURL (url) {
  return removeWWW(removeTrailingSlash(removeProtocol(removeQueryParam(url.toLowerCase()))));
}

export { normalizeURL };
