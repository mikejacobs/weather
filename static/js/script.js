sources = [
"http://feeds.feedburner.com/ButDoesItFloat?format=xml", 
// "http://feeds.feedburner.com/wrongdistance", 
"http://www.booooooom.com/feed/", 
"http://www.ilikethisblog.net/?feed=rss2", 
"http://9eyes.tumblr.com/rss", 
"http://www.vvork.com/?feed=rss2", 
// "feed://v5mt.tumblr.com/rss", 
"http://feeds.feedburner.com/creativeapplicationsnet"
// "http://api.flickr.com/services/feeds/photoset.gne?set=72157594547931731&nsid=53914490@N00&lang=en-us"
]
feed = sources[Math.floor(Math.random()*sources.length)]
// feed = sources[5]
$(function(){
    night = false;
    nightcss = false;
    loc = "94114"
    if(window.location.href.indexOf("=")!=-1){
        // vars = window.location.href.split("?")
        loc = window.location.href.split("place=")[1].split("&")[0] || "94114"
        // if(vars[1]){
        //     for(v in vars[1].split("&"))%
        //     loc = window.location.href.split("place=")[1] || "94114"
        //     time = window.location.href.split("time=")[2] || "now"
        //     console.log(loc, time)
        // }
    }

    getWeather = function(loc){
        $.ajax({
            url: "http://api.wunderground.com/auto/wui/geo/ForecastXML/index.xml",
            type: "GET",
            dataType: "xml",
            data: {query:loc},

            complete: function(data) {
                //called when complete
                console.log("complete", data)

            },

            success: function(data) {
                // console.log("night?", $(data).find("forecastday").find("icon").eq(0).text().indexOf("nt_")!=-1)
                forecast = $(data).find("fcttext").eq(0).text()
                console.log(forecast)
                if(forecast) $("#forecast").html(forecast)
                // else {
                //     $("#forecast").append("<span class='failue'>Sorry, no forecast.</span>")
                // }
                console.log("night", $(data).find("icon").eq(0).text(), $(data).find("icon").eq(0).text().indexOf("nt_")!=-1)
                night = $(data).find("icon").eq(0).text().indexOf("nt_")!=-1
                if(night){
                    // $("body").css("background", "#000")
                    console.log("it is night", night)
                    nightcss = $("head").append('<link rel="stylesheet" href="css/night.css?v=1">')
                    night="_night";
                } else {
                    if(nightcss){
                        nightcss.remove()
                        nightcss=false
                        $("head").append('<link rel="stylesheet" href="css/style.css?v=1">')
                    }
                }
            goog()
            }
        })
        goog = function(){
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
                // console.log("weather", data)
                current = $(data).find("current_conditions");
                // console.log(current)
                $("#conditions").text(current.find("condition").attr("data"))
                $("#temp").html(current.find("temp_f").attr("data") + "&deg;F")
                $("#place").attr("value", $(data).find("city").attr("data"))
                current_condition = current.find("condition").attr("data")
                lookup = {
                    "Clear":"Sunny",
                    "Cloudy":"Cloudy",
                    "Overcast":"Cloudy",
                    "Mostly Cloudy":"Cloudy",
                    "Rain":"Rainy",
                    "Showers":"Rainy",
                    "Sunny":"Sunny",
                    "Snow":"Snowy",
                    "Sleet":"Snowy",
                    "Hail":"Snow",
                    "Fog":"Foggy",    
                    "Smoke":"Foggy",    
                    "Partly Cloudy":"Partly_Cloudy",
                    "Partly Sunny":"Partly_Cloudy"
                }
                $("#img").html("")
                $("<img src='images/" + lookup[current_condition] + (night||"") +".png'>").appendTo("#img")
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
}
}
    getArt = function(){
        $.ajax({
            url: feed,
            type: "GET",
            dataType: "XML",
            success: function(data) {
                //called when successful
                console.log("feed", feed, data)
                // descriptions = $(data).find((feed=="http://feeds.feedburner.com/wrongdistance")?"content\\:encoded":"description");
                descriptions = $(data).find("content\\:encoded")
                if(descriptions.length==0){
                    descriptions =  $(data).find("description");
                }
                console.log("desctoipsin", descriptions)
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
                console.log($(data).find("comments").eq(images[1]).text().split("#")[0])
                $("#img").attr("href", $(data).find("comments").eq(images[1]).text().split("#")[0])
            },
            error: function() {
                //called when there is an error
            }
        });
    }
    
    // $("#place").focus(function(){
    //     $("#submit").show()
    // })
    // $("#place").blur(function(e){
    //     console.log(e, $(e.target).attr("id"))
    //     
    //     $("#submit").hide()
    // })
    // $("#submit").click(function(){
    //     console.log("submit")
    //     val = $("#place").attr("value")
    //     if(val) getWeather(val)
    //     return false;
    // })
    $("#place").keypress(function(e){
        console.log(e, e.keyCode)
        if(e.keyCode == 13){
            val = $("#place").attr("value")
            if(val && val!=loc) {
                $(this).blur()
                getWeather(val)
            }
            
        }
    })
    getWeather(loc)
})