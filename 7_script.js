 // faker

 import http from 'k6/http';
 import faker from 'https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js';
 import { check } from 'k6';

 export const options ={
    vus:1,
    duration:'1'
 };

 export default function(){
    let randomName = faker.name.findName();
    let randomEmail = faker.internet.email();
    let randomCity = faker.address.city();

    let payLoad =JSON.stringify({
        name : randomName,
        email : randomEmail,
        city : randomCity
    });

    http.post('https://reqres.in/api/users', payLoad, {
        headers : {
            'Content-Type':'application/json'
        }
    });
    console.log(payLoad)

 }
