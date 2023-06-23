package com.pdx.service;

import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
public interface ChatService {

    Map<String, Object> chatAi(String msg, String type);

    Map<String, Object> chatWithAi(String question);
}
