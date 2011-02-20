sources = ["http://feeds.feedburner.com/ButDoesItFloat?format=xml", "http://feeds.feedburner.com/wrongdistance", "http://www.booooooom.com/feed/", "http://www.ilikethisblog.net/?feed=rss2"]
feed = sources[Math.floor(Math.random()*sources.length)]
// feed = sources[3]
$(function(){

    $.ajax({
        url: "http://feeds.feedburner.com/ffffound/everyone",
        type: "GET",
        dataType: "XML",
        success: function(data) {
            console.log($(data).find("item").length)
            // if(descriptions.length==0){
            //     descriptions =  $(data).find("description");
            // }
            // match = /src=\"([^"]*)(?:jpg|gif|png)\"/gi
            // // img=descriptions.eq(num).html() || descriptions.eq(num).text()
            // 
            // i = data.match(match)
            // // console.log(i)
            // 
            // 
            // urls = []
            // for(image in i){
            //     img = i[image]
            //     // console.log("img", img)
            //     img = img.split('"')[1]
            //     urls.push(img)
            //     // console.log("split", img.split('"')[0])
            // }
            // num = Math.floor(Math.random()*urls.length)
            // // console.log(urls, urls[num], urls.length, num)
            // // console.log("link", $(data).find("comments")/*.eq(images[1])*/, $(data).find("comments").eq(images[1]).text())
            // $("#img").css("background", "url("+ urls[num] +")")
            // // $("#img").attr("href", $(data).find("comments").eq(images[1]).text().split("#")[0])
        }
    });
})