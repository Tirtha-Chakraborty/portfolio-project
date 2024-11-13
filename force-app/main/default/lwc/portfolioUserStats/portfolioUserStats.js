import { LightningElement, api } from 'lwc';
import PortfolioStaticResources from '@salesforce/resourceUrl/PortfolioStaticResources'

export default class PortfolioUserStats extends LightningElement {
    @api rank
    @api points 
    @api badges
    @api trails
    trailheadRankImage

    renderedCallback(){
        if(this.rank){
            let url = `${PortfolioStaticResources}/PortfolioStaticResources/PortfolioAssets/Ranks/${this.rank}.png`
            this.trailheadRankImage = url
        }
    }
}