package model.request;

/**
 * Created by sun on 2019/9/22.
 */
public class DeadUrlDetectRequest {

    /**
     * 初始url
     */
    private String originUrl;

    /**
     * 域名
     */
    private String domain;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getOriginUrl() {
        return originUrl;
    }

    public void setOriginUrl(String originUrl) {
        this.originUrl = originUrl;
    }
}
