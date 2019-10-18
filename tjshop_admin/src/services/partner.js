import fa from "@/utils/fa";

export default {
    async list(data = {}) {
        return fa.request({
            url: `/api/admin/partner/list`,
            method: "GET",
            data
        });
    },
    async businessList(data = {}) {
      return fa.request({
          url: `/api/admin/business/list/${data.id}`,
          method: "GET",
          data
      });
  },
    async bonus(data = {}) {
        return fa.request({
            url: `/api/admin/pool/extend`,
            method: "GET",
            data
        });
    },
    async examinePartner(data = {}) {
        return fa.request({
            url: `/api/admin/partner/examine/${JSON.parse(data).id}`,
            method: "PATCH",
            data
        });
    },
    async pool(data = {}) {
        return fa.request({
            url: `/api/admin/pool/${data.name}`,
            method: "POST",
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
                url: `/api/admin/orderrefund/list`,
                method: "GET",
                data
            });
        },
        async info(data = {}) {
            return fa.request({
                url: `/api/admin/orderrefund/info`,
                method: "GET",
                data
            });
        },
        async handle(data = {}) {
            return fa.request({
                url: `/api/admin/orderrefund/handle`,
                method: "POST",
                data
            });
        },
        async refund(data = {}) {
            return fa.request({
                url: `/api/admin/orderrefund/refund`,
                method: "POST",
                data
            });
        },
        async receive(data = {}) {
            return fa.request({
                url: `/api/admin/orderrefund/receive`,
                method: "POST",
                data
            });
        }
    }
};
