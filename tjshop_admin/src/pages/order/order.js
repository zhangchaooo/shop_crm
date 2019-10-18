/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import React from 'react'
/* import { connect } from 'dva' */
import { Table, Badge, Tabs } from 'antd'
import styles from './order.less'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: '商品图', dataIndex: 'date', key: 'date' },
      { title: '商品名称', dataIndex: 'name', key: 'name' },
      {
        title: '规格',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Large
          </span>
        )
      },
      { title: '数量', dataIndex: 'upgradeNum', key: 'upgradeNum5' },
      {
        title: '单价',
        dataIndex: 'singlePrice',
        key: 'operation'
        /*  render: () => (
          <span className="table-operation">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown overlay={menu}>
              <a>
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ) */
      },
      { title: '售后', dataIndex: 'shouhou', key: 'upgradeNum' },
      { title: '收货人', dataIndex: 'shouhuoren', key: 'upgradeNum2' },
      { title: '联系方式', dataIndex: 'phoneNumber', key: 'upgradeNum3' },
      { title: '收货地址', dataIndex: 'address', key: 'upgradeNum4' }
    ]

    const data = []
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 1; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production desk',
        upgradeNum: '56',
        singlePrice: 1.4,
        shouhou: '一年只换不修',
        shouhuoren: 'lison',
        phoneNumber: '13945687954',
        address: '天津市和平区人民检察院'
      })
    }
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  const columns = [
    { title: '订单号', dataIndex: 'name', key: 'name' },
    { title: '下单时间', dataIndex: 'platform', key: 'platform' },
    { title: '订单状态', dataIndex: 'version', key: 'version' },
    { title: '运费（元）', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: '商品总额（元）', dataIndex: 'creator', key: 'creator' },
    { title: '操作', key: 'operation', render: () => <a>详情</a> }
  ]

  const data = []
  for (let i = 0; i < 23; i++) {
    data.push({
      key: i,
      name: 2019062011092227,
      platform: '2019-06-20 11：16：48',
      version: '已完成',
      upgradeNum: 500,
      creator: 300
    })
  }

  return (
    <div className={styles.form_wrap}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="全部" key="1">
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={data}
          />
        </TabPane>
        <TabPane tab="待发货" key="2">
          Content of Tab Pane 待发货
        </TabPane>
        <TabPane tab="待付款" key="3">
          Content of Tab Pane 待付款
        </TabPane>
        <TabPane tab="已发货" key="4">
          Content of Tab Pane 已发货
        </TabPane>
        <TabPane tab="已完成" key="5">
          Content of Tab Pane 3 已完成
        </TabPane>
        <TabPane tab="已关闭" key="6">
          Content of Tab Pane 3 已关闭
        </TabPane>
      </Tabs>
    </div>
  )
}

export default NestedTable
