package processor; /**
 * Alipay.com Inc.
 * Copyright (c) 2004-2019 All Rights Reserved.
 */

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.utils.HttpConstant;

/**
 * process the page, extract urls to fetch, extract the data and store
 * @author sunxiaobiu
 * @version $Id: MyPageProcessor.java, v 0.1 2019��08��19�� 3:06 PM sunxiaobiu Exp $
 */
public class SinaPageProcessor implements PageProcessor {
    public static final String URL_LIST = "http://blog\\.sina\\.com\\.cn/s/articlelist_1487828712_0_\\d+\\.html";

    public static final String URL_POST = "http://blog\\.sina\\.com\\.cn/s/blog_\\w+\\.html";

    private String siteDomain;

    private Site site = Site
            .me()
            .setDomain(siteDomain)
            .setSleepTime(3000)
            .setUserAgent(
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.65 Safari/537.31");

    @Override
    public void process(Page page) {
        //列表页
        if (page.getUrl().regex(URL_LIST).match()) {
            //从页面发现后续的url地址来抓取
            page.addTargetRequests(page.getHtml().links().all());
            //文章页
        } else {
            //如果是死链接，则记录下来
            if(!aliveUrl(page.getStatusCode())){
                page.putField("title", page.getHtml().xpath("//div[@class='articalTitle']/h2"));
                page.putField("content", page.getHtml().xpath("//div[@id='articlebody']//div[@class='articalContent']"));
                page.putField("date",
                        page.getHtml().xpath("//div[@id='articlebody']//span[@class='time SG_txtc']").regex("\\((.*)\\)"));
            }
        }
    }

    @Override
    public Site getSite() {
        return site;
    }

//    public static void main(String[] args) throws Exception{
//        Spider sinaSpider = Spider.create(new MyPageProcessor());
//        sinaSpider.addUrl("http://blog.sina.com.cn/s/articlelist_1487828712_0_1.html")
//                .addPipeline(new JsonFilePipeline("/Users/sunxiaobiu/Desktop/myWebMagic_output/"))
//                .thread(5)
//                .run();
//
//        SpiderMonitor.instance().register(sinaSpider);
//        sinaSpider.start();
//    }

    private boolean aliveUrl(int statusCode){
        return statusCode == HttpConstant.StatusCode.CODE_200;
    }

    public String getSiteDomain() {
        return siteDomain;
    }

    public void setSiteDomain(String siteDomain) {
        this.siteDomain = siteDomain;
    }
}