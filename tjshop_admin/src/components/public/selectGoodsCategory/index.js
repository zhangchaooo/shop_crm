import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Tree } from "antd";
import { connect } from "dva";
import Arr from "@/utils/array";

const TreeNode = Tree.TreeNode;

@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class SelectGoodsCategory extends Component {
    static defaultProps = {
        visible: false,
        goodsCategory: { list: [] },
        goodsCategoryLoading: false
    };

    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            value: props.value ? props.value : null,
            categoryTree: []
        };
    }

    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    componentDidMount() {
        const { dispatch, goodsCategory,goodsCategoryLoading } = this.props;
        // if (goodsCategory.list.data.list && goodsCategory.list.data.list.length === 0 && !goodsCategoryLoading) {
            dispatch({
                type: "goodsCategory/list",
                callback: (response) => {
                    // this.setState({ categoryTree: Arr.toTree(response.data.list) });
                    this.setState({ categoryTree: response.data });
                }
            });
        // }
    }

    onSelect = (selectedKeys) => {
        const key = selectedKeys[0];
        const { goodsCategory } = this.props;
        this.setState({
            value: key
        });

        // if (Array.isArray(goodsCategory.list.data)) {
        //     const category = goodsCategory.list.data.find((value) => {
        //         return Number(key) === Number(value.id);
        //     });
        //     this.setState({
        //         value: category ? category : null
        //     });
        // }
    };

    render() {
        const { visible } = this.props;
        const { categoryTree } = this.state;
        if (categoryTree) {
            const { expandedKeys, autoExpandParent } = this.state;
            const loop = categoryTree => categoryTree.map((item) => {
                const title = <span>{item.name}</span>;
                if (item.children) {
                    return (
                        <TreeNode key={item.id} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.id} title={title} />;
            });
            return (
                <Modal
                    title="选择商品分类页面"
                    visible={visible}
                    onCancel={() => {
                        this.props.close();
                    }}
                    style={{ top: 20 }}
                    width={756}
                    okType={"primary"}
                    okText={"确定"}
                    cancelText={"取消"}
                    onOk={() => {
                        this.props.getState(this.state);
                    }}
                    okButtonProps={{ disabled: this.state.value === null }}
                >
                    <View>
                        <Tree
                            onExpand={this.onExpand}
                            expandedKeys={expandedKeys}
                            autoExpandParent={autoExpandParent}
                            onSelect={this.onSelect}
                        >
                            {loop(categoryTree)}
                        </Tree>
                    </View>
                </Modal>
            );
        } else {
            return null;
        }
    }
}
