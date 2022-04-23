const moment = require('moment')

const fs = require('fs'),
convert = require('xml-js'),
fetch = require('node-fetch'),
hostProductURL = "https://sumulya.com/product/",
getBlogsListURL = "https://jsonplaceholder.typicode.com/posts",
untrackedUrlsList = [],
options = { compact: true, ignoreComment: true,spaces: 4};

const fetchSumulyaList = () =>{
    fetch(getBlogsListURL)
    .then(res=>res.json())
    .then(dataJSON=>{
        if(dataJSON){
            dataJSON.forEach(element=>{
                const modifiedURL = element.title.replace(/ /g,'-')
                untrackedUrlsList.push(`${hostProductURL}/${modifiedURL}`)
            })
            filterUniqueURLs()
        }
    })
}

const filterUniqueURLs = () => {
    fs.readFile('sitemap.xml',(err,data)=>{
        const existingSitemapList = JSON.parse(convert.xml2json(data,options))
        let existingSitemapURLStringList = []
        if(existingSitemapList.urlset &&existingSitemapList.urlset.url && existingSitemapList.urlset.url.length){
            existingSitemapURLStringList = existingSitemapList.urlset.url.map(ele => ele.loc._text)
        }


        untrackedUrlsList.forEach(ele => {
            if(existingSitemapURLStringList.indexOf(ele)==-1){
                existingSitemapList.urlset.url.push({
                    loc: {
                        _text: ele,
                    },
                    changefreq:{
                        _text:"monthly"
                    },
                    priority:{
                        _text:0.8
                    },
                    lastmod: {
                        _text: moment(new Date()).format('YYYY-MM-DD')
                    }
                })
            }
           
        })
        createSitemapFile(existingSitemapList)
    })
}

const createSitemapFile = (list) => {
    const finalXML = convert.json2xml(list,options)
    saveNewSitemap(finalXML)
}

const saveNewSitemap = (xmltext) => {
    fs.writeFile('sitemap.xml',xmltext,(err)=>{
        if(err){
            return console.log(err)
        }
        console.log("Sitemap file Updated")
    })
}

fetchSumulyaList()