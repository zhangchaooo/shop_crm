import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from 'D:/Myzone/tj02/tjshop_admin/src/pages/.umi/LocaleWrapper.jsx';
import _dvaDynamic from 'dva/dynamic';

const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/install',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../install'),
          LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
            .default,
        })
      : require('../install').default,
    exact: true,
  },
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/userLayout'),
          LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
            .default,
        })
      : require('../../layouts/userLayout').default,
    routes: [
      {
        path: '/login',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../member/login'),
              LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                .default,
            })
          : require('../member/login').default,
        exact: true,
      },
      {
        component: () =>
          React.createElement(
            require('D:/Myzone/tj02/tjshop_admin/node_modules/_umi-build-dev@1.13.11@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/basicLayout'),
          LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
            .default,
        })
      : require('../../layouts/basicLayout').default,
    Routes: [require('../authorized').default],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
        exact: true,
      },
      {
        path: '/dashboard/analysis',
        name: '概况',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../dashboard/analysis'),
              LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                .default,
            })
          : require('../dashboard/analysis').default,
        exact: true,
      },
      {
        path: '/order',
        redirect: '/order/order',
        exact: true,
      },
      {
        path: '/order/order',
        name: '订单页面',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../order/order'),
              LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                .default,
            })
          : require('../order/order').default,
        exact: true,
      },
      {
        path: '/setting',
        name: '设置',
        routes: [
          {
            path: '/setting',
            redirect: '/setting/deliver/shipper',
            policy: 'shipper/list || express/list || freight/list',
            exact: true,
          },
          {
            path: '/setting/order',
            name: '订单配置',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../setting/order'),
                  LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                    .default,
                })
              : require('../setting/order').default,
            exact: true,
          },
          {
            path: '/setting/wechat',
            name: '微信配置',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../setting/wechat/layout'),
                  LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                    .default,
                })
              : require('../setting/wechat/layout').default,
            routes: [
              {
                path: '/setting/wechat',
                redirect: '/setting/wechat/base',
                exact: true,
              },
              {
                path: '/setting/wechat/base',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../setting/wechat/base'),
                      LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                        .default,
                    })
                  : require('../setting/wechat/base').default,
                exact: true,
              },
              {
                path: '/setting/wechat/miniTemplate',
                component: __IS_BROWSER
                  ? _dvaDynamic({
                      component: () => import('../setting/wechat/miniTemplate'),
                      LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                        .default,
                    })
                  : require('../setting/wechat/miniTemplate').default,
                exact: true,
              },
              {
                component: () =>
                  React.createElement(
                    require('D:/Myzone/tj02/tjshop_admin/node_modules/_umi-build-dev@1.13.11@umi-build-dev/lib/plugins/404/NotFound.js')
                      .default,
                    { pagesPath: 'src/pages', hasRoutesInConfig: true },
                  ),
              },
            ],
          },
          {
            path: '/setting/qiliuyun',
            name: '七牛云配置',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../setting/qiniuyun'),
                  LoadingComponent: require('D:/Myzone/tj02/tjshop_admin/src/components/pageLoading/index')
                    .default,
                })
              : require('../setting/qiniuyun').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('D:/Myzone/tj02/tjshop_admin/node_modules/_umi-build-dev@1.13.11@umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('D:/Myzone/tj02/tjshop_admin/node_modules/_umi-build-dev@1.13.11@umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('D:/Myzone/tj02/tjshop_admin/node_modules/_umi-build-dev@1.13.11@umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    routeChangeHandler(history.location);
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
