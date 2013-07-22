function Controller() {
    function resetInitPage(catId, title) {
        categoryId = catId;
        actionBar.title = title;
        live.setData([]);
        campaigns.removeAllChildren();
        upcomming.setData([]);
        artists.setData([]);
        data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
        viewPager.scrollTo(1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: "Live On Stage - Categories",
        height: "100%",
        top: "0%",
        width: "100%",
        id: "feedWin",
        navBarHidden: "false"
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Alloy.createController("tabs").getView();
    $.feedWin.add(win);
    var module = require("net.bajawa.pager");
    var categoryId = 0;
    var data = require("dataExport");
    var categories = Ti.UI.createTableView();
    var live = Ti.UI.createTableView();
    var campaigns = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        left: 0
    });
    var upcomming = Ti.UI.createTableView();
    var artists = Ti.UI.createTableView();
    data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
    var pagerDataScrolling = [ {
        title: "Categories",
        view: categories
    }, {
        title: "Live Shows",
        view: live
    }, {
        title: "Campaigns",
        view: campaigns
    }, {
        title: "Upcomming",
        view: upcomming
    }, {
        title: "Artist",
        view: artists
    } ];
    var viewPager = module.createViewPager({
        data: pagerDataScrolling,
        initialPage: 1,
        tabs: {
            style: module.SCROLLING,
            backgroundColor: "#ffffff",
            backgroundColorSelected: "#f2f2f2",
            lineColor: "#e4473e",
            lineColorSelected: "#e4473e",
            lineHeight: 2,
            lineHeightSelected: 7,
            font: {
                size: 16,
                color: "#000000",
                colorSelected: "#000000"
            },
            padding: {
                left: 20,
                top: 12,
                right: 20,
                bottom: 12
            }
        }
    });
    var actionBar;
    $.feedWin.addEventListener("open", function() {
        if ($.feedWin.activity) {
            actionBar = $.feedWin.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Categories";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    Ti.API.info("Home icon clicked!");
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    viewPager.height = "95%";
    viewPager.top = "0";
    $.feedWin.add(viewPager);
    $.feedWin.open();
    viewPager.addEventListener("pageChange", function(e) {
        0 == e.to && 0 == categories.data.length && data.getCategories($.activity, categories);
        2 == e.to && data.getCampaigns($.activity, campaigns, 0, 0, categoryId);
        3 == e.to && 0 == upcomming.data.length && data.getListItems($.activity, upcomming, 0, 0, categoryId, 0, 0, "Events");
        4 == e.to && 0 == artists.data.length && data.getDataLists($.activity, artists, 0, 0, "Artists", categoryId);
    });
    categories.addEventListener("click", function(e) {
        var title = "Categories";
        e.source.link > 0 && (title = e.source.text);
        resetInitPage(e.source.link, title);
    });
    live.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewVideo", e.source.link).getView();
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    upcomming.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewEvent", e.source.link).getView();
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;