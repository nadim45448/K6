// send credential through environment variables/ terminal
// run command:
// k6 run -e BASE_URL="https://restful-booker.herokuapp.com" -e USERNAME="admin" -e PASSWORD="password123" 11_env.js
import http from 'k6/http'
import { check,  sleep } from 'k6'

export const options = {

    vus : 1,
   
   iterations : 10
    

}


export default function(){

   // const baseurl = __ENV.BASE_URL;
    const userName = __ENV.USERNAME;
    const Password = __ENV.PASSWORD;
  

    const loginPayload = JSON.stringify( {
     username: userName ,
      password : Password
    });

    const loginHeaders = {

        headers :  {
           
            "Content-Type" : "application/json",
            "Accept" : "*/*"
 
        }

    }

     const loginRes =  http.post( 'https://restful-booker.herokuapp.com/auth'  , loginPayload , loginHeaders  );


     check( loginRes , (r) => r.status === 200  )

     const token = loginRes.json().token;




let createPayload = JSON.stringify(  {
    "firstname" : "John",
    "lastname" : "Doe",
    "totalprice" : 100,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2022-08-13T14:23:45.000Z",
        "checkout" : "2023-08-13T14:23:45.000Z"
    } 
});


 let createHeader = {

        headers :  {
           
            "Content-Type" : "application/json",
            "Accept" : "*/*",
            "Authorization" : `${token}`
 
        }

    }
    
    console.log( "token "+token );

    let createRes =  http.post('https://restful-booker.herokuapp.com/booking' , createPayload , createHeader );

    check( createRes , {
       
        'check status code' : (r) => r.status === 200,
        // ' check response time ' : (r) => r.timings.duration < 700,
        'is firstName valid' : (r) => r.body.includes("John"),
        'is lastname valid' : (r) => r.json().booking.lastname === "Doe"


    }  );
    

    sleep(1);

}