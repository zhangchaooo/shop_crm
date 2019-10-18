import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/image/list`,
            method: "GET",
            data
        });
    },
    // async goodsImageList(data = {}) {
    //     return fa.request({
    //         url: `/api/admin/image/goodsImageList`,
    //         method: "GET",
    //         data
    //     });
    // },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/upload_image`,
            method: "POST",
            data
        });
    }
};
