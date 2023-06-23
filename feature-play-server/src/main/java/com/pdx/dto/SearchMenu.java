package com.pdx.dto;

import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/01 2023/4/1
 * @Description:
 */
@Data
public class SearchMenu {

    private String title;

    private String score;

    private String img;

    private String href;

    private List<String> tags;
}
