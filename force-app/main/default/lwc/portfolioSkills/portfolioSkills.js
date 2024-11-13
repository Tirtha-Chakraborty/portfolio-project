import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_SKILL_FIELD from '@salesforce/schema/Portfolio__c.TechnicalSkills__c'
import SOFT_SKILL_FIELD from '@salesforce/schema/Portfolio__c.SoftSkills__c'
import TOOLS_SKILL_FIELD from '@salesforce/schema/Portfolio__c.SoftwareTools__c'
import DEV_METHODOLOGIES_FIELD from '@salesforce/schema/Portfolio__c.SoftwareDevelopmentMethodologies__c'

export default class PortfolioSkills extends LightningElement {
    @api recordId
    
    techSkills = []
    softSkills = []
    devMethodologies = []
    softwareTools = []

    @wire(getRecord, {
        recordId : '$recordId',
        fields : [TECH_SKILL_FIELD, SOFT_SKILL_FIELD, TOOLS_SKILL_FIELD, DEV_METHODOLOGIES_FIELD]
    }) skillHandler(data, error){
        if(data){
            console.log('Skills data : ', JSON.stringify(data))
            if(data.data){
                this.formatSkills(data.data)
            }
        }
        if(error){
            console.log('Skills error: ',error)
        }
    }

    formatSkills(data){
        console.log('data : ' , data)
        console.log('data fields : ' , data.fields)
        const {TechnicalSkills__c, SoftwareTools__c, SoftwareDevelopmentMethodologies__c, SoftSkills__c} = data.fields
        this.techSkills = TechnicalSkills__c ? TechnicalSkills__c.value.split(',') : []
        this.softSkills = SoftSkills__c ? SoftSkills__c.value.split(',') : []
        this.devMethodologies = SoftwareDevelopmentMethodologies__c ? SoftwareDevelopmentMethodologies__c.value.split(',') : []
        this.softwareTools = SoftwareTools__c ? SoftwareTools__c.value.split(',') : []
    }
}