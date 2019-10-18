import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { connect } from "dva";
import { Card, Button, Table, Switch, Modal, message } from "antd";
import PageList from "@/components/pageList";
import Arr from "@/utils/array";
import Image from "@/components/image";
import partnerApi from "@/services/partner";
import { View } from "@/components/flexView";
import moment from "moment";
import router from "umi/router";
import Antd from "@/utils/antd";
@connect(({ partner, loading }) => ({
    partnerList: partner.list.data,
    partnerListLoading: loading.effects["partner/list"],
    businessList: partner.businessList?partner.businessList.data: {},
    businessListLoading: loading.effects["partner/businessList"],
}))

export default class PartnerList extends Component {
    static defaultProps = {
        partnerList: {
            total_number: 0,
            list: []
        },
        partnerListLoading: true,
        partnerCategory: {
            list: []
        },
        partnerCategoryLoading: true
    };
    state = {
        expandedRowKeys: [],
        partnerList: {}
    }
    search = new PageList({
        router: "/partner/list",
        limit: 10,
        param: {
            nickname: null,
            state: null,
        },
        refresh: (e) => {
            this.setState({expandedRowKeys:[]});
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "partner/list",
            payload: this.search.filter(),
            callback: (res) => {
                if (res.code===0) {
                    this.setState({ partnerList: res.data });
                }
            }
        });
        
    };
    async initBonus() {
        const res = await partnerApi.bonus({});
        if (res && res.code === 0) {
            res.data.map(v=> {
                if (v.id==1) {
                    this.setState({ partner_bonus: v.divide_poll });
                } else if (v.id==2) {
                    this.setState({ business_bonus: v.divide_poll });
                }
            })
            
        }
    }

    componentDidMount() {
        this.initList();
        this.initBonus();
    }

    render() {
        const { partnerListLoading,businessListLoading } = this.props;
        const {state, nickname } = this.search.getParam();
        let { expandedRowKeys,partnerList,business_bonus,partner_bonus,businessListLoadingPartnerId } = this.state;

        const columns = [
            {
                title: "ID",
                key: '',
                dataIndex: "id",
            },
            {
                title: "头像",
                key: '',
                dataIndex: "headimgurl",
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 20, height: 20 }}
                    />
                )
            }, {
                title: "is_blacklist",
                key: '',
                dataIndex: "is_blacklist",
            }, {
                title: "昵称",
                key: 'nickname',
                dataIndex: "nickname",
            }, 
            {
                title: "姓名",
                key: 'name',
                dataIndex: 'partner.name',
            }, 
            {
                title: "联系方式",
                key: 'mobile',
                dataIndex: "partner.mobile",
            }, 
            {
                title: "审核状态",
                key: 'state',
                dataIndex: "partner.state",
                render: (e) => {
                   return e==0?'未审核':
                        e==1? '通过':'未通过'
                }
            }, 
            {
                title: "status",
                key: 'status',
                dataIndex: "status",
            }, {
                title: "余额（元）",
                key: 'bonus',
                dataIndex: "bonus",
            },{
                title: "注册时间",
                key: 'created_at',
                dataIndex: "partner.created_at",
            },
             {
                title: "操作",
                key: "operation",
                render: (record) => <View style={{flexDirection: 'row'}}>
                    <a
                        onClick={async () => {
                            Modal.confirm({
                                title: "确认审核通过？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: async () => {
                                    const response = await partnerApi.examinePartner(JSON.stringify({ state: record.partner.state,id: record.partner.id }));
                                    if (JSON.parse(response).code === 0) {
                                        this.initList();
                                    }
                                }
                            });

                        }}
                    >审核</a>
                </View>
            }
        ];
        const expandedRowColumns = [
            {
                title: "ID",
                key: 'id',
                dataIndex: "id",
            },
            {
                title: "user_ID",
                key: 'user_id',
                dataIndex: "user_id",
            },
            {
                title: "头像",
                dataIndex: "user",
                key: 'headimgurl',
                render: (e) => (
                    <Image
                        type='goods'
                        src={e.headimgurl}
                        style={{ width: 20, height: 20 }}
                    />
                )
            }, {
                title: "昵称",
                dataIndex: "user",
                key: 'nickname',
                render: (e) => e.nickname
            },
            {
                title: "姓名",
                key: 'name',
                dataIndex: "name",
            },{
                title: "手机",
                key: 'mobile',
                dataIndex: "mobile",
            },  {
                title: "消费总额（元）",
                key: 'bonus',
                dataIndex: "user",
                render: (e) => e.bonus
            },{
                title: "type",
                key: 'type',
                dataIndex: "type",
            },
            {
                title: "is_blacklist",
                key: 'is_blacklist',
                dataIndex: "user.is_blacklist",
            },
            {
                title: "status",
                key: 'status',
                dataIndex: "user.status",
            },
            {
                title: "审核状态",
                key: 'state',
                dataIndex: "partner.state",
                render: (e) => {
                   return e==0?'未审核':
                        e==1? '通过':'未通过'
                }
            }, 
            {
                title: "注册时间",
                key: 'updated_at',
                dataIndex: "updated_at",
            }, 
            // {
            //     title: "操作",
            //     key: "operation",
            //     render: (record) => <View style={{flexDirection: 'row'}}>
            //         <a  style={{marginRight: 10}}
            //             onClick={() => {
            //                 router.push({
            //                     pathname: `/partner/list/edit`,
            //                     search: `?id=${record.id}`,
            //                     state: {
            //                         record
            //                     }
            //                 });
            //             }}
            //         >
            //             审核
            //         </a>
            //         <a
            //             onClick={async () => {
            //                 Modal.confirm({
            //                     title: "确认审核通过？",
            //                     okText: "确认",
            //                     okType: "danger",
            //                     cancelText: "取消",
            //                     onOk: async () => {
            //                         const response = await partnerApi.examinePartner({ id: [record.id] });
            //                         if (JSON.parse(response).code === 0) {
            //                             this.initList();
            //                         }
            //                     }
            //                 });

            //             }}
            //         >审核</a>
            //     </View>
            // }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={partnerListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                label: "昵称",
                                input: {
                                    field: "nickname",
                                    placeholder: "请输入合伙人昵称",
                                    initialValue: nickname
                                }
                            },
                            {
                                label: "审核状态状态",
                                select: {
                                    field: "state",
                                    style: { width: 100 },
                                    placeholder: "全部",
                                    data: [
                                        { value: "0", name: "待审核" },
                                        { value: "1", name: "通过" },
                                        { value: "2", name: "未通过" },
                                    ],
                                    initialValue: state
                                }
                            },
                            // {
                            //     label: "排序",
                            //     select: {
                            //         field: "sort_type",
                            //         style: { width: 200 },
                            //         placeholder: "默认排序",
                            //         data: [
                            //             { value: "1", name: "商品价格低到高" },
                            //             { value: "2", name: "商品价格高到低" },
                            //             { value: "3", name: "销量多到少" },
                            //             { value: "4", name: "销量少到多" },
                            //             { value: "5", name: "库存多到少" },
                            //             { value: "6", name: "库存少到多" },
                            //             { value: "7", name: "创建时间早到晚" },
                            //             { value: "8", name: "创建时间晚到早" },
                            //             { value: "9", name: "排序高到低" },
                            //             { value: "10", name: "排序低到高" }
                            //         ],
                            //         initialValue: sort_type
                            //     }
                            // }
                        ]} />
                    <View>
                        <View style={{flexDirection: 'row', marginBottom: 20}}>
                            <View  style={{flexDirection: 'row',alignItems: 'center', marginRight: 40}}>
                                <div style={{marginRight: 20}}>合伙人资金池：￥{partner_bonus}</div>
                                <Button
                                    type='primary'
                                    onClick={async () => {
                                        Modal.confirm({
                                            title: "确认合伙人资金池分红吗？",
                                            okText: "确认",
                                            okType: "danger",
                                            cancelText: "取消",
                                            onOk: async () => {
                                                const response = await partnerApi.pool({ name: 'partner_bonus' });
                                                this.initBonus();
                                                if (response.code === 0) {
                                                    message.success(response.message)
                                                } else {
                                                    message.error(response.message)
                                                }
                                            }
                                        });
            
                                    }}
                                >
                                    合伙人资金池分红
                                </Button>
                            </View>
                            <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                <div style={{marginRight: 20}}>联盟商家资金池：￥{business_bonus}</div>
                                <Button
                                    type='primary'
                                    onClick={async () => {
                                        Modal.confirm({
                                            title: "确认联盟商家资金池分红吗？",
                                            okText: "确认",
                                            okType: "danger",
                                            cancelText: "取消",
                                            onOk: async () => {
                                                const response = await partnerApi.pool({ name: 'business_bonus' });
                                                this.initBonus();
                                                if (response.code === 0) {
                                                    message.success(response.message)
                                                } else {
                                                    message.error(response.message)
                                                }
                                            }
                                        });
            
                                    }}
                                >
                                    联盟商家资金池分红
                                </Button>
                            </View>
                        </View>
                        <Table
                            loading={partnerListLoading}
                            dataSource={partnerList.list ? partnerList.list : []}
                            columns={columns}
                            expandedRowRender={record => (
                                
                                <Table
                                    // dataSource={record.extend_order_goods}
                                    loading={businessListLoading&&businessListLoadingPartnerId==record.id}
                                    dataSource={record.expandData||[]}
                                    columns={expandedRowColumns}
                                    pagination={false}
                                    defaultExpandAllRows={true}
                                    rowKey={record => `${record.id}_child`}
                                />
                            )}
                            onExpand={(expanded, record) => {
                                const { dispatch } = this.props;
                                this.setState({ businessListLoadingPartnerId: record.id });
                                dispatch({
                                    type: "partner/businessList",
                                    payload: { id: record.id },
                                    callback: (res) => {
                                        if (res.code==0) {
                                            partnerList.list.forEach(v=> {
                                                if (v.id==record.id) {
                                                    v.expandData = res.data.list
                                                }
                                            })
                                        }
                                    }
                                });
                                expanded ? expandedRowKeys.push(record.id) : expandedRowKeys = expandedRowKeys.filter(v => v !== record.id);
                                this.setState({ expandedRowKeys });
                            }}
                            expandedRowKeys={expandedRowKeys}
                            pagination={{
                                showSizeChanger: false,
                                showQuickJumper: false,
                                current: this.search.page,
                                pageSize: 10,
                                total: partnerList.total
                            }}
                            onChange={({ current }) => {
                                this.search.setPage(current).push();
                            }}
                            rowKey={record => record.id}
                        />
                    </View>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
