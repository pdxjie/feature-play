package com.pdx.toBean;

import lombok.Data;

/**
 * @Author: 派大星
 * @Date: 2023/04/16 2023/4/16
 * @Description:
 */
@Data
public class ChatUser {

    private String role = "user";

    private String content;
}
