function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowListItems = Ti.UI.createTableViewRow({
        height: "80dp",
        touchEnabled: true,
        hasChild: false,
        id: "rowListItems"
    });
    $.__views.rowListItems && $.addTopLevelView($.__views.rowListItems);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        left: "110dp",
        top: "5dp",
        id: "title"
    });
    $.__views.rowListItems.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        left: "110dp",
        bottom: "20dp",
        id: "author"
    });
    $.__views.rowListItems.add($.__views.author);
    $.__views.footMessage = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        left: "110dp",
        bottom: "5dp",
        id: "footMessage"
    });
    $.__views.rowListItems.add($.__views.footMessage);
    $.__views.image = Ti.UI.createImageView({
        width: "100dp",
        height: "70dp",
        left: "5dp",
        top: "5dp",
        id: "image"
    });
    $.__views.rowListItems.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var text = args.title || "";
    text.length > Alloy.Globals.TITLE_SIZE && (text = text.substring(0, Alloy.Globals.TITLE_SIZE - 2) + "...");
    $.title.text = text;
    $.title.link = args.link;
    $.author.text = args.name || "";
    $.author.link = args.link;
    $.footMessage.text = args.message || "";
    $.footMessage.link = args.link;
    var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
    if (null != args.image) {
        imageLink = args.image;
        "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
    }
    $.image.image = imageLink;
    $.image.link = args.link;
    $.rowListItems.backgroundColor = args.isOdd ? "#f2f2f2" : "#ffffff";
    $.rowListItems.link = args.link;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;