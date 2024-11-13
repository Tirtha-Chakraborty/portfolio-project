import { LightningElement, wire } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import createNoteRecord from '@salesforce/apex/NoteTakingAppController.createNoteRecord'
import getNoteRecords from '@salesforce/apex/NoteTakingAppController.getNoteRecords'
import updateNoteRecord from '@salesforce/apex/NoteTakingAppController.updateNoteRecord'
import deleteNoteRecord from '@salesforce/apex/NoteTakingAppController.deleteNoteRecord'
import {refreshApex} from '@salesforce/apex'
const DEFAULT_NOTE_FORMAT ={
    Name : "",
    Note_Description__c : ""
}

export default class NoteTakingApp extends LightningElement {
    showModal = false
    selectedRecordId
    wiredNoteResult
    noteList =[]
    noteRecord = DEFAULT_NOTE_FORMAT
    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
    ];

    get isInvalidFormEntry(){
        return !(this.noteRecord && this.noteRecord.Note_Description__c && this.noteRecord.Name)
    }

    get modalName(){
        return this.selectedRecordId ? "Update Node" : "Add Note"
    }

    @wire(getNoteRecords)
    noteListInfo(result){
        const {data, error} = result
        this.wiredNoteResult = result
        if(data){
            console.log('note data : ', JSON.stringify(data))
            this.noteList = data.map(item => {
                let formattedDate = new Date(item.LastModifiedDate).toDateString()
                return {...item, formattedDate}
            })
        }
        if(error){
            console.log(error)
            this.showToastMessage('error.message.body', 'error')
        }
    }

    createNoteHandler(){
        this.showModal = true
    }

    closeModal(){
        this.showModal = false;
        this.reset()
    }

    changeHandler(event){
        this.noteRecord = {...this.noteRecord, [event.target.name]: event.target.value}
    }

    formSubmitHandler(event){
        event.preventDefault();
        console.log('note record :: ', JSON.stringify(this.noteRecord));
        if(this.selectedRecordId){
            this.updateNode(this.selectedRecordId)
        }
        else{
            this.createNote()
        }
    }

    createNote(){
        createNoteRecord({title : this.noteRecord.Name, description : this.noteRecord.Note_Description__c}).then(() => {
            this.showModal = false;
            this.reset()
            this.showToastMessage('Note Added succesfully!!', 'success')
            this.refresh()
        }).catch(error => {
            console.log(error)
            this.showModal = false;
            this.showToastMessage('error.message.body', 'error')
        })
    }

    showToastMessage(message, variant){
        const notificationElement = this.template.querySelector('c-notification')
        if(notificationElement){
            notificationElement.showToast(message, variant);
        }
    }

    editNoteHandler(event){
        this.selectedRecordId = event.target.dataset.recordid
        const currentNoteRecord =  this.noteList.find(item => item.Id === this.selectedRecordId)
        console.log('currentNoteRecord :: ', currentNoteRecord)
        this.noteRecord ={
            Name : currentNoteRecord.Name,
            Note_Description__c : currentNoteRecord.Note_Description__c
        }
        this.showModal = true
    }

    updateNode(noteId){
        updateNoteRecord({noteId : noteId, title : this.noteRecord.Name, description : this.noteRecord.Note_Description__c}).then(() => {
            this.showModal = false
            this.reset()
            this.showToastMessage('Note Updated succesfully!!', 'success')
            this.refresh()
        }).catch(error => {
            console.log(error)
            this.showModal = false;
            this.showToastMessage('error.message.body', 'error')
        })
    }

    deleteNoteHandler(event){
       this.selectedRecordId = event.target.dataset.recordid
       this.handleConfirm()
    }

    async handleConfirm(){
        const result = await LightningConfirm.open({
            message : 'Are you sure you want to Delete this note ?',
            variant : 'headerless',
            label : 'Delete Confirmation'
        })
        if(result){
           this.deleteNote()
        }
        else{
            this.selectedRecordId = null
        }
    }

    deleteNote(){
        deleteNoteRecord({noteId : this.selectedRecordId}).then(() => {
            this.reset()
            this.showToastMessage('Note Deleted succesfully!!', 'success')
            this.refresh()
        }).catch(error => {
            console.log(error)
            this.showToastMessage('error.message.body', 'error')
        })
    }

    refresh(){
        return refreshApex(this.wiredNoteResult)
    }

    reset(){
        this.noteRecord = DEFAULT_NOTE_FORMAT
        this.selectedRecordId = null
    }
}