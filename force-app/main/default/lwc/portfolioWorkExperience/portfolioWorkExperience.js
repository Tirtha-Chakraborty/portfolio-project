import { LightningElement, wire, api} from 'lwc';
import { getRelatedListRecords} from 'lightning/uiRelatedListApi';
export default class PortfolioWorkExperience extends LightningElement {

    @api recordId
    workExperienceList

    @wire (getRelatedListRecords, {
        parentRecordId : '$recordId',
        relatedListId : 'WorkExperience__r',
        fields : ['WorkExperience__c.JobStartDate__c', 
                'WorkExperience__c.JobEndDate__c', 
                'WorkExperience__c.IsCurrent__c', 
                'WorkExperience__c.CompanyName__c',
                'WorkExperience__c.Description__c',
                'WorkExperience__c.Role__c',
                'WorkExperience__c.Portfolio__c',
                'WorkExperience__c.WorkLocation__c'
            ]
    }) workExperienceHandler({data, error}){
        if(data){
            console.log(data);
            console.log('Work Exp data :: ', JSON.stringify(data))
            this.formatWorkExperienceData(data)
        }
        if(error){
            console.log(error);
        }
    }

    formatWorkExperienceData(data){
        this.workExperienceList = data.records.map(item => {
            let id = item.id
            const {JobStartDate__c, JobEndDate__c, IsCurrent__c, CompanyName__c, 
                WorkLocation__c, Description__c, Role__c, Portfolio__c} = item.fields
            
            let jobStartDate = this.getValue(JobStartDate__c)
            let jobEndDate = this.getValue(JobEndDate__c)
            let isCurrent = this.getValue(IsCurrent__c)
            let companyName = this.getValue(CompanyName__c)
            let workLocation = this.getValue(WorkLocation__c)
            let description = this.getValue(Description__c)
            let role = this.getValue(Role__c)
            let portfolio = this.getValue(Portfolio__c)

            return {id, jobStartDate, jobEndDate, isCurrent, companyName, 
                workLocation, description, role, portfolio}
        })
        console.log('work exp list :: ', JSON.stringify(this.workExperienceList))
    }

    getValue(data){
        return data && (data.displayValue || data.value)
    }
}