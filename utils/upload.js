import cfg from './config.js';
import us from './user.js'
//递归上传 this 文件集 上传数据 上传结果 回调函数
var cycleUpload = function(that, files, data, array, func) {
	if (!files || files.length <= 0) //全部上传后返回
		return typeof func == "function" && func(array);

	that.upload(files[0], data, function(back) {
		if (back)
			array.push(back);

		files.splice(0, 1); //上传后不管成功失败都将此项删除

		cycleUpload(that, files, data, array, func); //递归上传
	});
}
export default {
	//单个上传
	upload: function(file, data, func) {
		//var api = apiPath;//utils.decode(apiPath);
		uni.uploadFile({
			url: cfg.httpUrl + '/System/UploadSingleImage', //post请求的地址
			filePath: file,
			name: 'file',
			header: {
				'Authorization': 'Bearer ' + uni.getStorageSync('token')
			},
			fileType: 'image',
			formData: data,
			success: (res) => {
				var obj = JSON.parse(res.data);
				if (obj.code == 200)
					return typeof func == "function" && func(obj.data);
				else
					return typeof func == "function" && func(null);
			},
			fail: function(err) {
				return typeof func == "function" && func(null)
			}
		})
	},
	//批量上传 files格式[{file:'选择或拍照的tempFilePaths',data:{带着上传的数据}}]
	uploadArray: function(files, data, func) {
		var that = this;
		//递归上传
		cycleUpload(that, files, data, [], function(res) {
			return typeof func == "function" && func(res); //返回全部成功项目
		});

	}
}