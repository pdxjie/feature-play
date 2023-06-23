package com.pdx.dto;

import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/03 2023/4/3
 * @Description:
 */
@Data
public class SickSearchBean {

    private String href;

    private String title;

    private String desc;

    private String label;

    private List<String> list;
}
