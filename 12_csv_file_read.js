import http from 'k6/http'
import { check,  sleep } from 'k6'
import {  SharedArray } from 'k6/data'

//CSV File read
const users = new SharedArray('user data', function () {
  const f = open('./users.csv');
  const lines = f.trim().split('\n');
  const headers = lines[0].split(',');
 
  return lines.slice(1).map(line => {
    const data = line.split(',');
    let userObj = {};
    headers.forEach((header, index) => {
      userObj[header.trim()] = data[index].trim();
    });
    return userObj;
  });
});


export const options = {

    vus : 2,
   
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



     const user = users[__VU-1];

    const  firstName = user.FirstName ;
    const lastName = user.LastName;


let createPayload = JSON.stringify(  {
    "firstname" : firstName,
    "lastname" : lastName,
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
        'is firstName valid' : (r) => r.body.includes(firstName),
        'is lastname valid' : (r) => r.json().booking.lastname === lastName


    }  );
    

    sleep(1);

}