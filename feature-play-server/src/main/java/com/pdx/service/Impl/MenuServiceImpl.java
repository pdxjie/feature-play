package com.pdx.service.Impl;

import com.pdx.dto.MenuDetails;
import com.pdx.dto.SearchMenu;
import com.pdx.service.MenuService;
import com.pdx.toBean.MenuBean;
import com.pdx.utils.ParserHtmlUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/31 2023/3/31
 * @Description:
 */
@Service
public class MenuServiceImpl implements MenuService {

    @Resource
    private ParserHtmlUtils parserHtml;

    @Override
    public Map<String, Object> recommendMenu() {
        List<MenuBean> list = parserHtml.parseRising();
        Map<String,Object> result = new HashMap<>();
        result.put("recommends",list);
        return result;
    }

    @Override
    public Map<String, Object> menuDetail(String href) {
        MenuDetails menuDetails = parserHtml.menuDetail(href);
        Map<String, Object> result = new HashMap<>();
        result.put("menuDetails",menuDetails);
        return result;
    }

    @Override
    public Map<String, Object> goSearch(String keywords) {
        List<SearchMenu> searchMenus = parserHtml.goSearch(keywords);
        Map<String, Object> result = new HashMap<>();
        result.put("searchMenus",searchMenus);
        return result;
    }
}
