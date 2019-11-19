function getQueryString(name) {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[name];
}

function initialization(userId) {
    if (aliWebrtc) {
        aliWebrtc.configRemoteAudio(userId, false);
        aliWebrtc.configRemoteCameraTrack(userId, false, false);
        aliWebrtc.configRemoteScreenTrack(userId, false);
    }
}

function getSubscribeInfo(userId) {
    var userInfo = aliWebrtc.getUserInfo(userId);
    var subscribeInfo = [], subscribeInfoArr = [], isSubAudio = false, isSubLarge = false, isSubSmall = false, isSubCamera = false, isSubScreen = false, isSubVideo = false;
    if (userInfo) {
        userInfo.streamConfigs.forEach(v => {
        if (v.subscribed) {
            subscribeInfo.push(v.label);
            subscribeInfoArr.push(v);
            v.type == "audio" ? isSubAudio = true : console.warn("不是音频", JSON.stringify(v), v.type);
            v.type == "video" ? isSubVideo = true : '';
            v.label == "sophon_video_camera_large" ? isSubLarge = true : "";
            v.label == "sophon_video_camera_small" ? isSubSmall = true : "";
            v.label == "sophon_video_screen_share" ? isSubScreen = true : "";
            if (isSubLarge || isSubSmall) {
                isSubCamera = true;
            }
        }
        });
    }
    return { subscribeInfo: subscribeInfo, subscribeInfoArr: subscribeInfoArr, isSubLarge: isSubLarge, isSubSmall: isSubSmall, isSubCamera: isSubCamera, isSubAudio: isSubAudio, isSubScreen: isSubScreen, isSubVideo: isSubVideo };
}

Array.prototype.getIndexByProprety = function (val, proprety) {
    var arr = this;
    var index = -1;
    arr.forEach((v, i, a) => {
        if (v[proprety] == val) {
            index = i;
        }
    });
    return index;
}