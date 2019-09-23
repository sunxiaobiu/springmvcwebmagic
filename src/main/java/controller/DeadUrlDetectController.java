package controller;

import exception.SpiderException;
import model.ServiceResult;
import model.request.DeadUrlDetectRequest;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import processor.DeadUrlDetectPageProcessor;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.monitor.SpiderMonitor;
import us.codecraft.webmagic.pipeline.ConsolePipeline;
import us.codecraft.webmagic.pipeline.JsonFilePipeline;
import webmagicdownloader.HttpClientDownloader;

import javax.management.InstanceAlreadyExistsException;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;

/**
 * Created by sun on 2019/9/22.
 *
 */
@Controller
@RequestMapping("/deadUrlDetect")
public class DeadUrlDetectController {

    private static final Logger log = LoggerFactory.getLogger(DeadUrlDetectController.class);

    @RequestMapping(value = "/start", method = RequestMethod.GET)
    public String spiderWebSite(HttpServletRequest request,  Model model) {
        return "spider";
    }

    @RequestMapping(value = "/checkUrlAlive", method = RequestMethod.POST)
    @ResponseBody
    public ServiceResult checkUrlAlive(HttpServletRequest request,
                                       @RequestBody DeadUrlDetectRequest deadUrlDetectRequest) throws ParseException {
        ServiceResult serviceResult = new ServiceResult();

        try {
            //入参合理性校验
            deadUrlDetectValidation(deadUrlDetectRequest);

            DeadUrlDetectPageProcessor deadUrlDetectPageProcessor = new DeadUrlDetectPageProcessor(deadUrlDetectRequest.getDomain());

            Spider spider = Spider.create(deadUrlDetectPageProcessor);
            spider.setDownloader(new HttpClientDownloader())
                    .addUrl(deadUrlDetectRequest.getOriginUrl())
                    .addPipeline(new JsonFilePipeline("/Users/sun/Desktop/myWebMagic_output/"))
                    .addPipeline(new ConsolePipeline())
                    .thread(5)
                    .run();

            SpiderMonitor.instance().register(spider);
            spider.start();
        } catch (SpiderException spiderException)
        {
            log.error("Dead url throw SpiderException, please contact author: Xiaoyu.Sun@monash.edu", spiderException);
            serviceResult.setCode(ServiceResult.INPUT_ERROR);
            serviceResult.setMsg(spiderException.getMessage());
            return serviceResult;

        }catch (InstanceAlreadyExistsException instanceAlreadyExistsException){
            log.error("This domain's spider already exists. Please enter another domain.", instanceAlreadyExistsException);
            serviceResult.setCode(ServiceResult.INTERNAL_ERROR);
            serviceResult.setMsg("This domain's spider already exists. Please enter another domain.");
            return serviceResult;
        } catch (Exception e){
            log.error("Dead url detect error, please contact author: Xiaoyu.Sun@monash.edu", e);
            serviceResult.setCode(ServiceResult.INTERNAL_ERROR);
            serviceResult.setMsg("Unlucky,system error! Please contact author: Xiaoyu.Sun@monash.edu");
            return serviceResult;
        }
        serviceResult.setCode(ServiceResult.SUCCESS);
        serviceResult.setMsg("success");
        return serviceResult;
    }

    private void deadUrlDetectValidation(DeadUrlDetectRequest request){
        if(null == request){
            throw new SpiderException("request can not be null");
        }

        String originUrl = request.getOriginUrl();
        if(StringUtils.isBlank(originUrl)){
            throw new SpiderException("Url can not be null");
        }

        String domain = request.getDomain();
        if(StringUtils.isBlank(domain)){
            throw new SpiderException("domain can not be null");
        }

    }
}
