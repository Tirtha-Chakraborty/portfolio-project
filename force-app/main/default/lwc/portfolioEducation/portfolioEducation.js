import { LightningElement, wire, api} from 'lwc';
import { getRelatedListRecords} from 'lightning/uiRelatedListApi';
const COLUMNS = [
    { label: 'Title', fieldName: 'Title' },
    { label: 'Institution Name', fieldName: 'InstitutionName'},
    { label: 'Passing Year', fieldName: 'PassingYear' }
];


export default class PortfolioEducation extends LightningElement {

    @api recordId
    educationList
    columns = COLUMNS

    @wire (getRelatedListRecords, {
        parentRecordId : '$recordId',
        relatedListId : 'Educations__r',
        fields : ['Education__c.InstitutionName__c', 
                'Education__c.Title__c', 
                'Education__c.PassingYear__c'
                ],
        sortBy : ['Education__c.PassingYear__c']        
    }) educationHandler({data, error}){
        if(data){
            console.log(data);
            console.log('Education data :: ', JSON.stringify(data))
            this.formatEducationData(data)
        }
        if(error){
            console.log(error);
        }
    }

    formatEducationData(data){
        this.educationList = [...data.records].reverse().map(item => {
            let Id = item.Id
            const {InstitutionName__c, Title__c, PassingYear__c} = item.fields
            
            let InstitutionName = InstitutionName__c.value
            let Title = Title__c.value
            let PassingYear = PassingYear__c.value

            return {Id, InstitutionName, Title, PassingYear}
        })
        console.log('Education list formatted:: ', JSON.stringify(this.educationList))
    }
}