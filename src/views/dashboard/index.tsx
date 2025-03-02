import React, { memo, useEffect } from 'react'
import { Descriptions, Avatar, DescriptionsProps, Card } from 'antd'
import styles from './index.module.less'
import { RedoOutlined } from '@ant-design/icons'
import * as echarts from 'echarts'

const dashboard = memo(() => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: 'ross'
    },
    {
      key: '2',
      label: '邮箱',
      children: '981384763@qq.com'
    },
    {
      key: '3',
      label: '状态',
      children: '在职'
    },
    {
      key: '4',
      label: '手机号',
      children: 'empty'
    },
    {
      key: '5',
      label: '地址',
      children: '山东青岛'
    }
  ]

  useEffect(() => {
    const lineChartDom = document.querySelector('#lineChart') as HTMLDivElement
    const lineChart = echarts.init(lineChartDom)
    lineChart.setOption({
      legend: {
        orient: 'horizontal', // 标题方向
        data: ['订单', '流水']
      },
      grid: {
        left: 50,
        right: 25,
        bottom: 25
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          data: [150, 230, 224, 218, 135, 147, 260, 123, 212, 312, 212, 123],
          type: 'line'
        },
        {
          name: '流水',
          data: [1300, 2230, 2124, 2138, 2135, 3147, 1260, 3123, 2212, 3312, 2212, 1323],
          type: 'line'
        }
      ]
    })

    const pieChartDom1 = document.querySelector('#pieChart1') as HTMLDivElement
    const pieChart1 = echarts.init(pieChartDom1)
    pieChart1.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    })
  }, [])
  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <Avatar className={styles.img} src='https://api.dicebear.com/7.x/miniavs/svg?seed=1' />
        <Descriptions className={styles.content} title='用户信息'>
          <Descriptions.Item label='用户名'>ross</Descriptions.Item>
          <Descriptions.Item label='年龄'>36</Descriptions.Item>
          <Descriptions.Item label='手机号'>17685783192</Descriptions.Item>
          <Descriptions.Item label='状态'>在职</Descriptions.Item>
          <Descriptions.Item label='地址'>山东青岛</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.board}>
        <div className={styles.boardItem}>
          <div className={styles.title}>司机数量</div>
          <div className={styles.content}>278600个</div>
        </div>
        <div className={styles.boardItem}>
          <div className={styles.title}>总流水</div>
          <div className={styles.content}>39842000元</div>
        </div>
        <div className={styles.boardItem}>
          <div className={styles.title}>总订单</div>
          <div className={styles.content}>13060000单</div>
        </div>
        <div className={styles.boardItem}>
          <div className={styles.title}>开通城市</div>
          <div className={styles.content}>120座</div>
        </div>
      </div>
      <Card title='订单和流水走势图' extra={<RedoOutlined className={styles.refresh} />}>
        <div id='lineChart' className={styles.chart}></div>
      </Card>
      <Card title='司机分布' extra={<RedoOutlined className={styles.refresh} />}>
        <div className={styles.chartWrapper}>
          <div id='pieChart1' className={styles.pieChart}></div>
          <div id='pieChart2' className={styles.pieChart}></div>
        </div>
      </Card>
    </div>
  )
})

export default dashboard
