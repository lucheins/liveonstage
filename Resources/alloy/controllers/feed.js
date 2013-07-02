function Controller() {
    function getDataFeed(offsetHome, pageHome, upcoming, live, campaigns) {
        var tableData = [];
        var client = Ti.Network.createHTTPClient();
        var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_FEED;
        client.open("POST", url);
        client.ondatastream = function() {
            $.activity.show();
        };
        client.onload = function() {
            var buttonMore = Ti.UI.createButton({
                title: "View more..",
                width: "120dp"
            });
            var buttonBack = Ti.UI.createButton({
                title: "Back Top",
                width: "120dp"
            });
            var json = this.responseText;
            var responses = JSON.parse(json);
            $.data.setData([]);
            var band = true;
            for (var i = 0; responses.length > i; i++) {
                if ("more" == responses[i].title) {
                    var row = Ti.UI.createTableViewRow({
                        height: "50dp"
                    });
                    row.add(buttonMore);
                    band = false;
                } else {
                    var link = responses[i].id;
                    var labelEnd = responses[i].confirmed;
                    if (responses[i].video_id > 0) {
                        link = responses[i].video_id;
                        labelEnd = responses[i].watching;
                    }
                    var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
                    null != responses[i].video_thumb ? imageLink = responses[i].video_thumb : null != responses[i].thumb && (imageLink = Alloy.Globals.DOMAIN + responses[i].thumb);
                    var args = {
                        title: responses[i].title,
                        author: responses[i].name,
                        date: responses[i].startdate,
                        image: imageLink,
                        guest: labelEnd,
                        check_date: responses[i].check_date,
                        link: link,
                        id: responses[i].campaign,
                        received: responses[i].received
                    };
                    var row = Alloy.createController("rowFeed", args).getView();
                }
                tableData.push(row);
            }
            if (band && (offsetHome > 0 || 0 == i)) {
                var row = Ti.UI.createTableViewRow({
                    height: "50dp"
                });
                if (offsetHome > 0) row.add(buttonBack); else {
                    var text = Ti.UI.createLabel({
                        text: "No Find Videos",
                        font: {
                            fontSize: "20dp"
                        },
                        color: "#717777"
                    });
                    row.add(text);
                }
                tableData.push(row);
            }
            buttonMore.addEventListener("click", function() {
                pageHome += 1;
                var offset = pageHome * Alloy.Globals.LIMIT;
                table = getDataFeed(offset, pageHome, upcoming, live, campaigns);
            });
            buttonBack.addEventListener("click", function() {
                pageHome = 0;
                table = getDataFeed(pageHome, pageHome, upcoming, live, campaigns);
            });
            $.data.setData(tableData);
            $.activity.hide();
        };
        client.onerror = function(e) {
            alert("Transmission error: " + e.error);
        };
        var params = {
            offset: offsetHome,
            limit: Alloy.Globals.LIMIT,
            top: Alloy.Globals.TOP_LIMIT,
            upcoming: upcoming,
            live: live,
            campaigns: campaigns,
            tc: Alloy.Globals.USER_MOBILE.toString()
        };
        client.send(params);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "feedWin"
    });
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: 26,
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        id: "activity"
    });
    $.__views.feedWin.add($.__views.activity);
    $.__views.search = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        width: "24%",
        height: "30dp",
        backgroundColor: "#f5f5f5",
        id: "search"
    });
    $.__views.feedWin.add($.__views.search);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        color: "#000000",
        text: "Search",
        font: {
            fontWeight: "bold"
        },
        left: "10dp",
        id: "__alloyId3"
    });
    $.__views.search.add($.__views.__alloyId3);
    $.__views.upcoming = Ti.UI.createView({
        top: "0dp",
        left: "25%",
        width: "24%",
        height: "30dp",
        backgroundColor: "#f5f5f5",
        id: "upcoming"
    });
    $.__views.feedWin.add($.__views.upcoming);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        color: "#000000",
        text: "Upcoming",
        font: {
            fontWeight: "bold"
        },
        left: "10dp",
        id: "__alloyId4"
    });
    $.__views.upcoming.add($.__views.__alloyId4);
    $.__views.live = Ti.UI.createView({
        top: "0dp",
        width: "24%",
        left: "50%",
        height: "30dp",
        backgroundColor: "#f5f5f5",
        id: "live"
    });
    $.__views.feedWin.add($.__views.live);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        color: "#000000",
        text: "Live",
        font: {
            fontWeight: "bold"
        },
        left: "10dp",
        id: "__alloyId5"
    });
    $.__views.live.add($.__views.__alloyId5);
    $.__views.campaigns = Ti.UI.createView({
        top: "0dp",
        left: "75%",
        width: "24%",
        height: "30dp",
        backgroundColor: "#f5f5f5",
        id: "campaigns"
    });
    $.__views.feedWin.add($.__views.campaigns);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        color: "#000000",
        text: "Campaigns",
        font: {
            fontWeight: "bold"
        },
        left: "10dp",
        id: "__alloyId6"
    });
    $.__views.campaigns.add($.__views.__alloyId6);
    $.__views.data = Ti.UI.createTableView({
        top: "35dp",
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.feedWin.add($.__views.data);
    exports.destroy = function() {};
    _.extend($, $.__views);
    getDataFeed(0, 0, 0, 0, 0);
    $.search.addEventListener("click", function() {
        getDataFeed(0, 0, 0, 0, 0);
    });
    $.upcoming.addEventListener("click", function() {
        getDataFeed(0, 0, 1, 0, 0);
    });
    $.live.addEventListener("click", function() {
        getDataFeed(0, 0, 0, 1, 0);
    });
    $.campaigns.addEventListener("click", function() {
        getDataFeed(0, 0, 0, 0, 1);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;