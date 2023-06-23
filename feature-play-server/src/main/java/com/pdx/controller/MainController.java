package com.pdx.controller;

import com.pdx.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description: 主页接口
 */
@RestController
@CrossOrigin
@RequestMapping("/main")
public class MainController {

    @Autowired
    private MainService mainService;

    @GetMapping("/count/down")
    public Map<String,Object> countDown(){
        return mainService.countDown();
    }

}
