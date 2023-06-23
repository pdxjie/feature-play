package com.pdx.controller;

import com.pdx.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/31 2023/3/31
 * @Description:
 */
@RestController
@RequestMapping("/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/recommend")
    public Map<String,Object> recommendMenu(){
        return menuService.recommendMenu();
    }

    @GetMapping("/detail")
    public Map<String,Object> menuDetail(@PathParam("href")String href){
        return menuService.menuDetail(href);
    }

    @GetMapping("/search")
    public Map<String,Object> goSearch(@PathParam("keywords")String keywords){
        return menuService.goSearch(keywords);
    }


}
