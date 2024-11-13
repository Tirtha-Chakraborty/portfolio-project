public without sharing class NoteTakingAppController {
    
    @AuraEnabled
    public static Boolean createNoteRecord(String title, String description){
        try{
            if(String.isNotBlank(title)){
                My_Note__c noteRec = new My_Note__c(Name = title, Note_Description__c = description);
                insert noteRec;
                return true;
            }
            return false;
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable = true)
    public static List<My_Note__c> getNoteRecords(){
        return [SELECT Id, Name, Note_Description__c, LastModifiedDate from My_Note__c order by LastModifiedDate desc];
    }

    @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try{
            if(String.isNotBlank(noteId)){
                My_Note__c note = [SELECT Id, Name, Note_Description__c, LastModifiedDate FROM My_Note__c WHERE Id =: noteId];
                note.Name = title;
                note.Note_Description__c = description;
                update note;
                return true;
            }
            return false;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean deleteNoteRecord(String noteId){
        try{
            if(String.isNotBlank(noteId)){
                My_Note__c note = new My_Note__c(Id = noteId);
                delete note;
                return true;
            }
            return false;
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}