import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png'
    clockRingtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3')

    currentTime = ''
    hours =[]
    mins =[]
    meridiems=['AM', 'PM']
    hourSelected=''
    minSelected=''
    meridiemSelected=''
    alarmTime=''
    isAlarmSet=false
    alarmTriggered = false

    get isFieldNotSelected(){
        return !(this.hourSelected && this.minSelected && this.meridiemSelected)
    }

    get shakeImage(){
        return this.alarmTriggered ? 'shake' : ''
    }    

    connectedCallback(){
        this.createHourOptions()
        this.createMinutesOptions()
        this.currentTimeHandler()
    }

    
    currentTimeHandler(){
        setInterval(()=>{

            let dateTime = new Date()
            let hours = dateTime.getHours()
            let mins = dateTime.getMinutes()
            let secs = dateTime.getSeconds()
            let ampm = 'AM';
            if(hours>12){
                hours = hours-12
                ampm = 'PM'
            }
            else if(hours == 12){
                ampm = 'PM'
            }
            else if(hours==0){
                hours = 12
            }
            hours = (hours < 10)? '0'+hours : hours
            mins = (mins < 10)? '0'+mins : mins
            secs = (secs < 10)? '0'+secs : secs

            this.currentTime = `${hours}:${mins}:${secs}:${ampm}`
            if(this.alarmTime == `${hours}:${mins}:${ampm}`){
                this.alarmTriggered = true
                this.clockRingtone.play();
                this.clockRingtone.loop = true
            }
        }, 1000)
        
    }

    createHourOptions(){
        for(let i =1 ; i<=12 ; i++){
            let val = (i<10) ? `0${i}` : i
            this.hours.push(val)
        }
    }

    createMinutesOptions(){
        for(let i =0 ; i<=59 ; i++){
            let val = (i<10) ? `0${i}` : i
            this.mins.push(val)
        }
    }

    optionhandler(event){
        const{label, value} = event.detail
        if(label == 'Hour(s)'){
            this.hourSelected = value
        }
        else if(label == 'Minute(s)'){
            this.minSelected = value
        }
        else if(label == 'AM/PM'){
            this.meridiemSelected = value
        }
    }

    setAlarm(event){
        this.alarmTime = `${this.hourSelected}:${this.minSelected}:${this.meridiemSelected}`
        this.isAlarmSet = true
    }
    clearAlarm(event){
        this.alarmTime = '';
        this.isAlarmSet = false;
        this.alarmTriggered = false
        this.clockRingtone.pause()
       const elements = this.template.querySelectorAll('c-clock-drop-down')
       Array.from(elements).forEach(element => {
            element.reset('')
       });
    }
}