function Controller() {
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
    var data = require("dataExport");
    var table = Ti.UI.createTableView();
    var table1 = Ti.UI.createTableView();
    var table2 = Ti.UI.createTableView();
    var table3 = Ti.UI.createTableView();
    var table4 = Ti.UI.createTableView();
    data.getCategories($.activity, table);
    data.getDataEvents($.activity, table1, 0, 0, 0, 0);
    data.getDataEvents($.activity, table2, 0, 0, 1, 0);
    data.getDataLists($.activity, table3, 0, 0, "Videos", 0);
    data.getDataLists($.activity, table4, 0, 0, "Artists", 0);
    (function() {
        var a = [];
        for (var i = 0; 100 > i; i++) a.push({
            title: "I am item " + i
        });
        return a;
    })();
    var pagerDataScrolling = [ {
        title: "Categories",
        view: table
    }, {
        title: "Live Shows",
        view: table3
    }, {
        title: "Campaigns",
        view: table2
    }, {
        title: "Upcomming",
        view: table1
    }, {
        title: "Artist",
        view: table4
    } ];
    var viewPager = module.createViewPager({
        data: pagerDataScrolling,
        tabs: {
            style: module.SCROLLING
        }
    });
    $.feedWin.add(viewPager);
    $.feedWin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;