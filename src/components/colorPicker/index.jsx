/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { palettes, theme } from '../../configs/theme';
import { YStack, XStack, StyledScrollView, StyledSpacer, StyledText, StyledButton } from 'fluent-styles';

const ColorPicker = ({ color, onPress }) => {
    const [selectedColor, setSelectedColor] = useState(color);

    useEffect(() => {
        setSelectedColor(color)
    }, [color])

    const handleClick = (color) => {
        setSelectedColor(color);
        onPress && onPress(color)
    };

    return (
        <YStack padding={10} justifyContent='center' alignItems='center'>
            {selectedColor && (
                <XStack flex={1} justifyContent='center' alignItems='center' height={100} width={100} marginTop={20} borderRadius={10} backgroundColor={selectedColor} >
                    <StyledText fontSize={theme.fontSize.small} color={theme.colors.gray[1]} >
                        {selectedColor}
                    </StyledText>
                </XStack>
            )}
            <StyledSpacer marginVertical={8} />
            <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
                {Object.keys(palettes).map((colorFamily) => (
                    <XStack key={colorFamily} flexWrap='warp' marginHorizontal={5}>
                        {Object.keys(palettes[colorFamily])
                            .filter((key) => parseInt(key) >= 600 && parseInt(key) <= 900)
                            .map((shade) => (
                                <StyledButton
                                    key={shade}
                                    height={48}
                                    width={48}
                                    borderRadius={5}
                                    marginVertical={10}
                                    backgroundColor={palettes[colorFamily][shade]}
                                    onPress={() => handleClick(palettes[colorFamily][shade])}
                                />
                            ))}
                    </XStack>
                ))}
            </StyledScrollView>
            <StyledSpacer marginVertical={4} />
        </YStack>
    );
};

export default ColorPicker;
