import React, { Component } from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import styles from '@/styles/index/index.css'

import Quantity from '@/components/analysis/quantity'
import Charts from '@/components/analysis/charts'

@connect()
class Analysis extends Component {
  render() {
    return (
      // eslint-disable-next-line react/jsx-indent
      <Card className={styles.indexWarp} bordered={false}>
        <Row gutter={24}>
          <Col span={17 + 7}>
            <Quantity {...this.props} />
            <Charts {...this.props} />
          </Col>
        </Row>
      </Card>
    )
  }
}
export default Analysis
