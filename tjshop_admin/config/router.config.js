export default [
  {
    path: '/install',
    component: 'install'
  },
  {
    path: '/login',
    component: '../layouts/userLayout',
    routes: [{ path: '/login', component: 'member/login' }]
  },
  {
    path: '/',
    component: '../layouts/basicLayout',
    Routes: ['src/pages/authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: 'dashboard/analysis' },
      {
        path: '/dashboard/analysis',
        name: '概况',
        component: 'dashboard/analysis'
      },
      { path: '/order', redirect: 'order/order' },
      {
        path: '/order/order',
        name: '订单页面',
        component: 'order/order'
      },

      // {
      //     path: "/user",
      //     name: "客户",
      //     routes: [
      //         { path: "/user", redirect: "/user/list", policy: "user/list" },

      // {
      //     path: "/auth",
      //     name: "权限",
      //     routes: [
      //         { path: "/auth", redirect: "auth/group" },
      //         { path: "/auth/member", name: "用户", component: "auth/member", policy: "member/list" },
      //         { path: "/auth/group", name: "用户组", component: "auth/group", policy: "auth/groupList" },
      //         { path: "/auth/policy", name: "策略", component: "auth/policy", policy: "auth/policyList" }
      //     ]
      // },
      {
        path: '/setting',
        name: '设置',
        routes: [
          {
            path: '/setting',
            redirect: '/setting/deliver/shipper',
            policy: 'shipper/list || express/list || freight/list'
          },

          {
            path: '/setting/order',
            name: '订单配置',
            component: 'setting/order'
          },
          {
            path: '/setting/wechat',
            name: '微信配置',
            component: 'setting/wechat/layout',
            routes: [
              { path: '/setting/wechat', redirect: '/setting/wechat/base' },
              {
                path: '/setting/wechat/base',
                component: 'setting/wechat/base'
              },
              {
                path: '/setting/wechat/miniTemplate',
                component: 'setting/wechat/miniTemplate'
              }
            ]
          },
          {
            path: '/setting/qiliuyun',
            name: '七牛云配置',
            component: 'setting/qiniuyun'
          }
          // { path: "/setting/alipay", name: "支付宝配置", component: "setting/alipay" },
          // { path: "/setting/sms", name: "短信配置", component: "setting/sms" },
          // {
          //     path: "/setting/poster", name: "海报配置", component: "setting/poster/layout",
          //     routes: [
          //         { path: "/setting/poster", redirect: "/setting/poster/goods" },
          //         { path: "/setting/poster/goods", component: "setting/poster/goods" },
          //         { path: "/setting/poster/groupGoods", component: "setting/poster/groupGoods" }
          //     ]
          // }
        ]
      }
      // {
      //     path: "/marketing",
      //     name: "营销",
      //     routes: [
      //         { path: "/marketing", redirect: "/marketing/group" },
      //         { path: "/marketing/group", name: "拼团", component: "marketing/group/list" },
      //         { path: "/marketing/group/add", component: "marketing/group/add" },
      //         { path: "/marketing/group/edit", component: "marketing/group/edit" },
      //         { path: "/marketing/group/detail", component: "marketing/group/detail" },
      //         { path: "/marketing/coupon", name: "优惠券", component: "marketing/coupon/list" },
      //         { path: "/marketing/coupon/add", component: "marketing/coupon/add" },
      //         { path: "/marketing/coupon/edit", component: "marketing/coupon/edit" },
      //         { path: "/marketing/freebie", name: "赠品", component: "marketing/freebie/list" },
      //         { path: "/marketing/freebie/add", component: "marketing/freebie/add" },
      //         { path: "/marketing/freebie/edit", component: "marketing/freebie/edit" },
      //         { path: "/marketing/discount", name: "限时折扣", component: "marketing/discount/list" },
      //         { path: "/marketing/discount/add", component: "marketing/discount/add" },
      //         { path: "/marketing/discount/edit", component: "marketing/discount/edit" }
      //     ]
      // }
    ]
  }
]
