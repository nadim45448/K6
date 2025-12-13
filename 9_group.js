import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {

    vus : 1,
   iterations : 10,
   thresholds : {
     'http_req_duration{endpoint:listData}' : ['p(95)<4000']  ,
     'http_req_duration{endpoint:FirstUserData}' : ['p(90)<4000']  ,
 
   },
}

export default function(){
    
group( 'User List Get APIs' , function(){
const listDataRes = http.get( 
        'https://jsonplaceholder.typicode.com/posts/', 
        { tags : { endpoint : 'listData'   }  }

);

   check( listDataRes , {

     'List API is successful' : (r) => r.status === 200
} );

})

group('Get Individul User Data APIs' , function(){
    
const userRes1 = http.get( 
        'https://jsonplaceholder.typicode.com/posts/1', 
        { tags : { endpoint : 'FirstUserData'   }  }

);

   check( userRes1 , {

     'First User API is successful' : (r) => r.status === 200
} );


const userRes2 = http.get( 
        'https://jsonplaceholder.typicode.com/posts/2', 
        { tags : { endpoint : 'SecondUserData'   }  }

);

   check( userRes2 , {

     'Second User API is successful' : (r) => r.status === 200
   } );


const userRes3 = http.get( 
        'https://jsonplaceholder.typicode.com/posts/3', 
        { tags : { endpoint : 'ThirdUserData'   }  }

);

   check( userRes3 , {

     'Third User API is successful' : (r) => r.status === 200
   } );

})







}