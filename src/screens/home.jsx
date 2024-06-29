/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React, { useEffect} from 'react';
import { YStack, StyledSafeAreaView, StyledText } from 'fluent-styles/lib/module';
import { useLowStocks } from '../hooks/useDashboard';
import { queryAllProducts } from '../model/product';
// import { queryAllOrders } from '../model/orders';
import { queryOrderItemByOrderId, queryOrderItemById } from '../model/orderItems';
import { getDailyTransactionTrend, getMonthlySales,getLowStocks,getPreviousDayTransaction, getBestSellingProducts, getDailyTransaction, getDailyTransactionPercentageChange } from '../model/dashboard';


const Home = () => {

  const { data, error } = useLowStocks(100)

  useEffect(()=> {
    async function load(){
    const result =  await queryAllProducts()
      console.log("................", result)
    }

    load()
  },[])

  console.log("................", { data, error })

  return (
    <StyledSafeAreaView>
      <YStack flex={1}
        marginHorizontal={16}
        justifyContent='center' alignItems='center'
      >
        {/* <Header /> */}
        <StyledText
        >
          See Your Changes
        </StyledText>

      </YStack>
    </StyledSafeAreaView>
  );
}



export default Home;
