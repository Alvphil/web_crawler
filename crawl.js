function normalizeURL(url){
    const regex = /https?:\/\/(.+?)\/?$/gi;
    let urlNormal = Array.from(url.matchAll(regex), m => m[1]);
    return String(urlNormal)
}

module.exports = {
    normalizeURL
  }