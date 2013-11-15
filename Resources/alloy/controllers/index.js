function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        title: Alloy.Globals.NAME_PAGE,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.Navigation = Ti.UI.createView({
        height: "8%",
        top: "-8%",
        backgroundColor: "#16011e",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.index.add($.__views.Navigation);
    $.__views.logo = Ti.UI.createImageView({
        top: "5%",
        height: "90%",
        id: "logo",
        image: "/images/logo-liveon.png"
    });
    $.__views.Navigation.add($.__views.logo);
    $.__views.__alloyId1 = Ti.UI.createView({
        height: "5%",
        backgroundColor: "gray",
        width: "100%",
        bottom: 0,
        id: "__alloyId1"
    });
    $.__views.Navigation.add($.__views.__alloyId1);
    $.__views.banner = Ti.UI.createView({
        height: "54%",
        top: "8%",
        backgroundImage: "/app-cover.jpg",
        left: "-100%",
        id: "banner"
    });
    $.__views.index.add($.__views.banner);
    $.__views.overlay = Ti.UI.createView({
        opacity: .7,
        id: "overlay"
    });
    $.__views.banner.add($.__views.overlay);
    $.__views.gradient = Ti.UI.createView({
        id: "gradient"
    });
    $.__views.overlay.add($.__views.gradient);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        color: "white",
        font: {
            fontSize: "25dp",
            fontWeight: "bold"
        },
        bottom: "5%",
        left: "4%",
        width: "92%",
        textAlign: "center",
        text: "Promoting your music with Live Video",
        id: "__alloyId2"
    });
    $.__views.banner.add($.__views.__alloyId2);
    $.__views.buttoncontainer = Ti.UI.createView({
        height: "38%",
        top: "100%",
        backgroundColor: "white",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "buttoncontainer"
    });
    $.__views.index.add($.__views.buttoncontainer);
    $.__views.__alloyId3 = Ti.UI.createView({
        height: "1%",
        backgroundColor: "#d0d0d0",
        width: "100%",
        top: "0%",
        id: "__alloyId3"
    });
    $.__views.buttoncontainer.add($.__views.__alloyId3);
    $.__views.topButtons = Ti.UI.createView({
        height: "45%",
        top: "5%",
        width: "100%",
        id: "topButtons"
    });
    $.__views.buttoncontainer.add($.__views.topButtons);
    $.__views.liveShows = Ti.UI.createView({
        width: "48%",
        left: "2%",
        borderWidth: 1,
        borderColor: "#d0d0d0",
        backgroundColor: "#e4473e",
        id: "liveShows"
    });
    $.__views.topButtons.add($.__views.liveShows);
    $.__views.__alloyId4 = Ti.UI.createImageView({
        top: "32%",
        height: "36%",
        left: "10%",
        image: "/images/bolt.png",
        id: "__alloyId4"
    });
    $.__views.liveShows.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createLabel({
        left: "35%",
        color: "white",
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        text: "Live Shows",
        id: "__alloyId5"
    });
    $.__views.liveShows.add($.__views.__alloyId5);
    $.__views.Campaigns = Ti.UI.createView({
        width: "47%",
        left: "51%",
        borderWidth: 1,
        borderColor: "#d0d0d0",
        backgroundColor: "#e4473e",
        id: "Campaigns"
    });
    $.__views.topButtons.add($.__views.Campaigns);
    $.__views.__alloyId6 = Ti.UI.createImageView({
        top: "32%",
        height: "36%",
        left: "10%",
        image: "/images/campaigns.png",
        id: "__alloyId6"
    });
    $.__views.Campaigns.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        left: "35%",
        color: "white",
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        text: "Campaigns",
        id: "__alloyId7"
    });
    $.__views.Campaigns.add($.__views.__alloyId7);
    $.__views.bottomButtons = Ti.UI.createView({
        height: "45%",
        top: "51%",
        width: "100%",
        id: "bottomButtons"
    });
    $.__views.buttoncontainer.add($.__views.bottomButtons);
    $.__views.upcomingEvents = Ti.UI.createView({
        width: "48%",
        left: "2%",
        borderWidth: 1,
        borderColor: "#d0d0d0",
        backgroundColor: "#e4473e",
        id: "upcomingEvents"
    });
    $.__views.bottomButtons.add($.__views.upcomingEvents);
    $.__views.__alloyId8 = Ti.UI.createImageView({
        top: "32%",
        height: "36%",
        left: "10%",
        image: "/images/upcoming.png",
        id: "__alloyId8"
    });
    $.__views.upcomingEvents.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        left: "35%",
        color: "white",
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        text: "Upcoming",
        id: "__alloyId9"
    });
    $.__views.upcomingEvents.add($.__views.__alloyId9);
    $.__views.artists = Ti.UI.createView({
        width: "47%",
        left: "51%",
        borderWidth: 1,
        borderColor: "#d0d0d0",
        backgroundColor: "#e4473e",
        id: "artists"
    });
    $.__views.bottomButtons.add($.__views.artists);
    $.__views.__alloyId10 = Ti.UI.createImageView({
        top: "32%",
        height: "36%",
        left: "10%",
        image: "/images/artists.png",
        id: "__alloyId10"
    });
    $.__views.artists.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        left: "35%",
        color: "white",
        font: {
            fontWeight: "bold",
            fontSize: "15dp"
        },
        text: "Artists",
        id: "__alloyId11"
    });
    $.__views.artists.add($.__views.__alloyId11);
    exports.destroy = function() {};
    _.extend($, $.__views);
    (Ti.Platform.displayCaps.platformWidth - 30) / 2;
    (Ti.Platform.displayCaps.platformWidth - 30) / 4;
    Ti.App.Properties.setString("user_id", null);
    Ti.App.Properties.setString("username", null);
    $.index.addEventListener("open", function() {
        var matrix = Ti.UI.create2DMatrix();
        matrix = matrix.scale(1.1, 1);
        var a = Ti.UI.createAnimation({
            transform: matrix,
            duration: 350,
            autoreverse: true,
            repeat: 0,
            delay: 450,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
        });
        var b = Ti.UI.createAnimation({
            transform: matrix,
            duration: 350,
            autoreverse: true,
            repeat: 0,
            delay: 450,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
        });
        $.topButtons.animate(a);
        $.bottomButtons.animate(b);
        $.banner.animate({
            left: "0%",
            top: "8%",
            duration: 300,
            delay: 100,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
        $.Navigation.animate({
            left: 0,
            top: "0%",
            duration: 250,
            delay: 750,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
        $.buttoncontainer.animate({
            left: 0,
            top: "62%",
            duration: 500,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
    });
    var actionBar;
    $.index.addEventListener("open", function() {
        if ($.index.activity) {
            actionBar = $.index.activity.actionBar;
            actionBar && actionBar.hide();
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.liveShows.addEventListener("click", function() {
        var win = Alloy.createController("feed", 1).getView();
        win.open();
    });
    $.Campaigns.addEventListener("click", function() {
        var win = Alloy.createController("feed", 2).getView();
        win.open();
    });
    $.upcomingEvents.addEventListener("click", function() {
        var win = Alloy.createController("feed", 3).getView();
        win.open();
    });
    $.artists.addEventListener("click", function() {
        var win = Alloy.createController("feed", 4).getView();
        win.open();
    });
    $.overlay.setBackgroundGradient({
        type: "linear",
        startPoint: {
            x: "50%",
            y: "0%"
        },
        endPoint: {
            x: "50%",
            y: "100%"
        },
        colors: [ {
            color: "#282139",
            offset: .25
        }, {
            color: "#534377",
            offset: .45
        }, {
            color: "#745DA8",
            offset: .6
        } ]
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;