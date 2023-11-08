const { normalizeURL, getURLsFromHTML, crawlPage } = require('./crawl.js')


async function main(){
    var pages = {}
    if (process.argv.length < 3){
        console.log(`no url provided`)
        process.exit(1);
    }

    if (process.argv.length === 3) {
        const baseURL = process.argv[2]
        const currentURL = baseURL
        console.log(`url provided: ${baseURL}`)
        const normalizedURL = normalizeURL(baseURL)
        console.log(`normalized url: ${normalizedURL}`)

        pages = await crawlPage(baseURL, currentURL, pages)
        console.log(`${JSON.stringify(pages, null, 4)}`)
    }
}

main()