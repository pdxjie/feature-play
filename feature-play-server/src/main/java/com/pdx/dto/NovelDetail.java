package com.pdx.dto;

import com.pdx.toBean.NovelChapter;
import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/02 2023/4/2
 * @Description:
 */
@Data
public class NovelDetail {

    private String imgUrl;

    private String novelName;

    private String  author;

    private String desc;

    private String title;
}
