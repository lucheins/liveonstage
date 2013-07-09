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
        height: "95%",
        top: "0%",
        id: "feedWin"
    });
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    $.__views.topNav = Ti.UI.createScrollView({
        height: "7%",
        top: "0%",
        width: "100%",
        left: "0%",
        id: "topNav",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false",
        scrollType: "horizontal"
    });
    $.__views.feedWin.add($.__views.topNav);
    $.__views.NavContainer = Ti.UI.createView({
        width: "500dp",
        height: "90%",
        top: "0%",
        id: "NavContainer"
    });
    $.__views.topNav.add($.__views.NavContainer);
    $.__views.categories = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "0%",
        id: "categories"
    });
    $.__views.NavContainer.add($.__views.categories);
    $.__views.__alloyId3 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Categories",
        id: "__alloyId3"
    });
    $.__views.categories.add($.__views.__alloyId3);
    $.__views.videos = Ti.UI.createView({
        height: "100%",
        bottom: "0%",
        width: "20%",
        left: "20%",
        id: "videos"
    });
    $.__views.NavContainer.add($.__views.videos);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Live Shows",
        id: "__alloyId4"
    });
    $.__views.videos.add($.__views.__alloyId4);
    $.__views.campaigns = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "40%",
        id: "campaigns"
    });
    $.__views.NavContainer.add($.__views.campaigns);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Campaigns",
        id: "__alloyId5"
    });
    $.__views.campaigns.add($.__views.__alloyId5);
    $.__views.upcoming = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "60%",
        id: "upcoming"
    });
    $.__views.NavContainer.add($.__views.upcoming);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Upcoming",
        id: "__alloyId6"
    });
    $.__views.upcoming.add($.__views.__alloyId6);
    $.__views.artists = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "80%",
        id: "artists"
    });
    $.__views.NavContainer.add($.__views.artists);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        textAlign: "center",
        color: "red",
        font: {
            fontSize: 12,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Artists",
        id: "__alloyId7"
    });
    $.__views.artists.add($.__views.__alloyId7);
    $.__views.barra = Ti.UI.createView({
        height: "10%",
        width: "20%",
        backgroundColor: "green",
        bottom: "0%",
        left: 0,
        id: "barra"
    });
    $.__views.topNav.add($.__views.barra);
    var __alloyId8 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen",
        backgroundColor: "#123"
    });
    __alloyId8.push($.__views.categoriesScreen);
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
    __alloyId8.push($.__views.videosScreen);
    $.__views.campaignsScreen = Ti.UI.createView({
        id: "campaignsScreen",
        backgroundColor: "#48b"
    });
    __alloyId8.push($.__views.campaignsScreen);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen",
        backgroundColor: "#246"
    });
    __alloyId8.push($.__views.upcomingScreen);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen",
        backgroundColor: "#48b"
    });
    __alloyId8.push($.__views.artistsScreen);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "93%",
        top: "7%",
        views: __alloyId8,
        id: "scrollableView"
    });
    $.__views.feedWin.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var osname = "android", height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
    var isTablet = "ipad" === osname || "android" === osname && (width > 899 || height > 899);
    if (isTablet) {
        $.NavContainer.width = "100%";
        $.topNav.setScrollingEnabled = false;
    } else $.topNav.scrollTo(60, 0);
    getDataFeed(0, 0, 0, 0, 0);
    $.feedWin.open();
    $.scrollableView.currentPage = 1;
    $.categories.addEventListener("click", function() {
        $.scrollableView.scrollToView(0);
    });
    $.videos.addEventListener("click", function() {
        $.scrollableView.scrollToView(1);
    });
    $.campaigns.addEventListener("click", function() {
        $.scrollableView.scrollToView(2);
    });
    $.upcoming.addEventListener("click", function() {
        $.scrollableView.scrollToView(3);
    });
    $.artists.addEventListener("click", function() {
        $.scrollableView.scrollToView(4);
    });
    $.scrollableView.addEventListener("scroll", function() {
        var convert = 1;
        convert = Titanium.Platform.displayCaps.dpi / 160;
        var scrollTo = 0;
        var leftPercent = "0%";
        if (1 == $.scrollableView.currentPage) {
            scrollTo = 60 * convert;
            leftPercent = "20%";
        }
        if (2 == $.scrollableView.currentPage) {
            scrollTo = 160 * convert;
            leftPercent = "40%";
        }
        if (3 == $.scrollableView.currentPage) {
            scrollTo = 180 * convert;
            leftPercent = "60%";
        }
        4 == $.scrollableView.currentPage && (leftPercent = "80%");
        $.barra.left != leftPercent && $.barra.animate({
            left: leftPercent,
            duration: 50
        }, function() {
            $.barra.left = leftPercent;
        });
        isTablet || 4 == $.scrollableView.currentPage || $.topNav.scrollTo(scrollTo, 0);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;