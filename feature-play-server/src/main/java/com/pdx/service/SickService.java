package com.pdx.service;

import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/04/02 2023/4/2
 * @Description:
 */
public interface SickService {
    Map<String, Object> newAsk();

    Map<String, Object> sickDetail(String href);

    Map<String, Object> searchSick(String keywords);
}
