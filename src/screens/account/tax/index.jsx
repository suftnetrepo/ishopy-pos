/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React from 'react';
import { YStack, XStack, StyledButton, StyledHeader, StyledSafeAreaView, StyledBadge, StyledSpinner, StyledOkDialog, StyledSpacer, StyledText } from 'fluent-styles';
import { theme, fontStyles } from '../../../configs/theme';
import { StyledMIcon } from '../../../components/icon';
import { useNavigation } from '@react-navigation/native';

const Tax = () => {
 const navigator = useNavigation()

  return (
    <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
      <StyledHeader marginHorizontal={8} statusProps={{ translucent: true }} >
        <StyledHeader.Header navigator={navigator} title='Printer' icon cycleProps={{
          borderColor: theme.colors.gray[300],
          marginRight: 8
        }} />
      </StyledHeader>
      <YStack>
        <XStack borderRadius={8} marginHorizontal={2} marginBottom={8} borderWidth={1} borderColor={theme.colors.gray[300]} backgroundColor={theme.colors.gray[1]} justifyContent='flex-start' alignItems='center' paddingVertical={4} paddingHorizontal={4}>
          <StyledSpacer marginHorizontal={2} />
          <StyledMIcon size={32} name='bluetooth-connected' color={theme.colors.green[600]} />          
          <StyledSpacer flex={1} />
          <StyledButton>
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

export default Tax