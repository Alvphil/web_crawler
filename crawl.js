const { JSDOM } = require('jsdom')


function normalizeURL(url){
    const myUrl = new URL(url);
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

async function crawlPage(baseURL, currentURL, pages){
    const baUrl = new URL(baseURL);
    const cuUrl = new URL(currentURL);
    if (baUrl.hostname !== cuUrl.hostname){
        //console.log(`got to the check ${baUrl.hostname} != ${cuUrl.hostname}`)
        return pages
    }
    normalizedCurrentURL = normalizeURL(currentURL)
    if (normalizedCurrentURL in pages){
        pages[normalizedCurrentURL] += 1
        //console.log(`the url in in pages ${normalizedCurrentURL}`)
        return pages
    }
    else{
        if (currentURL === baseURL){
            pages[normalizedCurrentURL] = 0
        }
        else{
            //console.log(`should be adding ${currentURL} to pages, added ${normalizedCurrentURL}`)
            pages[normalizedCurrentURL] = 1
        }
    }
    let webPage = ""
    try {
        webPage = await fetch(currentURL)
        //console.log(`fetching ${currentURL}`)
    }catch(err){
        console.log(err)
        return pages
    }
    const contentType = await webPage.headers.get("content-type")
    if (!contentType || !contentType.includes("text/html")){
        console.log(`Wrong content type.`)
        return pages
    }
    else{
        const body = await webPage.text()
        const urlsToCrawl = getURLsFromHTML(body, baseURL)
        for (url of urlsToCrawl){
           // console.log(url)
            pages = await crawlPage(baseURL, url, pages)
        }
    }
    return pages

}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
  }