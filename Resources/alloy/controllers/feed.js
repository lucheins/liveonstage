function Controller() {
    function resetInitPage(catId) {
        categoryId = catId;
        live.setData([]);
        campaigns.removeAllChildren();
        upcomming.setData([]);
        artists.setData([]);
        data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
        $.scrollableView.scrollToView(1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        height: "100%",
        top: "0%",
        width: "100%",
        id: "feedWin"
    });
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    $.__views.Navigation = Ti.UI.createView({
        height: "9%",
        top: "0%",
        backgroundColor: "#f2f2f2",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.feedWin.add($.__views.Navigation);
    $.__views.actionIos = Ti.UI.createView({
        zIndex: 10,
        height: "100%",
        id: "actionIos"
    });
    $.__views.Navigation.add($.__views.actionIos);
    $.__views.backArrow = Ti.UI.createLabel({
        left: "0%",
        width: "5%",
        font: {
            fontSize: "20dp"
        },
        color: "gray",
        id: "backArrow"
    });
    $.__views.actionIos.add($.__views.backArrow);
    $.__views.icon = Ti.UI.createImageView({
        left: "5%",
        width: "12%",
        height: "90%",
        top: "5%",
        id: "icon",
        image: "/icon-small.png"
    });
    $.__views.actionIos.add($.__views.icon);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: "5%",
        backgroundColor: "#d0d0d0",
        width: "100%",
        bottom: 0,
        id: "__alloyId18"
    });
    $.__views.Navigation.add($.__views.__alloyId18);
    $.__views.topNav = Ti.UI.createScrollView({
        height: "11%",
        top: "9%",
        width: "100%",
        left: "0%",
        id: "topNav",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false",
        scrollType: "horizontal"
    });
    $.__views.feedWin.add($.__views.topNav);
    $.__views.NavContainer = Ti.UI.createView({
        width: 500,
        height: "86%",
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
    $.__views.__alloyId19 = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3b3b3b",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Categories",
        id: "__alloyId19"
    });
    $.__views.categories.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId20"
    });
    $.__views.categories.add($.__views.__alloyId20);
    $.__views.videos = Ti.UI.createView({
        height: "100%",
        bottom: "0%",
        width: "20%",
        left: "20%",
        id: "videos"
    });
    $.__views.NavContainer.add($.__views.videos);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3b3b3b",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Live Shows",
        id: "__alloyId21"
    });
    $.__views.videos.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId22"
    });
    $.__views.videos.add($.__views.__alloyId22);
    $.__views.campaigns = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "40%",
        id: "campaigns"
    });
    $.__views.NavContainer.add($.__views.campaigns);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3b3b3b",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Campaigns",
        id: "__alloyId23"
    });
    $.__views.campaigns.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId24"
    });
    $.__views.campaigns.add($.__views.__alloyId24);
    $.__views.upcoming = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "60%",
        id: "upcoming"
    });
    $.__views.NavContainer.add($.__views.upcoming);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3b3b3b",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Upcoming",
        id: "__alloyId25"
    });
    $.__views.upcoming.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId26"
    });
    $.__views.upcoming.add($.__views.__alloyId26);
    $.__views.artists = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "80%",
        id: "artists"
    });
    $.__views.NavContainer.add($.__views.artists);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        textAlign: "center",
        color: "#3b3b3b",
        font: {
            fontSize: 14,
            fontFamily: "Helvetica Neue"
        },
        bottom: "20%",
        text: "Artists",
        id: "__alloyId27"
    });
    $.__views.artists.add($.__views.__alloyId27);
    $.__views.menuBar = Ti.UI.createScrollView({
        height: "12%",
        bottom: "2%",
        id: "menuBar",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false",
        scrollType: "horizontal"
    });
    $.__views.topNav.add($.__views.menuBar);
    $.__views.barContainer = Ti.UI.createView({
        width: "100%",
        height: "100%",
        bottom: "0%",
        left: "0%",
        id: "barContainer"
    });
    $.__views.menuBar.add($.__views.barContainer);
    $.__views.barra = Ti.UI.createView({
        height: "100%",
        width: "20%",
        backgroundColor: "#e4473e",
        bottom: "0%",
        left: "0%",
        id: "barra"
    });
    $.__views.barContainer.add($.__views.barra);
    $.__views.__alloyId28 = Ti.UI.createView({
        height: "2%",
        backgroundColor: "#e4473e",
        width: "100%",
        bottom: "0%",
        id: "__alloyId28"
    });
    $.__views.topNav.add($.__views.__alloyId28);
    var __alloyId29 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen"
    });
    __alloyId29.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen"
    });
    __alloyId29.push($.__views.videosScreen);
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
    $.__views.videosScreen.add($.__views.activity);
    $.__views.campaignsScreen = Ti.UI.createView({
        backgroundColor: "#f2f2f2",
        id: "campaignsScreen"
    });
    __alloyId29.push($.__views.campaignsScreen);
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
    $.__views.campaignsScreen.add($.__views.activity);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen"
    });
    __alloyId29.push($.__views.upcomingScreen);
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
    $.__views.upcomingScreen.add($.__views.activity);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen"
    });
    __alloyId29.push($.__views.artistsScreen);
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
    $.__views.artistsScreen.add($.__views.activity);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "80%",
        top: "20%",
        views: __alloyId29,
        id: "scrollableView"
    });
    $.__views.feedWin.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var activeTab = arguments[0] || {};
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
    var artists = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        left: 0,
        backgroundColor: "#f2f2f2"
    });
    var backArrow = Ti.UI.createLabel({
        color: "Gray",
        text: "◃"
    });
    $.backArrow.add(backArrow);
    $.actionIos.addEventListener("click", function() {
        var back = Alloy.createController("index").getView();
        back.open();
    });
    1 == activeTab && data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
    2 == activeTab && data.getCampaigns($.activity, campaigns, 0, 0, categoryId);
    3 == activeTab && data.getListItems($.activity, upcomming, 0, 0, categoryId, 0, 0, "Events");
    4 == activeTab && data.getArtists($.activity, artists, 0, 0, categoryId);
    $.videosScreen.add(live);
    $.categoriesScreen.add(categories);
    $.campaignsScreen.add(campaigns);
    $.upcomingScreen.add(upcomming);
    $.artistsScreen.add(artists);
    $.feedWin.open();
    $.scrollableView.currentPage = activeTab;
    var osname = Ti.Platform.osname, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
    scrollunit = width / 5;
    var isTablet = "ipad" === osname || "android" === osname && (width > 899 || height > 899);
    if (isTablet) {
        $.NavContainer.width = width;
        $.barContainer.width = "100%";
        $.topNav.setScrollingEnabled = false;
    } else $.topNav.scrollTo(60, 0);
    var cualquiera = $.NavContainer.width - width;
    scrollunit += cualquiera / 5;
    $.menuBar.scrollTo(-scrollunit * activeTab, 0);
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
        var topScroll = 0;
        if (!isTablet) {
            1 == $.scrollableView.currentPage && (topScroll = 60);
            2 == $.scrollableView.currentPage && (topScroll = 160);
            3 == $.scrollableView.currentPage && (topScroll = 180);
            4 != $.scrollableView.currentPage && $.topNav.scrollTo(topScroll, 0);
        }
        $.menuBar.scrollTo(-scrollunit * $.scrollableView.currentPage, 0);
    });
    $.scrollableView.addEventListener("scrollend", function() {
        0 == $.scrollableView.currentPage && 0 == categories.data.length && data.getCategories($.activity, categories);
        1 == $.scrollableView.currentPage && 0 == live.data.length && data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
        2 == $.scrollableView.currentPage && 0 == campaigns.children.length && data.getCampaigns($.activity, campaigns, 0, 0, categoryId);
        3 == $.scrollableView.currentPage && 0 == upcomming.data.length && data.getListItems($.activity, upcomming, 0, 0, categoryId, 0, 0, "Events");
        4 == $.scrollableView.currentPage && 0 == artists.children.length && data.getArtists($.activity, artists, 0, 0, categoryId);
    });
    categories.addEventListener("click", function(e) {
        var title = "Categories";
        e.source.link > 0 && (title = e.source.text);
        resetInitPage(e.source.link, title);
    });
    live.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewVideo", e.source.link).getView();
            win.open();
        }
    });
    upcomming.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewEvent", e.source.link).getView();
            win.open();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;