import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SFDC_CERTIFICATIONS_FIELD from '@salesforce/schema/Portfolio__c.SalesforceCertifications__c'
import OTHER_CERTIFICATIONS_FIELD from '@salesforce/schema/Portfolio__c.OtherCertifications__c'
import PortfolioStaticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

export default class PortfolioCertifications extends LightningElement {

    @api recordId
    certLogo = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/cert_logo.png`
    
    sfdcCerts = []
    otherCerts = []

    @wire(getRecord, {
        recordId : '$recordId',
        fields : [SFDC_CERTIFICATIONS_FIELD, OTHER_CERTIFICATIONS_FIELD]
    }) certslHandler(data, error){
        if(data){
            console.log('Certs data : ', JSON.stringify(data))
            if(data.data){
                this.formatCerts(data.data)
            }
        }
        if(error){
            console.log('Certs error: ',error)
        }
    }

    formatCerts(data){
        console.log('data : ' , data)
        console.log('data fields : ' , data.fields)
        const {SalesforceCertifications__c, OtherCertifications__c} = data.fields
        this.sfdcCerts = SalesforceCertifications__c ? SalesforceCertifications__c.value.split(';').map(item=>{
            return `Salesforce Certified ${item}`
        }) : []
        this.otherCerts = OtherCertifications__c ? OtherCertifications__c.value.split(',') : []
    }
}