import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { View, Text, Image } from 'react-native';
import { FoodFactsEntry } from './IFoodFactsJson';
import { fromPromise } from 'mobx-utils'
import { Card } from 'react-native-material-ui';

@observer
export class Item extends React.Component {
    @action fetchEntry = (barcode: number) => {
        return fromPromise(fetch("https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json").then((value) => { return value.json() }))
    }

    @observable foodEntry = this.fetchEntry(737628064502)

    render() {
        return(
            <View>
                {this.foodEntry.case({
                    pending: () => {
                        return <Text>Loading...</Text>
                    },
                    fulfilled: (value: FoodFactsEntry) => {
                        return (
                            <Card>
                                <View>
                                    <Text>{value.product.product_name}</Text>
                                    <Image
                                        style={{width: 150, height: 150}}
                                        source={{uri: value.product.image_front_url}}
                                    />
                                </View>
                            </Card>
                        )
                    },
                    rejected: (error) => {
                        return <Text>{error}</Text>
                    }
                })}
            </View>
        )
    }
}