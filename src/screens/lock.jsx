/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { YStack, XStack, StyledSafeAreaView, StyledSpacer, StyledText, StyledSpinner, StyledButton } from 'fluent-styles';
import { theme } from '../configs/theme';
import { usePin } from '../hooks/useUser';
import { useNavigation } from '@react-navigation/native';

const Keypad = () => {
    const navigator = useNavigation()
    const { error, loading, loginByPin } = usePin()
    const [pin, setPin] = useState('');

    const handlePress = (num) => {
        if (pin.length < 4) {
            setPin(pin + num);
            return
        }

        console.log(pin)

        // loginByPin(parseInt(pin)).then((user) => {
        //     navigator.navigate("home", {
        //         user
        //     })
        // })
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
    };

    return (
        <StyledSafeAreaView backgroundColor={theme.colors.gray[1]}>
            <YStack flex={1} justifyContent='center' alignItems='center'>
                <XStack marginBottom={20}>
                    {[0, 1, 2, 3].map((_, index) => (
                        <YStack key={index} width={60} height={60} borderWidth={1} borderRadius={10} margin={5} borderColor={theme.colors.gray[400]} justifyContent='center' alignItems='center'>
                            <StyledText fontSize={theme.fontSize.large} fontWeight={theme.fontWeight.bold} >
                                {pin[index]}
                            </StyledText>
                        </YStack>
                    ))}
                </XStack>
                <StyledSpacer marginVertical={8} />
                <XStack flexWrap='wrap' justifyContent='center' alignItems='center'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num, index) => (
                        <YStack key={index}  margin={5}>
                            <StyledButton
                                width={70} height={70}
                                borderWidth={1} borderRadius={35}
                                backgroundColor={theme.colors.gray[1]}
                                borderColor={theme.colors.gray[400]}
                                key={index}
                                onPress={() => handlePress(num.toString())}
                            >
                                <StyledText fontSize={theme.fontSize.xxlarge} fontWeight={theme.fontWeight.bold} >
                                    {num}
                                </StyledText>
                            </StyledButton>
                        </YStack>

                    ))}
                    <StyledButton
                        width={70} height={70}
                        borderWidth={1} borderRadius={35}
                        backgroundColor={theme.colors.gray[1]}
                        borderColor={theme.colors.gray[400]}
                        onPress={handleDelete}
                    >
                        <StyledText fontSize={theme.fontSize.xxlarge} fontWeight={theme.fontWeight.bold} >
                            ⌫
                        </StyledText>
                    </StyledButton>
                </XStack>
            </YStack>
            {
                (loading) && (
                    <StyledSpinner />
                )
            }
        </StyledSafeAreaView>
    );
};

export default Keypad;
