package com.pdx.service.Impl;

import com.pdx.dto.AskBeanDto;
import com.pdx.dto.SickDetail;
import com.pdx.dto.SickSearchBean;
import com.pdx.service.SickService;
import com.pdx.utils.ParserHtmlUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author: 派大星
 * @Date: 2023/04/02 2023/4/2
 * @Description:
 */
@Service
public class SickServiceImpl implements SickService {

    @Resource
    private ParserHtmlUtils parserHtmlUtils;

    @Override
    public Map<String, Object> newAsk() {
        return parserHtmlUtils.newAsk();
    }

    @Override
    public Map<String, Object> sickDetail(String href) {
        SickDetail sickDetail = parserHtmlUtils.sickDetail(href);
        Map<String,Object> result = new HashMap<>();
        result.put("sickDetail",sickDetail);
        return result;
    }

    @Override
    public Map<String, Object> searchSick(String keywords) {
        List<SickSearchBean> sickSearchBeans = parserHtmlUtils.searchSick(keywords);
        Map<String,Object> result = new HashMap<>();
        result.put("sickSearchBeans",sickSearchBeans);
        return result;
    }


}
