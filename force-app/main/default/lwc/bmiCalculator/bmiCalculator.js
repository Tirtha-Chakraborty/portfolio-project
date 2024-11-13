import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height =''
    weight=''
    bmi=''
    result=''

    inputHandler(event){
        this[event.target.name] = event.target.value
    }

    submitHandler(event){
        event.preventDefault()
        this.calculateBmi();
    }

    calculateBmi(){
        let height = Number(this.height)/100;
        let bmi = Number(this.weight)/(height*height);
        this.bmi = Number(bmi.toFixed(2))

        if(this.bmi < 18.5){
            this.result = "Underweight"
        }
        else if(this.bmi >=18.5 && this.bmi < 25){
            this.result = "Healthy"
        }
        else if(this.bmi >=25 && this.bmi < 30){
            this.result = "Overweight"
        }
        else if(this.bmi > 30) {
            this.result = "Obese"
        }

    }

    recalculate(){
        this.result=''
        this.height=''
        this.weight=''
    }
    
}