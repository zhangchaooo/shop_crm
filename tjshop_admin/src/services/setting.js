import fa from "@/utils/fa";

export default {
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/setting/wechat`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/setting/wechat`,
            method: "GET",
            data
        });
    },
    async optionInfo(data = {}) {
        return fa.request({
            url: `/api/admin/options/info`,
            method: "GET",
            data
        });
    },
    async optionEdit(data = {}) {
        return fa.request({
            url: `/api/admin/options/edit`,
            method: "POST",
            data
        });
    },
};
