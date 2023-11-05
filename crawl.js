//node:url

function normalizeURL(url){
    myUrl = new URL(url)
    url = String(myUrl.hostname+myUrl.pathname)
    //return(myUrl.hostname+myUrl.pathname)
    const regex = /(.+?)\/?$/gi;
    let urlNormal = Array.from(url.matchAll(regex), m => m[1]);
    return String(urlNormal)
    
    /*
    const regex = /https?:\/\/(.+?)\/?$/gi;
    let urlNormal = Array.from(url.matchAll(regex), m => m[1]);
    return String(urlNormal)
    */
}

module.exports = {
    normalizeURL
  }