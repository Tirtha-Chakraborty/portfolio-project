import { LightningElement } from 'lwc';
import helloImage from '@salesforce/resourceUrl/helloImage';
import WEATHER_ICONS from '@salesforce/resourceUrl/weatherAppIcons';
import getWeatherDetails from '@salesforce/apex/WeatherAppController.getWeatherDetails';

export default class WeatherApp extends LightningElement {
    clearIcon = WEATHER_ICONS + '/weatherAppIcons/clear.svg'
    cloudIcon = WEATHER_ICONS + '/weatherAppIcons/cloud.svg'
    dropletIcon = WEATHER_ICONS + '/weatherAppIcons/droplet.svg'
    rainIcon = WEATHER_ICONS + '/weatherAppIcons/rain.svg'
    stormIcon = WEATHER_ICONS + '/weatherAppIcons/storm.svg'
    snowIcon = WEATHER_ICONS + '/weatherAppIcons/snow.svg'
    hazeIcon = WEATHER_ICONS + '/weatherAppIcons/haze.svg'
    mapIcon = WEATHER_ICONS + '/weatherAppIcons/map.svg'
    thermometerIcon = WEATHER_ICONS + '/weatherAppIcons/thermometer.svg'
    arrowBackIcon = WEATHER_ICONS + '/weatherAppIcons/arrow-back.svg'

    cityName=''
    loadingText = ''
    isError = false
    response
    weatherIcon

    get wavyStar() {
        return helloImage
    }

    get loadingStyle(){
        return this.isError ?  'error-text' : 'spinner-text'
    }

    searchHandler(event){
        this.cityName = event.target.value

    }

    submitHandler (event){
        event.preventDefault();
        this.fetchData();
    }

    fetchData(){
        this.isError = false;
        this.loadingText = 'Let me check'

        //Server side call
        getWeatherDetails({input : this.cityName}).then(result =>{
            this.weatherDetails(JSON.parse(result));
        }).catch(()=> {
            this.loadingText ='Oops! Something went wrong...'
            this.isError = true
            this.response = null
        })

        // Client side Call
        
        /*const API_KEY = 'c937c1aad068a65dd579dd0bbb9faa4e';
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
        
        fetch(API_URL).then(res=>res.json()).then(result=> {
            console.log(JSON.stringify(result))
            this.weatherDetails(result);
        }).catch(()=> {
            this.loadingText ='Oops! Something went wrong...'
            this.isError = true
        })*/
    }

    weatherDetails(info){
        if(info.cod == '404'){
            this.isError = true;
            this.loadingText = `Oops! Looks like ${this.cityName} is not a valid city name`
        }
        else{
            this.isError = false
            this.loadingText = ''
            const city = info.name
            const country = info.sys.country
            const {description, id} = info.weather[0]
            const {temp, feels_like, humidity} = info.main

            if(id == 800){
                this.weatherIcon = this.clearIcon
            }
            else if((id>=200 && id<=232) || (id>=600 && id<=622)){
                this.weatherIcon = this.stormIcon
            }
            else if(id>=701 && id<=781){
                this.weatherIcon = this.hazeIcon
            }
            else if(id>=801 && id<=804){
                this.weatherIcon = this.cloudIcon
            }
            else if((id>=500 && id<=531) || (id>=300 && id<=321)){
                this.weatherIcon = this.rainIcon
            }

            this.response = {
                city : city,
                temperature : Math.floor(temp),
                description : description,
                location : `${city}, ${country}`,
                feels_like : Math.floor(feels_like),
                humidity : `${humidity}%`
            }
        }
    }

    backHandler(){
        this.response = ''
        this.cityName = ''
        this.loadingText = ''
        this.isError = false;
        this.weatherIcon = ''
    }
}