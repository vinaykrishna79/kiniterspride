const staticPaths = [
  "/about-us",
  "/bags-cases",
  "/blog",
  "/contact",
  "/crochet",
  "/faq",
  "/find-our-stores",
  "/infrastructure",
  "/knitting-accessories",
  "/knitting-needles",
  "/newsletter",
  "/our-people",
  "/privacy-policy",
  "/product-catalog",
  "/replacementpolicy",
  "/resources",
  "/sets",
  "/sitemap",
  "/social-contribution",
  "/sustainability",
  "/terms",
  "/weblink",
  "/whatsnew"
]

module.exports = {
  siteUrl: 'https://www.knitterspride.com',
  generateRobotsTxt: true,
  sitemapSize: 20000,
  exclude: staticPaths,
  additionalPaths: async (config) => {
    const result = []
    for (let path in staticPaths) {
      result.push({
        loc: staticPaths[path] + "/en",
        priority: 0.7,
        lastmod: new Date().toISOString()
      }
      )
      result.push(
        {
          loc: staticPaths[path] + "/es",
          priority: 0.7,
          lastmod: new Date().toISOString()
        })
    }
    return result
  }

}