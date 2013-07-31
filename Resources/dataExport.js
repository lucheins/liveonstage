exports.getCampaigns = function(activity, table, offsetHome, pageHome, category) {
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
    client.open("POST", url);
    client.ondatastream = function() {
        activity.show();
    };
    client.onload = function() {
        var responses = JSON.parse(this.responseText);
        var posicion = table.getContentOffset();
        var item = table.children.length;
        var band = true;
        var more = false;
        for (var i = 0; responses.length > i; i++) {
            if ("more" != responses[i].title) {
                var link = responses[i].id;
                var args = {
                    name: responses[i].title,
                    link: link,
                    image: responses[i].image_video,
                    id: responses[i].campaign,
                    received: responses[i].received,
                    row: i + item,
                    isOdd: i % 2,
                    percent: responses[i].percent,
                    days: responses[i].days,
                    shortdesc: responses[i].short_description
                };
                var row = Alloy.createController("tileCampaigns", args).getView();
                band = false;
            } else {
                var args = {
                    row: i + item,
                    text: "Load More",
                    font: {
                        fontSize: "14dp"
                    }
                };
                var row = Alloy.createController("viewMore", args).getView();
                more = true;
            }
            table.add(row);
        }
        if (band) {
            var args = {
                row: i,
                text: "No Campaigns Found Here"
            };
            var row = Alloy.createController("viewMore", args).getView();
            table.add(row);
        }
        activity.hide();
        more && row.addEventListener("click", function() {
            pageHome += 1;
            var offset = pageHome * Alloy.Globals.LIMIT;
            table.remove(row);
            exports.getCampaigns(activity, table, offset, pageHome, category);
        });
        if (null != posicion && posicion.y > 0) {
            var plus = 60 * Ti.Platform.displayCaps.platformHeight / 100;
            table.scrollTo(0, posicion.y + plus);
        }
    };
    client.onerror = function() {
        alert(Alloy.Globals.CONNECTION_ERROR);
    };
    var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: "Campaigns",
        offset: offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category
    };
    client.send(params);
};

exports.getListItems = function(activity, table, offsetHome, pageHome, category, author, item_id, name) {
    var index = table.getIndexByName("rowMore");
    index > 0 && table.deleteRow(index);
    var tableData = table.getData();
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
    client.open("POST", url);
    client.ondatastream = function() {
        activity.show();
    };
    client.onload = function() {
        var responses = JSON.parse(this.responseText);
        var more = false;
        for (var i = 0; responses.length > i; i++) {
            if ("more" != responses[i].title) {
                var args = {
                    name: responses[i].name,
                    link: responses[i].id,
                    isOdd: i % 2,
                    page: name,
                    title: responses[i].title,
                    message: responses[i].message,
                    image: responses[i].image
                };
                var row = Alloy.createController("rowListItems", args).getView();
            } else {
                var row = Alloy.createController("rowMore").getView();
                more = true;
            }
            tableData.push(row);
        }
        if (0 == tableData.length) {
            var row = Alloy.createController("rowEmpty").getView();
            tableData.push(row);
        }
        table.setData(tableData);
        activity.hide();
        more && row.addEventListener("click", function() {
            pageHome += 1;
            var offset = pageHome * Alloy.Globals.LIMIT;
            exports.getListItems(activity, table, offset, pageHome, category, author, item_id, name);
        });
    };
    client.onerror = function() {
        alert(Alloy.Globals.CONNECTION_ERROR);
    };
    var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset: offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category,
        author: author,
        item_id: item_id
    };
    client.send(params);
};

exports.getArtists = function(activity, table, offsetHome, pageHome, category) {
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
    client.open("POST", url);
    client.ondatastream = function() {
        activity.show();
    };
    client.onload = function() {
        var responses = JSON.parse(this.responseText);
        var item = table.children.length;
        var posicion = table.getContentOffset();
        var band = true;
        var more = false;
        for (var i = 0; responses.length > i; i++) {
            if ("more" != responses[i].title) {
                var link = responses[i].video_id;
                var args = {
                    name: responses[i].title,
                    link: link,
                    image: responses[i].avatar,
                    id: responses[i].campaign,
                    received: responses[i].received,
                    days: responses[i].days,
                    fans: responses[i].fans,
                    campaing: responses[i].campaing_title,
                    percent: responses[i].percent,
                    videos: responses[i].num_videos,
                    row: i + item,
                    isOdd: i % 2,
                    views: responses[i].view,
                    status: responses[i].status,
                    about: responses[i].about,
                    id: responses[i].id
                };
                var row = Alloy.createController("viewArtists", args).getView();
                band = false;
            } else {
                var args = {
                    row: i + item,
                    text: "Load More"
                };
                var row = Alloy.createController("viewMore", args).getView();
                more = true;
            }
            table.add(row);
        }
        if (band) {
            var args = {
                row: i,
                text: "No Artists Found Here"
            };
            var row = Alloy.createController("viewMore", args).getView();
            table.add(row);
        }
        activity.hide();
        more && row.addEventListener("click", function() {
            pageHome += 1;
            var offset = pageHome * Alloy.Globals.LIMIT;
            table.remove(row);
            exports.getArtists(activity, table, offset, pageHome, category);
        });
        if (null != posicion && posicion.y > 0) {
            var plus = 60 * Ti.Platform.displayCaps.platformHeight / 100;
            table.scrollTo(0, posicion.y + plus);
        }
    };
    client.onerror = function() {
        alert(Alloy.Globals.CONNECTION_ERROR);
    };
    var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: "Artists",
        offset: offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: category
    };
    client.send(params);
};

exports.getCategories = function(activity, table) {
    var tableData = [];
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CATEGORIES;
    client.open("POST", url);
    client.ondatastream = function() {
        activity.show();
    };
    client.onload = function() {
        var responses = JSON.parse(this.responseText);
        for (var i = 0; responses.length > i; i++) {
            var link = responses[i].id;
            var args = {
                name: responses[i].name,
                link: link
            };
            var row = Alloy.createController("rowCategories", args).getView();
            tableData.push(row);
        }
        table.setData(tableData);
        activity.hide();
    };
    client.onerror = function() {
        alert(Alloy.Globals.CONNECTION_ERROR);
    };
    var params = {
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
};

exports.getListOfProfile = function(activity, table, offsetHome, pageHome, author, name) {
    var index = table.getIndexByName("rowMore");
    index > 0 && table.deleteRow(index);
    var tableData = table.getData();
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_BASE;
    client.open("POST", url);
    client.ondatastream = function() {
        activity.show();
    };
    client.onload = function() {
        var responses = JSON.parse(this.responseText);
        var more = false;
        for (var i = 0; responses.length > i; i++) {
            if ("more" != responses[i].title) {
                var args = {
                    name: responses[i].title,
                    link: responses[i].id,
                    isOdd: i % 2
                };
                var row = Alloy.createController("rowListProfile", args).getView();
            } else {
                var row = Alloy.createController("rowMore").getView();
                more = true;
            }
            tableData.push(row);
        }
        if (0 == tableData.length) {
            var row = Alloy.createController("rowEmpty").getView();
            tableData.push(row);
        }
        table.setData(tableData);
        activity.hide();
        more && row.addEventListener("click", function() {
            pageHome += 1;
            var offset = pageHome * Alloy.Globals.LIMIT;
            exports.getListOfProfile(activity, table, offset, pageHome, author, name);
        });
    };
    client.onerror = function() {
        alert(Alloy.Globals.CONNECTION_ERROR);
    };
    var params = {
        tc: Alloy.Globals.USER_MOBILE.toString(),
        name: name,
        offset: offsetHome,
        limit: Alloy.Globals.LIMIT,
        top: Alloy.Globals.TOP_LIMIT,
        category: 0,
        author: author,
        item_id: 0,
        all: 1
    };
    client.send(params);
};