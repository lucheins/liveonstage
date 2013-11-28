function acctionLogin() {
    if (Ti.App.Properties.getString("user_id") > 0) {
        Ti.App.Properties.setString("user_id", null);
        Ti.App.Properties.setString("username", null);
        Ti.App.Properties.setString("timezone", null);
        Ti.App.Properties.setString("name", null);
        var win = Alloy.createController("feed", 1).getView();
    } else var win = Alloy.createController("login").getView();
    win.fullscreen = false;
    win.fullscreen = false;
    win.open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in,
        activityExitAnimation: Ti.Android.R.anim.fade_out
    });
}

function resetInitPage(catId, title, activity) {
    categoryId = catId;
    actionBar.title = title;
    live.setData([]);
    campaigns.removeAllChildren();
    campaigns.removeAllChildren();
    upcomming.setData([]);
    artists.removeAllChildren();
    data.getListItems(activity, live, 0, 0, categoryId, 0, 0, "Videos");
    viewPager.scrollTo(1);
}

exports.putActionBar = function(currentWindow, title, isFeed, vp, container, activity) {
    var buttomText = "Login";
    Ti.App.Properties.getString("user_id") > 0 && (buttomText = "Logout");
    var actionBar;
    currentWindow.addEventListener("open", function() {
        if (currentWindow.activity) {
            actionBar = currentWindow.activity.actionBar;
            if (actionBar) {
                actionBar.backgroundImage = "/bg.png";
                actionBar.title = title;
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    if (isFeed) resetInitPage(0, "Categories", activity); else {
                        if (vp) {
                            vp.hide();
                            vp.release();
                            vp = null;
                        }
                        currentWindow.close();
                    }
                };
                "Login" != title && (currentWindow.activity.onCreateOptionsMenu = function(e) {
                    var menu = e.menu;
                    var menuItem = menu.add({
                        title: buttomText,
                        showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
                    });
                    menuItem.addEventListener("click", function() {
                        acctionLogin();
                    });
                });
            }
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
};

exports.iosActionLogin = function() {
    acctionLogin();
};