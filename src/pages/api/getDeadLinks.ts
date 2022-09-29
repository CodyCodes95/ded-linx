import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as urlParser from 'url';

const getDeadLinks = async (req: any, res: any) => {

const url = req.body.newUrl

    const newUrls = req.body.allowedSubdomains

    const getUrl = (link: string) => {
        if (link.includes('http')) {
            return link
        } else if (link.startsWith('/')) {
            // console.log(`SHOURTCUT ${link}` )
            return `${url}/${link}`
        } else {
            return `${url}/${link}`
        }
    }

    const seenUrls = {} as any
    const foundOldLinks = {} as any
    let crawlCount = 0
    let pageFinished: any
    const crawl = async (url: string) => {
        pageFinished = false
        console.log(`CRAWLING ${url}`)
        seenUrls[url] = true
        crawlCount++
        const res = await fetch(url)
        const html = await res.text()
        const $ = cheerio.load(html)
        const links = $("a").map((i:any, link:any) => link.attribs.href).get()

        const { host } = urlParser.parse(url) as any
        let i = 0

        for (let link of links.filter(link => link.includes(host))) {
            if (!newUrls.some((website: any) => link.toLowerCase().includes(website.toLowerCase()))) {
                console.log(`Old Link: ${link} found on URL ${url}`);
                foundOldLinks[url] = foundOldLinks[url] ? [...foundOldLinks[url], link] : [link]
            }
            i++
            if (i === links.filter(link => link.includes(host)).length) {
                pageFinished = true
                console.log(`PAGE FINISHED ${url}`)
            }
            if (link.includes(newUrls[0]) && !seenUrls[getUrl(link)]) {
                await crawl(getUrl(link))
            }
        }
    }

    const crawlAll = async () => {
         return await crawl(url).then(() => {
            console.log('CRAWL FINISHED')
            return Object.entries(foundOldLinks).map(([key,value]) => ({url: key, links: value}))
        })
    }

    const result = await crawlAll()
    console.log(result)
    res.status(200).json({ foundOldLinks: result })
}

export default getDeadLinks