package com.pdx.service.Impl;

import cn.hutool.json.JSONUtil;
import com.pdx.dto.ChatBody;
import com.pdx.service.ChatService;
import com.pdx.toBean.Message;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
@Service
public class ChatServiceImpl implements ChatService {

    @Resource
    private RestTemplate restTemplate;

    @Override
    public Map<String, Object> chatAi(String msg, String type) {
        Map<String,Object> res = new HashMap<>();
        String url = "";
        String result = "";
        //小爱同学
        if ("1".equals(type)){
            url = "https://v.api.aa1.cn/api/api-xiaoai/talk.php?msg="+msg;
            result = restTemplate.getForObject(url, String.class);
            res.put("message",result);
        }else if ("2".equals(type)){
            //http://api.goodsc.vip/jk/api/Chatai.php?key=官方秘钥&wt=问题
            url = "http://api.goodsc.vip/jk/api/Chatai.php?key=【key】="+msg;
            result = restTemplate.getForObject(url, String.class);
            Message message = JSONUtil.toBean(result, Message.class);
            res.put("message",message.getMsg());
        }
        return res;
    }

    @Override
    public Map<String, Object> chatWithAi(String question) {
        String encodeUrl = URLEncoder.encode(question);
        Map<String,Object> resultMap = new HashMap<>();
        String url = "https://hub.onmicrosoft.cn/chat?q="+encodeUrl;
        String result = restTemplate.getForObject(url, String.class);
        ChatBody chatBody = JSONUtil.toBean(result, ChatBody.class);
        resultMap.put("result",chatBody);
        return resultMap;
    }
}
