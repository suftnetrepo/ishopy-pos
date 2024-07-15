/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useCallback } from "react";
import { YStack, StyledText, StyledButton, StyledSpinner } from 'fluent-styles';
import { useQueryProductByStatus } from "../../hooks/useProduct";
import { FlatList } from "react-native";
import { fontStyles, theme } from "../../configs/theme";
import { useAppContext } from "../../hooks/appContext";
import { formatCurrency } from "../../utils/help";

const ProductScrollView = ({ category_id }) => {
    const { shop, addItem, getTotalItems } = useAppContext()
    const { data, loading, loadProductByCategory } = useQueryProductByStatus(1);

    useEffect(() => {
        category_id && (
            loadProductByCategory(category_id))
    }, [category_id])

    const handleAddItem = useCallback((item) => {
        addItem({ ...item, quantity: 1 });
    }, [addItem]);

    console.log(getTotalItems())

    const RenderCard = React.memo(({ products }) => {
        const { item } = products;

        return (
            <YStack flex={1} marginVertical={4} marginHorizontal={4}>
                <StyledButton
                    borderRadius={16}
                    height={100}
                    borderWidth={1}
                    borderColor={item.color_code || theme.colors.gray[600]}
                    backgroundColor={item.color_code || theme.colors.gray[600]}
                    onPress={() => handleAddItem(item)}
                >
                    <YStack justifyContent='center' alignItems='center' paddingHorizontal={8} paddingVertical={8}>
                        <StyledText
                            fontFamily={fontStyles.Roboto_Regular}
                            fontSize={theme.fontSize.small}
                            color={theme.colors.gray[50]}
                        >
                            {item.name}
                        </StyledText>
                        <StyledText
                            fontFamily={fontStyles.Roboto_Regular}
                            fontSize={theme.fontSize.small}
                            fontWeight={theme.fontWeight.bold}
                            color={theme.colors.gray[50]}
                        >
                            {formatCurrency(shop.currency || '£', item.price)}
                        </StyledText>
                    </YStack>
                </StyledButton>
            </YStack>
        );
    });

    return (
        <YStack flex={1} paddingHorizontal={4} backgroundColor={theme.colors.gray[800]}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.product_id}
                initialNumToRender={100}
                renderItem={(item, index) => <RenderCard key={index} products={item} />}
                showsVerticalScrollIndicator={false}
                numColumns={3}
                      extraData={data}
            />
            {
                (loading) && (
                    <StyledSpinner />
                )
            }
        </YStack>
    )
}

export default ProductScrollView 