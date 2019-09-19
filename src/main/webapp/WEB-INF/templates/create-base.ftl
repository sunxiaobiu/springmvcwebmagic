
<div class="panel panel-primary">
    <div class="panel-heading">基本信息</div>
    <div class="panel-body">
        <div class="form-group">
            <div class="col-sm-1"></div>
            <div class="col-sm-11">
                <h5 style="color: orange">
                    企业资质证照信息会在点评主站公示(以下简称“网上亮照”)给消费者查看，请严格按照纸质信息认真填写。
                </h5>
                <a href="http://a.dper.com/faq/detail?id=195" target="_blank">点击查看帮助>></a>
            </div>
        </div>

        <div class="form-group" id='requireBusLicenseRadio'>
            <label for="requireBusLicenseLabel" class="col-sm-2 control-label required">能否提供营业执照</label>
            <label class="checkbox-inline">
                <input name="requireBusLicenseRadio" type="radio" id="requireBusLicRadio1"
                       value="1" checked> 能
            </label>
            <label class="checkbox-inline">
                <input name="requireBusLicenseRadio" type="radio" id="notRequireBusLicRadio2"
                       value="2"> 否
            </label>
        </div>

        <div class="require-business-license">
            <div class="form-group">
                <label for="" class="col-sm-2 control-label required">证件类型</label>
                <div class="col-sm-3">
                    <select identification="证件类型" id="busLicenseType" class="form-control" data-id="busLicenseType">
                        <option value="1">企业法人营业执照</option>
                        <option value="2">个体工商户营业执照</option>
                        <option value="3">民办非企业单位登记证书</option>
                        <option value="4">事业单位法人证书</option>
                        <option value="5">社会团体法人登记证书</option>
                        <option value="6">军队单位对外有偿服务许可证</option>
                        <option value="7">武警边防部队对外有偿服务许可证</option>
                        <option value="8">香港企业资质</option>
                        <option value="9">澳门企业资质</option>
                        <option value="10">海外企业资质</option>
                    </select>
                </div>
                <div class="col-sm-2"><a href="http://wiki.sankuai.com/pages/viewpage.action?pageId=575624104" target="_blank">查看示例</a></div>
            </div>

            <div class="form-group">
                <label for="companyNameLabel" class="col-sm-2 control-label required hasCompanyName">企业名称</label>
                <div class="col-sm-3 hasCompanyName">
                    <input type="text" class="form-control " id="companyName" placeholder="公司/机构名称、或字号名称"
                           data-id="companyName">
                </div>
                <a href="javascript:void(0)" class="col-sm-1 hasCompanyName noCompanyNameTips" data-id="no-companyName" style="padding-right: 1px;width: 109px">没有企业名称?</a>
                <label for="legalCustomerNameLabel" class="col-sm-2 control-label required noCompanyName" style=" display: none">客户名称</label>
                <div class="col-sm-3 noCompanyName" style=" display: none">
                    <input type="text" class="form-control"  readonly id="legal-customerName" placeholder="法人姓名-证件号码(自动生成)"
                           data-id="legal-customerName">
                </div>
                <a href="javascript:void(0)" class="col-sm-1 noCompanyName hasCompanyNameTips" style="display: none;width: 109px" data-id="has-companyName">有企业名称?</a>
                <label  class="col-sm-1 companyName_tip" style="display: none ;width: 109px;"></label>
                <label for="legalPersonLabel" class="col-sm-2 control-label required">法人代表</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="legalPerson" placeholder="法人/经营者姓名"
                           data-id="legalPerson">
                </div>
            </div>

            <div class="form-group">
                <label for="companyIDCardLabel" class="col-sm-2 control-label required">证件号码</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="companyIDCard" placeholder="注册码/统一社会信用码"
                           data-id="companyIDCard">
                </div>
                <label class="col-sm-1" style="width: 109px"></label>
                <label for="busLicExpiryDateLabel" class="col-sm-2 control-label required">有效期</label>
                <label class="checkbox-inline">
                    <input name="busLicExpiryDateRadio" type="radio" id="busLicExpiryDateRadio1" value="1" checked> 永久有效
                </label>
                <label class="checkbox-inline">
                    <input name="busLicExpiryDateRadio" type="radio" id="busLicExpiryDateRadio2" value="2"> 指定日期
                </label>

                <div class="col-sm-2" style="float: right;margin-right: 40px;">
                    <div class="input-group hide" id="busLicExpiryDateDiv">
                        <input type="text" class="form-control busLicExpiryDatePicker" id="busLicExpiryDate" name="busLicExpiryDate"
                               value="" readonly/>
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-th"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group" id="busLicense-pic">
                <label for="" class="col-sm-2 control-label required">营业执照</label>
                <div class="col-sm-3">
                    <div class="picture">
                        <div id="busLicense-picture-container">
                            <div class="file-upload-btn">
                                <button id="busLicense-picture-btn" type="button" class="btn btn-default fileinput-button">选择图片</button>
                                <input class="busLicense-picture-f" id="f" type="file" name="files[]" multiple="">
                            </div>
                            <ul id="images-list" class="images-list drag-file">
                                <span class="inline-block busLicense-pic-note">请上传营业执照</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>

        <div class="not-require-business-license hide">
            <div class="form-group">
                <label for="" class="col-sm-2 control-label required">证件类型</label>
                <div class="col-sm-3">
                    <select identification="证件类型" id="perLicenseType" class="form-control" data-id="perLicenseType">
                        <option value="1">身份证</option>
                        <option value="2">护照</option>
                        <#--<option value="3">驾驶证</option>-->
                        <option value="4">港澳居民来往内地通行证</option>
                        <option value="5">台湾居民来往内地通行证</option>
                        <option value="6">士兵证/军官证/武警警官证</option>
                    </select>
                </div>
                <div class="col-sm-2"><a href="http://wiki.sankuai.com/pages/viewpage.action?pageId=575624104" target="_blank">查看示例</a></div>
            </div>

            <div class="form-group">
                <label for="operatorNameLabel" class="col-sm-2 control-label required">姓名</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="operatorName" placeholder="请填写证件上的姓名"
                           data-id="operatorName">
                </div>
                <label for="operatorIDCardLabel" class="col-sm-2 control-label required">证件号码</label>
                <div class="col-sm-3">
                    <input type="text" class="form-control" id="operatorIDCard" placeholder="请填写证件上的号码"
                           data-id="operatorIDCard">
                </div>
            </div>

            <div class="form-group">
                <label for="customerNameLabel" class="col-sm-2 control-label required">客户名称</label>
                <div class="col-sm-3">
                    <input readonly type="text" class="form-control" id="customerName" placeholder="证件名称-证件号码(自动生成)"
                           data-id="customerName">
                </div>
                <label for="notBusLicExpiryDateLabel" class="col-sm-2 control-label required">有效期</label>
                <label class="checkbox-inline">
                    <input name="notBusLicExpiryDateRadio" type="radio" id="" value="1" checked> 永久有效
                </label>
                <label class="checkbox-inline">
                    <input name="notBusLicExpiryDateRadio" type="radio" id="" value="2"> 指定日期
                </label>

                <div class="col-sm-2" style="float: right;margin-right: 40px;">
                    <div class="input-group hide" id="notBusLicExpiryDateDiv">
                        <input type="text" class="form-control notBusLicExpiryDatePicker" id="notBusLicExpiryDate" name="notBusLicExpiryDate"
                               value="" readonly/>
                        <div class="input-group-addon">
                            <i class="glyphicon glyphicon-th"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group" id="id-card-pic">
                <label for="" class="col-sm-2 control-label required">身份证明</label>
                <div class="col-sm-3">
                    <div class="picture" id="id-card-pic-front">
                        <div id="id-card-pic-front-container">
                            <div class="file-upload-btn">
                                <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                <input class="id-card-pic-front-f" id="f" type="file" name="files[]" multiple="">
                            </div>
                            <ul id="images-list" class="images-list drag-file">
                                <span class="inline-block id-card-pic-front-pic-note">身份证明正面</span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-3">
                    <div class="picture" id="id-card-pic-reverse">
                        <div id="id-card-pic-reverse-container">
                            <div class="file-upload-btn">
                                <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                <input class="id-card-pic-reverse-f" id="f" type="file" name="files[]" multiple="">
                            </div>
                            <ul id="images-list" class="images-list drag-file">
                                <span class="inline-block id-card-pic-reverse-pic-note">身份证明反面</span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group hide" id="other-id-card">
                <label for="otherIDCardPicLabel" class="col-sm-2 control-label required">身份证明</label>
                <div class="col-sm-3">
                    <div class="picture">
                        <div id="other-id-card-pic-container">
                            <div class="file-upload-btn">
                                <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                <input class="other-id-card-pic-f" id="f" type="file" name="files[]" multiple="">
                            </div>
                              <ul id="images-list" class="images-list drag-file">
                                <span class="inline-block other-id-card-pic-note" data-id="other-id-card-span"></span>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <hr/>

            <div id="cant-seal">
                <div class="form-group">
                    <label for="merchantSignatoryNameLabel" class="col-sm-2 control-label required">商户承诺函签字人</label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control" id="merchantSignatoryName" placeholder="请填写签字人姓名"
                               data-id="merchantSignatoryName">
                    </div>
                    <div class="col-sm-2"><a href="http://wiki.sankuai.com/pages/viewpage.action?pageId=575624104" target="_blank">查看示例</a></div>

                    <label for="busLicBackDateLabel" class="col-sm-2 control-label required" style="margin-left: -70px;width: 200px;">营业执照预计补回日期</label>
                    <div class="col-sm-3">
                        <div class="input-group" id="busLicBackDateDiv">
                            <input type="text" class="form-control busLicBackDatePicker" id="busLicBackDate" name="busLicBackDate"
                                   value="" readonly/>
                            <div class="input-group-addon">
                                <i class="glyphicon glyphicon-th"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label"></label>
                    <div class="col-sm-5"><h5>无法提供营业执照，请提供以下材料</h5></div>
                </div>

                <div class="form-group">
                    <label for="" class="col-sm-2 control-label"></label>
                    <div class="col-sm-3">
                        <div class="picture">
                            <div id="merchant-signatory-pic-container1">
                                <div class="file-upload-btn">
                                    <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                    <input class="merchant-signatory-pic-f1" id="f" type="file" name="files[]" multiple="">
                                </div>
                                <ul id="images-list" class="images-list drag-file">
                                        <span class="inline-block merchant-signatory-pic-note">请上传手持身份证明。请确保姓名、号码清晰</span>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-3">
                        <div class="picture">
                            <div id="merchant-signatory-pic-container2">
                                <div class="file-upload-btn">
                                    <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                    <input class="merchant-signatory-pic-f2" id="f" type="file" name="files[]" multiple="">
                                </div>
                                <ul id="images-list" class="images-list drag-file">
                                     <span class="inline-block merchant-signatory-pic-note">请上传<a href="http://gsxt.saic.gov.cn/" target="_blank">工商局网站</a>截图证明</span>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <div class="picture">
                            <div id="merchant-signatory-pic-container3">
                                <div class="file-upload-btn">
                                    <button type="button" class="btn btn-default fileinput-button">选择图片</button>
                                    <input class="merchant-signatory-pic-f3" id="f" type="file" name="files[]" multiple="">
                                </div>
                                <ul id="images-list" class="images-list drag-file">
                                    <span class="inline-block merchant-signatory-pic-note">请上传《商户承诺函》证明</span>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>