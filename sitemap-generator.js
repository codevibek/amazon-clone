const fs = require('fs');

const globby = require('globby');

(async () => {

  const pages = await globby([
    'src/*{.js}',
    '!src/_*{.css,.jpg,.svg}'
    
  ]);
  console.log(pages)
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('src', '')
                  .replace('.js', '')
                  ;
                const route = path === '/index' ? '' : path;

                return `
                        <url>
                            <loc>${`https://sumulya.com${route}`}</loc>
                        </url>
                    `;
              })
              .join('')}
        </urlset>
    `

  

  fs.writeFileSync('public/sitemap.xml', sitemap)
})