package com.pdx.service;

import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/03/31 2023/3/31
 * @Description:
 */
public interface MenuService {
    Map<String, Object> recommendMenu();

    Map<String, Object> menuDetail(String href);

    Map<String, Object> goSearch(String keywords);
}
