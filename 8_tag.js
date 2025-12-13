// observe different results for different api calls using tags
// and apply different thresholds for different api calls

import http from 'k6/http'
import { check,  sleep } from 'k6'

export const options = {

    vus : 1,
   iterations : 10,
   thresholds : {
     'http_req_duration{endpoint:listData}' : ['p(95)<4000']  ,
     'http_req_duration{endpoint:FirstUserData}' : ['p(90)<4000']  ,
 
   },
    

}


export default function(){
   
const listDataRes = http.get( 
        'https://jsonplaceholder.typicode.com/posts/', 
        { tags : { endpoint : 'listData'   }  }

);

   check( listDataRes , {

     'List API is successful' : (r) => r.status === 200
   } );


const userRes = http.get( 
        'https://jsonplaceholder.typicode.com/posts/1', 
        { tags : { endpoint : 'FirstUserData'   }  }

);

   check( userRes , {

     'First User API is successful' : (r) => r.status === 200
   } );

}