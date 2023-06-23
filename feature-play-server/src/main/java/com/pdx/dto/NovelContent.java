package com.pdx.dto;

import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/08 2023/4/8
 * @Description:
 */
@Data
public class NovelContent {

    private String title;

    private String prevHref;

    private String currentHref;

    private String nextHref;

    private List<String> content;
}
