import React, { Component } from "react";
import { Row, Col, Button, Card ,message} from "antd";
import { View } from "@/components/flexView";
import styles from "@/styles/shop/shopSort.css";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "dva";

@connect(({ shop, loading }) => ({
    shopInfo: shop.info.data,
    shopInfoLoading: loading.effects["shop/info"],
    setGoodsCategoryStyleLoading: loading.effects["shop/setGoodsCategoryStyle"],
}))
export default class Category extends Component {
    static defaultProps = {
        shopInfo: {
            info: {}
        },
        shopInfoLoading: true,
        setGoodsCategoryStyleLoading:false
    };
    state = {
        availableList: [
            {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_3.jpg"),
                title: "三级分类"
            }, {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_2.jpg"),
                title: "二级分类"
            }, {
                link: "http://www.domain.cn/mobile",
                img: require("@/assets/images/shop/fen_1.jpg"),
                title: "一级分类"
            }
        ]
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info"
        });
    }

    render() {
        const { availableList } = this.state;
        const { shopInfo, setGoodsCategoryStyleLoading } = this.props;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Row gutter={16}>
                        <Col span={16}>
                            <View>
                                <Row gutter={16}>
                                    {
                                        availableList.map((availableListItem, index) =>
                                            <Col xl={8} lg={8} key={index}>
                                                <View className={styles.availableListItemWarp}>
                                                    <View
                                                        className={styles.imgWarp}
                                                        style={
                                                            shopInfo && shopInfo.goods_category_style === index+1 ? {
                                                                borderColor: "#188fff"
                                                            } : {}
                                                        }
                                                    >
                                                        <img
                                                            src={availableListItem.img}
                                                            alt=''
                                                        />
                                                        <View
                                                            className={
                                                                shopInfo && shopInfo.goods_category_style !== index+1 ?
                                                                    styles.hoverShow : styles.hoverHide
                                                            }
                                                        >
                                                            <Button
                                                                type='primary'
                                                                loading={setGoodsCategoryStyleLoading}
                                                                onClick={() => {
                                                                    const {dispatch} = this.props
                                                                    dispatch({
                                                                        type:'shop/setGoodsCategoryStyle',
                                                                        payload: {
                                                                            goods_category_style: index+1
                                                                        },
                                                                        callback: (response) => {
                                                                            if (response.code === 0) {
                                                                                message.success("已保存");
                                                                            } else {
                                                                                message.error(response.message);
                                                                            }
                                                                        }
                                                                    });
                                                                }}
                                                            >
                                                                启用
                                                            </Button>
                                                        </View>
                                                    </View>
                                                    <p
                                                        style={
                                                            shopInfo && shopInfo.goods_category_style === index+1 ? {
                                                                color: "#188fff"
                                                            } : {}
                                                        }
                                                    >
                                                        {shopInfo && shopInfo.goods_category_style === index+1 ? "当前使用：" : ""}{availableListItem.title}
                                                    </p>
                                                </View>
                                            </Col>
                                        )
                                    }
                                </Row>
                            </View>
                        </Col>
                    </Row>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
