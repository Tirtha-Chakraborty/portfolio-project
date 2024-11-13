public with sharing class WeatherAppController {
    
    @AuraEnabled
    public static String getWeatherDetails(String input){
        String url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input +  '&units=metric' + getKey();
        String response = getResponse(url);
        return response;
    }

    public static String getKey(){
        Application_Api_Keys__c weatherAppCS = Application_Api_Keys__c.getInstance('WeatherAppApiKey');
        String key = weatherAppCS.Key__c;
        String output = '&appid=' + key;
        return output;
    }

    public static String getResponse(String url){
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        HttpResponse res = new HttpResponse();
        req.setMethod('GET');
        req.setEndpoint(url);
        req.setTimeout(120000);

        res = h.send(req);
        String responseBody = res.getBody();

        return responseBody;
    }
}