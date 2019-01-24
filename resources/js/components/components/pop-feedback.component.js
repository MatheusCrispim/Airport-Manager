import { message } from 'antd';

const  popFeedback = (response) => {
     
    let displayTIme = 5;
    const { statusCode, bodyText } = response;

    switch(statusCode){
        case 200: 
            break;
        case 201:
            message.success(bodyText, displayTIme);
            break;
        case 202:
            message.success(bodyText, displayTIme);
            break;
        case 204:
            message.success(bodyText, displayTIme);
            break;
        case 400:
            message.error(bodyText, displayTIme);
            break;
        case 401:
            message.error(bodyText, displayTIme);
            break;
        case 403:
            message.error(bodyText, displayTIme);
            break;
        case 404:
            message.warning(bodyText, displayTIme);
            break;
        case 409:
            message.warning(bodyText, displayTIme);
            break;
        case 500:
            message.error(bodyText, displayTIme);
            break;
        default:
            message.error(bodyText, displayTIme);
            break;
    }    
}


export default popFeedback;