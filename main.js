const { normalizeURL, getURLsFromHTML } = require('./crawl.js')


function main(){
    if (process.argv.length < 3){
        console.log(`no url provided`)
        process.exit(1);
    }
    
    if (process.argv.length === 3) {
        const url = process.argv[2]

        console.log(`url provided: ${url}`)
        const normalizedURL = normalizeURL(url)
        console.log(`normalized url: ${normalizedURL}`)
    }
}

main()