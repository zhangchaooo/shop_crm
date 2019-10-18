import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { Popover, Tag, Input, Modal } from "antd";
import SelectGoods from "@/components/public/selectGoods/index";
import SelectPage from "@/components/public/selectPage/index";
import SelectGoodsCategory from "@/components/public/selectGoodsCategory/index";

const { TextArea } = Input;

// export type LinkActionType = 'portal' | 'goods' | 'page' | 'url' | 'goods_category'
// type Props = {
//     onChange: Function,
//     type: LinkActionType,
//     value
// }
// type State = {
//     urlValue: {
//         url: string
//     },
//     selectGoodsVisible: boolean,
//     selectPageVisible: boolean,
//     selectGoodsCategoryVisible:boolean,
//     inputUrlVisible: boolean,
// }
// todo onChange() :xxx 约束
export const linkInfo = {
    portal: {
        type: "portal",
        name: "首页链接",
        alias: "首页"
    },
    goods: {
        type: "goods",
        name: "商品链接",
        alias: "商品"
    },
    page: {
        type: "page",
        name: "自定义页面",
        alias: "自定义页面"
    },
    url: {
        type: "url",
        name: "自定义链接",
        alias: "链接地址"
    },
    goods_category: {
        type: "goods_category",
        name: "商品分类链接",
        alias: "商品分类"
    }
};

export default class ActionLink extends Component {
    state = {
        urlValue: {
            url: ""
        },
        selectGoodsVisible: false,
        selectPageVisible: false,
        selectGoodsCategoryVisible: false,
        inputUrlVisible: false
    };
    onClick = (linkAction) => {
        const props = { ...this.props };
        switch (linkAction) {
            case "portal":
                props.onChange({
                    action: "portal",
                    param: {}
                });
                break;
            case "goods":
                this.setState({
                    selectGoodsVisible: true
                });
                break;
            case "page":
                this.setState({
                    selectPageVisible: true
                });
                break;
            case "goods_category":
                this.setState({
                    selectGoodsCategoryVisible: true
                });
                break;
            // TODO
            case "url":
                this.setState({
                    inputUrlVisible: true
                });
                break;
        }
    };


    render() {
        const props = { ...this.props };
        const { type, onChange } = props;
        const { selectGoodsVisible, selectPageVisible, selectGoodsCategoryVisible, inputUrlVisible, urlValue } = this.state;
        return (
            <View>
                <View>
                    <Popover
                        placement="bottom"
                        content={
                            <View className={`${styles.actionLinkPopoverContent}`}>
                                <a onClick={() => {
                                    this.onClick("portal");
                                }}>{linkInfo.portal.name}</a>
                                <a onClick={() => {
                                    this.onClick("goods");
                                }}>{linkInfo.goods.name}</a>
                                <a onClick={() => {
                                    this.onClick("goods_category");
                                }}>{linkInfo.goods_category.name}</a>
                                <a onClick={() => {
                                    this.onClick("page");
                                }}>{linkInfo.page.name}</a>
                                <a onClick={() => {
                                    this.onClick("url");
                                }}>{linkInfo.url.name}</a>
                            </View>
                        }
                    >
                        <Tag color="#108ee9">{linkInfo[type]?linkInfo[type].alias: '自定义链接'}</Tag>
                        <a type="primary">修改</a>
                    </Popover>
                </View>
                <SelectGoods
                    visible={selectGoodsVisible}
                    multiSelect={false}
                    close={() => {
                        this.setState({
                            selectGoodsVisible: false
                        });
                    }}
                    onOk={(state) => {
                        this.setState({
                            selectGoodsVisible: false
                        }, () => {
                            onChange({
                                action: "goods",
                                param: {
                                    id: state.checkedData[0].id
                                }
                            });
                        });
                    }}
                />
                <SelectPage
                    visible={selectPageVisible}
                    close={() => {
                        this.setState({
                            selectPageVisible: false
                        });
                    }}
                    getState={(state) => {
                        this.setState({
                            selectPageVisible: false
                        }, () => {
                            onChange({
                                action: "page",
                                param: {
                                    id: state.value.id
                                }
                            });
                        });
                    }}
                />
                <SelectGoodsCategory
                    visible={selectGoodsCategoryVisible}
                    close={() => {
                        this.setState({
                            selectGoodsCategoryVisible: false
                        });
                    }}
                    getState={(state) => {
                        this.setState({
                            selectGoodsCategoryVisible: false
                        }, () => {
                            onChange({
                                action: "goods_category",
                                param: {
                                    id: state.value.id
                                }
                            });
                        });
                    }}
                />
                <Modal
                    title="自定义链接"
                    visible={inputUrlVisible}
                    onCancel={() => {
                        this.setState({
                            inputUrlVisible: false
                        });
                    }}
                    onOk={() => {
                        this.setState({
                            inputUrlVisible: false
                        }, () => {
                            onChange({
                                action: "url",
                                param: urlValue
                            });
                        });
                    }}
                    style={{ top: 20 }}
                    width={756}
                >
                    <TextArea
                        placeholder="请输入自定义链接"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value={urlValue && typeof(urlValue["url"]) !== "undefined" ? urlValue.url : ""}
                        onChange={(e) => {
                            this.setState({
                                urlValue: {
                                    url: e.target.value
                                }
                            });
                        }} />
                </Modal>
            </View>
        );
    }
}
