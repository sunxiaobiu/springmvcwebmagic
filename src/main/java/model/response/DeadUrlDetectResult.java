package model.response;

import java.util.List;

/**
 * Created by sun on 2019/9/22.
 */
public class DeadUrlDetectResult {

    /**
     * 初始url
     */
    private String originUrl;

    /**
     * 无法访问的链接
     */
    private List<String> deadUrlList;

    public String getOriginUrl() {
        return originUrl;
    }

    public void setOriginUrl(String originUrl) {
        this.originUrl = originUrl;
    }

    public List<String> getDeadUrlList() {
        return deadUrlList;
    }

    public void setDeadUrlList(List<String> deadUrlList) {
        this.deadUrlList = deadUrlList;
    }
}
