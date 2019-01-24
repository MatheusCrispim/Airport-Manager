
const BASE_PATH = '';


export  class Service{

    constructor(){
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });

        this.body = {};
    }
    

    //get request
    get = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'GET',
            headers: this.header,
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                    .then( result => { this.body = result});
    
        return {'status':statusCode, 'responseBody':this.body};
    };

    
    //Post requestdata
    post = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'POST',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.body = result});

        return {'status':statusCode, 'body':this.body};
    }; 
    

    //Put request
    update = async (endpoint, value) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'PUT',
            headers: this.header,
            body: JSON.stringify(value),
        });
        
        let statusCode = await rawResponse.status;
        await Promise.resolve(rawResponse).then(response => response.json())
                                                        .then( result => { this.body = result});

        return {'status':statusCode, 'body':this.body};
    };


    //Delete request
    del = async (endpoint) => {
        let apiPath = BASE_PATH+endpoint;

        let rawResponse = await fetch(apiPath, {
            method: 'DELETE',
            headers: this.header,
        });
        
        let statusCode = await rawResponse.status;

        return {'status':statusCode};
    };

}


