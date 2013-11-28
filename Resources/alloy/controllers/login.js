function Controller() {
    function checkdata(value) {
        var testresults = false;
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        filter.test(value) && (testresults = true);
        return testresults;
    }
    function openWindowsLoginSussess() {
        var args = {
            author: Ti.App.Properties.getString("user_id"),
            authorname: Ti.App.Properties.getString("name"),
            view: "Events"
        };
        var win = Alloy.createController("viewListEventsToLive", args).getView();
        win.fullscreen = false;
        win.open({
            activityEnterAnimation: Ti.Android.R.anim.fade_in,
            activityExitAnimation: Ti.Android.R.anim.fade_out
        });
        $.login.close();
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
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.login.add($.__views.container);
    $.__views.username = Ti.UI.createTextField({
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
        returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
        color: "#336699",
        hintText: "Username",
        top: "2%",
        width: "80%",
        height: "10%",
        left: "10%",
        border: 1,
        borderColor: "#c1c1c1",
        paddingLeft: 5,
        id: "username"
    });
    $.__views.container.add($.__views.username);
    $.__views.password = Ti.UI.createTextField({
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        keyboardType: "Titanium.UI.KEYBOARD_DEFAULT",
        returnKeyType: "Titanium.UI.RETURNKEY_DEFAULT",
        color: "#336699",
        hintText: "Password",
        passwordMask: "true",
        top: "14%",
        width: "80%",
        height: "10%",
        left: "10%",
        border: 1,
        borderColor: "#c1c1c1",
        paddingLeft: 5,
        id: "password"
    });
    $.__views.container.add($.__views.password);
    $.__views.TimezoneLabel = Ti.UI.createLabel({
        top: "28%",
        font: {
            fontSize: "15dp",
            fontWeight: "bold"
        },
        color: "#c9c9c9",
        left: "10%",
        text: "Select your current timezone",
        id: "TimezoneLabel"
    });
    $.__views.container.add($.__views.TimezoneLabel);
    var __alloyId12 = [];
    $.__views.pickTimezone = Ti.UI.createPicker({
        top: "36%",
        width: "80%",
        left: "10%",
        font: {
            fontSize: "10dp"
        },
        id: "pickTimezone"
    });
    $.__views.container.add($.__views.pickTimezone);
    $.__views.__alloyId13 = Ti.UI.createPickerRow({
        value: "-12:00,0",
        title: "(-12:00) International Date Line West",
        id: "__alloyId13"
    });
    __alloyId12.push($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createPickerRow({
        value: "-11:00,0",
        title: "(-11:00) Midway Island, Samoa",
        id: "__alloyId14"
    });
    __alloyId12.push($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createPickerRow({
        value: "-10:00,0",
        title: "(-10:00) Hawaii",
        id: "__alloyId15"
    });
    __alloyId12.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createPickerRow({
        value: "-09:00,1",
        title: "(-09:00) Alaska",
        id: "__alloyId16"
    });
    __alloyId12.push($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createPickerRow({
        value: "-08:00,1",
        title: "(-08:00) Pacific Time (US & Canada)",
        id: "__alloyId17"
    });
    __alloyId12.push($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createPickerRow({
        value: "-07:00,0",
        title: "(-07:00) Arizona",
        id: "__alloyId18"
    });
    __alloyId12.push($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createPickerRow({
        value: "-07:00,1",
        title: "(-07:00) Mountain Time (US & Canada)",
        id: "__alloyId19"
    });
    __alloyId12.push($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createPickerRow({
        value: "-06:00,0",
        title: "(-06:00) Central America, Saskatchewan",
        id: "__alloyId20"
    });
    __alloyId12.push($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createPickerRow({
        value: "-06:00,1",
        title: "(-06:00) Central Time (US & Canada), Guadalajara, Mexico city",
        id: "__alloyId21"
    });
    __alloyId12.push($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createPickerRow({
        value: "-05:00,0",
        title: "(-05:00) Indiana, Bogota, Lima, Quito, Rio Branco",
        id: "__alloyId22"
    });
    __alloyId12.push($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createPickerRow({
        value: "-05:00,1",
        title: "(-05:00) Eastern time (US & Canada)",
        selected: "true",
        id: "__alloyId23"
    });
    __alloyId12.push($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createPickerRow({
        value: "-04:00,1",
        title: "(-04:00) Atlantic time (Canada), Manaus, Santiago",
        id: "__alloyId24"
    });
    __alloyId12.push($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createPickerRow({
        value: "-04:30,0",
        title: "(-04:30) Caracas",
        id: "__alloyId25"
    });
    __alloyId12.push($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createPickerRow({
        value: "-04:00,0",
        title: "(-04:00) La Paz",
        id: "__alloyId26"
    });
    __alloyId12.push($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createPickerRow({
        value: "-03:30,1",
        title: "(-03:30) Newfoundland",
        id: "__alloyId27"
    });
    __alloyId12.push($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createPickerRow({
        value: "-03:00,1",
        title: "(-03:00) Greenland, Brasilia, Montevideo",
        id: "__alloyId28"
    });
    __alloyId12.push($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createPickerRow({
        value: "-03:00,0",
        title: "(-03:00) Buenos Aires, Georgetown",
        id: "__alloyId29"
    });
    __alloyId12.push($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createPickerRow({
        value: "-02:00,1",
        title: "(-02:00) Mid-Atlantic",
        id: "__alloyId30"
    });
    __alloyId12.push($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createPickerRow({
        value: "-01:00,1",
        title: "(-01:00) Azores",
        id: "__alloyId31"
    });
    __alloyId12.push($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createPickerRow({
        value: "-01:00,0",
        title: "(-01:00) Cape Verde Is.",
        id: "__alloyId32"
    });
    __alloyId12.push($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createPickerRow({
        value: "00:00,0",
        title: "(00:00) Casablanca, Monrovia, Reykjavik",
        id: "__alloyId33"
    });
    __alloyId12.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createPickerRow({
        value: "00:00,1",
        title: "(00:00) GMT: Dublin, Edinburgh, Lisbon, London",
        id: "__alloyId34"
    });
    __alloyId12.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createPickerRow({
        value: "+01:00,1",
        title: "(+01:00) Amsterdam, Berlin, Rome, Vienna, Prague, Brussels",
        id: "__alloyId35"
    });
    __alloyId12.push($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createPickerRow({
        value: "+01:00,0",
        title: "(+01:00) West Central Africa",
        id: "__alloyId36"
    });
    __alloyId12.push($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createPickerRow({
        value: "+02:00,1",
        title: "(+02:00) Amman, Athens, Istanbul, Beirut, Cairo, Jerusalem",
        id: "__alloyId37"
    });
    __alloyId12.push($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createPickerRow({
        value: "+02:00,0",
        title: "(+02:00) Harare, Pretoria",
        id: "__alloyId38"
    });
    __alloyId12.push($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createPickerRow({
        value: "+03:00,1",
        title: "(+03:00) Baghdad, Moscow, St. Petersburg, Volgograd",
        id: "__alloyId39"
    });
    __alloyId12.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createPickerRow({
        value: "+03:00,0",
        title: "(+03:00) Kuwait, Riyadh, Nairobi, Tbilisi",
        id: "__alloyId40"
    });
    __alloyId12.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createPickerRow({
        value: "+03:30,0",
        title: "(+03:30) Tehran",
        id: "__alloyId41"
    });
    __alloyId12.push($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createPickerRow({
        value: "+04:00,0",
        title: "(+04:00) Abu Dhadi, Muscat",
        id: "__alloyId42"
    });
    __alloyId12.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createPickerRow({
        value: "+04:00,1",
        title: "(+04:00) Baku, Yerevan",
        id: "__alloyId43"
    });
    __alloyId12.push($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createPickerRow({
        value: "+04:30,0",
        title: "(+04:30) Kabul",
        id: "__alloyId44"
    });
    __alloyId12.push($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createPickerRow({
        value: "+05:00,1",
        title: "(+05:00) Ekaterinburg",
        id: "__alloyId45"
    });
    __alloyId12.push($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createPickerRow({
        value: "+05:00,0",
        title: "(+05:00) Islamabad, Karachi, Tashkent",
        id: "__alloyId46"
    });
    __alloyId12.push($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createPickerRow({
        value: "+05:30,0",
        title: "(+05:30) Chennai, Kolkata, Mumbai, New Delhi, Sri Jayawardenepura",
        id: "__alloyId47"
    });
    __alloyId12.push($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createPickerRow({
        value: "+05:45,0",
        title: "(+05:45) Kathmandu",
        id: "__alloyId48"
    });
    __alloyId12.push($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createPickerRow({
        value: "+06:00,0",
        title: "(+06:00) Astana, Dhaka",
        id: "__alloyId49"
    });
    __alloyId12.push($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createPickerRow({
        value: "+06:00,1",
        title: "(+06:00) Almaty, Nonosibirsk",
        id: "__alloyId50"
    });
    __alloyId12.push($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createPickerRow({
        value: "+06:30,0",
        title: "(+06:30) Yangon (Rangoon)",
        id: "__alloyId51"
    });
    __alloyId12.push($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createPickerRow({
        value: "+07:00,1",
        title: "(+07:00) Krasnoyarsk",
        id: "__alloyId52"
    });
    __alloyId12.push($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createPickerRow({
        value: "+07:00,0",
        title: "(+07:00) Bangkok, Hanoi, Jakarta",
        id: "__alloyId53"
    });
    __alloyId12.push($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createPickerRow({
        value: "+08:00,0",
        title: "(+08:00) Beijing, Hong Kong, Singapore, Taipei",
        id: "__alloyId54"
    });
    __alloyId12.push($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createPickerRow({
        value: "+08:00,1",
        title: "(+08:00) Irkutsk, Ulaan Bataar, Perth",
        id: "__alloyId55"
    });
    __alloyId12.push($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createPickerRow({
        value: "+09:00,1",
        title: "(+09:00) Yakutsk",
        id: "__alloyId56"
    });
    __alloyId12.push($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createPickerRow({
        value: "+09:00,0",
        title: "(+09:00) Seoul, Osaka, Sapporo, Tokyo",
        id: "__alloyId57"
    });
    __alloyId12.push($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createPickerRow({
        value: "+09:30,0",
        title: "(+09:30) Darwin",
        id: "__alloyId58"
    });
    __alloyId12.push($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createPickerRow({
        value: "+09:30,1",
        title: "(+09:30) Adelaide",
        id: "__alloyId59"
    });
    __alloyId12.push($.__views.__alloyId59);
    $.__views.__alloyId60 = Ti.UI.createPickerRow({
        value: "+10:00,0",
        title: "(+10:00) Brisbane, Guam, Port Moresby",
        id: "__alloyId60"
    });
    __alloyId12.push($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createPickerRow({
        value: "+10:00,1",
        title: "(+10:00) Canberra, Melbourne, Sydney, Hobart, Vladivostok",
        id: "__alloyId61"
    });
    __alloyId12.push($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createPickerRow({
        value: "+11:00,0",
        title: "(+11:00) Magadan, Solomon Is., New Caledonia",
        id: "__alloyId62"
    });
    __alloyId12.push($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createPickerRow({
        value: "+12:00,1",
        title: "(+12:00) Auckland, Wellington",
        id: "__alloyId63"
    });
    __alloyId12.push($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createPickerRow({
        value: "+12:00,0",
        title: "(+12:00) Fiji, Kamchatka, Marshall Is.",
        id: "__alloyId64"
    });
    __alloyId12.push($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createPickerRow({
        value: "+13:00,0",
        title: "(+13:00) Nuku'alof",
        id: "__alloyId65"
    });
    __alloyId12.push($.__views.__alloyId65);
    $.__views.pickTimezone.add(__alloyId12);
    $.__views.buttonLogin = Ti.UI.createButton({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        width: "45%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        bottom: "5%",
        height: "10%",
        textAlign: "center",
        id: "buttonLogin",
        title: "Login"
    });
    $.__views.container.add($.__views.buttonLogin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var timezone;
    $.pickTimezone.setSelectedRow(0, 10, false);
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.login, "Login", false, null, $.container, null, false);
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
                Ti.App.Properties.setString("name", response.name);
                Ti.App.Properties.setString("timezone", timezone);
                openWindowsLoginSussess();
            } else alert("Failed credentials");
            $.activity.hide();
        };
        client.onerror = function(e) {
            alert("Transmission error: " + e.error);
        };
        if ("" != $.username.value && "" != $.password.value) if (checkdata($.username.value)) if (checkdata($.password.value)) {
            timezone = $.pickTimezone.getSelectedRow(0).value;
            if ("zone" != timezone) {
                var user1 = Ti.Utils.base64encode($.username.value + "-" + $.password.value);
                var params = {
                    tc: Alloy.Globals.USER_MOBILE.toString(),
                    u: user1.toString()
                };
                client.send(params);
            } else alert("Please select Timezone");
        } else alert("Please enter a valid password"); else alert("Please enter a valid username"); else alert("Username/Password are required");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;