import fa from "@/utils/fa";

export default {
    async quantity(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/quantity`,
            method: "GET",
            data
        });
    },
    async monthSalesHistogram(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/monthSalesHistogram`,
            method: "GET",
            data
        });
    },
    async monthOrderCountHistogram(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/monthOrderCountHistogram`,
            method: "GET",
            data
        });
    },
    async monthUserAddCountHistogram(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/monthUserAddCountHistogram`,
            method: "GET",
            data
        });
    },
    async monthNewUserSalesHistogram(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/monthNewUserSalesHistogram`,
            method: "GET",
            data
        });
    },
    async saleAccumulativeAmount(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/saleAccumulativeAmount`,
            method: "GET",
            data
        });
    },
    async dayAverage(data = {}) {
        return fa.request({
            url: `/api/admin/Statistics/dayAverage`,
            method: "GET",
            data
        });
    }
};
