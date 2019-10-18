import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/freight/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/freight/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/freight/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/freight/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/api/admin/freight/del`,
            method: "POST",
            data
        });
    }
};
