package com.eshop.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.eshop.entity.Order;
import org.apache.ibatis.annotations.Mapper;

/**
 * 订单 Mapper — 继承 BaseMapper 自动获得 CRUD 方法
 */
@Mapper
public interface OrderMapper extends BaseMapper<Order> {
    // BaseMapper 已提供: insert / deleteById / updateById / selectById / selectPage ...
}
