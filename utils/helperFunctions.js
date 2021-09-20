import { homepage } from "./BaseUrl";

export function getCurrentLocaleFromUrl (path, locales, defaultLocale, currentUrl){
        const p = path.split("/").reverse()[0];
        const localeList = ['de', 'cn', 'es', 'fr', 'jp', 'kr', 'ru','en']
        const locale = localeList.find(el=>el === p);

    
    if(locale){
        return locale
    }else{
        return "en"
    }
}

export const imageNameToAltTag = (url) => {
    if(url){
        const a = url.split("/")[url.split("/").length-1]
        const b = a.split(".")[0]
        const altTag = b.replace(/[^A-Z0-9]+/ig, " ")
        return altTag
    } else {
        return "..."
    } 
}

export const getAsPathfromUrl = urlArray => {
    let asPathArray = urlArray.map( url => {
        const {from, to} = url
        const newFrom = (from.split(homepage).pop())
        const newTo = (to.split(homepage).pop())
        return { ...url, from: newFrom, to: newTo }
    })
    return asPathArray  
}

export const projectLanguages = ["en", "es"] 