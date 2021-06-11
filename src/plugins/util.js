/**
 *
 * @desc 获取操作系统类型
 * @return {String}
 */
function getOS() {
    const userAgent = ("navigator" in window && "userAgent" in navigator && navigator.userAgent.toLowerCase()) || "";
    const appVersion = ("navigator" in window && "appVersion" in navigator && navigator.appVersion.toLowerCase()) || "";

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return "ios";
    if (/android/i.test(userAgent)) return "android";
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return "windowsPhone";
    if (/mac/i.test(appVersion)) return "MacOSX";
    if (/win/i.test(appVersion)) return "windows";
    if (/linux/i.test(appVersion)) return "linux";
}

/**
 * @desc 深拷贝
 * @param obj
 */
const deepClone = obj => {
    if (obj === null) return null;
    let clone = Object.assign({}, obj);
    Object.keys(clone).forEach(
        key =>
            (clone[key] =
                typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
    );
    if (Array.isArray(obj)) {
        clone.length = obj.length;
        return Array.from(clone);
    }
    return clone;
};

/**
 * @desc copy text to clipboard
 * @param str
 */
const copyToClipboard = str => {
    return new Promise((resolve, reject) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        let success = void 0;
        try {
            success = document.execCommand('copy');
        } catch (e) {
            success = false;
        }
        document.body.removeChild(el);
        if(success) {
            resolve()
        } else {
            reject()
        }
    })
};


/**
 *
 * @desc 判断是否为微信环境
 */
function is_weixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 *
 * @desc 获取url参数
 * @param {String} url
 * @returns {Object}
 */
function getUrlParams(url=window.location.href) {
    let search = window.location.search;
    if (!search) {
        return false;
    }
    let href = url.split('#')[0],
        str = href.split("?")[1], //  通过"?"得到一个数组,取?后面的参数
        items = str.split("&"), //  通过"&"分割成数组
        arr, name, value,
        result = {};
    for (let i = 0; i < items.length; i++) {
        arr = items[i].split("="); //  通过"="分割出每个参数的key和value
        name = arr[0];
        value = arr[1];
        result[name] = value;
    }
    return result;
}

function getUrlHash(url=window.location.href) {
    return url.split('#')[1]
}

/**
 * @desc 判断输入值是否是数组类型
 * @param {*} val
 * @return {Boolean}
 */
function isArray(val) {
    if (!val) {
        return false
    }
    if (Object.prototype.toString.call(val) === '[object Array]') {
        return true
    }
    return false
}

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
    return /^(\+?0?86?)?1[3456789]\d{9}$/.test(str)
}

/**
 *
 * @desc 根据name读取cookie
 * @param  {String} name
 * @return {String}
 */
function getCookie(name) {
    var arr = document.cookie.replace(/\s/g, "").split(";");
    for (var i = 0; i < arr.length; i++) {
        var tempArr = arr[i].split("=");
        if (tempArr[0] == name) {
            return decodeURIComponent(tempArr[1]);
        }
    }
    return "";
}

/**
 *
 * @desc  设置Cookie
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 */
function setCookie(name, value, days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    if (days === 0) {
        document.cookie = name + "=" + value;
    } else {
        document.cookie = name + "=" + value + ";expires=" + date;
    }

}

/**
 *
 * @desc 根据name删除cookie
 * @param  {String} name
 */
function removeCookie(name) {
    // 设置已过期，系统会立刻删除cookie
    setCookie(name, "0", -1);
}

/**
 * @desc 清空cookie
 */
function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
}

/**
 * @desc 注销用户
 */
function userLogOut() {
    deleteAllCookies();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/'
}

/**
 * @desc 生成32位随机数
 * @returns {string}
 */
function getRandomNum() {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e',
        'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
        'z'
    ];
    var nums = "";
    for (var i = 0; i < 32; i++) {
        var id = parseInt(Math.random() * 61);
        nums += chars[id];
    }
    return nums;
}

function percentage(n) {
    n *= 100;
    return ((n > 100) ? 100 : (n < 0) ? 0 : n) + "%";
}

function twoNum(n) {
    return (n > 9) ? n : '0' + n;
}

function conversion(n) {
    return twoNum(~~(n / 60)) + ':' + twoNum(~~(n % 60));
}

/**
 * @desc 将file文件转换为可显示的url
 * @param file
 * @returns {String}
 */
function getObjectURL(file) {
    var url = null
    if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
    } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
    }
    return url
}

/**
 * @desc 音频播放（谷歌自动播放限制的错误处理）
 * @param audioDom {String} 音频Dom的class或id
 */
function playAudio(audioDom) {
    return new Promise((resolve, reject) => {
        const audio = document.querySelector(audioDom);
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                audio.play();
                resolve()
            }).catch((e) => {
                console.log('err', e)
                reject(e)
            })
        }
    })
}

/**
 * @desc 返回 min（包含）～ max（包含）之间的数字
 * @param min {Number}
 * @param max {Number}
 * @returns {Number}
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

/**
 * @desc 将base64转换为blob
 * @param dataurl {String}
 * @returns {Blob}
 */
function dataURLtoBlob (dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

/**
 * @desc 将blob转换为file
 * @param theBlob {Blob}
 * @param fileName {String}
 * @returns {Blob, File, Boolean}
 */
function blobToFile(theBlob, fileName){
    let os = getOS();
    let theFile = false;
    if(os === 'ios') {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        theFile = theBlob;
    } else {
        theFile = new File([theBlob], fileName);
    }
    return theFile;
}

/**
 * @desc 将base64转换成图片文件
 * @param base64 {String}
 * @param filename {String}
 * @returns {Blob, File, Boolean}
 */
function dataURLtoFile(base64,filename) {
    let os = getOS();
    let theFile = false;
    let arr = base64.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    if(os === 'ios') {
        let blob = new Blob([u8arr], { type: mime });
        blob.lastModifiedDate = new Date();
        blob.name = filename;
        theFile = blob;
    } else {
        theFile = new File([u8arr], filename, {type:mime});
    }

    return theFile;
}


/**
 * @desc 自动滚动到屏幕中间
 * @param tagName {String} 标签(className, idName)
 * @param type {String} 垂直还是水平(block, inline),默认水平inline
 */
function scrollAutoCenter(tagName, type='inline') {
    if (!tagName || typeof tagName !== 'string') {
        return false;
    }
    let option = {
        behavior: 'smooth'
    }
    option[type] = 'center';
    document.querySelector(tagName).scrollIntoView(option);
}

/**
 * @desc 判断输入时间离当前时间是否超过24小时
 * @param time 时间戳(ms)
 */
function isOver24Hours(time) {
    const nowTime = new Date().getTime();
    const distance = nowTime - time;
    const limit = 24 * 60 * 60 * 1000;
    return distance >= limit;
}

/**
 * @desc 获取时间
 * @param {Object} date
 */
function getDateTimeOption(date) {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();
    month = twoNum(month)
    day = twoNum(day)
    hour = twoNum(hour)
    minute = twoNum(minute)
    second = twoNum(second)
    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}

/**
 * @desc 获取时间戳（ms）
 * @param {String} date (1990-01-01或者1990/01/01)
 */
function formatTimestamp(date) {
    // console.log('date--->', date)
    let osName = getOS();
    let newDate;
    if (osName === 'ios') {
        newDate = date.replace(/-/g, '/')
    } else {
        newDate = date.replace(/\//g, '-')
    }
    return new Date(newDate).getTime();
}

/**
 * @desc 模拟定时器
 * @param callback
 * @param interval
 * @returns {number}
 */
function simulateInterval(callback, interval) {
    let timerId = null;

    function fn() {
        callback();
        const prevTimmerId = timerId;
        timerId = setTimeout(fn, interval);
        clearTimeout(prevTimmerId);
    }

    return setTimeout(fn, interval);
}

/**
 * @desc 清除模拟定时器
 * @param intervalId
 */
function simulateClearInterval(intervalId) {
    intervalId && clearTimeout(intervalId);
}

function pushHistory() {
    let replaceUrl = window.location.href;
    let pathname = window.location.pathname;
    let pathnameArr = pathname.split('/');
    let hrefSymbol = pathnameArr[pathnameArr.length - 1];
    if (replaceUrl.indexOf("#") < 0) {
        replaceUrl += ( "#" + hrefSymbol );
        let state = {
            title: "title",
            url: replaceUrl
        };
        window.history.pushState(state, "title", replaceUrl);
    }
}

function replaceHistory(param) {
    let replaceUrl = window.location.href.split('#')[0];
    let state = {
        title: "title",
        url: replaceUrl,
    }
    replaceUrl += (`#${param}`)
    history.replaceState(state, 'title', replaceUrl)
}

/**
 * @desc 获取当天零时零点时间戳（单位：s）
 * @returns {number}
 */
function getTodayZeroTimeStamp() {
    return new Date().setHours(0, 0, 0, 0) / 1000
}

// 压缩前将file转换成img对象
function readImg(file)  {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const reader = new FileReader()
        reader.onload = function(e) {
            img.src = e.target.result
        }
        reader.onerror = function(e) {
            reject(e)
        }
        reader.readAsDataURL(file)
        img.onload = function() {
            resolve(img)
        }
        img.onerror = function(e) {
            reject(e)
        }
    })
}

/**
 * 压缩图片
 * @param img 被压缩的img对象
 * @param type 压缩后转换的文件类型
 * @param mx 触发压缩的图片最大宽度限制
 * @param mh 触发压缩的图片最大高度限制
 */
function compressImg(img, type, mx, mh) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        const { width: originWidth, height: originHeight } = img
        // 最大尺寸限制
        const maxWidth = mx
        const maxHeight = mh
        // 目标尺寸
        let targetWidth = originWidth
        let targetHeight = originHeight
        if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > 1) {
                //  宽图片
                targetWidth = maxWidth
                targetHeight = Math.round(maxWidth * (originHeight / originWidth))
            } else {
                // 高图片
                targetHeight = maxHeight
                targetWidth = Math.round(maxHeight * (originWidth / originHeight))
            }
        }
        canvas.width = targetWidth
        canvas.height = targetHeight
        context.clearRect(0, 0, targetWidth, targetHeight)
        // 图片绘制
        context.drawImage(img, 0, 0, targetWidth, targetHeight)
        canvas.toBlob(function(blob) {
            resolve(blob)
        }, type || 'image/png')  })
}

/**
 * @desc 数组交换两个值
 * @param index
 * @param r_index
 * @param array
 * @returns {boolean|*}
 */
function swapTwoVariablesInArray({index, r_index, array}) {
    if(!array || !isArray(array)) return false;
    let tmp = deepClone(array[index])
    array[index] = deepClone(array[r_index])
    array[r_index] = tmp
    return array
}

/**
 * @desc 子元素插在父元素内部的前面
 * @param o 插入的元素
 * @param s 父元素
 */
function prependChild(o,s){
    if(s.hasChildNodes()){
        s.insertBefore(o,s.firstChild);
    }else{
        s.appendChild(o);
    }
}

const utils = {
    getOS,
    deepClone,
    copyToClipboard,
    is_weixin,
    getUrlParams,
    getUrlHash,
    isArray,
    isEmptyObject,
    isPhoneNum,
    getCookie,
    setCookie,
    removeCookie,
    deleteAllCookies,
    userLogOut,
    getRandomNum,
    percentage,
    twoNum,
    conversion,
    getObjectURL,
    playAudio,
    getRndInteger,
    dataURLtoBlob,
    dataURLtoFile,
    blobToFile,
    scrollAutoCenter,
    isOver24Hours,
    getDateTimeOption,
    formatTimestamp,
    simulateInterval,
    simulateClearInterval,
    pushHistory,
    replaceHistory,
    getTodayZeroTimeStamp,
    readImg,
    compressImg,
    swapTwoVariablesInArray,
    prependChild
}

export default (app) => {
    app.config.globalProperties.$utils = utils
}