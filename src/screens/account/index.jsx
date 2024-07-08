/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { YStack, StyledBackgroundImage, StyledImage, XStack, StyledHeader, StyledSafeAreaView, StyledSpacer, StyledText } from 'fluent-styles';
import { theme } from "../../configs/theme";
import { StyledMIcon } from "../../components/icon";
import { useAppContext } from "../../hooks/appContext";

const Account = () => {
  const navigator = useNavigation()
  const { user } = useAppContext()

  const RenderRow = ({ icon = 'account-circle', title, screen }) => {
    return (
      <XStack borderRadius={16} marginHorizontal={16} marginBottom={8} backgroundColor={theme.colors.gray[1]} justifyContent='flex-start' alignItems='center' paddingVertical={8} paddingHorizontal={8}>
        <StyledMIcon size={32} name={icon} color={theme.colors.gray[800]} onPress={() => { }} />
        <StyledSpacer marginHorizontal={2} />
        <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
          {title}
        </StyledText>
        <StyledSpacer flex={1} />
        <StyledMIcon size={32} name='chevron-right' color={theme.colors.gray[300]} onPress={() => screen && navigator.navigate(screen)} />
      </XStack>
    )
  }

  return (
    <StyledSafeAreaView >
      <StyledBackgroundImage height={220} source={require('../../../assets/img/bg_2.png')}>
        <StyledHeader statusProps={{ translucent: true, backgroundColor: "transparent", barStyle: "light-content" }} >
        </StyledHeader>
        <YStack flex={1} justifyContent='center' backgroundColor='rgba(0, 0, 0, 0.3)'>       
          <StyledText paddingHorizontal={16} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.large} color={theme.colors.gray[100]}>
            Profile
          </StyledText>
          <StyledSpacer marginVertical={4} />
          <XStack
            paddingHorizontal={8}
            paddingVertical={8}
            borderRadius={16}
            justifyContent='flex-start'
            alignItems='center'
          >
            <StyledImage
              local
              borderRadius={100}
              borderWidth={5}
              borderColor={theme.colors.gray[100]}
              height={80}
              width={80}
              source={require('../../../assets/img/doctor.png')}
            />
            <YStack marginHorizontal={8}>
              <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.xlarge} color={theme.colors.gray[1]}>
                {user.first_name} {user.last_name}
              </StyledText>
              <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal} color={theme.colors.gray[100]}>
                {user.role}
              </StyledText>
            </YStack>
          </XStack>
        </YStack>
      </StyledBackgroundImage>
      <YStack
        flex={1}
        marginTop={-16}
        backgroundColor={theme.colors.gray[100]}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}>
        <StyledSpacer marginVertical={8} />
        <RenderRow icon="local-printshop" title='Printer Settings' screen='printer' />
        <RenderRow icon="help-outline" title='FAQ' />
        <RenderRow icon="info-outline" title='Help Center' />
      </YStack>
    </StyledSafeAreaView>
  )
}

export default Account