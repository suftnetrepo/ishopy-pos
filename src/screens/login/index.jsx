/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { validate, StyledSpinner, YStack, StyledOkDialog, XStack, StyledHeader, StyledSafeAreaView, StyledSpacer, StyledInput, StyledText, StyledButton } from 'fluent-styles';
import { theme } from "../../configs/theme";
import { validatorRules } from "./validatorRules";
import { useLogin } from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigator = useNavigation()
  const [errorMessages, setErrorMessages] = useState({})
  const [fields, setFields] = useState(validatorRules.fields)
  const { error, loading, loginUser, resetHandler } = useLogin()

  const onSubmit = async () => {
    setErrorMessages({})
    const { hasError, errors } = validate(fields, validatorRules.rules)
    if (hasError) {
      setErrorMessages(errors)
      return false
    }

    loginUser(fields.user_name, fields.password).then((user) => {
      navigator.navigate("keypad", {
        user
      })
    })

  }

  return (
    <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
      <StyledHeader marginHorizontal={8} statusProps={{ translucent: false }} >
        {/* <StyledHeader.Title icon cycleProps={{
          borderColor:theme.colors.gray[700],
          marginRight:8
         }} />           */}

      </StyledHeader>
      <YStack
        height={'100%'}
        marginHorizontal={16}

      >
        <StyledSpacer marginVertical={44} />
        <YStack
          justifyContent='flex-start' alignItems='center'
        >
          <StyledSpacer marginVertical={16} />
          <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.xlarge} color={theme.colors.gray[800]}>
            Welcome to iShopy
          </StyledText>
          <StyledText paddingHorizontal={8} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.medium} color={theme.colors.gray[600]}>
            Sign in to continue.
          </StyledText>
        </YStack>

        <StyledSpacer marginVertical={24} />
        <StyledInput
          label={'Username'}
          keyboardType='default'
          placeholder='Enter your username'
          returnKeyType='next'
          maxLength={50}
          fontSize={theme.fontSize.normal}
          borderColor={theme.colors.yellow[800]}
          backgroundColor={theme.colors.gray[1]}
          borderRadius={32}
          paddingHorizontal={8}
          placeholderTextColor={theme.colors.gray[300]}
          onChangeText={(text) => setFields({ ...fields, user_name: text })}
          error={!!errorMessages?.user_name}
          errorMessage={errorMessages?.user_name?.message}
        />
        <StyledInput
          label={'Password'}
          keyboardType='default'
          type='password'
          placeholder='Enter your password'
          returnKeyType='done'
          maxLength={20}
          fontSize={theme.fontSize.normal}
          borderColor={theme.colors.yellow[800]}
          backgroundColor={theme.colors.gray[1]}
          borderRadius={32}
          paddingHorizontal={8}
          placeholderTextColor={theme.colors.gray[300]}
          onChangeText={(text) => setFields({ ...fields, password: text })}
          error={!!errorMessages?.password}
          errorMessage={errorMessages?.password?.message}
        />
        <StyledSpacer marginVertical={8} />
        <StyledButton width='100%' backgroundColor={theme.colors.cyan[500]} onPress={() => onSubmit()} >
          <StyledText paddingHorizontal={20} paddingVertical={10} color={theme.colors.gray[1]}>
            Sign in
          </StyledText>
        </StyledButton>
        <StyledSpacer marginVertical={4} />
        <XStack paddingHorizontal={20} justifyContent='center' alignItems='center'>
          <StyledText  >
            {`Don't have an account?`}  { }
          </StyledText>
          <StyledSpacer marginHorizontal={2} />
          <StyledButton link >
            <StyledText paddingHorizontal={1} fontWeight={theme.fontWeight.bold} fontSize={theme.fontSize.large} >
              Sign up
            </StyledText>
          </StyledButton>
        </XStack>
      </YStack>
      {
        (error) && (
          <StyledOkDialog title={error?.message} description='please try again' visible={true} onOk={() => {
            resetHandler()
          }} />
        )
      }
      {
        (loading) && (
          <StyledSpinner />
        )
      }
    </StyledSafeAreaView>
  )
}

export default Login