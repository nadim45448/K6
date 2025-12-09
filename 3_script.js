// previos script (2_script.js) login was heppening multiple times
// in this script (3_script.js) login will happen only once and token will be reused


import http from 'k6/http';
import { check, sleep } from 'k6'; 

export const options={
    vus:1,
    // duration:'1s',
    iterations:10

}

export function setup(){

    // do login once
    // login payload
      const loginPayLoad = JSON.stringify({
        "username":"admin",
        "password":"password123" 

    });

    // login headers
    const loginHeaders ={
        headers : {
            'Content-Type':'application/json',
            'Accept':'*/*'
        }
    }

    // call login api
    const loginRes = http.post('https://restful-booker.herokuapp.com/auth', loginPayLoad, loginHeaders);

    // assertion (check)
    check(loginRes, (r)=>r.status ===200)

    // get token from response and return it
    return {token : loginRes.json().token} // return as an object

}

export default function(data){


    // create booking payload
    let createPayload = JSON.stringify({
        "firstname":"nadim",
        "lastname":"hossain",
        "totalprice":111,
        "depositpaid":true, 
        "bookingdates":{
            "checkin":"2023-01-01",
            "checkout":"2023-01-05"
        },
        "additionalneeds":"Breakfast"
    });

     // add headers
    const createHeaders ={
        headers : {
            'Content-Type':'application/json',
            'Accept':'*/*',
            'Authorization':`Bearer ${data.token}` // add token here
        }
    }

    // call create booking api
    let createRes = http.post('https://restful-booker.herokuapp.com/booking', createPayload, createHeaders);

    // assertion (check)
    check (createRes,{
        'check status code is 200':(r)=> r.status ===200,
        'check response time': (r)=>r.timings.duration < 700,
        'is firstName valid': (r)=> r.body.includes("nadim"),
        'is lastName valid': (r)=> r.json().booking.lastname === "hossain"
    } )



}