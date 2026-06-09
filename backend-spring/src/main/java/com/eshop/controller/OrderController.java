package com.eshop.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.eshop.common.Result;
import com.eshop.common.Result.PageInfo;
import com.eshop.entity.Order;
import com.eshop.service.OrderService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

/**
 * 订单 RESTful 接口
 */
@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /** 分页查询 — 自动获取当前登录用户 */
    @GetMapping("/query")
    public Result<Page<Order>> query(
            @RequestParam(defaultValue = "1") @Min(1) long page,
            @RequestParam(defaultValue = "10") @Min(1) long pageSize,
            @RequestParam(required = false) String status) {

        Long userId = getCurrentUserId();
        Page<Order> result = orderService.queryPage(page, pageSize, status, userId);
        PageInfo info = new PageInfo(page, pageSize, result.getTotal());
        return Result.ok(result.getRecords(), info);
    }

    /** 单件查询 */
    @GetMapping("/{id}")
    public Result<Order> getById(@PathVariable Long id) {
        return Result.ok(orderService.getById(id));
    }

    /** 新增订单 — 用户ID从Token自动获取 */
    @PostMapping("/create")
    public Result<Order> create(@Valid @RequestBody CreateReq req) {
        Order order = new Order();
        order.setUserId(getCurrentUserId());
        order.setProductId(req.productId);
        order.setProductName(req.productName);
        order.setQuantity(req.quantity);
        order.setUnitPrice(req.unitPrice);
        order.setRemark(req.remark != null ? req.remark : "");
        return Result.ok(orderService.create(order));
    }

    /** 从 JWT Token 获取当前登录用户 ID */
    private Long getCurrentUserId() {
        return (Long) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    /** 更新订单状态 */
    @PutMapping("/update/{id}")
    public Result<Order> updateStatus(@PathVariable Long id,
                                      @RequestParam @NotBlank String status) {
        return Result.ok(orderService.updateStatus(id, status));
    }

    /** 删除订单 */
    @DeleteMapping("/delete/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        orderService.delete(id);
        return Result.ok(null);
    }

    /** 新增请求体 — userId 由 Token 自动获取 */
    public static class CreateReq {
        @NotNull public Long productId;
        @NotBlank public String productName;
        @Min(1) public Integer quantity = 1;
        @NotNull public BigDecimal unitPrice;
        public String remark;
    }
}
