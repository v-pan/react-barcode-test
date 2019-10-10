import React from 'react'
import { observable, action, computed, flow } from 'mobx'
import { observer } from 'mobx-react'
import { View, Text } from 'react-native';
import { FoodFactsEntry } from './IFoodFactsJson';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils'

class FoodFactsPending {
    status_verbose = "pending"
    status = -1
    code = -1
}

@observer
export class Item extends React.Component {
    @observable fetchEntry = fromPromise(fetch("https://world.openfoodfacts.org/api/v0/product/737628064502.json").then((value) => { return value.json() }))

    // @action
    // readJson = () => fetch("https://world.openfoodfacts.org/api/v0/product/737628064502.json")
    //     .then(
    //         (response) => {
    //             if(!response.ok) {
    //                 throw new Error("HTTP Error: " + response.status)
    //             }

    //             return response.json()
    //         },
    //         (error) => {
    //             throw new Error("Fetch Error: " + error)
    //         }
    //     ).then(
    //         (data) => {

    //         }
    //     )

    render() {
        return(
            <View>
                <Text>{this.fetchEntry.case({
                    pending: () => {
                        return "Loading..."
                    },
                    fulfilled: (value: FoodFactsEntry) => {
                        return value.product.product_name_en
                    },
                    rejected: (error) => {
                        return error
                        // return <Text>Error: {error}</Text>
                    }
                })}</Text>
            </View>
        )
    }
}