function Controller() {
    function checkdata(value) {
        var testresults = false;
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        filter.test(value) && (testresults = true);
        return testresults;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "login";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 100,
        id: "activity"
    });
    $.__views.login.add($.__views.activity);
    $.__views.username = Ti.UI.createTextField({
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
        returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
        color: "#336699",
        hintText: "Username",
        top: "10dp",
        width: "250dp",
        height: "60dp",
        id: "username"
    });
    $.__views.login.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
        returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
        color: "#336699",
        hintText: "Password",
        passwordMask: "true",
        top: "70dp",
        width: "250dp",
        height: "60dp",
        id: "password"
    });
    $.__views.login.add($.__views.password);
    $.__views.buttonLogin = Ti.UI.createButton({
        font: {
            fontSize: "13dp",
            fontWeight: "bold"
        },
        width: "25%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        top: "140dp",
        height: "35dp",
        textAlign: "center",
        id: "buttonLogin",
        title: "Login"
    });
    $.__views.login.add($.__views.buttonLogin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    var actionBar;
    $.login.addEventListener("open", function() {
        if ($.login.activity) {
            actionBar = $.login.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = "Login";
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    var win = Alloy.createController("viewEvent", id).getView();
                    win.fullscreen = false;
                    win.open({
                        activityEnterAnimation: Ti.Android.R.anim.fade_in,
                        activityExitAnimation: Ti.Android.R.anim.fade_out
                    });
                    $.login.close();
                };
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.buttonLogin.addEventListener("click", function() {
        var client = Ti.Network.createHTTPClient();
        var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_LOGIN;
        client.open("POST", url);
        client.ondatastream = function() {
            $.activity.show();
        };
        client.onload = function() {
            var json = this.responseText;
            var response = JSON.parse(json);
            if (response.id > 0) {
                alert("Welcome " + response.name + ".");
                $.username.blur();
                $.password.blur();
                Ti.App.Properties.setString("user_id", response.id);
                Ti.App.Properties.setString("username", response.username);
                var win = Alloy.createController("viewEvent", id).getView();
                win.fullscreen = false;
                win.open({
                    activityEnterAnimation: Ti.Android.R.anim.fade_in,
                    activityExitAnimation: Ti.Android.R.anim.fade_out
                });
                $.login.close();
            } else alert("Failed credentials");
            $.activity.hide();
        };
        client.onerror = function(e) {
            alert("Transmission error: " + e.error);
        };
        if ("" != $.username.value && "" != $.password.value) if (checkdata($.username.value)) if (checkdata($.password.value)) {
            var user1 = Ti.Utils.base64encode($.username.value + "-" + $.password.value);
            var params = {
                tc: Alloy.Globals.USER_MOBILE.toString(),
                u: user1.toString()
            };
            client.send(params);
        } else alert("Please enter a valid password"); else alert("Please enter a valid username"); else alert("Username/Password are required");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;