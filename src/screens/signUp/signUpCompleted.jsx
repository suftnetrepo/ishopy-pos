
import React from 'react';
import { StyledSafeAreaView } from "../components/packages/safeAreaView";
import { XStack, YStack } from "../components/packages/stack";
import { StyledSpacer } from "../components/packages/Spacer";
import { StyledButton } from "../components/packages/button";
import StyledText from "../components/packages/text";
import { StyledMIcon } from '../components/packages/icon';
import { useNavigation, useRoute } from '@react-navigation/native';

const RegistrationCompleted = () => {
    const navigator = useNavigation()
    const route = useRoute()
    const { patient } = route.params

    return (
        <StyledSafeAreaView backgroundColor='grey.1'>
            <YStack justifyContent='center' alignItems='center' flex={1} transparent>
                <YStack borderRadius={8} justifyContent='center' alignItems='center' width='80%' backgroundColor='grey.1' paddingHorizontal={16} paddingVertical={16}>
                    <StyledSpacer marginVertical={32}></StyledSpacer>
                    <StyledMIcon
                        name="check-circle"
                        size={120}
                        color='green.300'
                    />
                    <StyledSpacer marginVertical={8}></StyledSpacer>
                    <StyledText
                        color="grey.800"
                        fontWeight="normal"
                        fontSize="font_size_large"
                        textAlign="center"
                    >
                        Hi <StyledText
                            color="grey.800"
                            fontWeight="bold"
                            fontSize="font_size_normal"
                            textAlign="center"
                        >{patient}!</StyledText>, welcome aboard! We've successfully registered your account. Now, you can manage your appointments, view your health records, and consult with our specialists anytime. We're excited to be part of your health journey!.                       
                    </StyledText>
                    <StyledSpacer marginVertical={16}></StyledSpacer>
                    <XStack justifyContent='flex-end' alignItems='flex-end'>
                        <StyledButton size='sm' color='cyan.500' borderColor='cyan.500' backgroundColor='cyan.500' flex={1} onPress={() => {
                            navigator.navigate("bottomNavigator");
                        }
                        } >
                            <StyledText color='grey.1' fontSize='font_size_normal'>Go to Dashboard</StyledText>
                        </StyledButton>
                    </XStack>
                    <StyledSpacer marginVertical={24}></StyledSpacer>
                </YStack>
            </YStack>
        </StyledSafeAreaView>
    )
}

export default RegistrationCompleted