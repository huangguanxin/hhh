package com.eshop.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 订单实体 — 映射 t_order 表
 */
@Data
@TableName("t_order")
public class Order {

    @TableId(type = IdType.AUTO)
    private Long id;

    /** 订单编号 */
    private String orderNo;

    /** 用户 ID */
    private Long userId;

    /** 商品 ID */
    private Long productId;

    /** 商品名称 */
    private String productName;

    /** 购买数量 */
    private Integer quantity;

    /** 单价 */
    private BigDecimal unitPrice;

    /** 总价 */
    private BigDecimal totalPrice;

    /** 状态: PENDING/PAID/SHIPPED/COMPLETED/CANCELLED */
    private String status;

    /** 备注 */
    private String remark;

    /** 创建时间 */
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createTime;

    /** 更新时间 */
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updateTime;
}
