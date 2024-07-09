/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */

import React from 'react';
import { YStack, XStack, StyledSafeAreaView, StyledText, StyledHeader, StyledSpacer, StyledButton, StyledInput } from 'fluent-styles';
import { StyledMIcon } from '../components/icon';
import { theme } from '../configs/theme';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigate = useNavigation()

  const RenderHeader = () => {
    return (
      <XStack flex={1} backgroundColor={theme.colors.gray[1]} justifyContent='flex-end' alignItems='center' paddingVertical={8} paddingHorizontal={16}>
        <StyledMIcon name='lock-clock' color={theme.colors.gray[800]} onPress={() => navigate.reset({
          index: 0,
          routes: [{ name: 'keypad' }]
        })} />
        <StyledSpacer marginHorizontal={4} />
        <StyledMIcon name='exit-to-app' color={theme.colors.gray[800]} onPress={() => navigate.reset({
          index: 0,
          routes: [{ name: 'login' }]
        })} />
      </XStack>
    )
  }

  return (
    <StyledSafeAreaView >
      <StyledHeader marginHorizontal={8} statusProps={{ translucent: true }} >
        <StyledHeader.Full>
          <RenderHeader />
        </StyledHeader.Full>
      </StyledHeader>

      <YStack
        flex={1}
        marginHorizontal={16}
        justifyContent='center' alignItems='center'
      >

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
