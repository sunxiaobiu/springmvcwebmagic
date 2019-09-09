/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2019 All Rights Reserved.
 */
package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 爬虫Controller
 * @author sunxiaobiu
 * @version $Id: SpiderController.java, v 0.1 2019年09月02日 11:52 AM sunxiaobiu Exp $
 */
@Controller
public class SpiderController {

    @RequestMapping(value = "/hello")
    @ResponseBody
    public String hello(Model model) {
        model.addAttribute("blogType", "blogType");
        return "hhhh";
    }
}