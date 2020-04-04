import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { LocalFoodEntry } from '../../data/LocalFoodEntry';
import { PendingView } from '../common/PendingView';

export const ProductInfoCard = ({entry, style=undefined} : {entry: LocalFoodEntry, style?: StyleProp<ViewStyle>}) => {

    if(entry !== undefined) {
        return (
            <Card style={style}>
                <Card.Title title={entry.info.product_name + " (" + entry.info.quantity +")"}/>
                <Card.Cover source={{uri: entry.images.image_front_url}}/>
            </Card>
        )
    } else {
        return(
            <Card style={style}>
                <Card.Content>
                    <PendingView />
                </Card.Content>
            </Card>
        )
    }
}