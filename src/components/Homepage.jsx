import React, { useEffect } from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoins } from '../features/coins/coinSlice'
import { CryptoCurrencies } from '../components'

// import { useGetCryptosQuery } from '../services/cryptoapi'

const { Title } = Typography

const Homepage = () => {
  const coins = useSelector(state => state.coins)
  console.log(coins)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCoins())
  },[])
  const globalStats = coins.coins.data?.stats
  console.log(globalStats)
  return (
    <>
      <Title level={2} className='heading'>GLobal crypto stats</Title>
      <Row>
        <Col span={12}><Statistic title='Total cryptocurrencies' value={globalStats?.total} /></Col>
        <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)} /></Col>
        <Col span={12}><Statistic title='Total Marketcap' value={millify(globalStats?.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title='Total Makets' value={millify(globalStats?.total24hVolume)} /></Col>
        <Col span={12}><Statistic title='Total 24h volume' value={millify(globalStats?.totalMarkets)} /></Col>
      </Row>
      <div className='home-heading-container' style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Title level={2} className='home-title'>Top 10 Crryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <CryptoCurrencies simplified />
    </>
  )
}

export default Homepage