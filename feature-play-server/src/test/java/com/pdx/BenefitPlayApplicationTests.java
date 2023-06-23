package com.pdx;

import cn.hutool.json.JSONUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.pdx.toBean.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

import java.util.Calendar;
import java.util.List;

@SpringBootTest
class BenefitPlayApplicationTests {

    @Test
    void contextLoads() {
        //RestTemplate restTemplate = new RestTemplate();
        //String url = "https://v.api.aa1.cn/api/rsdjs/";
        //String result = restTemplate.getForObject(url, String.class);
        //CountDown countDown = JSONUtil.toBean(result, CountDown.class);
        //System.out.println(countDown.toString());
        //Double a = 3.0;
        //Double b = 12.0;
        //
        //System.out.println(OperaUtils.dealNum(countDown.getWeek()));

        Calendar calendar = Calendar.getInstance();
        // 获取当前年
        int year = calendar.get(Calendar.YEAR);
        // 获取当前月
        int month = calendar.get(Calendar.MONTH) + 1;
        // 获取当前日
        int day = calendar.get(Calendar.DATE);
        // 获取当前小时
        int hour = calendar.get(Calendar.HOUR_OF_DAY);
        // 获取当前是本周第几天
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        // 获取当前是本月第几天
        int dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);

        System.out.println(year);
        System.out.println(month);
        System.out.println(day);
        System.out.println(hour);
        System.out.println(dayOfWeek);
        System.out.println(dayOfMonth);
    }

    @Test
    void test2(){
        //获取当前时间
        Calendar cal = Calendar.getInstance();
        //下面可以设置月份，注：月份设置要减1，所以设置1月就是1-1，设置2月就是2-1，如此类推
        cal.set(Calendar.MONTH, 1-1);
        //调到上个月
        cal.add(Calendar.MONTH, -1);
        //得到一个月最最后一天日期(31/30/29/28)
        int MaxDay=cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        System.out.println(MaxDay);
    }

    @Test
    void test4(){
        RestTemplate restTemplate = new RestTemplate();
        //String url = "https://v.api.aa1.cn/api/api-xiaoai/talk.php?msg=你叫什么名字";
        String url ="http://api.goodsc.vip/jk/api/Chatai.php?key=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&wt=你叫什么名字";
        String result = restTemplate.getForObject(url, String.class);
        Message message = JSONUtil.toBean(result, Message.class);
        System.out.println(message.getMsg());
    }

    @Test
    void test5(){
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.vore.top/api/Bullshit?subject=%E6%B1%BD%E8%BD%A6";
        String result = restTemplate.getForObject(url, String.class);
        System.out.println(result);
    }


    @Test
    void test8(){
        //https://api.pingcc.cn/fictionContent/search/{chapterId}
        //chapterId=
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://api.pingcc.cn/fictionContent/search/285a3873-7604-3982-a252-7e4b631749e1";
        JSONObject forObject = restTemplate.getForObject(url, JSONObject.class);
        System.out.println(forObject);
        JSONArray jsonArray = forObject.getJSONArray("data");
        for (Object str : jsonArray) {
            System.out.println(str.toString());
        }
        System.out.println("------------------------");
        List<String> list = jsonArray.toJavaList(String.class);
        String join = String.join("", list);
        System.out.println(join);
    }
}
