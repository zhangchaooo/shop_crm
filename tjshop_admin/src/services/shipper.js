import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/edit`,
            method: "POST",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/del`,
            method: "POST",
            data
        });
    },
    async setDefault(data = {}) {
        return fa.request({
            url: `/api/admin/shipper/setDefault`,
            method: "POST",
            data
        });
    }
};
