/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { YStack, XStack, StyledConfirmDialog, StyledCard, StyledCycle, StyledButton, StyledSeparator, StyledBadge, StyledHeader, StyledSafeAreaView, StyledSpinner, StyledOkDialog, StyledSpacer, StyledText } from 'fluent-styles';
import { Modalize } from 'react-native-modalize';
import { fontStyles, theme } from '../../configs/theme';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../../hooks/appContext';
import { ScrollView } from 'react-native';
import { formatCurrency, toWordCase } from '../../utils/help';
import { StyledMIcon } from '../../components/icon';
import { StyledToggleSwitch } from '../../components/toggleSwitch';
import { useQueryTaxByStatus } from '../../hooks/useTax';
import { useQueryDiscountByStatus } from '../../hooks/useDiscount';

const CheckOut = () => {
    const navigator = useNavigation()
    const { getItemCount, getItems, getTotalPrice, shop, deleteItem, setDiscount, setTax, getTotal, getTotalDiscount, getTotalTax } = useAppContext()
    const [taxOrDiscount, setTaxOrDiscount] = useState("taxes")
    const { data: taxes } = useQueryTaxByStatus(1)
    const { data: discounts } = useQueryDiscountByStatus(1)

    const modalizeRef = useRef(null);

    const showBottomSheet = () => {
        if (modalizeRef.current) {
            modalizeRef.current.open();
        }
    };

    const RenderItem = ({ item }) => {
        return (
            <>
                <XStack justifyContent='space-between' paddingVertical={8} paddingHorizontal={16} alignItems='center'>
                    <YStack flex={1} backgroundColor={theme.colors.gray[1]}>
                        <StyledText color={theme.colors.gray[800]} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.normal}>
                            {item.name}
                        </StyledText>
                    </YStack>
                    <StyledBadge
                        color={theme.colors.gray[800]}
                        backgroundColor={theme.colors.gray[200]}
                        fontWeight={theme.fontWeight.normal}
                        fontSize={theme.fontSize.normal}
                        paddingHorizontal={10}
                        paddingVertical={1}
                    >
                        {item.quantity}
                    </StyledBadge>
                    <StyledSpacer marginHorizontal={16} />
                    <StyledText color={theme.colors.gray[800]}
                        fontWeight={theme.fontWeight.normal}
                        fontSize={theme.fontSize.normal}>
                        {formatCurrency(shop?.currency || "£", (item?.price || 0))}
                    </StyledText>
                    <StyledSpacer marginHorizontal={4} />
                    <StyledMIcon size={30} name='cancel' color={theme.colors.gray[300]} onPress={() => deleteItem(item.id)} />
                </XStack>
                <StyledSeparator line lineProps={{
                    borderColor: theme.colors.gray[200]
                }} />
            </>
        )
    }

    const RenderTaxOrDiscountCard = ({ item }) => {
        return (
            <StyledCard pressable={true} pressableProps={{
                onPress: () => {
                    taxOrDiscount === "taxes" ? setTax(item.rate) : setDiscount(item.rate)

                }
            }} >
                <XStack flex={1} marginVertical={4} paddingHorizontal={8} paddingVertical={8} justifyContent='space-between' alignItems='center' borderWidth={1} borderColor={theme.colors.gray[400]} borderRadius={16}>
                    <YStack paddingHorizontal={8} justifyContent='flex-start' alignItems='flex-start'>
                        <StyledText fontFamily={fontStyles.Roboto_Regular} color={theme.colors.gray[600]} fontSize={theme.fontSize.normal} fontWeight={theme.fontWeight.normal}>
                            {item.name}
                        </StyledText>

                    </YStack>
                    <XStack gap={2}>
                        <StyledSpacer marginHorizontal={16} />
                        <StyledBadge
                            color={theme.colors.gray[100]}
                            backgroundColor={theme.colors.gray[800]}
                            fontWeight={theme.fontWeight.normal}
                            fontSize={theme.fontSize.normal}
                            paddingHorizontal={10}
                            paddingVertical={1}
                        >
                            {item.rate} %
                        </StyledBadge>
                    </XStack>
                </XStack>
            </StyledCard>
        )
    }

    const RenderModal = () => {
        const data = taxOrDiscount === "taxes" ? taxes : discounts
        if (!data.length) return

        return (
            <Modalize
                ref={modalizeRef}
                adjustToContentHeight={true}
                alwaysOpen={false}
                withHandle={true}
                scrollViewProps={{
                    showsVerticalScrollIndicator: false,
                    stickyHeaderIndices: [0],
                }}>
                <YStack paddingHorizontal={8} marginVertical={8} >
                    <XStack justifyContent='center' alignItems='center'>
                        <StyledText fontFamily={fontStyles.Roboto_Regular} color={theme.colors.gray[600]} fontSize={theme.fontSize.large} fontWeight={theme.fontWeight.bold}>
                            {toWordCase(taxOrDiscount)}
                        </StyledText>
                    </XStack>
                    <StyledSpacer marginVertical={4} />
                    {
                        data?.map((item, index) => {
                            return (
                                <RenderTaxOrDiscountCard key={index} item={item} />
                            )
                        })
                    }
                </YStack>
            </Modalize>
        )
    }

    return (
        <StyledSafeAreaView backgroundColor={theme.colors.gray[200]}>
            <StyledHeader marginHorizontal={8} statusProps={{ translucent: true }} >
                <StyledHeader.Header backgroundColor={theme.colors.gray[1]} onPress={() => navigator.goBack()} title='Checkout' icon cycleProps={{
                    borderColor: theme.colors.gray[300],
                    marginRight: 8
                }} rightIcon={
                    <>
                        <XStack flex={1} justifyContent='flex-end' alignItems='center' paddingHorizontal={8}>
                            <StyledSpacer marginHorizontal={4} />
                            <StyledCycle borderWidth={1} borderColor={theme.colors.gray[400]} >
                                <StyledMIcon size={48} name='remove' color={theme.colors.gray[700]} onPress={() => {
                                    setTaxOrDiscount("taxes")
                                    showBottomSheet()
                                }} />
                            </StyledCycle>
                            <StyledSpacer marginHorizontal={4} />
                            <StyledCycle borderWidth={1} borderColor={theme.colors.gray[400]} >
                                <StyledMIcon size={48} name='add' color={theme.colors.gray[700]} onPress={() => {
                                    setTaxOrDiscount("discounts")
                                    showBottomSheet()
                                }} />
                            </StyledCycle>

                        </XStack>
                    </>
                } />
            </StyledHeader>

            <YStack flex={1} paddingHorizontal={12} paddingVertical={8} backgroundColor={theme.colors.gray[200]}>
                <StyledToggleSwitch />
                <ScrollView showsVerticalScrollIndicator={false} >
                    <StyledSpacer marginVertical={4} />
                    <StyledCard shadow='light' borderColor={theme.colors.gray[200]} borderRadius={16} borderWidth={1} backgroundColor={theme.colors.gray[1]} paddingTop={8}>
                        {
                            (getItems() || []).map((item, index) =>
                                <RenderItem item={item} key={index} />
                            )
                        }
                        <XStack justifyContent='flex-end' paddingVertical={8} paddingHorizontal={8} alignItems='center' backgroundColor={theme.colors.gray[100]}>
                            <YStack >
                                <StyledText color={theme.colors.gray[800]} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.large}>
                                    Subtotal
                                </StyledText>
                            </YStack>
                            <StyledSpacer marginHorizontal={8} />
                            <StyledText color={theme.colors.gray[800]}
                                fontWeight={theme.fontWeight.normal}
                                fontSize={theme.fontSize.normal}>
                                {formatCurrency(shop.currency || "£", (getTotal() || 0))}
                            </StyledText>
                        </XStack>
                        <StyledSeparator line lineProps={{
                            borderColor: theme.colors.gray[200]
                        }} />
                        <XStack justifyContent='flex-end' paddingVertical={8} paddingHorizontal={8} alignItems='center' backgroundColor={theme.colors.gray[100]}>
                            <YStack >
                                <StyledText color={theme.colors.gray[400]} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.large}>
                                    Discount
                                </StyledText>
                            </YStack>
                            <StyledSpacer marginHorizontal={8} />
                            <StyledText color={theme.colors.gray[800]}
                                fontWeight={theme.fontWeight.normal}
                                fontSize={theme.fontSize.normal}>
                                {formatCurrency(shop.currency || "£", (getTotalDiscount() || 0))}
                            </StyledText>
                        </XStack>
                        <StyledSeparator line lineProps={{
                            borderColor: theme.colors.gray[200]
                        }} />
                        <XStack justifyContent='flex-end' paddingVertical={8} paddingHorizontal={8} alignItems='center' backgroundColor={theme.colors.gray[100]}>
                            <YStack >
                                <StyledText color={theme.colors.gray[400]} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.large}>
                                    Tax
                                </StyledText>
                            </YStack>
                            <StyledSpacer marginHorizontal={8} />
                            <StyledText color={theme.colors.gray[800]}
                                fontWeight={theme.fontWeight.normal}
                                fontSize={theme.fontSize.normal}>
                                {formatCurrency(shop.currency || "£", (getTotalTax() || 0))}
                            </StyledText>
                        </XStack>
                        <StyledSeparator line lineProps={{
                            borderColor: theme.colors.gray[200]
                        }} />
                        <XStack justifyContent='flex-end' paddingVertical={8} paddingHorizontal={8} alignItems='center' backgroundColor={theme.colors.gray[100]}>
                            <YStack >
                                <StyledText color={theme.colors.gray[800]} fontWeight={theme.fontWeight.normal} fontSize={theme.fontSize.large}>
                                    Total
                                </StyledText>
                            </YStack>
                            <StyledSpacer marginHorizontal={8} />
                            <StyledText color={theme.colors.gray[800]}
                                fontWeight={theme.fontWeight.bold}
                                fontSize={theme.fontSize.normal}>
                                {formatCurrency(shop.currency || "£", (getTotalPrice() || 0))}
                            </StyledText>
                        </XStack>
                    </StyledCard>
                </ScrollView>
            </YStack>
            <XStack absolute paddingVertical={8} marginBottom={8} paddingHorizontal={8}>
                <StyledButton flex={2} borderRadius={32} borderColor={theme.colors.cyan[500]} backgroundColor={theme.colors.cyan[500]} onPress={() => navigator.navigate("checkout")} >
                    <StyledText paddingHorizontal={16} paddingVertical={8} fontFamily={fontStyles.Roboto_Regular} fontSize={theme.fontSize.normal} fontWeight={theme.fontWeight.bold} color={theme.colors.gray[100]} >Confirm Payment</StyledText>
                </StyledButton>
            </XStack >
            <RenderModal />
        </StyledSafeAreaView>
    )
}

export default CheckOut