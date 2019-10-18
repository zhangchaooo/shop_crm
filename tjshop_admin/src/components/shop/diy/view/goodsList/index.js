import React, { Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";

export default class Index extends Component {
    render() {
        const { data, options } = this.props;
        const _data = Array.isArray(data)?data:data.data
        const { layout_style, goods_display_field } = options;
        let showTitle = goods_display_field.indexOf("title") > -1;
        let showPrice = goods_display_field.indexOf("price") > -1;
        let showMarketPrice = goods_display_field.indexOf("market_price") > -1;
        return (
            <div className={styles[`goodsListWarp${layout_style}`]}>
                {
                    _data.map((item, index) => {
                        if (layout_style === 1) {
                            return this.small(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 2) {
                            return this.big(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 3) {
                            return this.oneBigTwoSmall(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 4) {
                            return this.list(item, index, showTitle, showPrice, showMarketPrice);
                        }
                    })
                }
            </div>
        );
    }

    // small(item: goodsItem, index, showTitle, showPrice, showMarketPrice) {
    small(item, index, showTitle, showPrice, showMarketPrice) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        const imgWidth = (375 - 18 - 2) / 2 + "px";
        return (
            <div
                className={styles.smallWarp}
                key={index}
                style={{ width: imgWidth, marginRight: index % 2 === 0 ? "6px" : 0 }}
            >
                <div className={styles.smallImgWarp}>
                    <Image src={item.img} style={{ width: imgWidth, height: imgWidth }} />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? `￥${item.price}` : ""}
                    </p>
                </div>
            </div>
        );
    }

    big(item, index, showTitle, showPrice, showMarketPrice) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        return (
            <div
                className={styles.bigWarp}
                key={index}
            >
                <div className={styles.bigImgWarp}>
                    <Image src={item.img} />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? `￥${item.price}` : ""}
                    </p>
                </div>
            </div>
        );
    }

    oneBigTwoSmall(item, index, showTitle, showPrice, showMarketPrice) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        const imgWidth = (375 - 18 - 2) / 2 + "px";
        return (
            <div
                key={index}
                style={{
                    width: `${
                        (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "100%"
                        }`,
                    marginRight: `${
                        (index + 1) % 3 === 2 ? "6px" : "0"
                        }`

                }}
            >
                <div className={styles.smallImgWarp}>
                    <Image src={item.img}
                           style={{
                               width: `${
                                   (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "100%"
                                   }`,
                               height: `${
                                   (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "auto"
                                   }`
                           }}

                    />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? `￥${item.price}` : ""}
                    </p>
                </div>
            </div>
        );
    }

    list(item, index, showTitle, showPrice, showMarketPrice) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        return (
            <div
                className={styles.listWarp}
                key={index}
            >
                <div className={styles.listImgWarp}>
                    <Image src={item.img} />
                </div>
                <div className={styles.listRight}>
                    <p className={`${styles.listTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <p className={styles.listPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? `￥${item.price}` : ""}
                    </p>
                </div>
            </div>
        );
    }
}
