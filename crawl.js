const { JSDOM } = require('jsdom')


function normalizeURL(url){
    myUrl = new URL(url);
    url = String(myUrl.hostname+myUrl.pathname);
    const regex = /(.+?)\/?$/gi;
    let urlNormal = Array.from(url.matchAll(regex), m => m[1]);
    return String(urlNormal);
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const site = new JSDOM(htmlBody)
    const aElements = site.window.document.querySelectorAll('a')
 
    for (aElement of aElements){
        if (aElement.href.slice(0,1) === '/'){
            try {
                urls.push(new URL(aElement.href, baseURL).href)
              } catch (err){
                console.log(`${err.message}: ${aElement.href}`)
              }
            } else {
              try {
                urls.push(new URL(aElement.href).href)
              } catch (err){
                console.log(`${err.message}: ${aElement.href}`)
              }
            }
          }
    return urls
}

function crawlPage(baseURL){

}


module.exports = {
    normalizeURL,
    getURLsFromHTML
  }