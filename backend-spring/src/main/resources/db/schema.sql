-- 电商订单表 (t_order)
-- 数据库: H2 (可无缝迁移 MySQL)

DROP TABLE IF EXISTS t_order;

CREATE TABLE t_order (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',
    order_no    VARCHAR(32)    NOT NULL COMMENT '订单编号',
    user_id     BIGINT         NOT NULL COMMENT '用户ID',
    product_id  BIGINT         NOT NULL COMMENT '商品ID',
    product_name VARCHAR(128)  NOT NULL COMMENT '商品名称',
    quantity    INT            NOT NULL DEFAULT 1 COMMENT '购买数量',
    unit_price  DECIMAL(10,2)  NOT NULL COMMENT '单价',
    total_price DECIMAL(10,2)  NOT NULL COMMENT '总价',
    status      VARCHAR(16)    NOT NULL DEFAULT 'PENDING' COMMENT '状态: PENDING/PAID/SHIPPED/COMPLETED/CANCELLED',
    remark      VARCHAR(256)   DEFAULT '' COMMENT '备注',
    create_time DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
    CONSTRAINT chk_status CHECK (status IN ('PENDING','PAID','SHIPPED','COMPLETED','CANCELLED')),
    CONSTRAINT chk_qty   CHECK (quantity > 0),
    CONSTRAINT chk_price CHECK (unit_price >= 0 AND total_price >= 0)
);

-- 索引
CREATE INDEX idx_order_user ON t_order(user_id);
CREATE INDEX idx_order_status ON t_order(status);
CREATE UNIQUE INDEX idx_order_no ON t_order(order_no);

-- 初始测试数据
INSERT INTO t_order (order_no, user_id, product_id, product_name, quantity, unit_price, total_price, status, remark)
VALUES
('ORD20260609100001', 1001, 1, '无线蓝牙耳机',    1, 299.00, 299.00, 'PAID',    '限时特惠订单'),
('ORD20260609100002', 1001, 2, '智能手表 Pro',     2, 899.00, 1798.00, 'SHIPPED', '加急配送'),
('ORD20260609100003', 1002, 4, '机械键盘 87键',    1, 349.00, 349.00, 'PENDING', ''),
('ORD20260609100004', 1002, 5, '运动跑鞋 轻云',    1, 459.00, 459.00, 'COMPLETED', ''),
('ORD20260609100005', 1003, 3, '便携充电宝',        3, 129.00, 387.00, 'CANCELLED', '客户取消');
