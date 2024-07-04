/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Button } from "react-native";
import { styled } from "../utiles/style";

const StyledButton = styled(Button, {
    base : {
        backgroundColor : '#ccc'
    }
})

const YStack = styled(View, {
    base: {
       flexDirection:'column',
       justifyContent :'center',
       alignItems : 'center',
       flex : 1
    }
})

const Test=()=> {

    return (
        <YStack marginHorizontal={20} >
            <StyledButton title="Submit" />        
            <Text>Testing Testing</Text>
        </YStack>
    )
}

export default Test