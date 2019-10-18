import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/goods/list`,
            method: "GET",
            data
        });
    },
    async add(data = {}) {
        return fa.request({
            url: `/api/admin/goods/add`,
            method: "POST",
            data
        });
    },
    async edit(data = {}) {
        return fa.request({
            url: `/api/admin/goods/edit`,
            method: "POST",
            data
        });
    },
    async info(data = {}) {
        return fa.request({
            url: `/api/admin/goods/info`,
            method: "GET",
            data
        });
    },
    async del(data = {}) {
        return fa.request({
            url: `/api/admin/goods/del`,
            method: "DELETE",
            data
        });
    },
    async offSale(data = {}) {
        return fa.request({
            url: `/api/admin/goods/offSale`,
            method: "POST",
            data
        });
    },
    async onSale(data = {}) {
        return fa.request({
            url: `/api/admin/goods/onSale`,
            method: "POST",
            data
        });
    },
    async skuList(data = {}) {
        return fa.request({
            url: `/api/admin/goods/skuList`,
            method: "GET",
            data
        });
    },
    async batchUpshelf(data = {}) {
        return fa.request({
            url: `/api/admin/goods/batchUpshelf`,
            method: "POST",
            data
        });

    },
    async batchDownshelf(data = {}) {
        return fa.request({
            url: `/api/admin/goods/batchDownshelf`,
            method: "POST",
            data
        });

    },
    async goodsEdit_sort(data = {}) {
        return fa.request({
            url: `/api/admin/goods/edit_sort/${data.id}`,
            method: "POST",
            data
        });

    },
    spec: {
        async list(data = {}) {
            return fa.request({
                url: `/api/admin/goodsspec/list`,
                method: "GET",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `/api/admin/goodsspec/add`,
                method: "POST",
                data:{...data, sort:129}
            });
        },
        async edit(data = {}) {
            return fa.request({
                url: `/api/admin/goodsspec/edit`,
                method: "POST",
                data
            });
        }
    },
    specValue: {
        async list(data = {}) {
            return fa.request({
                url: `/api/admin/Goodsspecvalue/list`,
                method: "GET",
                data
            });
        },
        async del(data = {}) {
            return fa.request({
                url: `/api/admin/Goodsspecvalue/del`,
                method: "DELETE",
                data
            });
        },
        async add(data = {}) {
            return fa.request({
                url: `/api/admin/Goodsspecvalue/add`,
                method: "POST",
                data: {...data, sort: 999}
            });
        }
    },
    category: {
        async list(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/info/${data.id}`,
                method: "POST",
                data
            });
        },
        async sort(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/sort`,
                method: "POST",
                data
            });
        },
        async del(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/del/${data.id}`,
                method: "DELETE",
                data
            });
        }
        ,
        async add(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/add`,
                method: "POST",
                data
            });
        }
        ,
        async edit(data = {}) {
            return fa.request({
                url: `/api/admin/goodscategory/edit/${data.id}`,
                method: "POST",
                data
            });
        }
    },
    evaluate: {
        async list(data = {}) {
            return fa.request({
                url: `/api/admin/goodsevaluate/list`,
                method: "GET",
                data
            });
        },
        async reply(data = {}) {
            return fa.request({
                url: `/api/admin/goodsevaluate/reply`,
                method: "POST",
                data
            });
        },
        async display(data = {}) {
            return fa.request({
                url: `/api/admin/goodsevaluate/display`,
                method: "POST",
                data
            });
        }
    }
}
;
