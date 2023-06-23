package com.pdx.service;

import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/29 2023/3/29
 * @Description:
 */
public interface SayService {

    Map<String, Object> recommendNovel();

    Map<String, Object> novelDetail(String href);

    Map<String, Object> novelChapters(Integer startIndex, Integer endIndex,String href);

    Map<String, Object> novelContent(String href);
}
