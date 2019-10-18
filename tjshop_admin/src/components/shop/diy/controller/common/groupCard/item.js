import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import UploadImage from "@/components/uploadImage";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import ActionLink from "@/components/shop/diy/controller/common/actionLink";
import ColorPicker from "@/components/public/colorPicker";
import PhotoGallery from "@/components/public/photoGallery";
import { UploadGroupImage } from "@/components/uploadImage";
import styles from "./index.css";
import { Form, Input, Icon, Modal } from "antd";

const FormItem = Form.Item;
// 返回组内一条的数据格式
const _response = {
    title: "",
    img: {
        url: ""
    },
    link: {
        action: "portal",
        param: {}
    },
    background_color: "#FFFFFF",
    font_color: "#333333"
};
export default class GroupCardItem extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        img: PropTypes.object,
        link: PropTypes.object,
        backgroundColor: PropTypes.string,
        fontColor: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };
    // 传值、返回的值根据后端接口返回规律进行正确返回，临时解决方案
    //     title:''
    // img: {
    //     url: ''
    // },
    //     link:{
    //         action: 'portal',
    //         param: {}
    //     }
    // backgroundColor: '#FFFFFF'},
    // fontColor:'#333333},
    static defaultProps = {
        title: null,
        img: null,
        link: null,
        backgroundColor: null,
        fontColor: null,    
        onChange: (data) => {
        }
    };
    state = {
        response: _response,
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: "",
    };

    constructor(props) {
        super(props);
        let __response = _response;
        const { title, img, link, backgroundColor, fontColor } = this.props;
        if (!title && title !== '') {
            delete __response["title"];
        }
        if (!img) {
            delete __response["img"];
        }
        if (!link) {
            delete __response["link"];
        }
        if (!backgroundColor) {
            delete __response["background_color"];
        }
        if (!fontColor) {
            delete __response["font_color"];
        }
        this.state = {
            response: __response
        };
    }
    openPhotoGallery = ({ photoGalleryOnOk }) => {
        this.setState({
            photoGalleryVisible: true,
            photoGalleryOnOk
        });
    };
    onCancelPhotoGallery = () => {
        this.setState({
            photoGalleryVisible: false
        });
    };
    onOkPhotoGallery = (e) => {
        this.state.photoGalleryOnOk(e);
        this.onCancelPhotoGallery();
    };
    previewCancel = () => {
        this.setState({
            previewVisible: false
        });
    };
    // : { previewImage: string }
    openPreviewModal = ({ previewImage }) => {
        this.setState({
            previewVisible: true,
            previewImage
        });
    };

    render() {
        const { title, img, link, backgroundColor, fontColor } = this.props;

        let url = img? [img.url] : []
        if(!img || img.url.indexOf('data:image/png;base64')!=-1 || !img.url) {
            url = []
        }

        return <div className={styles.itemBot}>
            {img ? <div className={styles.itemLeft}>
            <UploadGroupImage
                size='80px'
                url={url}
                single={true}
                onDel={()=>{
                    // let { url } = this.state;
                    // url = [];
                    // this.setState({url})
                    this.setResponse("img", { url: require("@/assets/images/page/view/image-nav-default.png") });
                }}
                onClick={(onChange, values) => {
                    this.openPhotoGallery({
                        photoGalleryOnOk: (e) => {
                            e.length = 1;
                            // let { url } = this.state;
                            // url = e;
                            this.setResponse("img", { url: e[0] });
                            values = e ? e : [];
                            onChange([ ...e]);
                        }
                    });
                }}
                preview={(previewImage) => {
                    this.openPreviewModal({
                        previewImage
                    });
                }}
            />
                {/* <UploadImage
                    onChange={(e) => {

                        this.setResponse("img", { url: e });
                    }}
                    is_save={1}
                >
                    {
                        img.url&&img.url.length ?
                            <img
                                src={img.url}
                                alt=''
                                style={{ width: "80px", backgroundColor }}
                            /> :
                            <div className={styles.uploadBtn}>
                                <Icon type='plus' />
                                <p>上传图标</p>
                            </div>
                    }
                </UploadImage> */}
            </div> : null}
            <div style={{ flex: 1 }}>
                {title || title === '' ? <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    <Input
                        style={{ width: 240 }}
                        placeholder='标题必填'
                        value={title}
                        onChange={(e) => {
                            this.setResponse("title", e.target.value);
                        }}
                    />
                </FormItem> : null}
                {link ? <FormItem
                    {...formItemLayout}
                    label="链接"
                >
                    <ActionLink
                        type={link.action}
                        selectGoodsVisible={false}
                        selectPageVisible={false}
                        inputUrlVisible={false}
                        onChange={(res) => {
                            this.setResponse("link", {
                                action: res.action,
                                param: res.param
                            });
                        }}
                        value={() => {
                            switch (link.action) {
                                case "portal":
                                    return;
                                case "goods":
                                    return link.param;
                                case "page":
                                    return link.param;
                                case "url":
                                    return link.param;
                            }
                        }}
                    />
                </FormItem> : null}
                {backgroundColor ? <FormItem
                    {...formItemLayout}
                    label="背景颜色"
                >
                    <ColorPicker
                        color={backgroundColor}
                        colorChange={(color) => {
                            this.setResponse("background_color", color.hex);
                        }}
                    />
                </FormItem> : null}
                {fontColor ? <FormItem
                    {...formItemLayout}
                    label="文字颜色"
                >
                    <ColorPicker
                        color={fontColor}
                        colorChange={(color) => {
                            this.setResponse("font_color", color.hex);
                        }}
                    />
                </FormItem> : null}
            </div>
            <PhotoGallery
                visible={this.state.photoGalleryVisible}
                onCancel={this.onCancelPhotoGallery}
                onOk={this.onOkPhotoGallery}
            />
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.previewCancel}>
                <img alt="example" style={{ width: "100%" }} src={this.state.previewImage} />
            </Modal>
        </div>;
    }

    setResponse(field, value) {
        const { onChange } = this.props;
        let { response } = this.state;
        response[field] = value;
        onChange({ ...response });
    }
}
