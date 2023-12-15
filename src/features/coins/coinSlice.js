import  { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


let baseUrl = 'https://coinranking1.p.rapidapi.com/coins'

export const fetchCoins = createAsyncThunk('coins/fetchcoin', async ({count, coinId}) => {
    const options = {
        params: {
            limit: count,
        },
      headers: {
        'X-RapidAPI-Key': 'e12746aceamsh699f10be78982b1p1af910jsn0cc3c4d70ec0',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
      }
    };
    if(coinId){
        baseUrl = `https://coinranking1.p.rapidapi.com/coin/${coinId}`
    }
    const response = await axios.get(baseUrl, options)
    return response.data
})

const initialState = {
    loading: false,
    coins: [],
    error: ''
}

const coinSlice = createSlice({
    name: 'coin',
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchCoins.fulfilled, (state, action) => {
            console.log('API response:', action.payload)
            state.loading = false
            state.coins = action.payload
            state.error = ''
        })
        builder.addCase(fetchCoins.rejected, (state, action) => {
            state.loading = false
            state.coins = []
            state.error = action.error.message
        }) 
    }
})

export default coinSlice.reducer

// const options = {
//     params: {
//         referenceCurrencyUuid: 'yhjMzLPhuIDl',
//         timePeriod: '24h',
//         'tiers[0]': '1',
//         orderBy: 'marketCap',
//         orderDirection: 'desc',
//         limit: '50',
//         offset: '0'
//     },
//   headers: {
//     'X-RapidAPI-Key': 'e12746aceamsh699f10be78982b1p1af910jsn0cc3c4d70ec0',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//   }
// };

// export const fetchCoins = createAsyncThunk('coins/fetchcoin', () => {
//     return axios.get(baseUrl, options)
//     .then(response => response.data)
// })