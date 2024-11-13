import { LightningElement, api } from 'lwc';

export default class AppendHtml extends LightningElement {
    _result

    // once the data is set from the parent this getter is called to return the set result
    @api
    get result(){
        return this._result
    }

    // _result is set when the data is received from the parent
    set result(data){
        this._result = data
        this.attachHtml();
    }

    attachHtml(){
        const container = this.template.querySelector('.htmlContainer')
        if(container){
            container.innerHTML = this.result
            this.loaded = true
        }
    }

    renderedCallback(){
        if(this._result){
            this.attachHtml()
        }
    }
}