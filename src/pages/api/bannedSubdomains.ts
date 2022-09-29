import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import * as urlParser from 'url';

const bannedSubdomains = async (req: any, res: any) => {

const url = req.body.newUrl

    const subdomains = req.body.subdomains

const getUrl = (link: string) => {
    if (link.includes('http')) {
        return link
    } else if (link.startsWith('/')) {
        return `${url}/${link}`
    } else {
        return `${url}/${link}`
    }
}

const seenUrls = {} as any
const foundTargetLinks = {} as any
let crawlCount = 0
const crawl = async (url: string) => {
    seenUrls[url] = true
    crawlCount ++
    const res = await fetch(url)
    const html = await res.text()
    const $ = cheerio.load(html)
    const links = $("a").map((i:any, link:any) => link.attribs.href).get()
    const { host } = urlParser.parse(url) as any
    
    for (let link of links.filter(link => link.includes(host))) {
        if (subdomains.some((website: any) => link.toLowerCase().includes(`${host.toLowerCase()}${website.toLowerCase()}`))) {
            console.log(`Found Link: ${link} found on URL ${url}`);
            foundTargetLinks[url] = foundTargetLinks[url] ? [...foundTargetLinks[url], link] : [link]
        }
        if (link.includes(url) && !seenUrls[getUrl(link)]) {
            await crawl(getUrl(link))
        }
    }
    }
    

    const crawlAll = async () => {
         return await crawl(url).then(() => {
            console.log('CRAWL FINISHED')
            return Object.entries(foundTargetLinks).map(([key,value]) => ({url: key, links: value}))
        })
    }

    const result = await crawlAll()
    res.status(200).json(result)
}

export default bannedSubdomains