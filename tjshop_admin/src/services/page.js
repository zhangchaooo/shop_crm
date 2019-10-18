import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/page/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/page/info`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/page/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/page/edit`,
            method: "POST",
            data
        });
    },
    async setPortal(data = {}) {
        return fa.request({
            url: `/api/admin/page/setPortal`,
            method: "POST",
            data
        });
    }
};
