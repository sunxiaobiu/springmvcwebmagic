package processor;

import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.processor.PageProcessor;
import us.codecraft.webmagic.utils.HttpConstant;

/**
 * Created by sun on 2019/9/22.
 * function：extract dead url
 */
public class DeadUrlDetectPageProcessor implements PageProcessor {

    private static final String isDeadUrl = "IS_DEAD_URL";

    private static final String DeadUrl = "DEAD_URL";

    /**
     * 域名
     */
    private String domain;

    @Override
    public void process(Page page) {
        if(aliveUrl(page.getStatusCode())){
            //设置skip之后，这个页面的结果不会被Pipeline处理
            page.setSkip(true);
        }else {
            //如果是死链接，则记录下来,同时返回给用户
            page.putField(isDeadUrl, Boolean.TRUE);
            page.putField(DeadUrl, page.getUrl());
        }
    }

    @Override
    public Site getSite() {
        // 抓取网站的相关配置，包括编码、抓取间隔、重试次数等
        return Site.me().setRetryTimes(3).setSleepTime(1000).setTimeOut(10000).setDomain(domain).setCycleRetryTimes(3);
    } 



    /**
     * 判断url是否可访问
     * @param statusCode
     * @return
     */
    //TODO 2019/9/22 sun 优化
    private boolean aliveUrl(int statusCode){
        return statusCode == HttpConstant.StatusCode.CODE_200;
    }

    public DeadUrlDetectPageProcessor(String domain){
        this.domain = domain;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}
