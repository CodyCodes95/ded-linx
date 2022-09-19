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
const oldLinks = [] as any

const crawl = async (url: string) => {
    if (seenUrls[url]) return
    seenUrls[url] = true
    crawlCount ++
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const links = $("a").map((i, link) => link.attribs.href).get()

    const { host } = urlParser.parse(url) as any

    links.filter(link => link.includes(host)).forEach(link => {
        if (!newUrls.some((website: any) => link.toLowerCase().includes(website.toLowerCase()))) {
            // console.log(`Old Link: ${link} found on URL ${url}`);
            foundOldLinks[url] = foundOldLinks[url] ? [...foundOldLinks[url], link] : [link]
        }
        if (link.includes(newUrls[0])) {
            crawl(getUrl(link))
        }
    })
}

// if same old link found on multiple pages, flag that.
crawl(url)
}

export default getDeadLinks