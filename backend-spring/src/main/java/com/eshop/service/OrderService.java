package com.eshop.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eshop.entity.Order;

/**
 * 订单服务接口
 */
public interface OrderService {

    /** 分页查询 */
    Page<Order> queryPage(long page, long pageSize, String status, Long userId);

    /** 按 ID 查询 */
    Order getById(Long id);

    /** 新增订单 */
    Order create(Order order);

    /** 更新订单状态 */
    Order updateStatus(Long id, String status);

    /** 删除订单 */
    void delete(Long id);
}
