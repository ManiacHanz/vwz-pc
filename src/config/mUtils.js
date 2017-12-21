/*
    本地预览图片  JPG压缩 PNG不动
 */
import lrz from 'lrz'
export const u_viewPick = (input, option) => {
    let _default = {
        width: 400,
        quality: 0.7,
        maxSize: 100000,
    }
    let _option = Object.assign({}, _default, option)
    let file = input.files[0]
    let size = file.size             //尺寸 --字节
    let fileName = input.value        //格式名字
    let fileType = ''
    if(/\.(jpg|jpeg|JPG)$/.test(fileName)){
        fileType = 'jpg'
        // console.log('jpg图片')
        let promise = new Promise( (resolve, reject) => {
            lrz(input.files[0], _option).then((rst)=>{
                let pic = {
                    base64: rst.base64,
                    type: fileType
                }
                return pic
            }).then(pic=>{
                // console.log(pic.type)
                // reject(err)
                resolve(pic)
            })
        })
        return promise
    }
    else if(/\.(png|PNG)$/.test(fileName)) {
        fileType = 'png'
        return new Promise( (resolve, reject) => {
            // console.log('png图片')
            if(size < _option.maxSize) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                    reader.onloadend = function() {
                        let pic = {
                            base64: this.result,
                            type: fileType
                        }
                        resolve(pic)
                    }
                
            }else {
                input.value = ''
                reject('图片大小过大，请重新上传')
            }
        })    
    }
    else {
        alert('请上传png/jpg图片，其他类型暂不支持')
        
        return false
    }
}

/*
    获取当前时间
 */
export const u_getDate = () => {
    let time = new Date()
    let year = time.getFullYear()
    let month = (time.getMonth() + 1 )< 10? '0'+ time.getMonth() + 1 : time.getMonth() + 1
    let date = time.getDate() < 10? '0' +time.getDate(): time.getDate()
    let hour = time.getHours() < 10? '0' + time.getHours() : time.getHours()
    let minute = time.getMinutes() < 10? '0' +time.getMinutes() : time.getMinutes()
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
}

/*
    转换时间戳
 */
export const u_transTime = (time) => {
    let newTime = new Date(time);
    var year = newTime.getFullYear()
    var month = (newTime.getMonth() + 1 )< 10? '0'+ newTime.getMonth() + 1 : newTime.getMonth() + 1
    var date = newTime.getDate() < 10? '0' +newTime.getDate(): newTime.getDate()
    return year + '-' + month + '-' + date
}
/*
    处理掉返回数据的引号
 */
export const jsonParse = (data) => {
    //console.log(data.startsWith('{')|| data.startsWith('['))  //es6新方法
    // console.log(eval('(' + data + ')'))      // 字符串转对象
    if(!data || typeof data != 'object') {
        console.log('jsonParse error...')
        return false
    }
    let newData = {}
    for(let i in data) {
        // console.log(data[i])
        if( typeof data[i] == 'string' && (data[i].startsWith('{') || data[i].startsWith('['))) {
            //是个对象或者数组的字符串 就要去掉引号
            Object.defineProperty(newData, i, {
                value: eval('(' + data[i] + ')') ,
                enumerable: true,
            })
            // Object.assign({}, newData, {i: eval('(' + data[i] + ')')})
        }
        else {
            Object.defineProperty(newData, i, {
                value: data[i],
                enumerable: true,
            })
            // Object.assign({}, newData, {i: data[i]})
        }
    }
    return newData
}


/*
    发送数据转换成JSON字符串
 */
export const jsonStringify = (data) => {
    if(!data || typeof data != 'object') {
        console.log('jsonStringify error...')
        return false
    }
    let newData = {}
    for(let i in data) {
        // console.log(data[i])
        if( typeof data[i] != 'string' ) {
            //是个对象或者数组 就要增加引号
            Object.defineProperty(newData, i, {
                value: JSON.stringify(data[i]) ,
                enumerable: true,
            })
            // Object.assign({}, newData, {i: eval('(' + data[i] + ')')})
        }
        else {
            Object.defineProperty(newData, i, {
                value: data[i],
                enumerable: true,
            })
            // Object.assign({}, newData, {i: data[i]})
        }
    }
    return newData
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

/*
    根据中、英文字节长度分别控制Input的值   参数分别为 
    vue里的watch里
    newValue  oldValue  限制的长度  和绑定的data值（字符串）
 */
export const getInputLen = (str, old, length, data, _this) => {
    let len = 0;  
    for (let i=0; i<str.length; i++) {   
        let c = str.charCodeAt(i);   
        if(len<(length-1)){
        // 单字节加1 双字节加2  
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
                len++;   
            }   
            else {   
                len+=2;   
            }   
        }
        else if(len == (length-1)) {
            if((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++
            }
            else {
                _this[data] = old
            }
        }
        else if (len>=length) {
            _this[data] = _this[data].substr(0,i)
        }
    }   
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外 
export const banBackSpace = (e) => { 
    var ev = e || window.event;//获取event对象 
    var obj = ev.target || ev.srcElement;//获取事件源 

    var t = obj.type || obj.getAttribute('type');//获取事件源类型 

    //获取作为判断条件的事件类型 
    var vReadOnly = obj.getAttribute('readonly'); 
    var vEnabled = obj.getAttribute('enabled'); 
    //处理null值情况 
    vReadOnly = (vReadOnly == null) ? false : vReadOnly; 
    vEnabled = (vEnabled == null) ? true : vEnabled; 

    //当敲Backspace键时，事件源类型为密码、电话或单行、多行文本的， 
    //并且readonly属性为true或enabled属性为false的，则退格键失效 
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea" || t=="tel") && (vReadOnly==true || vEnabled!=true))?true:false; 

    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" && t !="tel") ?true:false; 

    //判断 
    if(flag2){ 
        return false; 
    } 
    if(flag1){ 
        return false; 
    } 
} 

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
    let target;
    // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
    if (attr === 'scrollTop') { 
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]; 
    }else{ 
        target = document.defaultView.getComputedStyle(element,null)[attr]; 
    }
    //在获取 opactiy 时需要获取小数 parseFloat
    return  NumberMode == 'float'? parseFloat(target) : parseInt(target);
} 

/**
 * 页面到达底部，加载更多
 */
export const loadMore = (element, callback) => {
	let windowHeight = window.screen.height;
	let height;
	let setTop;
	let paddingBottom;
	let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',() => {
       loadMore();
    }, false)
    //运动开始时获取元素 高度 和 offseTop, pading, margin
	element.addEventListener('touchstart',() => {
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element,'paddingBottom');
        marginBottom = getStyle(element,'marginBottom');
    },{passive: true})

    //运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',() => {
       loadMore();
    },{passive: true})

    //运动结束时判断是否有惯性运动，惯性运动结束判断是非到达底部
    element.addEventListener('touchend',() => {
       	oldScrollTop = document.body.scrollTop;
       	moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
            	cancelAnimationFrame(requestFram);
            	//为了防止鼠标抬起时已经渲染好数据从而导致重获取数据，应该重新获取dom高度
            	height = element.offsetHeight;
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if (document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom) {
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}


/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
    clearInterval(element.timer);

    //判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    //判断不同参数的情况
    if (mode instanceof Function) {
        callback = mode;
        mode = 'ease-out';
    }

    //获取dom样式
    const attrStyle = attr => {
        if (attr === "opacity") { 
            return Math.round(getStyle(element, attr, 'float') * 100);
        } else {
            return getStyle(element, attr);
        }
    }
    //根字体大小，需要从此将 rem 改成 px 进行运算
    const rootSize = parseFloat(document.documentElement.style.fontSize);

    const unit = {};
    const initState = {};

    //获取目标属性单位和初始样式值
    Object.keys(target).forEach(attr => {
        if (/[^\d^\.]+/gi.test(target[attr])) {
            unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
        }else{
            unit[attr] = 'px';
        }
        initState[attr] = attrStyle(attr);
    });

    //去掉传入的后缀单位
    Object.keys(target).forEach(attr => {
        if (unit[attr] == 'rem') {
            target[attr] = Math.ceil(parseInt(target[attr])*rootSize);
        }else{
            target[attr] = parseInt(target[attr]);
        }
    });


    let flag = true; //假设所有运动到达终点
    const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
    element.timer = setInterval(() => {
        Object.keys(target).forEach(attr => {
            let iSpeed = 0;  //步长
            let status = false; //是否仍需运动
            let iCurrent = attrStyle(attr) || 0; //当前元素属性址
            let speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
            let intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
            switch(mode){
                case 'ease-out': 
                    speedBase = iCurrent;
                    intervalTime = duration*5/400;
                    break;
                case 'linear':
                    speedBase = initState[attr];
                    intervalTime = duration*20/400;
                    break;
                case 'ease-in':
                    let oldspeed = remberSpeed[attr] || 0;
                    iSpeed = oldspeed + (target[attr] - initState[attr])/duration;
                    remberSpeed[attr] = iSpeed
                    break;
                default:
                    speedBase = iCurrent;
                    intervalTime = duration*5/400; 
            }
            if (mode !== 'ease-in') {
                iSpeed = (target[attr] - speedBase) / intervalTime;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            }
            //判断是否达步长之内的误差距离，如果到达说明到达目标点
            switch(mode){
                case 'ease-out': 
                    status = iCurrent != target[attr]; 
                    break;
                case 'linear':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                case 'ease-in':
                    status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
                    break;
                default:
                    status = iCurrent != target[attr]; 
            }

            if (status) {
                flag = false; 
                //opacity 和 scrollTop 需要特殊处理
                if (attr === "opacity") {
                    element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
                    element.style.opacity = (iCurrent + iSpeed) / 100;
                } else if (attr === 'scrollTop') {
                    element.scrollTop = iCurrent + iSpeed;
                }else{
                    element.style[attr] = iCurrent + iSpeed + 'px';
                }
            } else {
                flag = true;
            }

            if (flag) {
                clearInterval(element.timer);
                if (callback) {
                    callback();
                }
            }
        })
    }, 20);
}
