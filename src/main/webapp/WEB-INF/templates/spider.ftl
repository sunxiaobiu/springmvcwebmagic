<html>
<#include "/WEB-INF/templates/macros.ftl">
<#-- <#include "/WEB-INF/pages/includes/searchModel.ftl"> -->

<body>

<style type="text/css">
    /* LITTLE BAR */

    .barlittle {
        background-color:#2187e7;
        background-image: -moz-linear-gradient(45deg, #2187e7 25%, #a0eaff);
        background-image: -webkit-linear-gradient(45deg, #2187e7 25%, #a0eaff);
        border-left:1px solid #111; border-top:1px solid #111; border-right:1px solid #333; border-bottom:1px solid #333;
        width:10px;
        height:10px;
        float:left;
        margin-left:5px;
        opacity:0.1;
        -moz-transform:scale(0.7);
        -webkit-transform:scale(0.7);
        -moz-animation:move .2s infinite linear;
        -webkit-animation:move .2s infinite linear;
    }
    #block_1{
        margin-left: 240px;
        -moz-animation-delay: .4s;
        -webkit-animation-delay: .4s;
    }
    #block_2{
        -moz-animation-delay: .3s;
        -webkit-animation-delay: .3s;
    }
    #block_3{
        -moz-animation-delay: .2s;
        -webkit-animation-delay: .2s;
    }
    #block_4{
        -moz-animation-delay: .3s;
        -webkit-animation-delay: .3s;
    }
    #block_5{
        -moz-animation-delay: .4s;
        -webkit-animation-delay: .4s;
    }
    @-moz-keyframes move{
        0%{-moz-transform: scale(1.2);opacity:1;}
        100%{-moz-transform: scale(0.7);opacity:0.1;}
    }
    @-webkit-keyframes move{
        0%{-webkit-transform: scale(1.2);opacity:1;}
        100%{-webkit-transform: scale(0.7);opacity:0.1;}
    }
    .panel-body ul li{
        text-indent: 0em;
    }
    .alert-info {
        color: #31708f;
        background-color: #d9edf7;
        border-color: #bce8f1;
    }
    .input-group .selectize-control {
        height: 34px !important;
    }
    .input-group .selectize-control .selectize-input {
        padding: 6px 7px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .footer-bar {
        z-index: 3;
    }
    .drag-file {
        width: 100%;
        min-height: 200px;
        margin: 10px 0;
        border: 2px dashed #f2f2f2;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
    }

    .drag-file > li {
        position: absolute;
        z-index: 1;
    }

    .drag-file > span {
        position: absolute;
        padding-top: 50px;
        padding-left: 25px;
        display: inline-block;
        max-width: 170px;
        font-size: 15px;
        color: #ccc;
        top: 20%;
    }

</style>
<form class="form-horizontal">
    <div>
    <#include "/WEB-INF/templates/create-base.ftl">

        <div class="panel panel-primary" data-id="contact-container">
            <div class="panel-heading">联系人</div>
            <div class="panel-body contact-panel-body">
                <ul data-id="contact-list"></ul>
                <div style="float:right">
                    <button type="button" class="btn btn-primary" data-id="add-btn">新增联系人</button>
                </div>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">银行账号</div>
            <div class="panel-body">
                <ul data-id="bankaccount-list"></ul>
                <div style="float:right">
                    <button type="button" class="btn btn-primary" data-id="add-btn">新增银行账号</button>
                </div>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">门店</div>
            <div class="panel-body">
                <table class="table">
                    <tbody data-id="shop-list">
                    </tbody>
                </table>
                <div style="float:right">
                    <button type="button" class="btn btn-primary add-btn-shop" data-id="add-btn-shop">关联私海门店</button>
                </div>
            </div>
        </div>
        <div class="panel panel-primary">
            <div class="panel-heading">发票抬头</div>
            <div class="panel-body">
                <ul data-id="invoicetitle-list"></ul>
                <div style="float:right">
                    <button type="button" class="btn btn-primary" data-id="add-btn">新增发票抬头</button>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bar" style="position:fixed;bottom:2em;right:40em;">
        <div >
            <button type="button" class="btn btn-primary   customer-save">保存客户</button>
            <button type="button" class="btn btn-danger   customer-cancel">取消保存</button>
        </div>
    </div>
</form>
<div class="shop-search-add" style="display:none;">
    <div class="row">
        <div class="col-lg-12">
            <div class="input-group" style="margin-top:20px;margin-bottom:20px;">
                <input type="text" class="form-control" placeholder="门店名/shopId" id="search-shop" data-id="shop-name">
                <span class="input-group-btn">
                    <input class="btn btn-primary search-btn-shop" type="button" value="搜索" id="search-btn">
                </span>
            </div>
        </div>
        <div class="col-lg-12" style="margin-bottom:5px;">
            <div id='shop-search-loading' class="shop-search-loading hide">
                <div id='block_1' class='search-loading'></div>
                <div id='block_2' class='search-loading'></div>
                <div id='block_3' class='search-loading'></div>
            </div>
            <div class="shop-search-no-result hide">
                <div class="lead" style="color:red">搜索没有返回结果</div>
            </div>
        </div>
    </div>
    <div style="width:600;margin-left: 20px;margin-right: 20px;">
        <table class="table table-bordered">
            <thead>
            <tr>
                <th><input type="checkbox" data-id="select-all-checkbox"></th>
                <th>ShopID</th>
                <th>门店名</th>
                <th>星级</th>
                <th>分类</th>
                <th>地址</th>
            </tr>
            </thead>
            <tbody data-id="shop-list-search">
            </tbody>
        </table>
    </div>
    <div>
        <ul class="pagination" style="margin-top:-10px;">
            <li><a  date-id="shop-search-first">第一页</a></li>
            <li><a  data-id="shop-search-last">上一页</a></li>
            <li><a  data-id="shop-search-next">下一页</a></li>
        </ul>
        <div style="margin-top:-10px;margin-bottom: 10px;">
            <input type="button" value="取消" class="btn btn-danger" style="margin-right:30px;" date-id="shop-search-cancel"/>
            <input type="button" value="添加" class="btn btn-primary" data-id="shop-search-add"/>
        </div>
    </div>
</div>

<div class="company-name-tip panel panel-primary hide" style="margin-left:-103px;margin-right:-158px;margin-bottom:-63px;margin-top:0px;">
    <div class="panel-heading">
        <h3 class="panel-title" style="margin-left:-960px">系统提示</h3>
    </div>
    <div class="panel-body" style="margin-left:36px;margin-right:36px">
        <p class="text-left" style="margin: 0 0 0px;color: #ff1826;margin-bottom:10px;margin-top:16px;margin-left:4px">您新增的客户，系统中已存在：</p>
        <p class="text-left" style="margin: 0 0 0px;color: #000000;margin-bottom:0px;margin-left:4px">您可以点击【查看详情】确认您要新增的客户是否与这个已有客户是同一客户：</p>
        <p class="text-left" style="margin: 10px 0 0px;color: #000000;margin-bottom:0px;margin-left:4px">1）如果是同一客户，并且该客户属于您，请直接使用已有客户，单一客户可提供各个业务共用；
            如果是同一客户，但您当前不拥有该客户，可在客户详情页【门店】下点击【关联私海门店】按钮，将该客户下新归属于您的门店，添加至该客户下，即可使用该客户信息；</p>
        <p class="text-left" style="margin: 10px 0 0px;color: #000000;margin-bottom:16px;margin-left:4px">2）如果您新增的客户与已有客户不是同一客户，请检查您录入的客户名是否正确。</p>
        <table class="table table-bordered table-hover">
            <thead>
            <tr class="bg-info">
                <th style="width:12%">客户编号</th>
                <th>客户名称</th>
                <th style="width:12%">品牌</th>
                <th style="width:12%">我的客户</th>
                <th style="width:25%">操作</th>
            </tr>
            </thead>
        </table>
        <div>
            <div style="margin-top:35px;margin-bottom: 10px;">
                <input type="button" value="关闭" class="btn btn-danger" style="margin-right:30px;padding-left:40px;padding-right:40px;background-color:#449D48;border-color:#398439;color:#fff;" data-id="company-name-cancel"/>
            </div>
        </div>
    </div>
</div>
<script type="text/template" data-id="contact-item-tpl">
    <li>
        <button type="button" class="close del-btn">X</button>
        <legend style="font-size:10px;font-weight:bold;color:#8FBFEF">联系人</legend>
        <div class="form-group">
            <label for="contactName" class="col-sm-2 control-label required">姓名</label>
            <div class="col-sm-10 col-lg-8">
                <input type="text" class="form-control" id="contactName" placeholder="如：东方不败" data-id="name">
            </div>
        </div>
        <div class="form-group">
            <label for="contactPhone" class="col-sm-2 control-label required">手机</label>
            <div class="col-sm-2 col-lg-2">
            <#--<select class="form-control" id="mobileArea" data-id="select_mobileAreaCode">-->
            <#--</select>-->
                <select class="form-control" id="mobileArea" data-id="select_mobileAreaCode" class="form-control">
                <#list globalAreaCodes as item>
                    <option value="${item.code},${item.example}">${item.code}(${item.name})</option>
                </#list>
                </select>
            </div>
            <div class="col-sm-10 col-lg-6">
                <input type="text" class="form-control" id="contactPhone" placeholder="如：139 8888 2222" data-id="mobile">
            </div>
        </div>
        <div class="form-group">
            <label for="contractTitle" class="col-sm-2 control-label required">职务</label>
            <div class="col-sm-10 col-lg-8">
                <select identification="职务" id="contractTitle" class="form-control" data-id="title">
                    <option value="法人/董事长">法人/董事长</option>
                    <option value="市场经理">市场经理</option>
                    <option value="财务经理">财务经理</option>
                    <option value="店长/领班">店长/领班</option>
                    <option value="收银员">收银员</option>
                    <option value="普通店员">普通店员</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label for="contactType" class="col-sm-2 control-label">角色</label>
            <div class="col-sm-offset-1 col-sm-10 col-lg-8" data-id="contact-role" style="text-indent: -3em;">
            <#list contactRoles as item>
                <div class="checkbox-line">
                    <label>
                        <input type="checkbox" value="${item.roleID}">${item.roleName}
                        <small style="padding-left: 40px;font-weight: 100;">${item.description}</small>
                    </label>
                </div>
            </#list>
            </div>
        </div>
        <div class="form-group">
            <label for="contactEmail" class="col-sm-2 control-label">邮箱</label>
            <div class="col-sm-10 col-lg-8">
                <input type="text" class="form-control" id="contactEmail" placeholder="如：example@dianping.com(推广业务联系人邮箱必填)" data-id="email">
            </div>
        </div>
    </li>
</script>
<script type="text/template" data-id="shop-item-tpl">
    <tr>
        <td width="15%"><%= shopId %></td>
        <td width="25%"><%= shopName %></td>
        <td width="15%"><span class="star s<%= power %>"></span></td>
        <td width="10%"><%= category %></td>
        <td width="30%"><%= address %></td>
        <td width="5%"><button type="button" class="close del-btn"  data-shopId="<%= shopId%>">X</button></td>
    </tr>
</script>
<script type="text/template" data-id="shop-search-item-tpl">
    <tr>
        <td><input type="checkbox" name="shop-search-checkbox"></td>
        <td name="shopId"><%= shopId %></td>
        <td name="shopName"><%= shopName %></td>
        <td name="power"><span class="star s<%= power %>"></span></td>
        <td name="category"><%= category %></td>
        <td name="address"><%= address %></td>
    </tr>
</script>
<script type="text/template" data-id="tradinglicense-item-tpl">
    <li>
        <button type="button" class="close del-btn" >X</button>
        <legend style="font-size:10px;font-weight:bold;color:#8FBFEF">资质证照</legend>
        <div class="form-group">
            <div class="col-sm-1"></div>
            <div class="col-sm-11">
                <h5 style="color: orange">
                    企业资质证照信息会在点评主站公示(以下简称“网上亮照”)给消费者查看，请严格按照纸质信息认真填写。
                </h5>
                <a href="http://a.dper.com/faq/detail?id=195" target="_blank">点击查看帮助>></a>
            </div>
        </div>
        <div class="form-group">
            <label for="tradinglicenseType" class="col-sm-2 control-label required">证件类型</label>
            <div class="col-sm-10 col-lg-8">
                <select identification="证件类型" id="tradinglicenseType" class="form-control" data-id="licenseType">
                    <option value="1">营业执照</option>
                    <option value="3">身份证明</option>
                </select>
            </div>
        </div>
        <div class="business-license">
            <div class="form-group" id='licenseTypeSelect'>
                <label for="tradinglicenseType" class="col-sm-2 control-label required">营业执照分类</label>
                <label class="checkbox-inline">
                    <input type="radio" id="optionsRadios1"
                           value="1" > 企业法人营业执照
                </label>
                <label class="checkbox-inline">
                    <input type="radio" id="optionsRadios2"
                           value="2"> 个体工商户营业执照
                </label>
            </div>

            <div class="form-group">
                <label for="tradinglicenseSpecial" class="col-sm-2 control-label">特批</label>
                <div class="checkbox-line">
                    <div class="col-sm-10 col-lg-8">
                        <label class="checkbox-inline">
                            <input type="checkbox"  id="tradinglicenseSpecial" data-id="isSpecialApproval"
                                   style="width:15px;height:15px;" > 无法提供营业执照
                        </label>
                    </div>
                </div>
            </div>
            <div class="business-license-not-special">
                <div class="form-group">
                    <label for="tradinglicenseName"  data-id="nameLabel" class="col-sm-2 control-label required">企业名称</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control" id="tradinglicenseName" data-id="name">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tradinglicenseRegNum" class="col-sm-2 control-label required">注册码/统一社会信用代码</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control" id="tradinglicenseRegNum" data-id="regNum">
                    </div>
                </div>
                <div class="form-group">
                    <label for="tradinglicenseLegalPerson" class="col-sm-2 control-label required">法人/经营者姓名</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control" id="tradinglicenseLegalPerson" data-id="legalPerson">
                    </div>
                </div>
                <div class="form-group tradinglicenseLegalPersonNumber hide">
                    <label for="tradinglicenseLegalPersonNumber" class="col-sm-2 control-label required">法人/经营者身份证号码</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control" placeholder="请填写证件号码" id="tradinglicenseLegalPersonNumber" data-id="legalPersonNumber">
                    </div>
                </div>
            </div>
            <div class="business-license-special hide">
                <div class="form-group">
                    <label for="specialApprovalBy" class="col-sm-2 control-label required">特批授权人</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control" id="specialApprovalBy"  data-id="specialApprovalBy">
                    </div>
                </div>
                <div class="form-group">
                    <label for="specialApprovalValidTo" class="col-sm-2 control-label required">失效日</label>
                    <div class="col-sm-10 col-lg-8">
                        <input type="text" class="form-control datepicker" id="specialApprovalValidTo" data-id="specialApprovalValidTo" placeholder="请填写预计可提供营业执照日期" readonly>
                    </div>
                </div>
            </div>
        </div>
        <div class="idCard hide">
            <div class="form-group">
                <label for="idCardName" class="col-sm-2 control-label required">姓名</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" placeholder="填写请与提交的法人身份证复印件信息一致" id="idCardName" data-id="idcardname">
                </div>
            </div>
            <div class="form-group">
                <label for="idCardType" class="col-sm-2 control-label required">种类</label>
                <div class="col-sm-10 col-lg-8">
                    <select identification="种类" id="idCardType" class="form-control" data-id="idCardType">
                        <option value="身份证">身份证</option>
                        <option value="护照">护照</option>
                        <option value="台胞证">台胞证</option>
                        <option value="驾照">驾照</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="idCardRegnum" class="col-sm-2 control-label required">证件号</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" placeholder="请填写证件号码" id="idCardRegnum" data-id="idcardregNum">
                </div>
            </div>
        </div>
        <div class="license hide">
            <div class="form-group">
                <label for="licenseName" class="col-sm-2 control-label required">名称</label>
                <div class="col-sm-10 col-lg-8">
                    <input id="licenseName" class="form-control" data-id="licensename"/>
                </div>
            </div>
        </div>
        <div class="tradingPicture">
            <div class="form-group">
                <label for="bankInit" class="col-sm-2 control-label required">营业执照</label>
                <div class="col-sm-10">
                    <div class="picture">
                        <div id="license-trading-picture-container">
                            <div class="file-upload-btn">
                                <button type="button" class="btn btn-default fileinput-button">选择上传文件</button>
                                <input id="f" type="file" name="files[]" multiple="">
                            </div>
                            <ul id="images-list" class="images-list"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="idCardPicture hide">
            <div class="form-group">
                <label for="bankInit" class="col-sm-2 control-label required">身份证明附件</label>
                <div class="col-sm-10">
                    <div class="picture">
                        <div id="license-idcard-picture-container">
                            <div class="file-upload-btn">
                                <button type="button" class="btn btn-default fileinput-button">选择上传文件</button>
                                <input id="f" type="file" name="files[]" multiple="">
                            </div>
                            <ul id="images-list" class="images-list"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="licenseTip">
            <div class="form-group">
                <label class="col-sm-2 control-label">提示：</label>
                <div class="col-sm-10 col-lg-8">
                    <p class="alert-info">为避免重复提交被打回，请只提交营业执照等资质相关附件，协议附件请在协议录入处上传。
                    </p>
                </div>
            </div>
        </div>
        <div class="idCardTip hide">
            <div class="form-group">
                <label class="col-sm-2 control-label">提示：</label>
                <div class="col-sm-10 col-lg-8">
                    <p class="alert-info">为避免重复提交被打回，请只提交身份证等资质相关附件，协议附件请在协议录入处上传。
                    </p>
                </div>
            </div>
        </div>
    </li>
</script>
<script type="text/template" data-id="bankaccount-item-tpl">
    <li data-id="bankaccount-container">
        <button type="button" class="close del-btn" >X</button>
        <legend style="font-size:10px;font-weight:bold;color:#8FBFEF">银行账号</legend>
        <div class="form-group">
            <label class="col-sm-2 control-label required">开户名</label>
            <div class="col-sm-10 col-lg-8">
                <input type="text" class="form-control" id="bankAccountName" data-id="bankAccountName" placeholder="请与纸质协议填写保持一致">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">银行名称</label>
            <div class="col-sm-10 col-lg-8">
                <div class="input-group">
                    <select class="form-control" data-id="select-bank" placeholder="请输入关键字搜索银行,若无匹配结果请选其他" autocomplete="off"></select>
                    <input class="form-control" type="text" data-id="manual-bank-input" placeholder="手动输入银行名" autocomplete="off" >
                        <span class="input-group-btn">
                            <button class="btn btn-default" data-toggle="modal" data-id="manual-bank-btn" type="button">手动输入</button>
                        </span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">开户行所在省</label>
            <div class="col-sm-10 col-lg-8">
                <select data-id="select-province" placeholder="请输入关键字搜索省" autocomplete="off"></select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">开户行所在市</label>
            <div class="col-sm-10 col-lg-8">
                <select data-id="select-city" placeholder="请输入关键字搜索市" autocomplete="off"></select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">支行名称</label>
            <div class="col-sm-10 col-lg-8">
                <div class="input-group">
                    <select data-id="select-bankBranch" placeholder="请输入关键字搜索支行，若无匹配结果请手动输入完整的支行名称" autocomplete="off"></select>
                    <input class="form-control" type="text" data-id="manual-bankBranch-input" placeholder="手动输入支行名" autocomplete="off" >
                        <span class="input-group-btn">
                            <button class="btn btn-default" data-toggle="modal" data-id="manual-bankBranch-btn" type="button">手动输入</button>
                        </span>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">银行卡号</label>
            <div class="col-sm-10 col-lg-8">
                <input type="text" class="form-control" id="bankNumber" data-id="bankAccountNumberWithMask">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label required">类型</label>
            <div class="col-sm-10 col-lg-8">
                <select identification="类型" id="bankType" class="form-control" data-id="bankAccountType">
                    <option value="2">企业 (开户名为公司)</option>
                    <option value="1">个人 (开户名为人名)</option>
                </select>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">提示：</label>
            <div class="col-sm-10 col-lg-8">
                <div class="alert-info">
                    签字的合同/支付声明/账号变更声明，须上传开户人身份证照片（注：营业执照法人与开户人一致，可用执照代替身份证）<br>
                    盖公章/合同章的合同/支付声明/账号变更书：只需提供协议，无需开户人身份证
                </div>
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-2 control-label">默认银行账号</label>
            <div class="col-sm-10 col-lg-8">
                <input type="checkbox"  id="bankDefault" class="form-control" data-id="bankDefault" value="false" style="width:15px;height:15px;">
                <input id="bankSuspendPayment" class="form-control hide" data-id="bankSuspendPayment" value="false">
            </div>
        </div>
        <div class="bankAccountBizTypes hide">
            <div class="form-group " id="bizTypes">
                <label class="col-sm-2 control-label required">业务类型</label>
            <#if bizTypes?has_content>
                <#list  bizTypes as bizType >
                    <label class="checkbox-inline">
                        <input type="checkbox"  id="${bizType.value}" class="form-control" data-id="biztypes" value="false" style="width:15px;height:15px;">
                    ${bizType.text}</label>
                </#list>
            </#if>
            </div>
        </div>
        <div class="form-group">
            <label for="tradinglicense" class="col-sm-2 control-label">附件</label>
            <div class="col-sm-10">
                <div class="picture">
                    <div id="bankaccount-picture-container">
                        <div class="file-upload-btn">
                            <button type="button" class="btn btn-default fileinput-button">选择上传文件</button>
                            <input id="f" type="file" name="files[]" multiple="">
                        </div>
                        <ul id="images-list" class="images-list"/>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myBankModal" data-modal="myBankModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span id="close" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel panel-info">
                            <div class="row table-info">
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row contentBar" data-id="loading">
                                <div id="block_1" class="barlittle"></div>
                                <div id="block_2" class="barlittle"></div>
                                <div id="block_3" class="barlittle"></div>
                                <div id="block_4" class="barlittle"></div>
                                <div id="block_5" class="barlittle"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <div class="btn-group button-group">
                                            <span  class="btn btn-default" data-id="first-page">首页</span>
                                            <span  class="btn btn-default" data-id="pre-page">上一页</span>
                                            <span  class="btn btn-default" data-id="next-page">下一页</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myProvinceModal" data-modal="myProvinceModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span id="close" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel panel-info">
                            <div class="row table-info">
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row contentBar" data-id="loading">
                                <div id="block_1" class="barlittle"></div>
                                <div id="block_2" class="barlittle"></div>
                                <div id="block_3" class="barlittle"></div>
                                <div id="block_4" class="barlittle"></div>
                                <div id="block_5" class="barlittle"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <div class="btn-group button-group">
                                            <span  class="btn btn-default" data-id="first-page">首页</span>
                                            <span  class="btn btn-default" data-id="pre-page">上一页</span>
                                            <span  class="btn btn-default" data-id="next-page">下一页</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myCityModal" data-modal="myCityModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span id="close" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel panel-info">
                            <div class="row table-info">
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row contentBar" data-id="loading">
                                <div id="block_1" class="barlittle"></div>
                                <div id="block_2" class="barlittle"></div>
                                <div id="block_3" class="barlittle"></div>
                                <div id="block_4" class="barlittle"></div>
                                <div id="block_5" class="barlittle"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <div class="btn-group button-group">
                                            <span  class="btn btn-default" data-id="first-page">首页</span>
                                            <span  class="btn btn-default" data-id="pre-page">上一页</span>
                                            <span  class="btn btn-default" data-id="next-page">下一页</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myBranchModal" data-modal="myBranchModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span id="close" aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel panel-info">
                            <div class="row table-info">
                                <div class="col-md-12">
                                    <table class="table table-striped">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row contentBar" data-id="loading">
                                <div id="block_1" class="barlittle"></div>
                                <div id="block_2" class="barlittle"></div>
                                <div id="block_3" class="barlittle"></div>
                                <div id="block_4" class="barlittle"></div>
                                <div id="block_5" class="barlittle"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-right">
                                        <div class="btn-group button-group">
                                            <span  class="btn btn-default" data-id="first-page">首页</span>
                                            <span  class="btn btn-default" data-id="pre-page">上一页</span>
                                            <span  class="btn btn-default" data-id="next-page">下一页</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
</script>
<script type="text/template" data-id="invoicetitle-item-tpl">
    <li>
        <button type="button" class="close del-btn">X</button>
        <legend style="font-size:10px;font-weight:bold;color:#8FBFEF">发票抬头</legend>
        <div class="form-group">
            <label for="invoiceName" class="col-sm-2 control-label required">抬头</label>
            <div class="col-sm-10 col-lg-8">
                <input type="text" class="form-control" id="invoiceName" data-id="invoiceName">
            </div>
        </div>
        <div class="form-group">
            <label for="invoiceType" class="col-sm-2 control-label required">发票类型</label>
            <div class="col-sm-10 col-lg-8">
                <select identification="发票类型" id="invoiceType" class="form-control" data-id="invoiceType">
                    <option value="1">增值税普通发票</option>
                    <option value="2">增值税专用发票</option>
                </select>
            </div>
        </div>
        <div class="invoicetitle-special hide">
            <div class="form-group">
                <label for="invoiceSpecialTaxPayerNum" class="col-sm-2 control-label required">纳税人识别号</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" id="invoiceSpecialTaxPayerNum" data-id="taxPayerNum">
                </div>
            </div>
            <div class="form-group">
                <label for="invoiceSpecialAddress" class="col-sm-2 control-label required">地址</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" id="invoiceSpecialAddress" data-id="address">
                </div>
            </div>
            <div class="form-group">
                <label for="invoiceSpecialPhone" class="col-sm-2 control-label required">电话</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" id="invoiceSpecialPhone" data-id="phone">
                </div>
            </div>
            <div class="form-group">
                <label for="invoiceSpecialBankName" class="col-sm-2 control-label required">开户行</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" id="invoiceSpecialBankName" data-id="bankName">
                </div>
            </div>
            <div class="form-group">
                <label for="invoiceSpecialBankAccountNum" class="col-sm-2 control-label required">账号</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" id="invoiceSpecialBankAccountNum" data-id="bankAccountNum">
                </div>
            </div>
        </div>
    </li>
</script>
<script id="thead-template" type="text/template">
    <tr>
        <% subTitles.forEach(function (item) { %>
        <th style="text-align: center;"><%= item %></th>
        <% }) %>
    </tr>
</script>

<script id="tbody-template" type="text/template">
    <tr>
        <td style="text-align: center;">
            <%= name %>
        </td>
        <td style="text-align: center;">
            <span class="btn btn-primary choose-btn" data-searchName="<%= name %>">选择</span>
        </td>
    </tr>
</script>

<script id="tbody-bank-template" type="text/template">
    <tr>
        <td style="text-align: center;">
            <%= bankName %>
        </td>
        <td style="text-align: center;">
            <span class="btn btn-primary choose-btn" data-searchName="<%= bankName %>">选择</span>
        </td>
    </tr>
</script>

<script id="tbody-branch-template" type="text/template">
    <tr>
        <td style="text-align: center;">
            <%= branchName %>
        </td>
        <td style="text-align: center;">
            <span class="btn btn-primary choose-btn" data-searchName="<%= branchName %>" data-bankId="<%= bankId %>">选择</span>
        </td>
    </tr>
</script>

<link rel="stylesheet" href="/static/css/selectize.bootstrap3.css">
<!--[if IE 8]><script src="/static/js/es5.js"></script><![endif]-->
<script src="/static/js/selectize.min.js"></script>
<script src="/static/js/searchBox.js"></script>
<script src="/static/js/bank.js"></script>
<script src="/static/js/jquery.mask.min.js"></script>
<script src="/static/js/spider.js"></script>
</body>
</html>