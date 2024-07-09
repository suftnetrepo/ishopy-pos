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
      <XStack borderRadius={16} marginHorizontal={8} marginBottom={8} backgroundColor={theme.colors.gray[1]} justifyContent='flex-start' alignItems='center' paddingVertical={8} paddingHorizontal={8}>
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
            borderColor={theme.colors.gray[200]}
            height={80}
            width={80}
            source={require('../../../assets/img/doctor.png')}
          />
          <YStack marginHorizontal={8}>
            <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
              {user.first_name} {user.last_name}
            </StyledText>
            <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal} color={theme.colors.gray[800]}>
              {user.role}
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
        <StyledSpacer marginVertical={4} />
        <RenderRow icon="local-printshop" title='Printer Settings' screen='printer' />
        <RenderRow icon="help-outline" title='FAQ' />
        <RenderRow icon="info-outline" title='Help Center' />
      </YStack>
    </StyledSafeAreaView>
  )
}

export default Account