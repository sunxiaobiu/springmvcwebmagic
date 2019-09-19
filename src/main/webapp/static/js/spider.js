
var feedback_types = [1,0];
var buConfig = {
    isFetched: false,
    init: function(){
        this.fetch();
    },
    fetch: function(_success, _error){
        var self = this;
        $.ajax({
            url: '../bu/config',
            type: 'GET',
            dataType: 'JSON',
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {},
            success: function (data) {
                self.configData = data.msg;
                self.isFetched = true;
                _success && _success(self.configData);
            },
            error:function(code){
                _error && _error.apply(code);
            }
        });
    },
    getConfig: function(_success, _error){
        if(this.isFetched){
            _success && _success(this.configData);
            return;
        }
        this.fetch(_success, _error);
    }
};


$(function () {
    //禁用Enter键表单自动提交
    document.onkeydown = function(event) {
        var target, code, tag;
        if (!event) {
            event = window.event; //针对ie浏览器
            target = event.srcElement;
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "INPUT") { return false; }
                else { return true; }
            }
        }
        else {
            target = event.target; //针对遵循w3c标准的浏览器，如Firefox
            code = event.keyCode;
            if (code == 13) {
                tag = target.tagName;
                if (tag == "INPUT") { return false; }
                else { return true; }
            }
        }
    };
    var picture = new Picture({
        el: $("#picture-container"),
        edit: true,
        progress:true
    });
    buConfig.init();
    var bankInfoWrapper = {
        isBankFetched: false,
        getProvinceList: function(callback) {
            callback && callback.call(null, BankInfo.getProvinces());
        },
        getCityList: function(provinceName, callback) {
            callback && callback.call(null, BankInfo.getCitiesByProviceName(provinceName));
        },
        displayBankFetchError: function(msg) {
            $.blockUI({
                message:  '<div style="background-color:#a9a9a9;font-size:20px;">错误提示</div><div><h5>' + msg + '</h5></div>',
                css:{
                }
            });
            $('.blockOverlay').attr('title', 'Click to unblock').click(function() {
                $.unblockUI();
            });
        },
        getBankList: function(callback) {
            var self = this;

            if (self.isBankFetched) {
                callback && callback(self.bankList);
                return;
            }

            $.ajax({
                url: '../banks/bankList',
                type: 'GET',
                dataType: 'JSON',
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    limit: 9999
                },
                success: function (data) {
                    if(!data || data.code != 200) {
                        self.displayBankFetchError('获取银行列表失败，请刷新后重试');
                        return;
                    }
                    self.bankList = [];
                    if (data && _.isArray(data.msg)) {
                        data.msg.forEach(function(bankObject) {
                            self.bankList.push(bankObject.bankName);
                        });
                    }

                    self.isBankFetched = true;
                    callback && callback(self.bankList);
                },
                error:function(code){
                    self.displayBankFetchError('获取银行列表失败，请刷新后重试');
                }
            });
        },
        getBankBranchList: function(bankName, province, city, callback) {
            var self = this;

            $.ajax({
                url: '../banks',
                type: 'GET',
                dataType: 'JSON',
                async: true,
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    bankName: bankName,
                    province: province,
                    city: city,
                    limit: 9999
                },
                success: function (data) {
                    if(!data || data.code != 200) {
                        self.displayBankFetchError('获取支行列表失败，请切换银行后重试');
                        return;
                    }
                    var bankBranchList = [];
                    if (data && _.isArray(data.msg)) {
                        data.msg.forEach(function(bankObject) {
                            bankBranchList.push(bankObject.branchName);
                        });
                    }

                    callback && callback(bankBranchList);
                },
                error:function(code){
                    self.displayBankFetchError('获取支行列表失败，请切换银行后重试');
                }
            });
        }
    };

    <!---------------------------------------------------客户名处理模块-------------------------------------------->

    var requireType = 1;//1：能提供营业执照；2：不能提供营业执照
    var canSealType = 1;//1：n能盖公章；2：不能盖公章
    var hasCompanyName=1;//1能提供,2:不能提供


    var change_day = function(days) {
        var d = new Date();
        d.setDate(d.getDate() + 1 * days);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    };

    var change_month = function(months) {
        // 参数表示在当前日期下要增加的月数
        var d = new Date();
        d.setMonth(d.getMonth()  + 1 * months);
        var year = d.getFullYear();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    };

    $('#requireBusLicenseRadio').on('change', function () {
        if ($('#requireBusLicRadio1').prop('checked')) {
            requireType = 1;
            $('.require-business-license').removeClass('hide');
            $('.not-require-business-license').addClass('hide');
        } else if ($('#notRequireBusLicRadio2').prop('checked')) {
            requireType = 2;
            $('.require-business-license').addClass('hide');
            $('.not-require-business-license').removeClass('hide');
        }
    });

    $('#requiredOffSealRadio').on('change', function () {
        if ($('#requiredOffSealRadio1').prop('checked')) {
            canSealType = 1;
            $('.require-seal').addClass('hide');
        } else if ($('#notRequiredOffSealRadio2').prop('checked')) {
            canSealType = 2;
            $('.require-seal').removeClass('hide');
        }
    });

    $('[name="busLicExpiryDateRadio"]').bind('change', function () {
        var selectVal = $(this).val();
        if (selectVal == 2) {
            $("#busLicExpiryDateDiv").removeClass('hide');
        } else {
            $("#busLicExpiryDateDiv").addClass('hide');
            $("#busLicExpiryDate").val("");
        }
    });

    $('[name="notBusLicExpiryDateRadio"]').bind('change', function () {
        var selectVal = $(this).val();
        if (selectVal == 2) {
            $("#notBusLicExpiryDateDiv").removeClass('hide');
        } else {
            $("#notBusLicExpiryDateDiv").addClass('hide');
            $("#notBusLicExpiryDate").val("");
        }
    });


    $('#perLicenseType').on('change', function () {
        var val = $('#perLicenseType').val();
        if (val == 1) {
            $('#other-id-card').addClass('hide');
            $('#id-card-pic').removeClass('hide');
        } else {
            $('#other-id-card').removeClass('hide');
            $('#id-card-pic').addClass('hide');

            if (val == 2) {
                $('[data-id="other-id-card-span"]').text("请上传护照");
            } else if (val == 3) {
                $('[data-id="other-id-card-span"]').text("请上传驾驶证");
            } else if (val == 4) {
                $('[data-id="other-id-card-span"]').text("请上传港澳居民来往内地通行证");
            } else if (val == 5) {
                $('[data-id="other-id-card-span"]').text("请上传台湾居民来往内地通行证");
            }
        }
    });

    var busLicensePic = new Picture({
        el: $("#busLicense-picture-container"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var signatoryIDCardFront = new Picture({
        el: $("#signatory-id-card-container-front"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var signatoryIDCardReverse = new Picture({
        el: $("#signatory-id-card-container-reverse"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var idCardPicFront = new Picture({
        el: $("#id-card-pic-front-container"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var idCardPicReversePic = new Picture({
        el: $("#id-card-pic-reverse-container"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var otherIDCardPic = new Picture({
        el: $("#other-id-card-pic-container"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var merchSignPic1 = new Picture({
        el: $("#merchant-signatory-pic-container1"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var merchSignPic2 = new Picture({
        el: $("#merchant-signatory-pic-container2"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    var merchSignPic3 = new Picture({
        el: $("#merchant-signatory-pic-container3"),
        edit: true,
        progress:true,
        maxNumber:1
    });

    $('.busLicense-picture-f').bind('click', function() {
        if (busLicensePic.getAttachments().length > 0) {
            alert("营业执照只能传一张，若要更换请先删除");
        }
    });

    $('.signatory-id-card-front-f').bind('click', function() {
        if (signatoryIDCardFront.getAttachments().length > 0) {
            alert("签字人身份证正面照只能传一张，若要更换请先删除");
        }
    });

    $('.signatory-id-card-reverse-f').bind('click', function() {
        if (signatoryIDCardReverse.getAttachments().length > 0) {
            alert("签字人身份证反面照只能传一张，若要更换请先删除");
        }
    });

    $('.id-card-pic-front-f').bind('click', function() {
        if (idCardPicFront.getAttachments().length > 0) {
            alert("个人身份证正面照只能传一张，若要更换请先删除");
        }
    });

    $('.id-card-pic-reverse-f').bind('click', function() {
        if (idCardPicReversePic.getAttachments().length > 0) {
            alert("个人身份证反面照只能传一张，若要更换请先删除");
        }
    });

    $('.other-id-card-pic-f').bind('click', function() {
        if (otherIDCardPic.getAttachments().length > 0) {
            alert("身份证明只能传一张，若要更换请先删除");
        }
    });

    $('.merchant-signatory-pic-f1').bind('click', function() {
        if (merchSignPic1.getAttachments().length > 0) {
            alert("手持身份证明只能传一张，若要更换请先删除");
        }
    });

    $('.merchant-signatory-pic-f2').bind('click', function() {
        if (merchSignPic2.getAttachments().length > 0) {
            alert("工商局截图证明只能传一张，若要更换请先删除");
        }
    });

    $('.merchant-signatory-pic-f3').bind('click', function() {
        if (merchSignPic3.getAttachments().length > 0) {
            alert("《商户承诺函》证明只能传一张，若要更换请先删除");
        }
    });


    $('.busLicExpiryDatePicker').datetimepicker({
        language: 'zh-CN',
        format : 'yyyy-mm-dd',
        autoclose : 1,
        todayBtn : true,
        minView : 2
    });

    $('.notBusLicExpiryDatePicker').datetimepicker({
        language: 'zh-CN',
        format : 'yyyy-mm-dd',
        autoclose : 1,
        todayBtn : true,
        minView : 2
    });

    $('.busLicBackDatePicker').datetimepicker({
        language: 'zh-CN',
        format : 'yyyy-mm-dd',
        autoclose : 1,
        todayBtn : true,
        minView : 2
    }).datetimepicker('setStartDate', change_day(1)).datetimepicker('setEndDate', change_month(12));


    $('[data-id="operatorIDCard"]').on('keyup', function(){
        $('[data-id="customerName"]').val($.trim($('[data-id="operatorName"]').val()) + '-' + $.trim($(this).val()));
    });

    $('[data-id="operatorName"]').on('keyup', function(){
        $('[data-id="customerName"]').val($.trim($(this).val()) + '-' + $.trim($('[data-id="operatorIDCard"]').val()));
    });


    $('[data-id="operatorIDCard"]').change(function(){
        $('[data-id="customerName"]').val($.trim($('[data-id="operatorName"]').val()) + '-' + $.trim($(this).val()));
        if($('[data-id="operatorName"]').val() && $('[data-id="operatorName"]').val() !=''){
            customer_name_repeat();
        }

    });

    $('[data-id="operatorName"]').change(function(){
        $('[data-id="customerName"]').val($.trim($(this).val()) + '-' + $.trim($('[data-id="operatorIDCard"]').val()));
        if($('[data-id="operatorIDCard"]').val() && $('[data-id="operatorIDCard"]').val() !=''){
            customer_name_repeat();
        }
    });

    $('[data-id="operatorName"]').blur(function () {

        var reg = /^[A-Za-z\u4e00-\u9fa5\.·]+$/;
        if(!reg.test($(this).val())){
            $.blockUI({
                message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>经营者姓名只能输入汉字和英文</h5></div>',
                css: {
                },
                timeout: 2000
            });
            return;
        }
        if ($.trim($(this).val()).length > 4) {
            $.blockUI({
                message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>请确认您填入的是与证件号码一致的经营者个人姓名</h5></div>',
                css: {
                },
                timeout: 2000
            });
            return;
        }
    });

    $('[data-id="operatorIDCard"]').blur(function () {
        var reg = /^[A-Za-z0-9]+$/;
        if ($.trim($(this).val()).length > 4  && !reg.test($(this).val())) {
            $.blockUI({
                message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>证件号码只能输入数字和字母</h5></div>',
                css: {
                },
                timeout: 2000
            });
            return;
        }
        if ($.trim($(this).val()).length > 0 && $.trim($(this).val()).length < 5) {
            $.blockUI({
                message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>您输入的证件号码过短，请确认证件号码的正确性</h5></div>',
                css: {
                },
                timeout: 2000
            });
            return;
        }

        if ($.trim($(this).val()).length > 20 ) {
            $.blockUI({
                message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>您输入的证件号码过长，请确认证件号码的正确性</h5></div>',
                css: {
                },
                timeout: 2000
            });
            return;
        }
    });

    var validateNameAndIDCard = function () {
        var reg = /^[A-Za-z0-9]+$/;
        if (requireType == 1) {
            if (!checkChineseAndEnglish($('[data-id="companyName"]').val())) {
                return "企业名称只能输入中文和英文!";
            }

            if (!checkChineseAndEnglish($('[data-id="legalPerson"]').val())) {
                return "法人代表只能输入中文和英文!";
            }
            if (!reg.test($.trim($('[data-id="companyIDCard"]').val()))) {
                return "证件号码只能输入数字和字母!";
            }

            if (canSealType == 2) {
                if (!checkChineseAndEnglish($('[data-id="signatoryName"]').val())) {
                    return "签字人姓名只能输入中文和英文!";
                }
                if (!reg.test($.trim($('[data-id="signatoryIDCard"]').val()))) {
                    return "签字人证件号码只能输入数字和字母!";
                }
            }

        } else if (requireType == 2) {
            if ($.trim($('[data-id="operatorName"]').val()) === '') {
                return '请您输入姓名';
            }
            if (!reg.test($.trim($('[data-id="operatorIDCard"]').val()))) {
                return "证件号码只能输入数字和字母!";
            }
            if (!checkChineseAndEnglish($('[data-id="operatorName"]').val())) {
                return "姓名只能输入中文和英文!";
            }
            if (!checkChineseAndEnglish($('[data-id="merchantSignatoryName"]').val())) {
                return "商户承诺函签字人只能输入中文和英文!";
            }
        }

        return '';
    };

    function checkChineseAndEnglish(input){
        var reg = /^[A-Za-z\u4e00-\u9fa5\.·]+$/;
        return reg.test($.trim(input));
    }

    function checkChineseAndEnglishAndkuohao(input){
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9（）()]+$/;
        return reg.test($.trim(input));
    }

    /** 客户基本信息必填项校验 **/
    var validCustomerBaseInfoRequire = function () {
        if (requireType == 1) { //营业执照
            var legalPerson = $.trim($('[data-id = "legalPerson"]').val());
            var regNumber = $.trim($('[data-id = "companyIDCard"]').val());
            var busLicExpiryDateVal = $('input:radio[name="busLicExpiryDateRadio"]:checked').val();

            if(hasCompanyName==1){
                if ($.trim($('[data-id="companyName"]').val()) == '') {
                    return "企业名称不能为空";
                }
            }else{
                if ($.trim($('[data-id="legal-customerName"]').val()) == '') {
                    return "客户名称不能为空";
                }
            }
            if (legalPerson == '') {
                return "法人代表不能为空";
            }
            if (regNumber == '') {
                return "证件号码不能为空";
            }
            if ($('#busLicenseType').val() == 1 || $('#busLicenseType').val() == 2) {
                if(!isLegalLicenceNumber(regNumber)){
                    return '证件号码必须是15位或18位';
                }
            } else {
                if(!maxLengthStrict(regNumber,50)){
                    return '证件号码长度不能超过50位';
                }
            }
            if(isLegalIdCard(regNumber)){
                return '证件号码不允许输入身份证号码，请输入"注册码/统一社会信用码"';
            }
            if (busLicensePic.getAttachments() == undefined || busLicensePic.getAttachments().length == 0) {
                return "必须上传营业执照";
            }
            if (busLicensePic.getAttachments().length > 1) {
                return "营业执照只需上传一张";
            }
            if (!isNameOnlyChineseAndEnglish(legalPerson)) {
                return '法人姓名只能是中文或者英文';
            }
            if (!isNameLegal(legalPerson)) {
                return '法人姓名含有非法字符';
            }
            if(!maxLengthStrict(legalPerson,50)){
                return '法人姓名长度不能超过50位';
            }
            if(busLicExpiryDateVal == 2){
                var expiryDate = $.trim($('#busLicExpiryDate').val());
                if(expiryDate == '' || expiryDate == undefined){
                    return '请输入指定日期';
                }
                if(!isDate(expiryDate)){
                    return "请输入指定日期";
                }
            }
            if ($('input:radio[name="requiredOffSealRadio"]:checked').val() == 2) {
                var signatoryName = $.trim($('[data-id = "signatoryName"]').val());
                var signatoryIDCard = $.trim($('[data-id = "signatoryIDCard"]').val());
                if (signatoryName == '') {
                    return "签字人姓名不能为空";
                }
                if (signatoryIDCard == '') {
                    return "签字人证件号码不能为空";
                }
                if (!isNameLegal(signatoryName)) {
                    return '签字人姓名含有非法字符';
                }
                if(!isNameOnlyChineseAndEnglish(signatoryName)){
                    return '签字人姓名只能是中文或者英文';
                }
                if(!maxLengthStrict(signatoryName, 50)){
                    return '签字人姓名长度不能超过50位';
                }
                if(!isOnlyNumberAndEnglish(signatoryIDCard)){
                    return '输入的签字人身份证明号码不合法';
                }
                if (signatoryIDCardFront.getAttachments() == undefined || signatoryIDCardFront.getAttachments().length == 0) {
                    return "必须上传签字人身份证明正面照";
                }
                if (signatoryIDCardReverse.getAttachments() == undefined || signatoryIDCardReverse.getAttachments().length == 0) {
                    return "必须上传签字人身份证明反面照";
                }
            }
        } else if (requireType == 2) { //身份证
            var operatorName = $.trim($('[data-id = "operatorName"]').val());
            var operatorIDCard = $.trim($('[data-id = "operatorIDCard"]').val());
            if (operatorName == '') {
                return "姓名不能为空";
            }
            if (operatorIDCard == '') {
                return "证件号码不能为空";
            }
            if ($('[data-id = "perLicenseType"]').val() === 1){
                if((operatorIDCard.length!=18)&&(operatorIDCard.length!=15)){
                    return "身份证号码长度为15或18位";
                } else if (!isLegalIdCard(operatorIDCard)) {
                    return '身份证号码不合法';
                }
            }
            var perLicExpiryDateVal = $('input:radio[name="notBusLicExpiryDateRadio"]:checked').val();
            if((perLicExpiryDateVal == 2)){
                var perExpiryDate = $('#notBusLicExpiryDate').val();
                if(perExpiryDate == undefined || perExpiryDate == ''){
                    return '请输入指定日期';
                }
                if(!isDate(perExpiryDate)){
                    return "请输入指定日期";
                }
            }
            if ($('#perLicenseType').val() == 1) {
                if (idCardPicFront.getAttachments() == undefined || idCardPicFront.getAttachments().length == 0) {
                    return "必须上传身份证正面照";
                }
                if (idCardPicReversePic.getAttachments() == undefined || idCardPicReversePic.getAttachments().length == 0) {
                    return "必须上传身份证反面照";
                }
            } else {
                if (otherIDCardPic.getAttachments() == undefined || otherIDCardPic.getAttachments().length == 0) {
                    return "必须上传证件照";
                }
            }
            if(!maxLengthStrict(operatorName, 50)){
                return '姓名长度不能超过50位';
            }
            if (!isNameLegal(operatorName)) {
                return '证件人姓名含有非法字符';
            }
            if(!isNameOnlyChineseAndEnglish(operatorName)){
                return '证件人姓名只能是中文或者英文';
            }
            var merchantSignatoryName = $.trim($('[data-id = "merchantSignatoryName"]').val());
            if (merchantSignatoryName == '') {
                return "商户承诺函签字人不能为空";
            }
            if(!maxLengthStrict(merchantSignatoryName, 50)){
                return '商户承诺函签字人姓名长度不能超过50位';
            }
            if(!isNameOnlyChineseAndEnglish(merchantSignatoryName)){
                return'商户承诺函签字人姓名只能是中文或者英文';
            }
            if ($('#busLicBackDate').val() == '') {
                return "营业执照预计补回日期不能为空";
            }
            if(!isDateWithinOneYear($('#busLicBackDate').val())){
                return '预计补回日期不能超过一年';
            }
            if (merchSignPic1.getAttachments() == undefined || merchSignPic1.getAttachments().length == 0) {
                return "必须上传手持身份证照片";
            }
            if (merchSignPic2.getAttachments() == undefined || merchSignPic2.getAttachments().length == 0) {
                return "必须上传工商局截图证明";
            }
            // if (merchSignPic3.getAttachments() == undefined || merchSignPic3.getAttachments().length == 0) {
            //     return "必须上传《商户承诺函》证明";
            // }
        }
        return '';
    };


    <!---------------------------------------------------联系人处理模块-------------------------------------------->
    var ContactModel = Model.extend({
        defaults: {
            title:"法人/董事长"
        }
    });
    var assembleMobileCodeSelectOption = function(items) {
        var options = [];
        _.isArray(items) && items.forEach(function(value) {
            options.push({
                value: value.code,
                text:  value.code +'('+ value.name+')'
            });
        });
        return options;
    }
    var ContactController = ItemController.extend({
        eventFields: [
            'name',
            'mobile',
            'title',
            'email'
        ],
        bindEvt: function () {
            ItemController.prototype.bindEvt.call(this);
            var self = this;

            this.item.set('contactType', []);

            this.$.on('change','[data-id="contact-role"] input', function(){
                var checked = $(this).prop('checked');
                var val = parseInt($(this).val());
                var contactType = self.item.get('contactType');
                if (!checked) {
                    var index = contactType.indexOf(val);
                    if (index != -1) {
                        contactType.splice(index, 1);
                    }
                } else {
                    contactType.push(val);
                }
            });
        },
        onItemRendered:function (){
            var self = this;
            this.item.set('globalAreaCode','+86');
            var areaCodeSelect = self.$.find('[data-id="select_mobileAreaCode"]');
            areaCodeSelect.selectize({
                onChange: function(mobileAreaCode) {
                    var strs = new Array();
                    strs = mobileAreaCode.split(",");
                    self.item.set('globalAreaCode', strs[0]);
                    $('#contactPhone').attr('placeholder', '如：'+strs[1]);
                }
            });
        }
    });

    var contactList = new Collection([new ContactModel()]);

    var contactController = new CollectionController({
        $container: $('[data-id="contact-list"]'),
        itemTpl: _.template($('[data-id="contact-item-tpl"]').html()),
        list: contactList,
        itemController: ContactController,
        item: ContactModel
    });

    contactController.show();
    <!---------------------------------------------------资质证照处理模块-------------------------------------------->
    <!--1,特批，0,非特批-->
    //var TradingLicenseModel = Model.extend({
    //    defaults: {
    //        licenseType:"1",
    //        licensename:"",
    //        isSpecialApproval:"0"
    //    }
    //});
    //
    //var TradingLicenseController = ItemController.extend({
    //    eventFields: [
    //        'licenseType',
    //        'name',
    //        'regAddr',
    //        'regNum',
    //        'legalPerson',
    //        'legalPersonNumber',
    //        'establishmentDate',
    //        'validFrom',
    //        'validTo',
    //        'specialApprovalBy',
    //        'specialApprovalValidTo',
    //        <!--license部分-->
    //        'licensename',
    //        <!--idCard部分-->
    //        'idcardname',
    //        'idCardType',
    //        'idcardregNum'
    //    ],
    //    render: function() {
    //        var self = this;
    //        var data = this.item.getData();
    //        this.$.html(this.tpl(data));
    //        var defaultSpecialApproval = 0 == $('[data-id="requireLicense"]').val();
    //        if(defaultSpecialApproval){
    //            this.$.find("#tradinglicenseSpecial").attr("checked","checked");
    //            self.setSpecialApprovalItems(self, true);
    //        }
    //        this.$.attr('data-index', this.item.__mid);
    //        this.onItemRendered && this.onItemRendered.call(this, this.item, this.$);
    //        var trading_picture= new Picture({el:this.$.find("#license-trading-picture-container")});
    //        trading_picture.setMaxNumber(1);
    //        var idcard_picture = new Picture({el:this.$.find("#license-idcard-picture-container")});
    //        idcard_picture.setMaxNumber(2);
    //        this.item.set('customerTradingPictureObj', trading_picture);
    //        this.item.set('customerIDCardPictureObj', idcard_picture);
    //        this.$.find('.business-license input[type="radio"]').attr('name', 'companyType' + this.item.__mid);
    //        return this.$;
    //    },
    //    bindEvt: function () {
    //        ItemController.prototype.bindEvt.call(this);
    //        var self = this;
    //        this.$.on('change','[data-id="licenseType"]', function(){
    //            var type = $(this).val();
    //            if(type == 1){
    //                $('.idCard', self.$).addClass('hide');
    //                $('.license', self.$).addClass('hide');
    //                $('.business-license', self.$).removeClass('hide');
    //                $('.licenseTip', self.$).removeClass('hide');
    //                $('.idCardTip', self.$).addClass('hide');
    //                $('.tradingPicture', self.$).removeClass('hide');
    //                if(!$('[data-id="isSpecialApproval"]', self.$).prop('checked') && $('.business-license input[type="radio"]:checked', self.$).val() == 2) {
    //                    $('.tradinglicenseLegalPersonNumber', self.$).removeClass('hide');
    //                    $('.idCardPicture', self.$).removeClass('hide');
    //                }else{
    //                    $('.tradinglicenseLegalPersonNumber', self.$).addClass('hide');
    //                    $('.idCardPicture', self.$).addClass('hide');
    //                }
    //            }else if(type == 3){
    //                $('.idCard', self.$).removeClass('hide');
    //                $('.license', self.$).addClass('hide');
    //                $('.business-license', self.$).addClass('hide');
    //                $('.licenseTip', self.$).addClass('hide');
    //                $('.idCardTip', self.$).removeClass('hide');
    //                $('.tradingPicture', self.$).addClass('hide');
    //                $('.idCardPicture', self.$).removeClass('hide');
    //            }
    //        });
    //        this.$.on('change', '[data-id="isSpecialApproval"]', function () {
    //            var isChecked = $(this).prop('checked');
    //            self.setSpecialApprovalItems(self, isChecked);
    //        });
    //        this.$.on('change', '.business-license input[type="radio"]', function() {
    //            if(!$('[data-id="isSpecialApproval"]', self.$).prop('checked') && $('.business-license input[type="radio"]:checked', self.$).val() == 2) {
    //                $('[data-id="nameLabel"]', self.$).removeClass("required");
    //                $('.tradinglicenseLegalPersonNumber', self.$).removeClass('hide');
    //                $('.idCardPicture', self.$).removeClass('hide');
    //                self.item.set('subLicenseType', 2);
    //            }else{
    //                $('[data-id="nameLabel"]', self.$).addClass("required");
    //                $('.tradinglicenseLegalPersonNumber', self.$).addClass('hide');
    //                $('.idCardPicture', self.$).addClass('hide');
    //                self.item.set('subLicenseType', 1);
    //            }
    //        });
    //    },
    //
    //    setSpecialApprovalItems: function (self, isChecked){
    //        if (isChecked) {
    //            $('.business-license-not-special', self.$).addClass('hide');
    //            $('.business-license-special', self.$).removeClass('hide');
    //            $('.idCardPicture', self.$).addClass('hide');
    //            self.item.set('isSpecialApproval', 1);
    //        } else {
    //            $('.business-license-not-special', self.$).removeClass('hide');
    //            $('.business-license-special', self.$).addClass('hide');
    //            if ($('.business-license input[type="radio"]:checked', self.$).val() == '2') {
    //                $('.tradinglicenseLegalPersonNumber', self.$).removeClass('hide');
    //                $('.idCardPicture', self.$).removeClass('hide');
    //                $('[data-id="nameLabel"]', self.$).removeClass("required");
    //            } else {
    //                $('.tradinglicenseLegalPersonNumber', self.$).addClass('hide');
    //                $('.idCardPicture', self.$).addClass('hide');
    //                $('[data-id="nameLabel"]', self.$).addClass("required");
    //            }
    //            self.item.set('isSpecialApproval', 0);
    //        }
    //    },
    //
    //    onItemRendered: function (item, $item) {
    //        $('.datepicker', $item).datetimepicker({
    //            language: 'zh-CN',
    //            format : 'yyyy-mm-dd',
    //            autoclose : 1,
    //            todayBtn : true,
    //            minView : 2
    //        });
    //    }
    //});

    //var TradingLicenseCollection = Collection.extend({
    //    json: function () {
    //        var data = Collection.prototype.json.apply(this, arguments);
    //        if (data && data.length) {
    //            data.forEach(function (item) {
    //                item.customerTradingPicture = item.customerTradingPictureObj.getAttachments();
    //                item.customerIDCardPicture = item.customerIDCardPictureObj.getAttachments();
    //            })
    //        }
    //        return data;
    //    }
    //});
    //
    //var tradingLicenseList = new TradingLicenseCollection();
    //
    //var tradingLicenseController = new CollectionController({
    //    $container: $('[data-id="tradinglicense-list"]'),
    //    itemTpl: _.template($('[data-id="tradinglicense-item-tpl"]').html()),
    //    list: tradingLicenseList,
    //    itemController: TradingLicenseController,
    //    item: TradingLicenseModel
    //});
    //tradingLicenseController.show();
    <!---------------------------------------------------银行账号处理模块-------------------------------------------->
    var BankAccountModel = Model.extend({
        defaults: {
            bankAccountType:"2",
            bankDefault:false,
            bankSuspendPayment:false,
            bankAccountBizType:[]
        }
    });

    var assembleSelectOption = function(items) {
        var options = [];
        _.isArray(items) && items.forEach(function(value) {
            options.push({
                value: value,
                text: value
            });
        });
        return options;
    }

    var BankAccountController = ItemController.extend({
        eventFields: [
            'bankAccountName',
            'bankName',
            'province',
            'city',
            'bankBranch',
            'bankAccountNumber',
            'bankAccountType'
        ],
        render: function() {
            var data = this.item.getData();
            this.$.html(this.tpl(data));
            this.$.attr('data-index', this.item.__mid);
            this.onItemRendered && this.onItemRendered.call(this, this.item, this.$);
            this.item.set('attachmentsObj', new Picture({el:this.$.find("#bankaccount-picture-container")}));

            return this.$;
        },

        bindEvt: function () {
            ItemController.prototype.bindEvt.call(this);
            var self = this;
            this.$.on('change', '[data-id="bankDefault"]', function () {
                var isChecked = $(this).prop('checked');
                if (isChecked) {
                    self.item.set('bankDefault', true);
                    self.item.set('bankSuspendPayment', true);
                    $('.bankAccountBizTypes', self.$).removeClass('hide');
                }else{
                    $('.bankAccountBizTypes', self.$).addClass('hide');
                    self.item.set('bankDefault', false);
                    self.item.set('bankSuspendPayment', false);
                }
            });

            this.$.on('change', '[data-id="biztypes"]', function () {
                var items = $("[data-id='biztypes']");
                var bizTypes= [];
                var index = 0;
                for(var i=0; i< items.length; i++){
                    var isChecked = items[i].checked;
                    if(isChecked){
                        bizTypes[index++] = parseInt(items[i].id);
                    }
                }
                self.item.set('bankAccountBizType', bizTypes)
            });
        },


        onItemRendered: function (item, $item) {
            var _this = this;

            var $bankSelect = this.$.find('[data-id="select-bank"]');
            var $provinceSelect = this.$.find('[data-id="select-province"]');
            var $citySelect = this.$.find('[data-id="select-city"]');
            var $bankBranchSelect = this.$.find('[data-id="select-bankBranch"]');

            var $manualInputBankBtn = this.$.find('[data-id="manual-bank-btn"]');
            var $manualInputBank = this.$.find('[data-id="manual-bank-input"]');
            $manualInputBank.hide();

            var $manualInputBankBranchBtn = this.$.find('[data-id="manual-bankBranch-btn"]');
            var $manualInputBankBranch = this.$.find('[data-id="manual-bankBranch-input"]');
            $manualInputBankBranch.hide();

            var $bankInputGroup = $bankSelect.parent();
            var $bankBranchInputGroup = $bankBranchSelect.parent();

            var manualInputBankDisplayed = false;

            var toggelManualInputBank = function() {
                if (manualInputBankDisplayed) {
                    manualInputBankDisplayed = false;
                    $manualInputBank.hide();
                    if (_this.item.get('bankName') !== $.trim($bankSelect.val())) {
                        _this.item.set('bankName', $.trim($bankSelect.val()));
                        refreshBankBranch();
                    }
                    $bankInputGroup.find('> .selectize-control').show();
                    $manualInputBankBtn.text('手动输入');
                } else {
                    manualInputBankDisplayed = true;
                    $bankInputGroup.find('> .selectize-control').hide();
                    if (_.isEmpty($manualInputBank.val())) {
                        $manualInputBank.val(_this.item.get('bankName'));
                    } else if (_this.item.get('bankName') !== $.trim($manualInputBank.val())){
                        _this.item.set('bankName', $.trim($manualInputBank.val()));
                        refreshBankBranch();
                    }
                    $manualInputBank.show();
                    $manualInputBankBtn.text('下拉选择');
                }
            };

            $manualInputBankBtn.click(toggelManualInputBank);

            $manualInputBank.change(function () {
                _this.item.set('bankName', $.trim($manualInputBank.val()));
                refreshBankBranch();
            });

            var manualInputBankBranchDisplayed = false;

            var toggelManualInputBankBranch = function() {
                if (manualInputBankBranchDisplayed) {
                    manualInputBankBranchDisplayed = false;
                    $manualInputBankBranch.hide();
                    _this.item.set('bankBranch', $.trim($bankBranchSelect.val()));
                    $bankBranchInputGroup.find('> .selectize-control').show();
                    $manualInputBankBranchBtn.text('手动输入');
                } else {
                    manualInputBankBranchDisplayed = true;
                    $bankBranchInputGroup.find('> .selectize-control').hide();
                    if (_.isEmpty($manualInputBankBranch.val())) {
                        $manualInputBankBranch.val(_this.item.get('bankBranch'));
                    } else {
                        _this.item.set('bankBranch', $.trim($manualInputBankBranch.val()));
                    }
                    $manualInputBankBranch.show();
                    $manualInputBankBranchBtn.text('下拉选择');
                }
            };

            $manualInputBankBranchBtn.click(toggelManualInputBankBranch);

            $manualInputBankBranch.change(function () {
                _this.item.set('bankBranch', $.trim($manualInputBankBranch.val()));
            });

            $bankBranchSelect.selectize({
                options: [],
                dropdownParent: 'body',
                onChange: function(branchName) {
                    _this.item.set('bankBranch', $.trim(branchName));
                }
            });

            var bankBranchSelect = $bankBranchSelect[0].selectize;

            bankInfoWrapper.getBankList(function (bankList) {
                $bankSelect.selectize({
                    options: assembleSelectOption(bankList),
                    dropdownParent: 'body',
                    onChange: function(bankName) {
                        _this.item.set('bankName', $.trim(bankName));
                        refreshBankBranch();
                    }
                });
            });

            $citySelect.selectize({
                options: [],
                onChange: function(city) {
                    _this.item.set('city', $.trim(city));
                    refreshBankBranch();
                }
            });

            var citySelect = $citySelect[0].selectize;

            bankInfoWrapper.getProvinceList(function (provinceList) {
                $provinceSelect.selectize({
                    options: assembleSelectOption(provinceList),
                    onChange: function(province) {
                        _this.item.set('province', $.trim(province));

                        citySelect.clearOptions();
                        bankBranchSelect.clearOptions();

                        bankInfoWrapper.getCityList(province, function(cityList) {
                            citySelect.addOption(assembleSelectOption(cityList));
                        });
                    }
                });
            });

            var refreshBankBranch = function() {
                var bankName = _this.item.get('bankName');
                var province = _this.item.get('province');
                var city = _this.item.get('city');

                bankBranchSelect.clearOptions();
                if (_.isEmpty(bankName) || _.isEmpty(province) || _.isEmpty(city)) {
                    return;
                }

                bankInfoWrapper.getBankBranchList(bankName, province, city, function(bankBranchList) {
                    bankBranchSelect.addOption(assembleSelectOption(bankBranchList));
                });
            };

            var $bankAccountNumberInput = this.$.find('[data-id="bankAccountNumberWithMask"]');
            $bankAccountNumberInput.mask('0ZZZ ZZZZ ZZZZ ZZZZ ZZZZ ZZZZ ZZZ0', {
                translation: {
                    'Z' : {
                        pattern: /[0-9\-]/, optional: true
                    }
                }
            });
            $bankAccountNumberInput.change(function() {
                _this.item.set('bankAccountNumber', $bankAccountNumberInput.val().replace(/ /g, ''));
            });
        }
    });

    var BankAccountCollection = Collection.extend({
        json: function () {
            var data = Collection.prototype.json.apply(this, arguments);
            if (data && data.length) {
                data.forEach(function (item) {
                    item.attachments = item.attachmentsObj.getAttachments();
                })
            }
            return data;
        }
    });

    var bankAccountList = new BankAccountCollection([new BankAccountModel()]);
    var bankAccountController;
    var bankAccountRequired = true;

    buConfig.getConfig(function(config) {
        bankAccountRequired = config.bankRequired;
        if(!config.bankRequired){
            bankAccountList = new BankAccountCollection();
        }
        renderBankAccountSection(bankAccountList);
    }, function() {
        renderBankAccountSection(bankAccountList);
    });


    function renderBankAccountSection(bankAccountList){
        bankAccountController = new CollectionController({
            $container: $('[data-id="bankaccount-list"]'),
            itemTpl: _.template($('[data-id="bankaccount-item-tpl"]').html()),
            list: bankAccountList,
            itemController: BankAccountController,
            item: BankAccountModel
        });
        bankAccountController.show();
    }

    <!---------------------------------------------------发票抬头处理模块-------------------------------------------->
    var InoviceTitleModel = Model.extend({
        defaults: {
            invoiceType:"1"
        }
    });
    var InvoiceTitleController = ItemController.extend({
        eventFields: [
            'invoiceName',
            'invoiceType',
            'taxPayerNum',
            'address',
            'phone',
            'bankName',
            'bankAccountNum'
        ],
        render: function() {
            var data = this.item.getData();
            this.$.html(this.tpl(data));
            this.$.attr('data-index', this.item.__mid);
            this.onItemRendered && this.onItemRendered.call(this, this.item, this.$);
            return this.$;
        },
        getPicture: function() {
            return this.picture;
        },

        bindEvt: function () {
            ItemController.prototype.bindEvt.call(this);
            var self = this;
            this.$.on('change', '[data-id="invoiceType"]', function () {
                var type = $(this).val();
                if (type == 2) {
                    $('.invoicetitle-special', self.$).removeClass('hide');
                }
                if(type==1){
                    $('.invoicetitle-special', self.$).addClass('hide');
                }
            });
        }
    });


    var invoiceTitleList = new Collection();

    var invoiceTitleController = new CollectionController({
        $container: $('[data-id="invoicetitle-list"]'),
        itemTpl: _.template($('[data-id="invoicetitle-item-tpl"]').html()),
        list: invoiceTitleList,
        itemController: InvoiceTitleController,
        item: InoviceTitleModel
    });

    invoiceTitleController.show();
    <!---------------------------------------------------数据提交Customer----------------------------------------------->
    function getData() {
        var customer = {};
        //customer.bizType = $('[data-id="bizType"]').val();
        customer.contacts = contactController.list.json();
        customer.businessLicenses = [];
        customer.licenses = [];
        customer.idCards = [];

        if (requireType == 1) {
            if(hasCompanyName==1){
                customer.customerName = $.trim($('[data-id="companyName"]').val());
            }else{
                customer.customerName = $.trim($('[data-id="legal-customerName"]').val());
            }

            var businessLicenses = {};
            businessLicenses.licenseType = $('#busLicenseType').val();
            var busLicExpiryDateVal = $('input:radio[name="busLicExpiryDateRadio"]:checked').val();
            if (busLicExpiryDateVal == 1) {
                businessLicenses.validTo = "3000-12-30";
            } else if (busLicExpiryDateVal == 2) {
                businessLicenses.validTo = $('#busLicExpiryDate').val();
            }
            if(hasCompanyName==1){
                businessLicenses.name = $.trim($('[data-id = "companyName"]').val());
            }else{
                businessLicenses.name = $.trim($('[data-id = "legalPerson"]').val());
            }

            businessLicenses.regNum = $.trim($('[data-id = "companyIDCard"]').val());
            businessLicenses.legalPerson = $.trim($('[data-id = "legalPerson"]').val());
            businessLicenses.isOfficialSeal = $('input:radio[name="requiredOffSealRadio"]:checked').val();
            var busPic = {};
            busPic.attachmentType = 101;
            busPic.fileId = busLicensePic.getAttachments()[0].fileId;
            businessLicenses.customerAttachments = [];
            businessLicenses.customerAttachments.push(busPic);

            var signPerson = {};
            if (businessLicenses.isOfficialSeal == 2) {

                signPerson.name = $.trim($('[data-id = "signatoryName"]').val());
                signPerson.regNum = $.trim($('[data-id = "signatoryIDCard"]').val());
                signPerson.customerAttachments = [];
                var signatoryPic1 = {};
                signatoryPic1.attachmentType = 201;
                signatoryPic1.fileId = signatoryIDCardFront.getAttachments()[0].fileId;
                var signatoryPic2 = {};
                signatoryPic2.attachmentType = 202;
                signatoryPic2.fileId = signatoryIDCardReverse.getAttachments()[0].fileId;

                signPerson.customerAttachments.push(signatoryPic1);
                signPerson.customerAttachments.push(signatoryPic2);
            }
            businessLicenses.signPerson = {};
            businessLicenses.signPerson = signPerson;

            customer.businessLicenses.push(businessLicenses);

        } else {
            customer.customerName = $.trim($('[data-id="customerName"]').val());
            var idCards = {};
            idCards.name = $.trim($('[data-id = "operatorName"]').val());
            idCards.regNum = $.trim($('[data-id = "operatorIDCard"]').val());
            idCards.issuer = $('[data-id = "perLicenseType"] option:selected').text();
            idCards.idCardType = $('[data-id = "perLicenseType"]').val();
            var perLicExpiryDateVal = $('input:radio[name="notBusLicExpiryDateRadio"]:checked').val();
            if (perLicExpiryDateVal == 1) {
                idCards.validTo = "3000-12-30";
            } else if (perLicExpiryDateVal == 2) {
                idCards.validTo = $('#notBusLicExpiryDate').val();
            }
            var merchantCommitSignPerson = {};
            merchantCommitSignPerson.name = $.trim($('[data-id = "merchantSignatoryName"]').val());
            merchantCommitSignPerson.predicatedSubmitDate = $('#busLicBackDate').val();
            merchantCommitSignPerson.customerAttachments = [];
            var merchantAtt = [];
            var merchSign1 = {};
            merchSign1.attachmentType = 203;
            merchSign1.fileId = merchSignPic1.getAttachments()[0].fileId;
            var merchSign2 = {};
            merchSign2.attachmentType = 102;
            merchSign2.fileId = merchSignPic2.getAttachments()[0].fileId;

            merchantAtt.push(merchSign1);
            merchantAtt.push(merchSign2);

            var merchSign3 = {};
            merchSign3.attachmentType = 103;
            if (merchSignPic3.getAttachments() && merchSignPic3.getAttachments().length > 0) {
                merchSign3.fileId = merchSignPic3.getAttachments()[0].fileId;
                merchantAtt.push(merchSign3);
            }
            merchantCommitSignPerson.customerAttachments = merchantAtt;
            idCards.merchantCommitSignPerson = {};
            idCards.merchantCommitSignPerson = merchantCommitSignPerson;

            var perCardType = $('#perLicenseType').val();
            var customerAttachments = [];
            if (perCardType == 1) {
                var customerPic1 = {};
                customerPic1.attachmentType = 201;
                customerPic1.fileId = idCardPicFront.getAttachments()[0].fileId;
                var customerPic2 = {};
                customerPic2.attachmentType = 202;
                customerPic2.fileId = idCardPicReversePic.getAttachments()[0].fileId;

                customerAttachments.push(customerPic1);
                customerAttachments.push(customerPic2);
            } else {
                var customerPic = {};
                if (perCardType == 2) {
                    customerPic.attachmentType = 301;
                } else if (perCardType == 3) {
                    customerPic.attachmentType = 401;
                } else if (perCardType == 4) {
                    customerPic.attachmentType = 501;
                } else if (perCardType == 5) {
                    customerPic.attachmentType = 601;
                }
                customerPic.fileId = otherIDCardPic.getAttachments()[0].fileId;
                customerAttachments.push(customerPic);
            }
            idCards.customerAttachments = [];
            idCards.customerAttachments = customerAttachments;

            customer.idCards.push(idCards);
        }

        customer.bankAccounts =  bankAccountController.list.json().map(function (bankAccount) {
            return {
                bankAccountName:bankAccount.bankAccountName,
                bankName:bankAccount.bankName,
                province:bankAccount.province,
                city:bankAccount.city,
                bankBranch:bankAccount.bankBranch,
                bankAccountNumber:bankAccount.bankAccountNumber,
                bankAccountType: bankAccount.bankAccountType,
                attachments: bankAccount.attachments,
                default:bankAccount.bankDefault,
                suspendPayment:bankAccount.bankSuspendPayment,
                bankAccountBizType:bankAccount.bankAccountBizType
            };
        });
        customer.invoiceTitles = invoiceTitleController.list.json();
        customer.shops = shopList;
        return customer;
    }

    function validateBankAccountInfoNotPass(customer){
        if(customer && customer.bankAccounts){
            var validBankAccount = _.filter(customer.bankAccounts, function(item){
                return !item.bankName || !item.province || !item.city || !item.bankBranch;
            });
            return validBankAccount.length;
        }
        return bankAccountRequired;
    }

    function validateBankAccountNotPass(customer){
        if(customer && customer.bankAccounts){
            var bizLicenses = _.filter(customer.bankAccounts, function(item){
                return item.attachments.length < 1;
            });
            return !!(bizLicenses && bizLicenses.length);
        }
        return bankAccountRequired;
    }

    function validateContactManagerNotPass(customer){
        if(customer && customer.contacts){
            var accountNoMag = _.filter(customer.contacts, function(item){
                return $.inArray(4,item.contactType)!=-1;
            });
            return !!(accountNoMag && accountNoMag.length!=1 );
        }
        return false;
    }

    function validateContactMobileIsSame(customer){
        var mobileList = [];
        if (customer && customer.contacts && _.isArray(customer.contacts)) {
            $(customer.contacts).each(function(index, item){
                if($.inArray(item.mobile, mobileList) != -1){
                    return true;
                }
                mobileList.push(item.mobile);
            });
        }

        return false;
    }

    var customer_name_repeat = function() {
        var $customerName = $('[data-id="customerName"]');
        var customerName = $.trim($customerName.val());
        var data = {
            keyword: customerName,
            completeMatch: 1
        };
        $.ajax({
            url: '../customerInfo/all',
            type: 'get',
            dateType: 'json',
            data: data,
            contentType: "application/json",
            success: function (data) {
                if (data && data.code === 200) {
                    if (data.msg && data.msg.length) {
                        var tbody = $('<tbody id="company-name-list"/>');

                        data.msg.forEach(function (item) {
                            $('<tr />').append(
                                $('<td style="text-align:left" />').text(item.customerId)
                            ).append(
                                $('<td style="text-align:left" />').text(item.customerName)
                            ).append(
                                $('<td style="text-align:left" />').text(item.tag ? item.tag : '')
                            ).append(
                                $('<td style="text-align:left" />').append($('<span />').addClass('glyphicon').addClass(item.my ? 'glyphicon-ok' : 'glyphicon-remove').attr('style', 'color:black'))
                            ).append(
                                $('<td />').append($('<a />').attr('href', '/crm/customerInfo/detail/' + item.customerUrlId).css('margin-right', '9px').css('margin-left', '-40px').text("详情")).append($('<a />').attr('href', '/crm/customerInfo/view/' + item.customerUrlId + '#!/customer/' + item.customerUrlId + '?tab=customer-shop').css('margin-right', '-35px').text("关联私海门店"))
                            ).appendTo(tbody);
                        });
                        $('.company-name-tip table').append(tbody);
                        $.blockUI({
                            message: $('.company-name-tip'),
                            css: {
                                top: (jQuery(window).height() - 500) / 2 + 'px',
                                left: (jQuery(window).width() - 800) / 2 + 'px',
                                width: '800px',
                                border: 'none',
                                cursor: null
                            },
                            overlayCSS: {
                                cursor: null
                            }
                        });

                        $('.company-name-tip').removeClass('hide');
                        $('[data-id="operatorName"]').focus();
                    } else {
                        //$.blockUI({
                        //    message: '<div style="background-color:#a9a9a9;font-size:20px;">提示</div><div><h5>合法客户,请继续录入</h5></div>',
                        //    css: {},
                        //    timeout: 2000
                        //});
                    }
                }
                b_customer_check = false;
            },
            error: function (code, err) {
                b_customer_check = false;
                console.log(code + ' ' + err);
            }
        });
    };

    var b_customer_check = false;
    $('#customerName').change(function() {
            var $customerName = $('[data-id="customerName"]');
            var customerName = $.trim($customerName.val());
            var validateNameAndIDCardMessage = validateNameAndIDCard();
            if (validateNameAndIDCardMessage != '') {
                $.blockUI({
                    message: '<div style="background-color:#a9a9a9;font-size:20px;">错误提示</div><div><h5>' + validateNameAndIDCardMessage + '</h5></div>',
                    css: {}
                });
                $('.blockOverlay').attr('title', 'Click to unblock').click(function () {
                    $.unblockUI();
                });
                return;
            }
            var data = {
                keyword: customerName,
                completeMatch: 1
            };

            if(!b_customer_check){
                customer_name_repeat();
            };
            b_customer_check = true;
            return false;
        }
    );

    $('[data-id="company-name-cancel"]').click(function(){
        $('#company-name-list').remove();
        $('.company-name-tip').addClass('hide');
        $.unblockUI();
    });

    $('[data-id="no-companyName"]').click(function(){
        hasCompanyName=2;
        $(".hasCompanyName").css("display","none");
        $(".noCompanyName").css("display","block");
    });

    $('[data-id="has-companyName"]').click(function(){
        hasCompanyName=1;
        $(".hasCompanyName").css("display","block");
        $(".noCompanyName").css("display","none");

    });

    $('[data-id="companyIDCard"]').on('keyup', function(){
        if(hasCompanyName==2){
            $('[data-id="legal-customerName"]').val($.trim($('[data-id="legalPerson"]').val()) + '-' + $.trim($(this).val()));
        }

    });
    $('[data-id="busLicenseType"]').change(function() {
        $('#companyIDCard').attr('placeholder', '注册码/统一社会信用码');
        if(($('#busLicenseType').val() != 1)&&($('#busLicenseType').val() != 2)){//不等于企业,个人
            hasCompanyName=1;
            $(".hasCompanyName").css("display","block");
            $(".noCompanyName").css("display","none");
            $(".noCompanyNameTips").css("display","none");
            $(".hasCompanyNameTips").css("display","none");
            $(".companyName_tip").css("display","block");
            if ($('#busLicenseType').val() == 3) {
                $('#companyIDCard').attr('placeholder', 'x民证字第xxx号 / 统一社会信用码');
            } else if ($('#busLicenseType').val() == 4) {
                $('#companyIDCard').attr('placeholder', 'x事证第xxx号 / 统一社会信用码');
            } else if ($('#busLicenseType').val() == 5) {
                $('#companyIDCard').attr('placeholder', 'x社证字第xxx号 / 统一社会信用码');
            }
        }else{
            if(hasCompanyName==2){//有企业名称
                $(".noCompanyNameTips").css("display","none");
            }else{
                $(".companyName_tip").css("display","none");
                $(".noCompanyNameTips").css("display","block");
            }

        }

    });

    $('[data-id="legalPerson"]').on('keyup', function(){
        if(hasCompanyName==2){
            $('[data-id="legal-customerName"]').val($.trim($(this).val()) + '-' + $.trim($('[data-id="companyIDCard"]').val()));
        }

    });


    var msgDialog = function(msg) {
        $.blockUI({
            message: '<div style="background-color:#a9a9a9;font-size:20px;">错误提示</div><div><h5>' + msg + '</h5></div>',
            css: {}
        });
        $('.blockOverlay').attr('title', 'Click to unblock').click(function () {
            $.unblockUI();
        });
    };

    $('.customer-save').click(function () {

        $.blockUI({
            message: '<div style="background-color:#a9a9a9;font-size:20px;">信息提示</div><div><h5>正在保存客户...</h5></div>',
            css: {}
        });

        var customerBaseInfoRequireMsg = validCustomerBaseInfoRequire();
        if(customerBaseInfoRequireMsg != '') {
            return msgDialog(customerBaseInfoRequireMsg);
        }

        var customer = getData();
        console.log(customer);

        if (validateContactManagerNotPass(customer)) {
            return msgDialog("联系人有且只能有一位超级管理员");
        }

        // if (validateBankAccountNotPass(customer)) {
        //     return msgDialog("银行账号需要添加附件");
        // }

        if (validateBankAccountInfoNotPass(customer)) {
            return msgDialog("银行名、省、市、支行不能为空");
        }

        if (validateContactMobileIsSame(customer)) {
            return msgDialog("联系人手机不能相同");
        }

        $.ajax({
            url: '../customerInfo/createCustomer',
            type: 'post',
            dateType: 'json',
            data: JSON.stringify(customer),
            contentType: "application/json",
            success: function (data) {
                $.unblockUI();
                if (data.code == 200) {
                    $.blockUI({
                        message: '<div style="background-color:#a9a9a9;font-size:20px;">信息提示</div><div><h5>保存成功</h5></div>',
                        css: {},
                        timeout: 200
                    });
                    location.href = '../customerInfo/list';
                }
                else {
                    $.blockUI({
                        title: 'hello',
                        message: '<div style="background-color:#a9a9a9;font-size:20px;">错误提示</div><div><h5>' + data.msg + '</h5></div>',
                        css: {}
                    });
                    $('.blockOverlay').attr('title', 'Click to unblock').click(function () {
                        $.unblockUI();
                    });
                }
            },
            error: function (code, err) {
                $.blockUI({
                    message: '<div style="background-color:#a9a9a9;font-size:20px;">错误提示</div><div><h5>保存客户遇到服务器错误</h5></div>',
                    css: {},
                    timeout: 2000
                });
            }
        });
        return false;
    });

    <!--取消-->
    $('.customer-cancel').click(function(){
        location.href ='../customerInfo/list';
    });

    <!-------------------------------------------------搜索门店处理模块-------------------------------------------------------------->
    <!--遮罩-->
    $('.add-btn-shop').click(function() {
        $.blockUI({
            message: $('.shop-search-add'),
            css: {
                top: (jQuery(window).height() - 500) / 2 + 'px',
                left: (jQuery(window).width() - 800) / 2 + 'px',
                hight: '800px',
                width: '800px',
                border: 'none',
                cursor: null
            },
            overlayCSS: {
                cursor: null
            }
        });
        $('.blockOverlay').attr('title', 'Click to unblock').click(function() {
            $.unblockUI();
            $('[data-id="shop-list-search"]').empty();
            $('[data-id="select-all-checkbox"]').prop('checked',false);
            $('.shop-search-loading').addClass('hide');
            $('.shop-search-no-result').addClass('hide');
            pageNum = 1;
        });

        $('.search-btn-shop').trigger('click');
    });
    <!--消除遮罩、清除数据-->
    $('[date-id="shop-search-cancel"]').click(function(){
        $.unblockUI();
        $('[data-id="shop-list-search"]').empty();
        $('[data-id="select-all-checkbox"]').prop('checked',false);
        $('.shop-search-loading').addClass('hide');
        $('.shop-search-no-result').addClass('hide');
        pageNum = 1;
    });
    <!--checkbox全选-->
    $('[data-id="select-all-checkbox"]').change(function(){
        var checked = $(this).prop('checked');
        $("input[name=shop-search-checkbox]").prop('checked',checked);
    });
    <!--搜索展示-->
    var shopSearchItemTpl = _.template($('[data-id="shop-search-item-tpl"]').html());
    $('.search-btn-shop').click(function(){
        $('.shop-search-loading').removeClass('hide');
        $('.shop-search-no-result').addClass('hide');
        var shopName = $('[data-id="shop-name"]').val();
        $.ajax({
            url:'../shops/search',
            type:'get',
            dateType:'json',
            data: {
                keyword: shopName,
                page:1,
                pageSize:5
            },
            success:function(data){
                var html = '';
                if (data && data.dataList && data.dataList.length) {
                    data.dataList.forEach(function (item) {
                        html += shopSearchItemTpl(item);
                    });
                    $('[data-id="shop-list-search"]').html(html);
                }
                if(data && data.dataList && data.dataList.length>0){
                    $('.shop-search-loading').addClass('hide');
                    $('.shop-search-no-result').addClass('hide');
                }
                else{
                    $('.shop-search-loading').addClass('hide');
                    $('.shop-search-no-result').removeClass('hide');
                }
            },
            error:function(code, err){
            }
        });
    });
    <!--页码全局变量-->
    var pageNum=1;
    <!--下一页-->
    $('[data-id="shop-search-next"]').click(function(){
        $('.shop-search-loading').removeClass('hide');
        var shopName = $('[data-id="shop-name"]').val();
        pageNum=pageNum+1;
        $.ajax({
            url:'../shops/search',
            type:'get',
            dateType:'json',
            data: {
                keyword: shopName,
                page:pageNum,
                pageSize:5
            },
            success:function(data){
                console.log(data.dataList);
                var html = '';
                if (data && data.dataList && data.dataList.length) {
                    data.dataList.forEach(function (item) {
                        html += shopSearchItemTpl(item);
                    });
                    $('[data-id="shop-list-search"]').html(html);
                }
                $('.shop-search-loading').addClass('hide');
                $('[data-id="select-all-checkbox"]').prop('checked',false);
            },
            error:function(code, err){
                $('[data-id="select-all-checkbox"]').prop('checked',false);
            }
        });
    });
    <!--上一页-->
    $('[data-id="shop-search-last"]').click(function(){
        $('.shop-search-loading').removeClass('hide');
        var shopName = $('[data-id="shop-name"]').val();
        if(pageNum>1){
            pageNum = pageNum-1;
        }
        $.ajax({
            url:'../shops/search',
            type:'get',
            dateType:'json',
            data: {
                keyword: shopName,
                page:pageNum,
                pageSize:5
            },
            success:function(data){
                console.log(data.dataList);
                var html = '';
                if (data && data.dataList && data.dataList.length) {
                    data.dataList.forEach(function (item) {
                        html += shopSearchItemTpl(item);
                    });
                    $('[data-id="shop-list-search"]').html(html);
                }
                $('.shop-search-loading').addClass('hide');
                $('[data-id="select-all-checkbox"]').prop('checked',false);
            },
            error:function(code, err){
                $('[data-id="select-all-checkbox"]').prop('checked',false);
            }
        });
    });
    <!--第一页-->
    $('[data-id="shop-search-first"]').click(function(){
        $('.shop-search-loading').removeClass('hide');
        var shopName = $('[data-id="shop-name"]').val();
        pageNum=1;
        $.ajax({
            url:'../shops/search',
            type:'get',
            dateType:'json',
            data: {
                keyword: shopName,
                page:pageNum,
                pageSize:5
            },
            success:function(data){
                $('.shop-search-loading').addClass('hide');
                console.log(data.dataList);
                var html = '';
                if (data && data.dataList && data.dataList.length) {
                    data.dataList.forEach(function (item) {
                        html += shopSearchItemTpl(item);
                    });
                    $('[data-id="shop-list-search"]').html(html);
                    $('[data-id="select-all-checkbox"]').prop('checked',false);
                }
            },
            error:function(code, err){
                $('[data-id="select-all-checkbox"]').prop('checked',false);
            }
        });
    });

    <!--添加选中的门店-->
    function notContains(list,item){
        for(var i=0;i<list.length;i++){
            if(list[i].shopId===item){
                return false;
            }
        }
        return true;
    }
    var shopItemTpl = _.template($('[data-id="shop-item-tpl"]').html());
    var shopList =[];
    $('[data-id="shop-search-add"]').click(function(){
        $("input[name=shop-search-checkbox]").each(function(){
            var $td = $(this).parents("tr").children("td");
            if($(this).prop('checked')){
                var shopid = $td.eq(1).text();
                var name = $td.eq(2).text();
                var pow = $td.eq(3).text();
                var catg = $td.eq(4).text();
                var addr = $td.eq(5).text();
                //var cooperationStatus = 1; //默认状态１：合作中(1)，停止合作(2),cooperationStatus:cooperationStatus
                if(notContains(shopList,shopid)){
                    shopList.push({shopId:shopid,shopName:name,power:pow,category:catg,address:addr});
                }
            }
        });
        var html = '';
        if (shopList&&shopList.length) {
            shopList.forEach(function (item) {
                html += shopItemTpl(item);
            });
            $('[data-id="shop-list"]').html(html);
        }
    });
    <!--子对象的删除:删除shop-->
    var deleteShop=function(shopId){
        var shop = _.findWhere(shopList, {
            shopId: shopId
        });
        if (shop) {
            var index = shopList.indexOf(shop);
            if (index != -1) {
                shopList.splice(index, 1);
            }
        }
        return true;
    }
    $('[data-id="shop-list"]').on('click', '.del-btn', function () {
        // TODO del
        var shopId = $(this).attr('data-shopId');
        if (deleteShop(shopId)) {
            $(this).parents("tr").remove();
        }
    });
    <!--子对象的删除:删除contact-->
    var deleteContact=function(index){
        var contact = contactList.findById(index);

        if (contact) {
            contactList.del(contact);
        }
        return true;
    }
    $('[data-id="contact-list"]').on('click', '.del-btn', function () {
        // TODO del
        var index = $(this).parents('div').attr('data-index');
        if (deleteContact(index)) {
            $(this).parents("li").remove();
        }
    });
    <!--子对象的删除:删除license-->
    var deleteLicense=function(index){
        var license = tradingLicenseList.findById(index);
        if (license) {
            tradingLicenseList.del(license);
        }
        return true;
    }
    $('[data-id="tradinglicense-list"]').on('click', '.del-btn', function () {
        var index = $(this).parents('div').attr('data-index');
        if (deleteLicense(index)) {
            $(this).parents("li").remove();
        }
    });
    <!--子对象的删除:删除bankaccount-->
    var deleteBankAccount=function(index){
        var bankAccount = bankAccountList.findById(index);
        if (bankAccount) {
            bankAccountList.del(bankAccount);
        }
        return true;
    }
    $('[data-id="bankaccount-list"]').on('click', '.del-btn', function () {
        // TODO del
        var index = $(this).parents('div').attr('data-index');
        if (deleteBankAccount(index)) {
            $(this).parents("li").remove();
        }
    });
    <!--子对象的删除:删除invoicetitle-->
    var deleteInvoiceTitle=function(index){
        var invoiceTitle = invoiceTitleList.findById(index);
        if (invoiceTitle) {
            invoiceTitleList.del(invoiceTitle);
        }
        return true;
    }
    $('[data-id="invoicetitle-list"]').on('click', '.del-btn', function () {
        // TODO del
        var index = $(this).parents('div').attr('data-index');
        if (deleteInvoiceTitle(index)) {
            $(this).parents("li").remove();
        }
    });
    <!--折叠-展开-->
    $('.contact-panel-exspan').click(function(){
        $('.contact-panel-body').addClass('hide');
        $('.contact-panel-exspan').addClass('hide');
        $('.contact-panel-flod').removeClass('hide');
    });
    $('.contact-panel-flod').click(function(){
        $('.contact-panel-body').removeClass('hide');
        $('.contact-panel-exspan').removeClass('hide');
        $('.contact-panel-flod').addClass('hide');
    });

    var isNameOnlyChineseAndEnglish = function(str) {
        var reg = /^[A-Za-z\.·\u4e00-\u9fa5]+$/;
        return reg.test($.trim(str));
    };

    var isNameLegal = function(str) {
        var items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")", ":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//", "-");
        str = str.toLowerCase();
        for (var i = 0; i < items.length; i++) {
            if (str.indexOf(items[i]) >= 0) {
                return false;
            }
        }
        return true;
    };

    var maxLengthStrict = function(str, max) {
        return (str.length<=max);
    };

    var isLegalLicenceNumber = function (str) {
        if(str==undefined){
            return false;
        }
        if(str.length!=15&&str.length!=18){
            return false;
        }
        var reg = /^[A-Za-z0-9]+$/;
        return reg.test($.trim(str));
    };

    var isLegalIdCard = function (str) {
        if(str==undefined){
            return false;
        }
        var idCardReg_18=/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
        return idCardReg_18.test($.trim(str.toLowerCase()));
    };

    var isDate = function (s) {
        var dateReg = /^\d{4}[.\/-](0[1-9]|1[0-2])[.\/-](0[1-9]|[1-2][0-9]|3[01])$/;

        return dateReg.test(s);
    };

    var isDateWithinOneYear = function (input_date_str) {
        //根据日期字符串yyyy-mm-dd转换成日期
        var regEx = new RegExp("\\-","gi");
        var input_date=$.trim(input_date_str).replace(regEx,"/");
        var milliseconds=Date.parse(input_date);
        var inputDate=new Date();
        inputDate.setTime(milliseconds);
        return Math.abs(inputDate - new Date()) < 365*24*3600*1000
    }
    var isOnlyNumberAndEnglish=function(str) {
        var reg = /^[A-Za-z0-9]+$/;
        return reg.test($.trim(str));
    }
});