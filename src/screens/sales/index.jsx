/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { YStack, XStack, StyledSafeAreaView, StyledText, StyledBadgeIcon, StyledHeader, StyledCycle, StyledSpacer, StyledButton, StyledInput } from 'fluent-styles';
import { useNavigation } from '@react-navigation/native';
import { fontStyles, theme } from '../../configs/theme';
import { StyledMIcon } from '../../components/icon';
import CategoryScrollView from '../../components/category';
import ProductScrollView from '../../components/product';
import { formatCurrency } from '../../utils/help';
import { useAppContext } from '../../hooks/appContext';

const Sales = () => {
  const navigator = useNavigation()
  const { shop, getItemCount, getTotalPrice } = useAppContext()
  const [selectedCategory, setSelectedCategory ]= useState(null)

  return (
    <StyledSafeAreaView backgroundColor={theme.colors.gray[800]}>
      <StyledHeader marginHorizontal={8} statusProps={{ translucent: true, barStyle: 'light-content', backgroundColor: theme.colors.gray[800] }} >
        <StyledHeader.Header onPress={() => navigator.navigate("bottom-tabs", { screen: 'home' })} icon cycleProps={{
          borderColor: theme.colors.gray[300],
          marginRight: 8
        }} rightIcon={
          <>
            <StyledSpacer marginHorizontal={44} />
            <XStack flex={1} justifyContent='flex-end' alignItems='center' paddingHorizontal={16}>
              <StyledInput
                keyboardType='default'
                placeholder='Enter your username'
                returnKeyType='done'
                maxLength={50}
                fontSize={theme.fontSize.normal}
                borderColor={theme.colors.yellow[800]}
                backgroundColor={theme.colors.gray[1]}
                borderRadius={32}
                paddingHorizontal={8} />
              <StyledSpacer marginHorizontal={4} />
              <StyledCycle borderWidth={1} borderColor={theme.colors.cyan[400]} backgroundColor={theme.colors.cyan[500]}>
                <StyledMIcon size={24} name='search' color={theme.colors.gray[1]} onPress={() => { }} />
              </StyledCycle>
              <StyledBadgeIcon
                char={getItemCount()}
                right={1}
                top={-5}
                charProps={{
                  borderRadius: 100,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  backgroundColor: theme.colors.pink[700],
                  fontFamily: fontStyles.OpenSansRegular,
                  color: theme.colors.gray[1],
                  fontWeight: theme.fontWeight.bold,
                  fontSize: theme.fontSize.small
                }}
                icon={
                  <StyledMIcon
                    name={'shopping-cart'}
                    size={48}
                    color={theme.colors.orange[100]}
                    onPress={()=> console.log(".................") }
                  />
                }
              />
            </XStack>
          </>
        } />
      </StyledHeader>
      <YStack justifyContent='flex-start' alignItems='flex-start' backgroundColor={theme.colors.gray[800]}>
        <CategoryScrollView onPress={(category)=> setSelectedCategory(category)} />
      </YStack>
      <YStack flex={1} backgroundColor={theme.colors.gray[100]}>
        <ProductScrollView category_id={selectedCategory?.category_id || 0} />
      </YStack>
      <XStack absolute paddingVertical={8} marginBottom={8} paddingHorizontal={8} borderWidth={1} borderRadius={32} borderColor={theme.colors.gray[400]}>    
        <StyledButton flex={2} borderRadius={32} borderColor={theme.colors.green[800]} backgroundColor={theme.colors.green[800]} onPress={() => { }} >
          <StyledText paddingHorizontal={16} paddingVertical={8} fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.normal} fontWeight={theme.fontWeight.bold} color={theme.colors.gray[100]} >Pay {formatCurrency(shop.currency || '£', getTotalPrice())}</StyledText>
        </StyledButton>
      </XStack >

    </StyledSafeAreaView>
  );
}

export default Sales