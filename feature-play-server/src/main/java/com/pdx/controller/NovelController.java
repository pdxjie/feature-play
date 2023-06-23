package com.pdx.controller;

import com.pdx.service.SayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/29 2023/3/29
 * @Description:
 */
@RestController
@RequestMapping("/novel")
public class NovelController {

    @Autowired
    private SayService novelService;


    @GetMapping("/recommend")
    public Map<String,Object> recommendNovel(){
        return novelService.recommendNovel();
    }

    @GetMapping("/detail")
    public Map<String,Object> novelDetail(@PathParam("href")String href){
        return novelService.novelDetail(href);
    }

    @GetMapping("/chapters")
    public Map<String,Object> novelChapters(@RequestParam(value = "startIndex",defaultValue = "0")Integer startIndex
                                            ,@RequestParam(value = "endIndex",defaultValue = "20")Integer endIndex
                                            ,@RequestParam(value = "href")String href){
        return novelService.novelChapters(startIndex,endIndex,href);
    }

    @GetMapping("/content")
    public Map<String,Object> novelContent(@PathParam("href")String href){
        return novelService.novelContent(href);
    }


}
