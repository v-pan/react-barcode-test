import React from 'react'
import { Card, Paragraph } from 'react-native-paper'
import { StyleProp, ViewStyle } from 'react-native'
import { PendingView } from '../common/PendingView'
import { LocalFoodEntry } from '../../data/LocalFoodEntry'

export const IngredientsCard = ({entry, style=undefined} : {entry: LocalFoodEntry | undefined, style?: StyleProp<ViewStyle>}) => {
    if(entry?.ingredients?.ingredients_text !== undefined) {
        return (
            <Card style={style}>
                <Card.Title title={"Ingredients"} />
                <Card.Content>
                    <Paragraph>{entry.ingredients.ingredients_text}</Paragraph>
                </Card.Content>
            </Card>
        )
    } else {
        return (
            <Card style={style}>
                <Card.Title title={"Ingredients"} />
                <Card.Content>
                    <PendingView />
                </Card.Content>
            </Card>
        )
    }
    
}