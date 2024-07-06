/* eslint-disable prettier/prettier */
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { YStack, XStack, StyledSafeAreaView, StyledSpacer, StyledText, StyledButton } from 'fluent-styles';
import { StyledMIcon } from '../../components/icon';
import { theme } from '../../configs/theme';
import { useAppContext } from '../../hooks/appContext';

const SignUpCompleted = () => {
    const { user } = useAppContext()
    const navigator = useNavigation()
   
    return (
        <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
            <YStack justifyContent='center' alignItems='center' flex={1} transparent>
                <YStack borderRadius={8} justifyContent='center' alignItems='center' width='90%' backgroundColor={theme.colors.gray[1]} paddingHorizontal={16} paddingVertical={16}>
                    <StyledSpacer marginVertical={32}></StyledSpacer>
                    <StyledMIcon
                        name="check-circle"
                        size={120}
                        color={theme.colors.green[600]}
                    />
                    <StyledSpacer marginVertical={8}></StyledSpacer>
                    <StyledText
                        color={theme.colors.gray[800]}
                        fontWeight={theme.fontWeight.normal}
                        fontSize={theme.fontSize.normal}
                        textAlign="center"
                    >
                        Hi <StyledText
                           color={theme.colors.gray[800]}
                          fontWeight={theme.fontWeight.bold}
                             fontSize={theme.fontSize.large}
                            textAlign="center"
                        >{`${user.first_name} ${user.last_name}`}!</StyledText>, {`\n\n`} Welcome to iShopy POS! We're thrilled to help you streamline your sales, inventory, and customer relationships—all without needing an internet connection.{`\n\n`} Should you have any questions or need support, our team is here to help. Feel free to reach out anytime. {`\n\n`} Thank you for choosing iShopy POS. We look forward to supporting your business success!                   
                    </StyledText>
                    <StyledSpacer marginVertical={16}></StyledSpacer>
                    <XStack justifyContent='flex-end' alignItems='flex-end'>
                        <StyledButton  color={theme.colors.cyan[500]} borderColor={theme.colors.cyan[500]} backgroundColor={theme.colors.cyan[500]} flex={1} onPress={() => {
                            navigator.navigate("home");
                        }
                        } >
                            <StyledText paddingVertical={8} color={theme.colors.gray[1]} fontSize={theme.fontSize.normal}>Go to Dashboard</StyledText>
                        </StyledButton>
                    </XStack>
                    <StyledSpacer marginVertical={24}></StyledSpacer>
                </YStack>
            </YStack>
        </StyledSafeAreaView>
    )
}

export default SignUpCompleted