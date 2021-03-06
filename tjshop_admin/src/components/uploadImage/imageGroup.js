import * as React from 'react'
import { Icon } from 'antd';
import { View } from "@/components/flexView";
import styles from './index.css'
import update from 'immutability-helper'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
const { Component } = React
const SortableItem = SortableElement(({ value }) =>
    <li className={styles.sortableListLi}>{value}</li>
);

const SortableList = SortableContainer(({ items, pressDelay, children }) => {
    return (
        <ul className={styles.sortableList}>
            {items.length > 0 ? items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )) : null}
            <li>{children}</li>
        </ul>
    );
});

export default class ImageGroup extends Component{
    static defaultProps = {
        onChange: (any) => {
        },
        update: (string, object) => {
        },
        addButton: <View />
    }
    onSortEnd = (param, event) => {
        const { url, onChange, } = this.props
        let _url = [...url]
        _url = arrayMove(_url, param.oldIndex, param.newIndex)
        onChange(update(url, { $set: _url }))
    }
    onSortStart = (param, event) => {
    }

    removeCard = (index) => {
        const { url, onChange,onDel } = this.props
        onDel && onDel()
        onChange(update(url, {
            $splice: [[index, 1]],
        }));
    }

    render() {
        const { url, addButton, preview, size, type } = this.props
        const sizeStyle = size ? {width:size,height:size } : type==2?{width:'200px', height: '120px'} :{}
        const items = Array.isArray(url)&&url.length > 0 ? url.map((_url, index) => (
            <View
                style={sizeStyle}
                key={_url}
            >
                <div style={{ marginRight: 15, marginBottom: 15, ...sizeStyle }}>
                    <View style={sizeStyle} className={styles.view2}>
                        <View className={styles.view3}>
                            <span className={styles.span1}>
                               {type!==2&& <a
                                    style={{ marginRight: 10 }}
                                    className={styles.icon1}
                                    onClick={() => {
                                        preview(_url)
                                    }}
                                >
                                    <Icon type="eye-o" />
                                </a>}
                                <a  style={type==2?{
                                    position: 'absolute',
                                    top: '30%',
                                    left: '45%'
                                }:{}}
                                    className={styles.icon1}
                                    onClick={() => {
                                        this.removeCard(index)
                                    }}
                                >
                                    <Icon type="delete" />
                                </a>
                            </span>
                            {type==2
                                ? <video style={{
                                    width: '200px',
                                    height: '100px'
                                }} src={url}></video>
                                : <img
                                    className={styles.img}
                                    src={_url}
                                />}
                        </View>
                    </View>
                </div>
            </View>
        )) : []
        return (
            <View className={styles.view4}>
                <SortableList items={items} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} axis={'xy'}>
                    {addButton}
                </SortableList>
            </View>
        )
    }
}

