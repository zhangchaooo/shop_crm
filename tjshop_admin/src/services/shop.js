import fa from "@/utils/fa";

export default {
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/shop/info`,
            method: "GET",
            data
        });
    },
    async setOrderExpires(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setorderexpires`,
            method: "POST",
            data
        });
    },
    async setBaseInfo(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setbaseinfo`,
            method: "POST",
            data
        });
    },
    async setGoodsCategoryStyle(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setgoodscategorystyle`,
            method: "POST",
            data
        });
    },
    async setColorScheme(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setColorScheme`,
            method: "POST",
            data
        });
    },
    async setPortalTemplate(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setPortalTemplate`,
            method: "POST",
            data
        });
    }
};
