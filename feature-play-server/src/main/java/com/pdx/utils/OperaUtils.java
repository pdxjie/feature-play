package com.pdx.utils;

import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
public class OperaUtils {

    /**
     * 处理字符串
     * @param str
     * @return
     */
    public static Double dealNum(String str){
        String val = str.substring(str.length() - 2, str.length()-1);
        if ("一".equals(val) || "二".equals(val) || "三".equals(val) || "四".equals(val) || "五".equals(val) || "六".equals(val) || "七".equals(val)){
            return switchNum(val);
        }else {

        }
        String regEx = "[^0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(str);
        String result = m.replaceAll("").trim();
        if (result.charAt(0) == '0'){
            result = result.substring(1, result.length());
        }
        return Double.valueOf(result);
    }

    /**
     * 转换数字
     * @param val
     * @return
     */
    private static Double switchNum(String val){
        Double result = 0.0;
        switch (val){
            case "一":
                result =  1.0;
                break;
            case "二":
                result = 2.0;
                break;
            case "三":
                result = 3.0;
                break;
            case "四":
                result = 4.0;
                break;
            case "五":
                result = 5.0;
                break;
            case "六":
                result = 6.0;
                break;
            case "七":
                result = 7.0;
                break;
        }
        return result;
    }

    public static Double dayForCurrentMonth(){
        //获取当前时间
        Calendar cal = Calendar.getInstance();
        //下面可以设置月份，注：月份设置要减1，所以设置1月就是1-1，设置2月就是2-1，如此类推
        cal.set(Calendar.MONTH, 1-1);
        //调到上个月
        cal.add(Calendar.MONTH, -1);
        //得到一个月最最后一天日期(31/30/29/28)
        int MaxDay=cal.getActualMaximum(Calendar.DAY_OF_MONTH);
        return Double.valueOf(MaxDay);
    }
}
