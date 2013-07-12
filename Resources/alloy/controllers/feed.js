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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Alloy.createController("tabs").getView();
    $.feedWin.add(win);
    var module = require("net.bajawa.pager");
    var dummyTableData = function() {
        var a = [];
        for (var i = 0; 100 > i; i++) a.push({
            title: "I am item " + i
        });
        return a;
    }();
    var dummyTableData1 = function() {
        var a = [];
        for (var i = 0; 100 > i; i++) a.push({
            title: "you am item " + i
        });
        return a;
    }();
    var pagerDataScrolling = [ {
        title: "First tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Second tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Third tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Fourth tab",
        view: Ti.UI.createTableView({
            data: dummyTableData1
        })
    }, {
        title: "Fifth tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Sixth tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Seventh tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
    }, {
        title: "Eight tab",
        view: Ti.UI.createTableView({
            data: dummyTableData
        })
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