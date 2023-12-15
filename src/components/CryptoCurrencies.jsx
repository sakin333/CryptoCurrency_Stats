import React, { useEffect, useMemo, useState } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCoins } from '../features/coins/coinSlice'

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const coins = useSelector(state => state.coins)
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  console.log(searchTerm)

  useEffect(() => {
    dispatch(fetchCoins({ count: count}))
  },[])

  useEffect(() => {
    let checkedData = []
    if(coins.coins.data) {
        checkedData = coins.coins.data?.coins.filter((coin) => 
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    setFilteredData(checkedData)
  },[coins, searchTerm])

  // Memoize the value to prevent unnecessary re-renders
  const cryptos = useMemo(() => (searchTerm ? filteredData : coins.coins.data?.coins || []), [coins, searchTerm, filteredData])

  console.log(cryptos)
  return (
    <>
      {!simplified && (
      <div className='search-crypto' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px'}}>
        <Input placeholder='Search cryptocurrencies' onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '300px'}}/>
      </div>
      )}
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((item) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={item.uuid}>
            <Link to={`/crypto/${item.uuid}`}>
              <Card
                title={`${item.rank}. ${item.name}`}
                extra={<img className='crypto-image' src={item.iconUrl} height={30} width={30} />}
                hoverable
              >
                <p>Price: {millify(item.price)}</p>
                <p>Market cap: {millify(item.marketCap)}</p>
                <p>Daily change: {millify(item.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies