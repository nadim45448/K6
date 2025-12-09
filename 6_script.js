// in a application different scenario happen at a time in real life 
// e.g., send money, withdraw money, recharge, marchant payment etc
// we will implement this scenario in this script (6_script.js)

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options ={
    scenarios:{
        sendMoney :{
            executor : 'constant-vus',
            vus: 20000, // 20% of total users sending money
            duration:'1h',
            exec: 'sendMoney' // function name
        },

        withdrawMoney :{
            executor : 'constant-vus',
            vus: 10000, // 10% of total users sending money
            duration:'1h',
            exec: 'withdrawMoney' // function name
        },

        recharge :{
            executor : 'constant-vus',
            vus: 50000, // 50% of total users sending money
            duration:'1h',
            exec: 'recharge' // function name
        }, 

        merchantPayment :{
            executor : 'constant-vus',
            vus: 20000, // 20% of total users sending money
            duration:'1h',
            exec: 'merchantPayment' // function name
        },

           utilityPayment :{
            executor : 'constant-vus',
            vus: 10000, // 10% of total users sending money
            duration:'1h',
            exec: 'utilityPayment' // function name
        },
    }
};

export function sendMoney(){
    http.post("https://bkash.com/sendMoney", {/* ... */});
    sleep(1);
}

export function withdrawMoney(){
    http.post("https://bkash.com/withdrawMoney", {/* ... */});
    sleep(1);
}

export function recharge(){
    http.post("https://bkash.com/recharge", {/* ... */});
    sleep(1);
}

export function merchantPayment(){
    http.post("https://bkash.com/merchantPayment", {/* ... */});
    sleep(1);
}

export function utilityPayment(){
    http.post("https://bkash.com/utilityPayment", {/* ... */});
    sleep(1);
}