import { LightningElement, api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
    @api recordId
    @api objectApiName
    @api resumeUrl

    downloadResume(){
        window.open(this.resumeUrl, '_blank')
        //https://github.com/Tirtha-Chakraborty/tirtha-resume/raw/main/Resume%20-%20Online%20Profile.pdf
    }
}