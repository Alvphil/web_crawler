function printReport(pages){
    console.log("Starting to create a report....")
    let sortedByValues = Object.entries(pages).sort((a, b) => b[1] - a[1]);
    for (const [url, count] of sortedByValues){
        console.log(`Found ${count} internal links to ${url}`)
    }
        

}

module.exports = {
    printReport
  }