// apply assertion to the avg, min, med, max, p(90), p(95) response time using thresholds

import http from 'k6/http';
import { check } from 'k6';

export const options={
    stages:[
        {duration:'5s', target:10}, // ramp-up to 10 users over 15 seconds. user count will start from 0 to 10
        {duration:'20s', target:30}, // stay at 30 users for 1 minute
        {duration:'10s', target:0}
,    ],
thresholds : {
    http_req_duration : ['p(90)<1000'], // 90% of requests should be below 1s
    http_req_failed : ['rate<0.5'] // less than 0.5% requests should fail
    

}

    

}

export default function(){

    let res = http.get("https://grafana.com/docs/k6/latest/");
    check(res, {
        'is status 200': (r) => r.status === 200
    })
}