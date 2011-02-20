sources = ["http://feeds.feedburner.com/ButDoesItFloat?format=xml", "http://feeds.feedburner.com/wrongdistance", "http://www.booooooom.com/feed/", "http://www.ilikethisblog.net/?feed=rss2"]
feed = sources[Math.floor(Math.random()*sources.length)]
// feed = sources[3]
$(function(){
    loc = "94114"
    if(window.location.href.indexOf("#")!=-1){
        loc = window.location.href.split("#")[1]
        console.log(loc)
    }
    $.ajax({
        url: "http://www.google.com/ig/api",
        type: "GET",
        dataType: "xml",
        data: {weather:loc},

        complete: function(data) {
            //called when complete


        },

        success: function(data) {
            //called when successful
            if($(data).find("problem_cause").length == 0){
                console.log("weather", data)
                current = $(data).find("current_conditions");
                // console.log(current)
                $("#conditions").text(current.find("condition").attr("data"))
                $("#city").text($(data).find("city").attr("data"))
                current_condition = current.find("condition").attr("data")
                lookup = {
                    "Clear":"Sunny",
                    "Cloudy":"Cloudy",
                    "Mostly Cloudy":"Cloudy",
                    "Rain":"Rainy",
                    "Showers":"Rainy",
                    "Sunny":"Sunny",
                    "Snow":"Snow",
                    "Sleet":"Snow",
                    "Hail":"Snow",
                    "Fog":"Fog",    
                    "Partly Cloudy":"Partly_Cloudy"
                }

                $("<img src='images/" + lookup[current_condition] + ".png'>").appendTo("#img")
                // document.write(data.responseXML)

                getArt()
            } else {
                console.log("error!")
            }
        },

        error: function(data) {
            //called when there is an error
            // console.log(data)
        },
    });
    getArt = function(){
        $.ajax({
            url: feed,
            type: "GET",
            dataType: "XML",
            success: function(data) {
                //called when successful
                // console.log("feed", feed)
                // descriptions = $(data).find((feed=="http://feeds.feedburner.com/wrongdistance")?"content\\:encoded":"description");
                descriptions = $(data).find("content\\:encoded")
                if(descriptions.length==0){
                    descriptions =  $(data).find("description");
                }
                // console.log("desctoipsin", descriptions)
                // console.log(Math.round(Math.random()*descriptions.length))
                // console.log(descriptions.eq(Math.round(Math.random()*descriptions.length)).text())
                getImages = function(){
                    notZero = function(){
                        num = Math.floor(Math.random()*descriptions.length)
                        if(num){
                            return num
                        } else {
                            return notZero()
                        }
                    }
                    num = notZero()
                    // console.log("num", num, descriptions.length, descriptions.eq(num).text(), descriptions.eq(num).html())
                    match = /src=\"([^"]*)(?:jpg|gif|png)\"/gi
                    // if(feed=="http://feeds.feedburner.com/wrongdistance"){ img=descriptions.eq(num).html() }else{ img=descriptions.eq(num).text()}
                    img=descriptions.eq(num).html() || descriptions.eq(num).text()
                    // img=descriptions.eq(num).html() || descriptions.eq(num).text()
                    // console.log("im", img)
                    img = img.match(match)
                    // console.log("matched", img)
                    if(img) return [img, num]
                    else return getImages()
                }
                images = getImages()

                urls = []
                for(image in images[0]){
                    img = images[0][image]
                    // console.log("img", img)
                    img = img.split('"')[1]
                    urls.push(img)
                    // console.log("split", img.split('"')[0])
                }
                num = Math.floor(Math.random()*urls.length)
                // console.log(urls[num], urls.length, num)
                // console.log("link", $(data).find("comments")/*.eq(images[1])*/, $(data).find("comments").eq(images[1]).text())
                $("#img").css("background", "url("+ urls[num] +")")
                $("#img").attr("href", $(data).find("comments").eq(images[1]).text().split("#")[0])
            },
            error: function() {
                //called when there is an error
            }
        });
    }
})