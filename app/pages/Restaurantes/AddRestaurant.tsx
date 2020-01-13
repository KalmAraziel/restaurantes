import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import Loading from '../../components/Loading'
import AddRestaurantForm from '../../components/Restaurante/AddRestaurantForm';

const AddRestaurant = (props) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false)
    return (
        <View>
            <AddRestaurantForm navigation = {navigation} setIsLoading = { setIsLoading }></AddRestaurantForm>
            <Loading  isVisible = {isLoading} />
        </View>
    )
}
export default AddRestaurant
