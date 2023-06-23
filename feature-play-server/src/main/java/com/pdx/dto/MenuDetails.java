package com.pdx.dto;

import com.pdx.toBean.MixtureInfo;
import com.pdx.toBean.Steps;
import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/01 2023/4/1
 * @Description:
 */
@Data
public class MenuDetails {

    private String title;

    private String imgUrl;

    private List<MixtureInfo> mixtureInfos;

    private List<Steps> steps;
}
