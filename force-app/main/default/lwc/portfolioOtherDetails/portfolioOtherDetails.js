import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SUPERBADGES_FIELD from '@salesforce/schema/Portfolio__c.Superbadges__c'
import AWARDS_FIELD from '@salesforce/schema/Portfolio__c.Awards__c'
import LANGUAGES_FIELD from '@salesforce/schema/Portfolio__c.Languages__c'
import PortfolioStaticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

export default class PortfolioOtherDetails extends LightningElement {

    @api recordId
    awardImg = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/trophy.png`
    badgeImg = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/badge.png`
    langImg = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/language.png`

    awards = []
    superbadges = []
    languages = []

    @wire(getRecord, {
        recordId : '$recordId',
        fields : [SUPERBADGES_FIELD, AWARDS_FIELD, LANGUAGES_FIELD]
    }) certslHandler(data, error){
        if(data){
            console.log('Other Details data : ', JSON.stringify(data))
            if(data.data){
                this.formatOtherDetails(data.data)
            }
        }
        if(error){
            console.log('Other Details error: ',error)
        }
    }

    formatOtherDetails(data){
        console.log('data : ' , data)
        console.log('data fields : ' , data.fields)
        const {Superbadges__c, Awards__c, Languages__c} = data.fields
        this.superbadges = Superbadges__c ? Superbadges__c.value.split(';').map(item=>{
            return `${item}`
        }) : []
        this.awards = Awards__c ? Awards__c.value.split(',') : []
        this.languages = Languages__c ? Languages__c.value.split(',') : []

        console.log('superbadges : ' , JSON.stringify(this.superbadges))
        console.log('awards : ' , JSON.stringify(this.awards))
        console.log('languages : ' , JSON.stringify(this.languages))
    }
}