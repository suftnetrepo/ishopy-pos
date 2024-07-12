/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { YStack, StyledImage, XStack, StyledHeader, StyledSafeAreaView, StyledSeparator, StyledSpacer, StyledText } from 'fluent-styles';
import { theme } from "../../configs/theme";
import { StyledMIcon } from "../../components/icon";
import { useAppContext } from "../../hooks/appContext";
import { toWordCase } from "../../utils/help";

const Account = () => {
  const navigator = useNavigation()
  const { user } = useAppContext()

  const RenderRow = ({ icon = 'account-circle', title, screen }) => {
    return (
      <XStack borderRadius={16} marginHorizontal={8} marginBottom={4} backgroundColor={theme.colors.gray[1]} justifyContent='flex-start' alignItems='center' paddingVertical={8} paddingHorizontal={8}>
        <StyledMIcon size={32} name={icon} color={theme.colors.gray[800]} onPress={() => { }} />
        <StyledSpacer marginHorizontal={2} />
        <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
          {title}
        </StyledText>
        <StyledSpacer flex={1} />
        <StyledMIcon size={32} name='chevron-right' color={theme.colors.gray[600]} onPress={() => screen && navigator.navigate(screen)} />
      </XStack>
    )
  }

  return (
    <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
      <StyledHeader skipAndroid={true} statusProps={{ translucent: true, backgroundColor: "transparent", barStyle: "dark-content" }} >
      </StyledHeader>
      <StyledSpacer marginVertical={16} />
      <StyledText paddingHorizontal={16} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.normal} color={theme.colors.gray[600]}>
        Profile
      </StyledText>
      <YStack >
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
            height={90}
            width={90}
            source={require('../../../assets/img/doctor.png')}
          />
          <YStack marginHorizontal={8}>
            <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.semiBold} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
              {toWordCase(user.first_name)} {toWordCase(user.last_name)}
            </StyledText>
            <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.small} color={theme.colors.gray[800]}>
              {toWordCase(user.role)}
            </StyledText>
          </YStack>
        </XStack>
        <StyledSpacer marginVertical={8} />
      </YStack>

      <YStack
        flex={2}
        marginTop={-16}
        backgroundColor={theme.colors.gray[100]}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}>
        <StyledSeparator left={
          <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.large} color={theme.colors.gray[400]}>
            Settings
          </StyledText>
        }>
        </StyledSeparator>
        <RenderRow icon="local-printshop" title='Printer' screen='printer' />
        <RenderRow icon="person" title='User' screen='users' />
        <RenderRow icon="outlet" title='Shop' screen='shop' />
        <RenderRow icon="add-circle-outline" title='Tax' screen='tax' />
        <RenderRow icon="remove-circle-outline" title='Discount' screen='discount' />
        <RenderRow icon="collections" title='Product' screen='products' />
        <RenderRow icon="help-outline" title='FAQ' />
        <RenderRow icon="info-outline" title='Help Center' />
      </YStack>
    </StyledSafeAreaView>
  )
}

export default Account