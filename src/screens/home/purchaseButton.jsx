/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    YStack,
    XStack,
    StyledText,
    StyledSpacer,
    StyledButton
} from 'fluent-styles';
import { StyledMIcon } from '../../components/icon';
import { fontStyles, theme } from '../../configs/theme';
import { useInAppPurchase } from '../../hooks/useInAppPurchase';

const SalesTrend = () => {
    const { shop, purchaseStatus } = useAppContext();
    const { purchaseHandler,  } = useInAppPurchase();

    return (
        <XStack marginHorizontal={16} justifyContent='space-between' alignItems='center' gap={8}>
            <StyledButton>
                <StyledText>Buy</StyledText>
            </StyledButton>
        </XStack>
    )
}

export { SalesTrend }