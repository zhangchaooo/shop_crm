import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/order/list`,
            method: "GET",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/order/info`,
            method: "GET",
            data
        });
    },
    // async groupInfo(data = {}) {
    //     return fa.request({
    //         url: `/api/admin/order/groupInfo`,
    //         method: "GET",
    //         data
    //     });
    // },
    async setSend(data = {}) {
        return fa.request({
            url: `/api/admin/order/setSend`,
            method: "POST",
            data
        });
    },
    async setOrderExpires(data = {}) {
        return fa.request({
            url: `/api/admin/shop/setOrderExpires`,
            method: "POST",
            data
        });
    },
    async changePrice(data = {}) {
        return fa.request({
            url: `/api/admin/order/changePrice`,
            method: "POST",
            data
        });
    },
    refund: {
        async list(data = {}) {
            return fa.request({
                url: `/api/admin/Orderrefund/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `/api/admin/Orderrefund/info`,
                method: "GET",
                data
            });
        },
        async handle(data = {}) {
            return fa.request({
                url: `/api/admin/Orderrefund/handle`,
                method: "POST",
                data
            });
        },
        async refund(data = {}) {
            return fa.request({
                url: `/api/admin/Orderrefund/refund`,
                method: "POST",
                data
            });
        },
        async receive(data = {}) {
            return fa.request({
                url: `/api/admin/Orderrefund/receive`,
                method: "POST",
                data
            });
        }
    }
};
