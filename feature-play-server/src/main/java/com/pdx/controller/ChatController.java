package com.pdx.controller;

import com.pdx.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/ai")
    public Map<String,Object> chatAi(@PathParam("msg")String msg,@PathParam("type")String type){
        return chatService.chatAi(msg,type);
    }

    @GetMapping("/chat")
    public Map<String,Object> chatWithAi(@PathParam("question")String question){
        return chatService.chatWithAi(question);
    }
}
