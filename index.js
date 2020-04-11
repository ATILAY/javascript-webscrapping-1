const puppeteer = require('puppeteer');

(async ()=>{
    let movieUrl = "https://www.imdb.com/title/tt0111161/?ref_=nv_sr_1";
    //if you say headless:false  inside a launch() like launch ( { headless: false } )
    //then you can see the  happening flow!
    let  browser =  await puppeteer.launch( { headless:false });
    let page = await browser.newPage();
    //waitUntil: all page loaded and there is no more than
    // two network connection within 0.5 sec
    await page.goto(movieUrl, {waitUntil: 'networkidle2'});
    //evalute() saying run this code inside a console
    //
    let data =  await page.evaluate( ()=>{
        let title = document.querySelector('div[class="title_wrapper"] > h1 ').innerText;
        let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
        let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;

        return {
            title,
            rating,
            ratingCount
        }

    } )

    console.log(data);

    debugger;

    await browser.close();

})();