import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/express/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/express/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/express/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/express/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/api/admin/express/del`,
            method: "POST",
            data
        });
    },
    async setCommonlyUse(data = {}) {
        return fa.request({
            url: `/api/admin/express/setCommonlyUse`,
            method: "POST",
            data
        });

    }
};
