package com.eshop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.eshop.entity.Order;
import com.eshop.mapper.OrderMapper;
import com.eshop.service.OrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements OrderService {

    @Override
    public Page<Order> queryPage(long page, long pageSize, String status, Long userId) {
        LambdaQueryWrapper<Order> wrapper = new LambdaQueryWrapper<>();
        if (status != null && !status.isEmpty()) {
            wrapper.eq(Order::getStatus, status);
        }
        if (userId != null) {
            wrapper.eq(Order::getUserId, userId);
        }
        wrapper.orderByDesc(Order::getCreateTime);
        return page(new Page<>(page, pageSize), wrapper);
    }

    @Override
    public Order getById(Long id) {
        Order order = super.getById(id);
        if (order == null) {
            throw new RuntimeException("订单不存在: ID=" + id);
        }
        return order;
    }

    @Override
    public Order create(Order order) {
        // 生成订单编号
        String no = "ORD" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                + String.format("%04d", (int)(Math.random() * 10000));
        order.setOrderNo(no);
        order.setStatus("PENDING");
        order.setTotalPrice(order.getUnitPrice().multiply(BigDecimal.valueOf(order.getQuantity())));
        save(order);
        return order;
    }

    @Override
    public Order updateStatus(Long id, String status) {
        Order order = getById(id);
        order.setStatus(status);
        updateById(order);
        return order;
    }

    @Override
    public void delete(Long id) {
        if (!removeById(id)) {
            throw new RuntimeException("订单不存在: ID=" + id);
        }
    }
}
