import http from 'k6/http';
import {sleep} from 'k6';

export const options={
    // iterations:30, // hit api for 30 times
    vus:10, // 10 virtual users
    //  total 30 requests will be sent by 10 virtual users
    // each virtual user will send (30/10) = 3 requests

    
    duration: '30s' // test will run for 30 seconds
    // 10 virtual users will be sending requests for 30 seconds

}

export default function(){
    http.get("https://quickpizza.grafana.com");
        sleep(0.5);
  
}