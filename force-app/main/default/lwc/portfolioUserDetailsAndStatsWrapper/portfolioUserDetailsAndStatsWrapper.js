import { LightningElement, api } from 'lwc';

export default class PortfolioUserDetailsAndStatsWrapper extends LightningElement {
    @api recordId
    @api objectApiName
    @api rank
    @api points 
    @api badges
    @api trails
    @api resumeUrl
}