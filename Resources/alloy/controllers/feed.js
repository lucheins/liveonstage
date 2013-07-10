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
    $.__views.feedWin = Ti.UI.createTabGroup({
        height: "100%",
        top: "0%",
        width: "100%",
        id: "feedWin"
    });
    $.__views.__alloyId8 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 1",
        id: "__alloyId8"
    });
    var __alloyId9 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId9.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.categoriesScreen.add($.__views.data);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen",
        backgroundColor: "#246"
    });
    __alloyId9.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId9.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId9.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId9.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "7%",
        views: __alloyId9,
        id: "scrollableView"
    });
    $.__views.__alloyId8.add($.__views.scrollableView);
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        title: "Tab 1",
        icon: "KS_nav_ui.png",
        id: "__alloyId7"
    });
    $.__views.feedWin.addTab($.__views.__alloyId7);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId11"
    });
    var __alloyId12 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId12.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.categoriesScreen.add($.__views.data);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen",
        backgroundColor: "#246"
    });
    __alloyId12.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId12.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId12.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId12.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "7%",
        views: __alloyId12,
        id: "scrollableView"
    });
    $.__views.__alloyId11.add($.__views.scrollableView);
    $.__views.__alloyId10 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        title: "Tab 2",
        icon: "KS_nav_views.png",
        id: "__alloyId10"
    });
    $.__views.feedWin.addTab($.__views.__alloyId10);
    $.__views.__alloyId14 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId14"
    });
    var __alloyId15 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId15.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.categoriesScreen.add($.__views.data);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen",
        backgroundColor: "#246"
    });
    __alloyId15.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId15.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId15.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId15.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "7%",
        views: __alloyId15,
        id: "scrollableView"
    });
    $.__views.__alloyId14.add($.__views.scrollableView);
    $.__views.__alloyId13 = Ti.UI.createTab({
        window: $.__views.__alloyId14,
        title: "Tab 3",
        icon: "KS_nav_views.png",
        id: "__alloyId13"
    });
    $.__views.feedWin.addTab($.__views.__alloyId13);
    $.__views.__alloyId17 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId17"
    });
    var __alloyId18 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId18.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.categoriesScreen.add($.__views.data);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen",
        backgroundColor: "#246"
    });
    __alloyId18.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId18.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId18.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId18.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "7%",
        views: __alloyId18,
        id: "scrollableView"
    });
    $.__views.__alloyId17.add($.__views.scrollableView);
    $.__views.__alloyId16 = Ti.UI.createTab({
        window: $.__views.__alloyId17,
        title: "Tab 4",
        icon: "KS_nav_views.png",
        id: "__alloyId16"
    });
    $.__views.feedWin.addTab($.__views.__alloyId16);
    $.__views.__alloyId20 = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Tab 2",
        id: "__alloyId20"
    });
    var __alloyId21 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId21.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.data = Ti.UI.createTableView({
        separatorColor: "#fff",
        id: "data"
    });
    $.__views.categoriesScreen.add($.__views.data);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen",
        backgroundColor: "#246"
    });
    __alloyId21.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId21.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId21.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId21.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "7%",
        views: __alloyId21,
        id: "scrollableView"
    });
    $.__views.__alloyId20.add($.__views.scrollableView);
    $.__views.__alloyId19 = Ti.UI.createTab({
        window: $.__views.__alloyId20,
        title: "Tab 5",
        icon: "KS_nav_views.png",
        id: "__alloyId19"
    });
    $.__views.feedWin.addTab($.__views.__alloyId19);
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Alloy.createController("tabs").getView();
    $.feedWin.add(win);
    getDataFeed(0, 0, 0, 0, 0);
    $.feedWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;