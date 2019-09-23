<html>
<#--<#include "/WEB-INF/templates/macros.ftl">-->
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
    <#--<#include "/WEB-INF/templates/create-base.ftl">-->
        <div class="panel panel-primary" data-id="contact-container">
            <div class="form-group">
                <label for="originUrl" class="col-sm-2 control-label required">target url</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" placeholder="Please enter regular expression of url" id="originUrl"
                           data-id="originUrl">
                </div>
            </div>
            <div class="form-group">
                <label for="siteDomain" class="col-sm-2 control-label required">site domain of url</label>
                <div class="col-sm-10 col-lg-8">
                    <input type="text" class="form-control" placeholder="Please enter site domain of url" id="siteDomain"
                           data-id="siteDomain">
                </div>
            </div>
            <div class="form-group" style="position:fixed;right:40em;">
                <div >
                    <button type="button" class="btn btn-primary   url-submit">submit</button>
                </div>
            </div>
        </div>

        <#--<div class="license hide">-->
            <#--<div class="form-group">-->
                <#--<label for="spiderResult" class="col-sm-2 control-label required">spider result</label>-->
                <#--<div class="col-sm-10 col-lg-8">-->
                    <#--<input id="spiderResult" class="form-control" data-id="spiderResult"/>-->
                <#--</div>-->
            <#--</div>-->
        <#--</div>-->
</div>

    <link rel="stylesheet" href="/static/css/selectize.bootstrap3.css">
    <script src="/static/js/jquery-1.11.0.min.js"></script>
    <script src="/static/js/jquery.mask.min.js"></script>
    <script src="/static/js/jquery.zoom.js"></script>
    <script src="/static/js/jquery-ui.js"></script>
    <!--[if IE 8]>
    <script src="/static/js/es5.js"></script><![endif]-->
    <script src="/static/js/selectize.min.js"></script>
    <script src="/static/js/searchBox.js"></script>

    <script src="/static/js/picture.js"></script>
    <script src="/static/js/bootstrap-datetimepicker.js"></script>
    <script src="/static/js/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="/static/js/bootstrap-typeahead.js"></script>
    <script src="/static/js/underscore-min.js"></script>
    <script src="/static/js/common.js"></script>
    <script src="/static/js/BlockUI.js"></script>
    <script src="/static/js/alertBox.js"></script>

    <script src="/static/js/spider.js"></script>

</body>
</html>