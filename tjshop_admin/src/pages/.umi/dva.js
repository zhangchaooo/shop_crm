import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'area', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/area.js').default) });
app.model({ namespace: 'article', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/article.js').default) });
app.model({ namespace: 'auth', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/auth.js').default) });
app.model({ namespace: 'coupon', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/coupon.js').default) });
app.model({ namespace: 'discount', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/discount.js').default) });
app.model({ namespace: 'evaluate', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/evaluate.js').default) });
app.model({ namespace: 'express', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/express.js').default) });
app.model({ namespace: 'freight', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/freight.js').default) });
app.model({ namespace: 'global', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/global.js').default) });
app.model({ namespace: 'group', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/group.js').default) });
app.model({ namespace: 'images', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/images.js').default) });
app.model({ namespace: 'member', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/member.js').default) });
app.model({ namespace: 'menu', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/menu.js').default) });
app.model({ namespace: 'page', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/page.js').default) });
app.model({ namespace: 'partner', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/partner.js').default) });
app.model({ namespace: 'payment', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/payment.js').default) });
app.model({ namespace: 'refund', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/refund.js').default) });
app.model({ namespace: 'setting', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/setting.js').default) });
app.model({ namespace: 'shipper', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/shipper.js').default) });
app.model({ namespace: 'shop', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/shop.js').default) });
app.model({ namespace: 'user', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/user.js').default) });
app.model({ namespace: 'wechat', ...(require('D:/Myzone/tj02/tjshop_admin/src/models/wechat.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
