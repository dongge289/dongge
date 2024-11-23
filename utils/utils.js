Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;
}
import cfg from './config.js'
export default {
	// 等待
	sleep(value = 30) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, value)
		})
	},
	// 获取节点信息
	getRect(selector, all) {
		return new Promise((resolve) => {
			uni.createSelectorQuery()
				.in(this)[all ? 'selectAll' : 'select'](selector)
				.boundingClientRect((rect) => {
					if (all && Array.isArray(rect) && rect.length) {
						resolve(rect)
					}
					if (!all && rect) {
						resolve(rect)
					}
				})
				.exec()
		})
	},
	// 音频格式化时间
	formatTimeMusic(ms, showSS) {
		var ss = ms % 1000;
		ms = (ms - ss) / 1000;
		var s = ms % 60;
		ms = (ms - s) / 60;
		var m = ms % 60;
		ms = (ms - m) / 60;
		var h = ms,
			v = "";
		if (h > 0) v += (h < 10 ? "0" : "") + h + ":";
		// v += (m < 10 ? "0" : "") + m + ":";
		v += s;
		if (showSS) v += "″" + ("00" + ss).substr(-3);
		return v;
	},
	// 获取时分
	getAllTime(time) {
		if (time) {
			const now = new Date(time);
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			return ` ${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		} else {
			return ''
		}

	},
	// 获取年月日
	getYMD(time) {
		if (time) {
			const now = new Date(time);
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			return ` ${year}年${month}月${day}日`;
		} else {
			return ''
		}

	},
	// 获取月日时分
	getMDSH(time) {
		if (time) {
			const now = new Date(time);
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			return `${month}-${day} ${hours}:${minutes}`;
		} else {
			return ''
		}

	},
	// 获取月日时分
	getYMDSHS(time) {
		if (time) {
			const now = new Date(time);
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');

			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		} else {
			return ''
		}
		// return time;
	},
	// 转化星期一
	convertToChineseWeekdays(weekdayString) {
		var weekdays = weekdayString.split(",");
		var chineseWeekdays = ["一", "二", "三", "四", "五", "六", "日"];
		var convertedWeekdays = weekdays.map(function(weekday) {
			var index = parseInt(weekday) - 1;
			return chineseWeekdays[index];
		});
		return convertedWeekdays.join("，");
	},
	// 是否在营业时间
	isBusinessHours(timeString) {
		var currentTime = new Date();
		var businessHours = timeString.split(",");
		var startTime = this.getTimeFromString(businessHours[0]);
		var endTime = this.getTimeFromString(businessHours[1]);
		if (startTime <= currentTime && currentTime <= endTime) {
			return true;
		} else {
			return false;
		}
	},
	getTimeFromString(timeString) {
		var timeParts = timeString.split(":");
		var hours = parseInt(timeParts[0]);
		var minutes = parseInt(timeParts[1]);
		var time = new Date();
		time.setHours(hours, minutes, 0, 0);
		return time;
	},
	getStar(month) {
		let constellation = ''
		if (month == 1) {
			constellation = '水瓶座'
		} else if (month == 2) {
			constellation = '双鱼座'
		} else if (month == 3) {
			constellation = '牡羊座'
		} else if (month == 4) {
			constellation = '金牛座'
		} else if (month == 5) {
			constellation = '双子座'
		} else if (month == 6) {
			constellation = '巨蟹座'
		} else if (month == 7) {
			constellation = '狮子座'
		} else if (month == 8) {
			constellation = '处女座'
		} else if (month == 9) {
			constellation = '天称座'
		} else if (month == 10) {
			constellation = '天蝎座'
		} else if (month == 11) {
			constellation = '射手座'
		} else {
			constellation = '摩羯座'
		}
		return constellation
	},
	// 根据身份证获取性别年龄
	getAgeSex(id) {
		// 提取出生日期
		var birthday = "";
		if (id.length === 18) {
			birthday = id.substr(6, 8);
		} else if (id.length === 15) {
			birthday = "19" + id.substr(6, 6);
		} else {
			return "身份证号码位数不正确";
		}

		// 解析出生日期中的年、月、日
		var year = birthday.substr(0, 4);
		var month = birthday.substr(4, 2);
		var day = birthday.substr(6, 2);

		// 获取当前日期
		var currentDate = new Date();
		var currentYear = currentDate.getFullYear();
		var currentMonth = currentDate.getMonth() + 1;
		var currentDay = currentDate.getDate();

		// 计算年龄
		var age = currentYear - parseInt(year, 10);
		if (currentMonth < parseInt(month, 10) || (currentMonth === parseInt(month, 10) && currentDay < parseInt(day,
				10))) {
			age--;
		}
		// 解析性别
		var gender = id.charAt(id.length - 2) % 2 === 0 ? "2" : "1";
		return {
			age: age,
			gender: gender
		};
	},
	//生成随机 GUID 数
	getGuid() {
		function S4() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	},
	// 生成随机数
	generateRandomNumber() {
		let randomNumber = '';
		for (let i = 0; i < 16; i++) {
			randomNumber += Math.floor(Math.random() * 10);
		}
		return randomNumber;
	},
	getImageUrl(url) {
		if (url) {
			if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1) {
				return url
			} else {
				return cfg.imgUrl + url
			}
		} else {
			return 'https://cdn.uviewui.com/uview/album/1.jpg'
		}

	},
	getMyDay(dt) {
		var date = new Date(dt);
		var week;
		if (date.getDay() == 0) week = "周日"
		if (date.getDay() == 1) week = "周一"
		if (date.getDay() == 2) week = "周二"
		if (date.getDay() == 3) week = "周三"
		if (date.getDay() == 4) week = "周四"
		if (date.getDay() == 5) week = "周五"
		if (date.getDay() == 6) week = "周六"
		return week;
	},
	thumb(url) {
		return url.replace('/img_oringinal/', '/img_thumb/')
	},
	copy(text) {
		uni.setClipboardData({
			data: text, //要被复制的内容
			success: () => { //复制成功的回调函数
				uni.showToast({ //提示
					title: '复制成功'
				})
			}
		})
	},
	copyText(text) {
		// 判断是否支持Clipboard API
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text).then(() => {
				// 这里可以执行复制成功的回调
			}).catch(err => {
				console.error('复制失败', err);
				// 这里可以执行复制失败的回调
			});
		} else {
			// 这里可以执行不支持API的回调
		}
	},
	formatDate(d) {
		var now = new Date(d);
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	},
	formatDateThree(d) {
		var now = new Date(d);
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		return year + "-" + (month >= 10 ? month : '0' + month) + "-" + (date >= 10 ? date : '0' + date);
	},
	formatDateTwo(d) {
		var now = new Date(d);
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		return (month >= 10 ? month : '0' + month) + "-" + (date >= 10 ? date : '0' + date);
	},
	// 获取年月日
	formatDateMyS(timestamp) {
		const date = new Date(timestamp);
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const formattedDate = `${month}-${day}`;
		return formattedDate
	},
	// 获取月日时分
	formatDateS(d) {
		var now = new Date(d);
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		return month + "-" + date + " " + hour + ":" + minute;
	},
	// 获取时间差 返回 几天几小时
	getTimeDifference(futureDate) {
		var currentDate = new Date();
		var future = new Date(futureDate);
		var timeDiff = future - currentDate;
		var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		if (days < 0) {
			return '活动已结束'
		} else {
			return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
		}
	},
	// 获取分秒倒计时
	getDissHS(futureDate) {
		const timeDiff = futureDate - 1000
		var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
		var hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
		if (days < 0) {
			return '活动已结束'
		} else {
			return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒';
		}
	},
	// 获取时间差
	getMyTime(date2) {
		var d2 = new Date(date2);
		var now = new Date()
		var diffInMilliseconds = d2 - now;
		var diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
		if (diffInMilliseconds < 0) {
			return false
		} else {
			return diffInDays;
		}
	},
	// 获取多久前
	getTimeAgo(timestamp) {
		const now = new Date().getTime();
		const diff = now - new Date(timestamp).getTime();
		const minutes = Math.floor(diff / (1000 * 60));
		if (minutes < 1) {
			return '刚刚';
		} else if (minutes < 60) {
			return `${minutes}分钟前`;
		} else if (minutes < 1440) {
			const hours = Math.floor(minutes / 60);
			return `${hours}小时前`;
		} else {
			const days = Math.floor(minutes / 1440);
			return `${days}天前`;
		}
	},
	/*获取一个月的天数 */
	getCountDays(dt) {
		var curDate = new Date(dt);
		/* 获取当前月份 */
		var curMonth = curDate.getMonth();
		/*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
		curDate.setMonth(curMonth + 1);
		/* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
		curDate.setDate(0);
		/* 返回当月的天数 */
		return curDate.getDate();
	},
	formateMyDate(timestamp) {
		const date = new Date(timestamp);
		const year = date.getUTCFullYear();
		const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // 月份是从0开始的
		const day = ('0' + date.getUTCDate()).slice(-2);
		const hours = ('0' + date.getUTCHours()).slice(-2);
		const minutes = ('0' + date.getUTCMinutes()).slice(-2);
		const seconds = ('0' + date.getUTCSeconds()).slice(-2);
		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	},
	dateFormat: function(date, format) {
		var oldTime = (new Date(date)).getTime();
		if (oldTime.toString().toLowerCase().indexOf('an') > -1) {
			oldTime = (new Date(date.toString().replace(/-/g, '/'))).getTime();
		}

		var curTime = new Date(oldTime).format(format);
		return curTime;
	},
	getNowTime() {
		var date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		this.date = date.getDate();
		this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		this.milliSeconds = date.getMilliseconds();
		var currentTime = this.year + '-' + this.month + '-' + this.date + ' ' + this.hour + ':' + this.minute + ':' +
			this.second + '.' + this.milliSeconds;
		return currentTime;
	},
	AddDays(date, days) {
		var nd = new Date(date);
		nd = nd.valueOf();
		nd = nd + days * 24 * 60 * 60 * 1000;
		nd = new Date(nd);
		var y = nd.getFullYear();
		var m = nd.getMonth() + 1;
		var d = nd.getDate();
		if (m <= 9) m = "0" + m;
		if (d <= 9) d = "0" + d;
		var cdate = y + "-" + m + "-" + d;
		return cdate;
	},
	getInervalHour(startDate, endDate) {
		var ms = endDate.getTime() - startDate.getTime();
		if (ms < 0) return 0;
		return Math.floor(ms / 1000 / 60 / 60);
	},
	twoTimeInterval(startTime, endTime) {

		// 开始时间
		//let d1 = startTime;//.replace(/\-/g, "/");
		let date1 = new Date(startTime);

		// 结束时间
		//let d2 = endTime.replace(/\-/g, "/");
		let date2 = new Date(endTime);

		// 时间相差秒数
		let dateDiff = date2.getTime() - date1.getTime();

		// 计算出相差天数
		let days = Math.floor(dateDiff / (24 * 3600 * 1000));

		// 计算出小时数
		let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
		let hours = Math.floor(residue1 / (3600 * 1000));

		// 计算相差分钟数
		let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
		let minutes = Math.floor(residue2 / (60 * 1000));

		// 计算相差秒数
		let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
		let seconds = Math.round(residue3 / 1000);

		let returnVal =
			// ((days == 0) ? "" : days + "天") +
			((hours == 0) ? "" : (hours > 9 ? hours : '0' + hours) + "小时") +
			((minutes == 0) ? "" : (minutes > 9 ? minutes : '0' + minutes) + "分") +
			((seconds == 0) ? "" : (seconds > 9 ? seconds : '0' + seconds) + "秒");

		return returnVal;

	},
	replaceAll(s, y, t) {
		while (s.indexOf(y) > -1) {
			s = s.replace(y, t);
		}
		return s;
	},
	//弹窗
	alert: function(title, type = 'none') {
		uni.showToast({
			icon: type,
			title: title
		})
	},
	//询问
	confirm: function(content = '确定执行吗？', confirm, cancel) {
		uni.showModal({
			title: '提示',
			content: content,
			success: function(res) {
				if (res.confirm) {
					return typeof confirm == "function" && confirm(true);
				}
				if (res.cancel) {
					return typeof cancel == "function" && cancel(true);
				}
			},
		});
	},
	//编码
	encode: function(val) {
		return encodeURIComponent(val);
	},
	//解码
	decode: function(val) {
		return decodeURIComponent(val);
	},
	parseParams: function(data) {
		try {
			var tempArr = [];
			for (var i in data) {
				var key = encodeURIComponent(i);
				var value = encodeURIComponent(data[i]);
				tempArr.push(key + '=' + value);
			}
			var urlParamsStr = tempArr.join('&');
			return urlParamsStr;
		} catch (err) {
			return '';
		}
	},
	toPage: function(url, params, time = 0) {
		var p = this.parseParams(params);
		setTimeout(function() {
			// // #ifdef H5
			// window.open(document.domain+'/#'+url + '?' + p);
			// // #endif
			// // #ifndef H5
			// uni.navigateTo({
			// 	url: url + '?' + p
			// })
			// // #endif
			uni.navigateTo({
				url: url + '?' + p
			})
		}, time)
	},
	toBack: function(time = 0) {
		setTimeout(function() {
			uni.navigateBack({

			})
		}, time)
	},
	showImage: function(images, index = 0) {
		var urls = [];
		if (images[index]['name']) {
			for (var i = 0; i < images.length; i++) {
				urls.push(images[i]['name']);
			}
		} else if (images[index]['image']) {
			for (var i = 0; i < images.length; i++) {
				urls.push(images[i]['image']);
			}
		} else if (Object.prototype.toString.call(images) == "[object String]") {
			urls = [images];
		} else {
			urls = images;
		}

		uni.previewImage({
			urls: urls, //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
			current: index, // 当前显示图片的http链接，默认是第一个
			indicator: 'number',
			success: function(res) {},
			fail: function(res) {},
			complete: function(res) {},
		})
	},
	getLocation(func) {
		uni.getLocation({
			success(loc) {

				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					method: 'GET',
					data: {
						key: 'c49f0054d7984f0f7225c0514dae8764',
						location: loc.longitude + ',' + loc.latitude
					},
					success(res) {
						if (res.statusCode == 200 && res.data) {
							var json = res.data; //JSON.parse(res);
							if (json.status == 1 && json.info == 'OK') {
								var reg = json.regeocode;
								var address = {
									"country": reg.addressComponent.country,
									"province": reg.addressComponent.province,
									"city": reg.addressComponent.city,
									"district": reg.addressComponent.district,
									"street": reg.addressComponent.streetNumber.street,
									"streetNum": reg.addressComponent.streetNumber.number,
									"poiName": reg.addressComponent.streetNumber.street + reg
										.addressComponent.streetNumber.number,
									"cityCode": reg.addressComponent.citycode,
									"longitude": lo,
									"latitude": la
								};
								// reg.formatted_address
								return typeof func == "function" && func(address)

							} else {

								uni.showToast({
									title: '经纬度解析失败'
								})
								return typeof func == "function" && func(null)
							}
						}
					},
					fail(err) {
						uni.showToast({
							title: '致命错误'
						})
						return typeof func == "function" && func(null)
					}
				})
			},
			fail(err) {
				return typeof func == "function" && func(null)
			}
		})
	}
}