package com.pdx.controller;

import com.pdx.service.SickService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/04/02 2023/4/2
 * @Description:
 */
@RestController
@RequestMapping("/sick")
public class SickController {

    @Autowired
    private SickService sickService;


    @GetMapping("/new/ask")
    public Map<String,Object> newAsk(){
        return sickService.newAsk();
    }

    @GetMapping("/detail")
    public Map<String,Object> sickDetail(@PathParam("href")String href){
        return sickService.sickDetail(href);
    }

    @GetMapping("/search")
    public Map<String,Object> searchSick(@PathParam("keywords")String keywords){
        return sickService.searchSick(keywords);
    }
}
