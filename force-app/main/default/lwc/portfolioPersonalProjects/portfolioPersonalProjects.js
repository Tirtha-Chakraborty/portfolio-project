import { LightningElement } from 'lwc';
import PortfolioStaticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

export default class PortfolioPersonalProjects extends LightningElement {
    bmiCalculator = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/BMICalculator.png`
    alarmClock = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/AlarmClock.png`
    currencyConverter = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/CurrencyConverter.png`
    noteTaking = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/NoteApp.png`
    survey = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/Survey.png`
    weatherApp = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Projects/WeatherApp.png`

    projects =[
        {
            'name' : 'BMI Calculator App',
            'img' : this.bmiCalculator,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/bmi-calculator'
        },
        {
            'name' : 'Alarm Clock App',
            'img' : this.alarmClock,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/alarm-clock'
        },
        {
            'name' : 'Currency Converter App',
            'img' : this.currencyConverter,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/currency-converter'
        },
        {
            'name' : 'Note Taking App',
            'img' : this.noteTaking,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/note-taking-app'
        },
        {
            'name' : 'Employee Survey',
            'img' : this.survey,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/survey/survey/runtimeApp.app?invitationId=0KidM0000000jht&surveyName=employee_survey&UUID=20c24bc0-96b3-42d0-88a5-95e420de14e4'
        },
        {
            'name' : 'Weather App',
            'img' : this.weatherApp,
            'link' : 'https://tirthachakraborty-prtfolio-dev-ed.develop.my.site.com/weather-app'
        }
    ]
}