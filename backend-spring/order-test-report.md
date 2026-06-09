# 订单模块接口测试报告

## 一、测试环境

| 项目 | 配置 |
|------|------|
| JDK | 21 |
| Spring Boot | 3.3.5 |
| MyBatis Plus | 3.5.9 |
| 数据库 | H2 (内存模式) |
| 初始数据 | 5 条测试订单 |
| 测试框架 | JUnit 5 + TestRestTemplate |

## 二、测试结果

| 编号 | 接口 | 测试场景 | 预期 | 实际 | 结果 |
|------|------|----------|------|------|------|
| TC01 | GET /orders/query | 分页查询默认参数 | 200, total=5 | 200, page.total=5 | ✅ |
| TC02 | GET /orders/query?status=PAID | 按状态过滤 | total=1 | total=1 | ✅ |
| TC03 | GET /orders/1 | 单件查询 | 200, data 非空 | 200, 返回订单详情 | ✅ |
| TC04 | GET /orders/999 | 查询不存在 ID | code=404 | code=404 | ✅ |
| TC05 | POST /orders/create | 新增订单 | 200, 生成订单号 | 200, orderNo 已生成 | ✅ |
| TC06 | POST /orders/create | 缺少必填字段 | 400 | 400, 参数校验失败 | ✅ |
| TC07 | PUT /orders/update/{id}?status=SHIPPED | 更新状态 | status=SHIPPED | status=SHIPPED | ✅ |
| TC08 | PUT /orders/update/999?status=SHIPPED | 更新不存在 | code=404 | code=404 | ✅ |
| TC09 | DELETE /orders/delete/{id} | 删除订单 | 200 | 200 | ✅ |
| TC10 | DELETE /orders/delete/999 | 删除不存在 | code=404 | code=404 | ✅ |

**通过率: 10/10 = 100%**

## 三、接口清单

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/orders/query?page=&pageSize=&status=&userId=` | 分页查询（支持条件过滤） |
| GET | `/orders/{id}` | 单件查询 |
| POST | `/orders/create` | 新增订单（Body: JSON） |
| PUT | `/orders/update/{id}?status=XXX` | 更新状态 |
| DELETE | `/orders/delete/{id}` | 删除订单 |

## 四、运行方式

```bash
# IDEA 中直接运行 EshopApplication.main()
# 或命令行
cd backend-spring
mvn spring-boot:run

# H2 控制台
http://localhost:8080/h2-console
```
