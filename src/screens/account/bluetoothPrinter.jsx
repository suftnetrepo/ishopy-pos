/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Button, Text } from 'react-native';
import { YStack, XStack, StyledButton, StyledImage, StyledSeparator, StyledSafeAreaView, StyledSpacer, StyledText } from 'fluent-styles';
import { useBluetoothPrinter } from '../../hooks/useBluetoothPrinter';
import { theme } from '../../configs/theme';

const BluetoothPrinter = () => {
    const { isEnabled, devices, connectedDevice, enableBluetooth, connectDevice, printText, print } = useBluetoothPrinter();

    const receiptData = {
        businessName: 'Food Business Center',
        addressLine1: '23232, JAVA CITY, SELANGOR',
        addressLine2: 'NY, USA',
        phone: '03-435435435',
        table: '06',
        checkNumber: '622967',
        pax: '04',
        date: '11/01/2020',
        time: '18:34',
        cashier: 'David Smith',
        items: [
            { quantity: 4, name: 'Chinese Buffet', total: 51.96 },
            { quantity: 4, name: 'Soda', total: 7.96 },
            { quantity: 4, name: 'Desserts', total: 15.56 }
        ],
        subtotal: 75.48,
        foodTax: 2.90,
        localTax: 1.28,
        total: 79.66,
        footerMessage: 'Take home a bag of meatballs and 2 pkgs. of cream sauce for only $9.99\nMade from an authentic recipe!'
    };

    return (
        <YStack width={'100%'} backgroundColor={theme.colors.gray[1]}>
            <XStack
                justifyContent='flex-start'
                alignItems='center'
                paddingVertical={8}
                paddingHorizontal={16}
                backgroundColor={theme.colors.gray[1]}
                borderRadius={16}
            >
                <StyledText
                    fontWeight={theme.fontWeight.normal}
                    color={theme.colors.gray[800]}
                    fontSize={theme.fontSize.normal}
                >
                    Bluetooth (small POS printer)
                </StyledText>
            </XStack>
            <StyledSeparator line lineProps={{
                borderColor: theme.colors.gray[300]
            }} />
            <YStack
                justifyContent='center'
                alignItems='center'
                paddingVertical={32}
                paddingHorizontal={16}
                marginBottom={8}
            >
                <StyledImage
                    local
                    height={100}
                    width={100}
                    source={require('../../../assets/img/printer.png')}
                />
                 <StyledSpacer marginVertical={8} />
                <StyledText
                    fontWeight={theme.fontWeight.normal}
                    color={theme.colors.gray[800]}
                    fontSize={theme.fontSize.normal}
                >
                    You are not connected to any printer yet.
                </StyledText>
                <StyledSpacer marginVertical={4} />
                <StyledButton  backgroundColor={isEnabled ? theme.colors.green[600] : theme.colors.pink[600]} onPress={enableBluetooth}>
                    <StyledText
                        fontWeight={theme.fontWeight.normal}
                        color={theme.colors.gray[1]}
                        fontSize={theme.fontSize.medium}
                        paddingVertical={8}
                        paddingHorizontal={16}
                    >
                        Enable Bluetooth
                    </StyledText>
                </StyledButton>
            </YStack>
           
            {
                devices.map((item, index) => {
                    return (
                        <View key={index}>
                            <Text>{item.name}</Text>
                            <Button title="Connect" onPress={() => connectDevice(item)} />
                        </View>
                    )
                })
            }
            {connectedDevice && <Button title="Print Text" onPress={() => print(receiptData)} />}
        </YStack>
    );

};

export default BluetoothPrinter;
