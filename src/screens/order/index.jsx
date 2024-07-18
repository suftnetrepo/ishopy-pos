/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { YStack, XStack, StyledSafeAreaView, StyledText, StyledCycle, StyledBadge, StyledHeader, StyledSpinner, StyledOkDialog, StyledSpacer } from 'fluent-styles';
import { useNavigation } from '@react-navigation/native';
import { fontStyles, theme } from '../../configs/theme';
import { useOrders } from '../../hooks/useOrder';
import { FlatList } from 'react-native';
import { formatCurrency, formatDateTime } from '../../utils/help';
import { StyledMIcon } from '../../components/icon';
import { useAppContext } from '../../hooks/appContext';

const Order = () => {
    const navigator = useNavigation()
    const { shop } = useAppContext()
    const { data, error, loading, resetHandler } = useOrders()

    console.log("...........", data)

    const RenderCard = ({ item })=>{
        return (
            <XStack paddingHorizontal={8}  backgroundColor={theme.colors.gray[1]}
                paddingVertical={8} justifyContent='flex-start' marginBottom={8} borderRadius={16} alignItems='center' >
                <YStack justifyContent='flex-start' alignItems='flex-start'>
                    <XStack justifyContent='flex-start' alignItems='center'>
                        <StyledMIcon size={16} name='shopping-bag' color={theme.colors.gray[600]} />
                        <StyledText
                            fontWeight={theme.fontWeight.normal}
                            fontSize={theme.fontSize.normal}
                            paddingHorizontal={4}
                            paddingVertical={1}
                            fontFamily={fontStyles.FontAwesome5_Regular}
                        >
                            {item.order_id.slice(0, 8)}
                        </StyledText>
                    </XStack>       
                    <StyledSpacer marginVertical={1} />
                    <XStack justifyContent='flex-start' alignItems='center'>
                        <StyledMIcon size={16} name='date-range' color={theme.colors.gray[600]} />
                        <StyledText
                            fontWeight={theme.fontWeight.normal}
                            fontSize={theme.fontSize.medium}
                            paddingHorizontal={4}
                            paddingVertical={1}
                        >
                            {formatDateTime(item.date)}
                        </StyledText>
                    </XStack>                 
                           
                </YStack>
                <XStack flex={1} justifyContent='flex-end' alignItems='center'>
                    <StyledBadge 
                        color={theme.colors.gray[800]}
                        backgroundColor={theme.colors.gray[50]}
                        fontWeight={theme.fontWeight.bold}
                        fontSize={theme.fontSize.normal}
                        paddingHorizontal={8}
                        paddingVertical={4}
                        fontFamily={fontStyles.FontAwesome5_Regular}>{formatCurrency(shop.currency || "£", item.total_price)}</StyledBadge>
                    <StyledSpacer marginHorizontal={4} />
                    <StyledCycle borderWidth={1} borderColor={theme.colors.gray[400]}>
                        <StyledMIcon size={32} name='view-list' color={theme.colors.gray[400]} onPress={() => {

                        }
                        } />
                    </StyledCycle>                    
                </XStack>
            </XStack>
        )
    }
   
    return (
        <StyledSafeAreaView backgroundColor={theme.colors.gray[100]}>
            <StyledHeader marginHorizontal={8} statusProps={{ translucent: true }} >
                <StyledHeader.Header backgroundColor={theme.colors.gray[1]} onPress={() => navigator.goBack()} title='Orders' icon cycleProps={{
                    borderColor: theme.colors.gray[300],
                    marginRight: 8
                }} rightIcon={
                    <>
                        <XStack flex={1} justifyContent='flex-end' alignItems='center' paddingHorizontal={8}>
                            <StyledSpacer marginHorizontal={4} />
                            <StyledCycle borderWidth={1} borderColor={theme.colors.gray[400]} >
                                <StyledMIcon size={32} name='filter-list' color={theme.colors.gray[800]} onPress={() => {

                                }
                                }/>
                            </StyledCycle>
                            <StyledSpacer marginHorizontal={4} />                            
                        </XStack>
                    </>
                } />
            </StyledHeader>
            <StyledSpacer marginVertical={4} />
            <YStack flex={1} paddingHorizontal={8} backgroundColor={theme.colors.gray[100]}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.order_id}
                    initialNumToRender={100}
                    renderItem={({ item, index }) => <RenderCard key={index} item={item} />}
                    showsVerticalScrollIndicator={false}
                    numColumns={1}
                    extraData={data}
                />
                {
                    (loading) && (
                        <StyledSpinner />
                    )
                }
                {
                    (error) && (
                        <StyledOkDialog title={error?.message} description='please try again' visible={true} onOk={() => {
                            resetHandler()
                        }} />
                    )
                }
            </YStack>
        </StyledSafeAreaView>
    );
}

export default Order;
