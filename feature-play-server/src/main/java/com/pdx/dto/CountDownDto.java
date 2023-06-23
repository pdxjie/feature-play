package com.pdx.dto;

import lombok.Data;

/**
 * @Author: 派大星
 * @Date: 2023/03/26 2023/3/26
 * @Description:
 */
@Data
public class CountDownDto {

    //月
    private String month;
    //月所占比例
    private Double monthScale;
    //周
    private String week;
    //周所占比例
    private Double weekScale;
    //日
    private String day;
    //日所占比例
    private Double dayScale;
    //时间
    private String time;
    //时间所占比例
    private Double timeScale;
}
