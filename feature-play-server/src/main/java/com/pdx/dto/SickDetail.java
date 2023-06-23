package com.pdx.dto;

import com.pdx.toBean.SickCell;
import lombok.Data;

import java.util.List;

/**
 * @Author: 派大星
 * @Date: 2023/04/02 2023/4/2
 * @Description:
 */
@Data
public class SickDetail {

    private String src;

    private String desc;

    List<SickCell> cells;
}
