/* eslint-disable prettier/prettier */
import React from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { YStack, StyledSafeAreaView, StyledInput, theme, StyledScrollView } from 'fluent-styles/lib/module';

const Login = () => {

    return (
        <StyledSafeAreaView>
             <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1
        }}
			>
        <YStack width={'100%'}>
          <StyledInput
            label={'LastName'}
            keyboardType='default'
            placeholder='Enter your lastname'
            returnKeyType='next'
            maxLength={50}
            fontSize={theme.fontSize.normal}
            borderColor={theme.colors.yellow[800]}
            backgroundColor={theme.colors.gray[1]}
            borderRadius={32}
            paddingHorizontal={8}
            placeholderTextColor={theme.colors.gray[400]}
					/>
          <StyledInput
            label={'LastName'}
            keyboardType='default'
            placeholder='Enter your lastname'
            returnKeyType='next'
            maxLength={50}
            fontSize={theme.fontSize.normal}
            borderColor={theme.colors.yellow[800]}
            backgroundColor={theme.colors.gray[1]}
            borderRadius={32}
            paddingHorizontal={8}
            placeholderTextColor={theme.colors.gray[400]}
					/>
        </YStack>
      </KeyboardAwareScrollView>

        </StyledSafeAreaView>
    )
}

export default Login