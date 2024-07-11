/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React from 'react';
import { YStack, XStack, StyledButton, StyledHeader, StyledSafeAreaView, StyledBadge, StyledSpinner, StyledOkDialog, StyledSpacer, StyledText } from 'fluent-styles';
import { theme, fontStyles } from '../../configs/theme';
import { StyledMIcon } from '../../components/icon';
import { useBluetoothPrinterContext } from '../../hooks/bluetoothPrinterProvider';
import { useNavigation } from '@react-navigation/native';

const Product = () => {
 const navigator = useNavigation()
  const { selectedPrinter, testPrint } = useBluetoothPrinterContext();

  return (
    <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
      <StyledHeader marginHorizontal={8} statusProps={{ translucent: true }} >
        <StyledHeader.Header onPress={()=> navigator.goBack()}  title='Printer' icon cycleProps={{
          borderColor: theme.colors.gray[300],
          marginRight: 8
        }} />
      </StyledHeader>
      <YStack>
        <XStack borderRadius={8} marginHorizontal={2} marginBottom={8} borderWidth={1} borderColor={theme.colors.gray[300]} backgroundColor={theme.colors.gray[1]} justifyContent='flex-start' alignItems='center' paddingVertical={4} paddingHorizontal={4}>
          <StyledSpacer marginHorizontal={2} />
          <StyledMIcon size={32} name='bluetooth-connected' color={theme.colors.green[600]} />
          <StyledText fontFamily={fontStyles.FontAwesome5_Regular} paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
            {selectedPrinter?.name}
          </StyledText>
          <StyledSpacer flex={1} />
          <StyledButton onPress={() => testPrint()}>
            <StyledBadge
              fontFamily={fontStyles.FontAwesome5_Regular}
              color={theme.colors.orange[800]}
              backgroundColor={theme.colors.orange[100]}
              fontWeight={theme.fontWeight.bold}
              fontSize={theme.fontSize.medium}
              paddingHorizontal={15}
              paddingVertical={1}
            >
              Test print
            </StyledBadge>
          </StyledButton>
          <StyledSpacer marginHorizontal={2} />
        </XStack>
      </YStack>
    </StyledSafeAreaView>
  );
}

export default Product