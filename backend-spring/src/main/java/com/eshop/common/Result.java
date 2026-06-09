package com.eshop.common;

import lombok.Data;

/**
 * 统一返回结果类
 * @param <T> 数据类型
 */
@Data
public class Result<T> {
    private int code;
    private String message;
    private T data;
    private PageInfo page;

    public static <T> Result<T> ok(T data) {
        Result<T> r = new Result<>();
        r.code = 200;
        r.message = "操作成功";
        r.data = data;
        return r;
    }

    public static <T> Result<T> ok(T data, PageInfo page) {
        Result<T> r = ok(data);
        r.page = page;
        return r;
    }

    public static <T> Result<T> fail(int code, String message) {
        Result<T> r = new Result<>();
        r.code = code;
        r.message = message;
        return r;
    }

    @Data
    public static class PageInfo {
        private long page;
        private long pageSize;
        private long total;
        private long totalPages;

        public PageInfo(long page, long pageSize, long total) {
            this.page = page;
            this.pageSize = pageSize;
            this.total = total;
            this.totalPages = (total + pageSize - 1) / pageSize;
        }
    }
}
