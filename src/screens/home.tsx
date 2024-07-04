/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React, { useEffect } from 'react';

import { YStack, StyledSafeAreaView, theme, StyledText, StyledButton, StyledInput } from 'fluent-styles';
import { useLowStocks } from '../hooks/useDashboard';
import { queryAllProducts } from '../model/product';
// import { StyledInput } from '../utiles/form';
// import { queryAllOrders } from '../model/orders';r
// import { queryOrderItemByOrderId, queryOrderItemById } from '../model/orderItems';
// import { getDailyTransactionTrend, getMonthlySales,getLowStocks,getPreviousDayTransaction, getBestSellingProducts, getDailyTransaction, getDailyTransactionPercentageChange } from '../model/dashboard';



const Home = () => {

  const { data, error } = useLowStocks(100)

  useEffect(() => {
    async function load() {
      const result = await queryAllProducts()
      console.log("................", result)
    }

    load()
  }, [])

  console.log("................", { data, error })

  return (
    <StyledSafeAreaView >
      <YStack 
    flex={1}
        marginHorizontal={16}
        justifyContent='center' alignItems='center'
      >
        {/* <Header /> */}
        <StyledText
        >
          See Your Changes
        </StyledText>
        <StyledInput
          label={'FirstName'}
          borderColor={theme.colors.gray[400]}
          backgroundColor={theme.colors.gray[1]}
          borderRadius={32}
        />
        <StyledButton borderColor={theme.colors.gray[400]}
          backgroundColor={theme.colors.gray[1]}
          borderRadius={32}
        >
          <StyledText
          paddingVertical={8}
            paddingHorizontal={20}
          >
            See Your Changes
          </StyledText>
        </StyledButton>
      </YStack>
    </StyledSafeAreaView>

  );
}

export default Home;
