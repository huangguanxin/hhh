package com.eshop;

import com.eshop.common.Result;
import com.eshop.entity.Order;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * 订单接口全覆盖测试
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderControllerTest {

    @Autowired
    private TestRestTemplate rest;

    private static Long createdId;

    // ==================== TC01-TC04: 查询 ====================

    @Test
    @org.junit.jupiter.api.Order(1)
    void TC01_分页查询_默认参数() {
        ResponseEntity<Result> res = rest.getForEntity(
                "/orders/query", Result.class);
        assertThat(res.getStatusCodeValue()).isEqualTo(200);
        assertThat(res.getBody().getCode()).isEqualTo(200);
        assertThat(res.getBody().getPage()).isNotNull();
        assertThat(res.getBody().getPage().getTotal()).isEqualTo(5);
    }

    @Test
    @org.junit.jupiter.api.Order(2)
    void TC02_分页查询_PAID状态过滤() {
        ResponseEntity<Result> res = rest.getForEntity(
                "/orders/query?status=PAID", Result.class);
        assertThat(res.getBody().getCode()).isEqualTo(200);
        Map<String, Object> page = (Map) res.getBody().getPage();
        assertThat((int) page.get("total")).isEqualTo(1);
    }

    @Test
    @org.junit.jupiter.api.Order(3)
    void TC03_单件查询() {
        ResponseEntity<Result> res = rest.getForEntity(
                "/orders/1", Result.class);
        assertThat(res.getBody().getCode()).isEqualTo(200);
        assertThat(res.getBody().getData()).isNotNull();
    }

    @Test
    @org.junit.jupiter.api.Order(4)
    void TC04_查询不存在的订单() {
        ResponseEntity<Result> res = rest.getForEntity(
                "/orders/999", Result.class);
        assertThat(res.getStatusCodeValue()).isEqualTo(500);
        assertThat(res.getBody().getCode()).isEqualTo(404);
    }

    // ==================== TC05-TC06: 新增 ====================

    @Test
    @org.junit.jupiter.api.Order(5)
    void TC05_新增订单() {
        String json = """
            {
                "userId": 1004,
                "productId": 1,
                "productName": "测试商品",
                "quantity": 2,
                "unitPrice": 199.00,
                "remark": "JUnit测试"
            }""";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> req = new HttpEntity<>(json, headers);

        ResponseEntity<Result<Map>> res = rest.exchange(
                "/orders/create", HttpMethod.POST, req,
                new ParameterizedTypeReference<>() {});

        assertThat(res.getStatusCodeValue()).isEqualTo(200);
        Map data = res.getBody().getData();
        assertThat(data.get("orderNo")).isNotNull();
        assertThat(data.get("status")).isEqualTo("PENDING");
        createdId = ((Number) data.get("id")).longValue();
    }

    @Test
    @org.junit.jupiter.api.Order(6)
    void TC06_缺少必填字段() {
        String json = "{\"userId\": 1004}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> req = new HttpEntity<>(json, headers);

        ResponseEntity<Result> res = rest.exchange(
                "/orders/create", HttpMethod.POST, req, Result.class);
        assertThat(res.getStatusCodeValue()).isEqualTo(400);
    }

    // ==================== TC07-TC08: 更新 ====================

    @Test
    @org.junit.jupiter.api.Order(7)
    void TC07_更新订单状态为SHIPPED() {
        ResponseEntity<Result<Map>> res = rest.exchange(
                "/orders/update/" + createdId + "?status=SHIPPED",
                HttpMethod.PUT, null, new ParameterizedTypeReference<>() {});

        assertThat(res.getStatusCodeValue()).isEqualTo(200);
        assertThat(res.getBody().getData().get("status")).isEqualTo("SHIPPED");
    }

    @Test
    @org.junit.jupiter.api.Order(8)
    void TC08_更新不存在的订单() {
        ResponseEntity<Result> res = rest.exchange(
                "/orders/update/999?status=SHIPPED",
                HttpMethod.PUT, null, Result.class);
        assertThat(res.getBody().getCode()).isEqualTo(404);
    }

    // ==================== TC09-TC10: 删除 ====================

    @Test
    @org.junit.jupiter.api.Order(9)
    void TC09_删除订单() {
        ResponseEntity<Result> res = rest.exchange(
                "/orders/delete/" + createdId,
                HttpMethod.DELETE, null, Result.class);
        assertThat(res.getBody().getCode()).isEqualTo(200);
    }

    @Test
    @org.junit.jupiter.api.Order(10)
    void TC10_删除不存在的订单() {
        ResponseEntity<Result> res = rest.exchange(
                "/orders/delete/999",
                HttpMethod.DELETE, null, Result.class);
        assertThat(res.getBody().getCode()).isEqualTo(404);
    }
}
