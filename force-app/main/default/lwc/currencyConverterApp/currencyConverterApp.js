import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList'
import currencyConverterAssetCollection from '@salesforce/resourceUrl/currencyConverterAssetCollection'

export default class CurrencyConverterApp extends LightningElement {

    currencyImage = currencyConverterAssetCollection + '/currencyConverterAssetCollection/currencyLogo.png'
    countryList = countryCodeList
    countryFrom = 'USD'
    countryTo = 'AUD'
    amount = ''
    result
    error

    handleChange(event){
        const{name, value} = event.target
        console.log('name : ', name)
        console.log('value : ',value)
        this[name] = value
        this.result = ''
        this.error = ''
    }

    submitHandler(event){
        event.preventDefault();
        this.convert();
    }

    async convert(){
        const API_KEY = 'da1d28d641d2fbffc5a75032'
        const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`

        try{
            const data = await fetch(API_URL)
            
            const jsonData = await data.json()
            console.log(jsonData)
            //debugger;

            this.result = (Number(this.amount) * jsonData.conversion_rate).toFixed(2)
            console.log(this.result)

          } catch(error){
            console.log(error)
            this.error="An error occurred. Please try again..."
          }
    }
}