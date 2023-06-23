package com.pdx.service.Impl;

import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pdx.dto.NovelContent;
import com.pdx.dto.NovelDetail;
import com.pdx.service.SayService;
import com.pdx.toBean.Novel;
import com.pdx.toBean.NovelChapter;
import com.pdx.toBean.NovelRecommendBean;
import com.pdx.utils.ParserHtmlUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @Author: 派大星
 * @Date: 2023/03/29 2023/3/29
 * @Description:
 */
@Service
public class SayServiceImpl implements SayService {

    @Resource
    private ParserHtmlUtils parserHtml;
    @Resource
    private RedisTemplate redisTemplate;

    @Override
    public Map<String, Object> recommendNovel() {
        List<NovelRecommendBean> list = parserHtml.recommendNovel();
        Map<String,Object> result = new HashMap<>();
        result.put("recommendNovels",list);
        return result;
    }

    @Override
    public Map<String, Object> novelDetail(String href) {
        Map<String, Object> stringObjectMap = parserHtml.novelDetail(href);
        return stringObjectMap;
    }

    @Override
    public Map<String, Object> novelChapters(Integer startIndex, Integer endIndex,String href) {
        String chaptersJsonStr = (String) redisTemplate.opsForValue().get("chapters:" + href);
        List<NovelChapter> chapters = JSON.parseArray(chaptersJsonStr, NovelChapter.class);

        List<NovelChapter> novelChapters = chapters.stream().skip((startIndex -1) * endIndex).limit(endIndex).collect(Collectors.toList());
        Map<String,Object> result = new HashMap<>();
        result.put("chapters",novelChapters);
        return result;
    }

    @Override
    public Map<String, Object> novelContent(String href) {
        NovelContent novelContent = parserHtml.novelContent(href);
        Map<String,Object> result = new HashMap<>();
        result.put("novelContent",novelContent);
        return result;
    }
}
