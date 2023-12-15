import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoins } from '../features/coins/coinSlice'
import millify from 'millify'
import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons'
import { Col, Typography, Select } from 'antd'

const { Title, Text } = Typography
const  { Option } = Select

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const coins = useSelector(state => state.coins)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCoins({coinId: coinId}))
  },[])

  const cryptoDetails = coins.coins.data?.coin
  console.log(cryptoDetails)

  if(coins.loading) {
    return <p>Loading...</p>
  }

  const time = ['3h','24h', '7d', '30d', '1y']

  const stats = [
    { title: 'Price to USD', values: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`, icon: <DollarCircleOutlined />},
    { title: 'Rank', values: cryptoDetails.rank , icon: <NumberOutlined />},
    { title: '24h volume', values: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`, icon: <ThunderboltOutlined />},
    { title: 'Market Cap', values: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined />},
    { title: 'All time high', values: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: <TrophyOutlined />},
  ]

  const genericStats = [
    { title: 'Number of markets', values: cryptoDetails.numberOfMarkets, icon: <DollarCircleOutlined />},
    { title: 'Number of Exchanges', values: cryptoDetails.numberOfExchanges, icon: <DollarCircleOutlined />},
    { title: 'Approves Supply', values: cryptoDetails.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined />},
    { title: 'Total Supply', values: `$ ${millify(cryptoDetails.totalSupply)}`, icon: <ExclamationCircleOutlined />},
    { title: 'Circulating Supply', values: `$ ${millify(cryptoDetails.circulatingSupply)}`, icon: <ExclamationCircleOutlined />},
  ]
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
          <Title level={2} className='coin-name'>
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
            <p>
              {cryptoDetails.name} live price in USD.
              View value statistics, market cap and supply
            </p>
          </Title>
      </Col>
      <Select defaultValue='7d' className='select-timeperiod' placeholder='Select Time Period' onChange={(value) => setTimePeriod(value)}>
          {time.map((date) => <Option key={date}>{date}</Option>)}
      </Select>
      <Col className='stats-container' style={{display: 'flex', justifyContent: 'center'}}>
        <Col className='coin-value-statisticss' style={{height: '300px', width: '300px', border: '1px solid red'}}>
          <Col className='coin-value-stat-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} values Statistics
            </Title>
            <p>
              An overview showing the stats of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map(({ icon, title, values}) =>(
            <Col className='coin-stats' style={{display: 'flex', justifyContent: 'space-between'}}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>
                {values}
              </Text>
            </Col>
          ))}
        </Col> 
        <Col className='other-stats-info' style={{height: '300px', width: '300px', border: '1px solid red'}}>
          <Col className='coin-value-stat-heading'>
            <Title level={3} className='coin-details-heading'>
              Extra Statistics
            </Title>
            <p>
              An overview showing the stats of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({ icon, title, values}) =>(
            <Col className='coin-stats' style={{display: 'flex', justifyContent: 'space-between'}}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>
                {values}
              </Text>
            </Col>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails