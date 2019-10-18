import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Tabs, Button, Row, Col, Checkbox, Pagination, Spin, Input, DatePicker } from "antd";
import styles from "./index.css";
import { connect } from "dva";
import UploadImage from "@/components/uploadImage";
import Image from "@/components/image";
import moment from "moment"

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const Search = Input.Search;
const { RangePicker } = DatePicker;
function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf('day');
}

@connect(({ image, loading }) => ({
    imageList: image.list.data,
    imageListLoading: loading.effects["image/list"]
}))
export default class PhotoGallery extends Component {
    static defaultProps = {
        imageList: {
            total_number: 0,
            list: []
        },
    };
    state = {
        page: 1,
        limit: 18,
        checkedImg: [],
        keywords: null,
        create_time: []
    };
    componentDidMount() {
        this.initImgList();
    }
    initImgList() {
        const { dispatch, type } = this.props;
        const { page, limit, create_time } = this.state
        dispatch({
            type: "image/list",
            payload: {
                page,
                limit,
                create_time,
                type,
            }
        });
    }
    clearCheckedValues = () => {
        this.setState({
            checkedImg: [],
        })
    }
    render() {
        const {
            visible,
            onCancel,
            onOk,
            type
        } = this.props;
        return (
            <Modal
                title={type==2?'我的视频':"我的图库"}
                cancelText="取消"
                okText="确定"
                visible={visible}
                bodyStyle={{
                    padding: "0"
                }}
                style={{ top: 20 }}
                width={800}
                onCancel={() => {
                    onCancel();
                    this.clearCheckedValues();
                }}
                onOk={() => {
                    const result = [
                        ...this.state.checkedImg,
                    ].map(item=>{
                        let index = item.indexOf("-")
                        return item.substr(index+1)
                    })
                    onOk(result);
                    this.clearCheckedValues();
                }}
            >
                <View>
                    <this.imgList />
                </View>
            </Modal>
        );
    }

    imgList = () => {
        const { checkedImg } = this.state;
        const { imageList, imageListLoading, type } = this.props;
        const { list } = imageList;
        return (
            <View className={styles.imgList}>
                <View className={styles.imgListTop} style={{marginTop: 10}}>
                    <UploadImage
                        type={type}
                        onChange={(e) => {
                            this.initImgList();
                        }}
                        is_save={1}
                    >
                        <Button type="primary">{type==2?'上传视频':'上传图片'}</Button>
                    </UploadImage>
                    {/* <RangePicker 
                        style={{width: 318}}
                        disabledDate={disabledDate}
                        onChange={(date)=>{
                            this.setState({
                                create_time: date.length ? [
                                    moment(date[0]).format('X'),
                                    moment(date[1]).format('X')
                                ] : []
                            },()=>{
                                this.initImgList()
                            })
                        }} 
                    /> */}
                </View>
                <Spin spinning={imageListLoading}>
                    <CheckboxGroup
                        value={checkedImg}
                        onChange={checkedImg => {
                            this.setState({ checkedImg });
                        }}
                        style={{ display: "block" }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={30} type={"flex"}>
                                {list.map((item, index) => (
                                    <Col
                                        span={4}
                                        key={index}
                                        style={{ marginTop: 15 }}
                                    >
                                        <Checkbox
                                            value={`${item.id}-${item.url}`}
                                            className={styles.checkbox}
                                        >
                                            <View
                                                className={styles.imgItem}
                                                style={
                                                    checkedImg.indexOf(`${item.id}-${item.url}`) > -1 ? {
                                                        borderColor: "#188fff"
                                                    } : {}
                                                }
                                            >
                                                {
                                                    item.title ? <p className={styles.title}>{item.title}</p> : null
                                                }
                                                <div>
                                                    {type==2
                                                    ? <video src={item.url}></video>
                                                    : <Image
                                                        src={item.url}
                                                        style={{ minHeight: 101.33 }}
                                                    />}
                                                </div>
                                            </View>
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </View>
                    </CheckboxGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        size="small"
                        showSizeChanger={false}
                        showQuickJumper={false}
                        current={this.state.page}
                        pageSize={this.state.limit}
                        total={imageList.total}
                        onChange={(page, limit) => {
                            this.setState({
                                page,
                                limit
                            }, () => {
                                this.initImgList();
                            });
                        }}
                        pageSizeOptions={[`${this.state.limit}`]}
                    />
                </View>
            </View>
        );
    }
}
