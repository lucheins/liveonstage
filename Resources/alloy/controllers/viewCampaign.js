function Controller() {
    function getName(name) {
        var names = name.split("_");
        name = names[0] + "_" + Alloy.Globals.RESOLUCION_VIDEO;
        null != names[1] && (name = name + "_" + names[1]);
        return name;
    }
    function getPathVideo(type, path) {
        $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
        $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
        $.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
        var name = getName(path);
        url = "vod" == type ? Alloy.Globals.URL_VOD + name + Alloy.Globals.URL_VOD_END + Alloy.Globals.URL_VIDEO_END : Alloy.Globals.URL_LIVE + name + Alloy.Globals.URL_VIDEO_END;
        return url;
    }
    function getUrlYoutube(video_id, vp) {
        vdldr = Ti.Network.createHTTPClient();
        vdldr.onload = function() {
            x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
            y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
            vp.url = y;
        };
        if ("android" != Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
        }
        vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
        if ("android" == Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
        }
        vdldr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewCampaign = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewCampaign"
    });
    $.__views.viewCampaign && $.addTopLevelView($.__views.viewCampaign);
    $.__views.scroll = Ti.UI.createScrollView({
        id: "scroll",
        width: "100%",
        height: "90%",
        top: "0dp",
        scrollType: "vertical"
    });
    $.__views.viewCampaign.add($.__views.scroll);
    $.__views.viewScroll = Ti.UI.createView({
        height: Ti.Platform.displayCaps.platformHeight + 100,
        id: "viewScroll"
    });
    $.__views.scroll.add($.__views.viewScroll);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 20,
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activity"
    });
    $.__views.viewScroll.add($.__views.activity);
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "10dp",
        autoplay: true,
        backgroundColor: "black",
        height: "40%",
        width: "95%",
        id: "vp"
    });
    $.__views.viewScroll.add($.__views.vp);
    $.__views.data = Ti.UI.createView({
        top: "45%",
        height: "40%",
        id: "data"
    });
    $.__views.viewScroll.add($.__views.data);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "5dp",
        top: "5dp",
        color: "#717777",
        id: "title"
    });
    $.__views.data.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "5dp",
        top: "45dp",
        color: "#717777",
        id: "author"
    });
    $.__views.data.add($.__views.author);
    $.__views.content = Ti.UI.createView({
        top: "65dp",
        height: "80dp",
        backgroundColor: "#f0f0f0",
        id: "content"
    });
    $.__views.data.add($.__views.content);
    $.__views.titleDescription = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        left: "5dp",
        top: "0dp",
        text: "Description:",
        id: "titleDescription"
    });
    $.__views.content.add($.__views.titleDescription);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        height: "auto",
        left: "5dp",
        top: "20dp",
        width: "90%",
        id: "description"
    });
    $.__views.content.add($.__views.description);
    $.__views.readmore = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        left: "5dp",
        bottom: "0dp",
        text: "Read more",
        id: "readmore"
    });
    $.__views.content.add($.__views.readmore);
    $.__views.categoryName = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        height: "auto",
        left: "5dp",
        top: "150dp",
        color: "#717777",
        id: "categoryName"
    });
    $.__views.data.add($.__views.categoryName);
    $.__views.campaignInfo = Ti.UI.createView({
        top: "170dp",
        height: "40dp",
        width: "100%",
        id: "campaignInfo"
    });
    $.__views.data.add($.__views.campaignInfo);
    $.__views.accomplished = Ti.UI.createLabel({
        top: "5dp",
        width: "25%",
        left: "0dp",
        font: {
            fontSize: "14dp"
        },
        id: "accomplished"
    });
    $.__views.campaignInfo.add($.__views.accomplished);
    $.__views.percentage = Ti.UI.createLabel({
        top: "5dp",
        width: "25%",
        left: "25%",
        font: {
            fontSize: "14dp"
        },
        id: "percentage"
    });
    $.__views.campaignInfo.add($.__views.percentage);
    $.__views.days = Ti.UI.createLabel({
        top: "5dp",
        width: "25%",
        left: "50%",
        font: {
            fontSize: "14dp"
        },
        id: "days"
    });
    $.__views.campaignInfo.add($.__views.days);
    $.__views.total = Ti.UI.createLabel({
        top: "5dp",
        width: "25%",
        left: "75%",
        font: {
            fontSize: "14dp"
        },
        id: "total"
    });
    $.__views.campaignInfo.add($.__views.total);
    $.__views.givebacks = Ti.UI.createView({
        top: "76%",
        left: "0dp",
        id: "givebacks"
    });
    $.__views.viewScroll.add($.__views.givebacks);
    $.__views.givebacksTitle = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "auto",
        left: "10dp",
        top: "0dp",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Givebacks:",
        id: "givebacksTitle"
    });
    $.__views.givebacks.add($.__views.givebacksTitle);
    $.__views.table = Ti.UI.createTableView({
        top: "20dp",
        left: "0dp",
        id: "table"
    });
    $.__views.givebacks.add($.__views.table);
    $.__views.donate = Ti.UI.createView({
        bottom: "0dp",
        height: "40dp",
        id: "donate"
    });
    $.__views.viewCampaign.add($.__views.donate);
    $.__views.buttonDonate = Ti.UI.createButton({
        top: "10dp",
        height: "30dp",
        width: "50dp",
        id: "buttonDonate",
        title: "Donate"
    });
    $.__views.donate.add($.__views.buttonDonate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    if ("android" == Ti.Platform.osname) {
        var actionBar;
        $.viewCampaign.addEventListener("open", function() {
            if ($.viewCampaign.activity) {
                actionBar = $.viewCampaign.activity.actionBar;
                if (actionBar) {
                    actionBar.backgroundImage = "/bg.png";
                    actionBar.title = Alloy.Globals.NAME_PAGE + " - View Campaign";
                    actionBar.onHomeIconItemSelected = function() {
                        $.vp.hide();
                        $.vp.release();
                        $.vp = null;
                        $.viewCampaign.close();
                    };
                }
            } else Ti.API.error("Can't access action bar on a lightweight window.");
        });
    }
    Ti.Gesture.addEventListener("orientationchange", function() {
        var orientation = Ti.Gesture.orientation;
        (3 === orientation || 4 === orientation) && ($.vp.fullscreen = true);
        (1 === orientation || 2 === orientation) && ($.vp.fullscreen = false);
    });
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CAMPAIGN;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var json = this.responseText;
        var responses = JSON.parse(json);
        var url = "";
        if ("vod" == responses.campaign[0].type || "live" == responses.campaign[0].type) {
            url = getPathVideo(responses.campaign[0].type, responses.campaign[0].path);
            $.vp.url = url;
        } else url = getUrlYoutube(responses.campaign[0].video_id, $.vp);
        $.author.text = responses.campaign[0].name;
        $.title.text = responses.campaign[0].title;
        var text = responses.campaign[0].long_description;
        text.length > Alloy.Globals.DESCRIPTION_SIZE && (text = text.substring(0, Alloy.Globals.DESCRIPTION_SIZE - 2) + "...");
        $.description.text = text;
        $.categoryName.text = responses.campaign[0].category_name;
        $.accomplished.text = "$" + responses.campaign[0].received + "Pledged";
        $.percentage.text = responses.campaign[0].percent + "% Funded";
        $.days.text = responses.campaign[0].days + "Days to go";
        $.total.text = "$" + responses.campaign[0].goal_amount + " Goal";
        var tabledata = [];
        for (var i = 0; responses.givebacks.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                height: "40dp",
                title: responses.givebacks[i].amount + "USD " + responses.givebacks[i].description,
                left: "15dp",
                font: {
                    fontSize: "14dp"
                }
            });
            tabledata.push(row);
        }
        if (0 == tabledata.length) {
            var row = Ti.UI.createTableViewRow({
                height: "20dp",
                title: "No givebacks"
            });
            tabledata.push(row);
            $.viewScroll.height = $.viewScroll.height + 10;
        }
        $.table.setData(tabledata);
        $.activity.hide();
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        item_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;