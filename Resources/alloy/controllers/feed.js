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
                    var link = "event_" + responses[i].id;
                    var labelEnd = responses[i].confirmed;
                    if (responses[i].video_id > 0) {
                        link = "video_" + responses[i].video_id;
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
        $.data.addEventListener("click", function(e) {
            var link = e.source.link;
            var elements = link.split("_");
            var id = elements[1];
            if ("event" == elements[0]) var win = Alloy.createController("viewEvent", id).getView(); else var win = Alloy.createController("viewVideo", id).getView();
            win.open();
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        height: "80%",
        top: "7%",
        id: "feedWin"
    });
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    var __alloyId3 = [];
    $.__views.view1 = Ti.UI.createView({
        id: "view1",
        backgroundColor: "#123"
    });
    __alloyId3.push($.__views.view1);
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
    $.__views.view1.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.view1.add($.__views.data);
    $.__views.view2 = Ti.UI.createView({
        id: "view2",
        backgroundColor: "#246"
    });
    __alloyId3.push($.__views.view2);
    $.__views.view3 = Ti.UI.createView({
        id: "view3",
        backgroundColor: "#48b"
    });
    __alloyId3.push($.__views.view3);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId3,
        id: "scrollableView"
    });
    $.__views.feedWin.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    getDataFeed(0, 0, 0, 0, 0);
    $.feedWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;