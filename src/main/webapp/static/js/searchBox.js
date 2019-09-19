var _opt = {
	title:'选择客户',
	subTitles:['客户ID', '客户名', '创建时间', '操作'],
	conDatum:[],
	sourceDatum:[],
	localSourceDatum:[],
	callback:null,
	$searchBox: $('[data-id="search-box"]'),
	$el: $("#myModal"),
	$subTemplate: $('#thead-template'),
	$conTemplate: $('#tbody-template'),
	url:"http://localhost:8080/crm/customerInfo/my",
	data:{},
	page:1,
	keyword:"",
	limit:10,
	local:false
};

/*
var _mix = function (receiver, supplier) {
	var c;
	for (c in supplier) {
	receiver[c] = supplier[c];
	}
	return receiver;
};*/

var _mix = function(receiver, supplier) {
	return $.extend({}, receiver, supplier);
};

var _hide = function ($el) {
	$el.css("display", "none");
};

var _show = function ($el) {
	$el.css("display", "block");
};

var _remote = function (type, url, data, success, error) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        dataType: 'json',
        contentType: "application/json",
        success: function (data) {
        	if (data.code == 200) {
        		success(data.msg);
        	}else{
                error && error(data.code, data.err);
            }
        },
        error: function (code, err) {
           error && error(code, err);
        }
    });
};

var _searchDatum = function(keyword, sourceDatum){
    var result = [];
    if(keyword === "" || keyword === undefined){
        result = sourceDatum;
        return result;
    }
    _.each(sourceDatum, function(data){
        if (data.indexOf(keyword) >= 0){
            result.push(data);
        }
    });
    return result;
};

function SearchBox (opt) {
	var _this = this;
	_this.opt = _mix(_opt, opt);
	_this.cache();
	return _this.init();
}

SearchBox.prototype.hide = function () {
	var _this = this;
	_this.$el.find("#close").trigger('click');
	_this.page = 1;
	return;
};

SearchBox.prototype.cache = function () {
	var _this = this;
	_this.$el = _this.opt.$el;
	_this.$searchInput = _this.opt.$searchBox.find('input');
	_this.$searchBtn = _this.opt.$searchBox.find('button');
	_this.$loading = _this.opt.$el.find('[data-id="loading"]');
	_this.$subTemplate = _this.opt.$subTemplate;
	_this.$conTemplate = _this.opt.$conTemplate;
	_this.subTemplate = _.template(_this.$subTemplate.html());
	_this.conTemplate = _.template(_this.$conTemplate.html());
	_this.$conBody = _this.$el.find('tbody');
	_this.$prePage = _this.$el.find('[data-id="pre-page"]');
	_this.$nextPage = _this.$el.find('[data-id="next-page"]');
	_this.sourceDatum = _this.opt.sourceDatum;
	_this.page = _this.opt.page;
	_this.keyword = _this.opt.keyword;
	_this.limit = _this.opt.limit;
	_this.local = _this.opt.local;
	_this.callback = _this.opt.callback;
	_this.data = _this.opt.data;
    _this.url = _this.opt.url;
	_this.$parent = _this.opt.$parent?_this.opt.$parent:"";
};
SearchBox.prototype.init = function () {
	var _this = this;
	_this.setTitle();
	_this.renderThead();
	_this.bindEvent();
};

SearchBox.prototype.setTitle = function () {
	var _this = this;
	_this.$el.find("#myModalLabel").text(_this.opt.title);
};

SearchBox.prototype.renderThead = function () {
	var _this = this;
	var html = _this.subTemplate({subTitles:_this.opt.subTitles});
	_this.$el.find("thead").empty();
	_this.$el.find("thead").append(html);
};

SearchBox.prototype.renderBody = function () {
	var _this = this;
	var html = "";
	var len = _this.opt.conDatum.length;
	_this.$conBody.empty();
	len && _.each(_this.opt.conDatum, function (data) {
		if (typeof data === 'string') {
			data = {name: data};
		}
		html = _this.conTemplate(data);
		_this.$conBody.append(html);
	});

	if (_this.page == 1) {
		_hide(_this.$prePage);
	}else {
		_show(_this.$prePage);
	}

	if (len < _this.limit) {
		_hide(_this.$nextPage);
	}else {
		_show(_this.$nextPage);
	}
	return;
};

SearchBox.prototype.fetchData = function () {
	var _this = this;


	if (!_this.local) {
	    //从服务端获取数据
		var data = _mix(_this.data, {
			keyword:_this.keyword,
			page:_this.page,
			limit:_this.opt.limit
		});
		var success = function (data) {
			_hide(_this.$loading);
			_this.opt.conDatum = data;
	    	_this.renderBody();
		};

		var error = function (code, err) {
			alert('服务器不给力');
			console.log(err);
		};

		_show(_this.$loading);
		_remote('GET', _this.url, data, success, error);
	}else {
    	//从本地获取数据
    	var startPos = (_this.page-1)*_this.limit;
    	var endPos = (_this.page)*_this.limit;
    	_this.opt.conDatum = _this.localSourceDatum.slice(startPos, endPos);
    	_hide(_this.$loading);
    	_this.renderBody();
	}

};

SearchBox.prototype.dealChoose = function ($el) {
	var _this = this;
	var searchName = $el.attr('data-searchName');
	_this.$searchInput.val(searchName);
	_this.callback && _this.callback($el, _this);
	_this.hide();
};

SearchBox.prototype.viewFirstPage = function () {
	var _this = this;
	_this.page = 1;
	_this.fetchData();
};

SearchBox.prototype.viewPrePage = function () {
	var _this = this;
	_this.page -= 1 || 1;
	_this.fetchData();
};

SearchBox.prototype.viewNextPage = function () {
	var _this = this;
	_this.page += 1;
	_this.fetchData();
};

SearchBox.prototype.bindEvent = function () {
	var _this = this;
	var self = _this;
	_this.$searchBtn.on("click", function () {
		_this.keyword = _this.$searchInput.val();
		_this.page = 1;
		_this.localSourceDatum = _this.local?_searchDatum(_this.keyword, _this.sourceDatum):[];
		_this.fetchData();

		return true;
	});

	_this.$el.on("click", '.choose-btn', function () {
		var $target = $(this);
		_this.dealChoose($target);

		return false;
	});

	<!---------------------- first page -------------------------->

	_this.$el.on("click", '[data-id="first-page"]', function () {
		_this.viewFirstPage();

		return false;
	});

	<!---------------------- pre page -------------------------->

	_this.$el.on("click", '[data-id="pre-page"]', function () {
		_this.viewPrePage();

		return false;
	});

	<!---------------------- next page -------------------------->

	_this.$el.on("click", '[data-id="next-page"]', function () {
		_this.viewNextPage();

		return false;
	});
};

SearchBox.prototype.unBindEvent = function () {
    this.$searchBtn.off();

    this.$el.off();
};

