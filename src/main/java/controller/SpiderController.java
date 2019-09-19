/**
 * Alipay.com Inc.
 * Copyright (c) 2004-2019 All Rights Reserved.
 */
package controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * 爬虫Controller
 * @author sunxiaobiu
 * @version $Id: SpiderController.java, v 0.1 2019年09月02日 11:52 AM sunxiaobiu Exp $
 */
@Controller
@RequestMapping("/spider")
public class SpiderController {

    @RequestMapping(value = "/start", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView hello(HttpServletRequest request, Model model) {
        model.addAttribute("blogType", "blogType");
        return new ModelAndView("spider");
    }
}