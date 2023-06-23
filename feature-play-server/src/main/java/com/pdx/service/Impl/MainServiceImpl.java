package com.pdx.service.Impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.json.JSONUtil;
import com.pdx.dto.Content;
import com.pdx.dto.ContentDto;
import com.pdx.dto.CountDownDto;
import com.pdx.service.MainService;
import com.pdx.toBean.CountDown;
import com.pdx.utils.OperaUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import java.util.*;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
@Service
public class MainServiceImpl implements MainService {

    @Resource
    private RestTemplate restTemplate;

    @Override
    public Map<String, Object> countDown() {
        Calendar calendar = Calendar.getInstance();
        // 获取当前年
        int year = calendar.get(Calendar.YEAR);
        // 获取当前月
        Double month = (double)(calendar.get(Calendar.MONTH) + 1);
        // 获取当前日
        //int day = calendar.get(Calendar.DATE);
        // 获取当前小时
        Double time = (double)(calendar.get(Calendar.HOUR_OF_DAY));
        // 获取当前是本周第几天
        Double week = (double)(calendar.get(Calendar.DAY_OF_WEEK) - 1) == 0 ? 7.0 : (double)(calendar.get(Calendar.DAY_OF_WEEK) - 1);
        // 获取当前是本月第几天
        Double day = (double)(calendar.get(Calendar.DAY_OF_MONTH));
        //String url = "https://v.api.aa1.cn/api/rsdjs/";
        //String result = restTemplate.getForObject(url, String.class);
        CountDown countDown = new CountDown();
        countDown.setDay((day+"").substring(0,(day+"").length()-2));
        countDown.setMonth((month+"").substring(0,(month+"").length()-2));
        countDown.setTime((time+"").substring(0,(time+"").length()-2));
        countDown.setWeek((week+"").substring(0,(week+"").length()-2));
        Double baseMonth = 12.0;
        Double baseWeek = 7.0;
        Double baseTime = 24.0;
        //Double month = OperaUtils.dealNum(countDown.getMonth());
        Double monthScale = (month / baseMonth) * 100;
        //Double week = OperaUtils.dealNum(countDown.getWeek());
        Double weekScale = (week / baseWeek) * 100;
        //Double day = OperaUtils.dealNum(countDown.getDay());
        Double baseDay = OperaUtils.dayForCurrentMonth();
        Double dayScale = (day / baseDay) * 100;
        //Double time = OperaUtils.dealNum(countDown.getTime());
        Double timeScale = (time / baseTime) * 100;
        CountDownDto countDownDto = new CountDownDto();
        BeanUtil.copyProperties(countDown,countDownDto);
        countDownDto.setDayScale(dayScale);
        countDownDto.setMonthScale(monthScale);
        countDownDto.setTimeScale(timeScale);
        countDownDto.setWeekScale(weekScale);
        Map<String,Object> res = new HashMap<>();
        res.put("countDown",countDownDto);
        return res;
    }

}
