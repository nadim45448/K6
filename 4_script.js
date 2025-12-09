// in real lifr scenario sometimes 10 users load the system, sometimes 20 users load the system, sometimes 500 users load the system
// we will implemment this scenarion in this script (4_script.js)

import http from 'k6/http';
import { check } from 'k6';

export const options={
    stages:[
        {duration:'15s', target:10}, // ramp-up to 10 users over 15 seconds. user count will start from 0 to 10
        {duration:'1m', target:30}, // stay at 30 users for 1 minute
        {duration:'30s', target:0}
,    ]

    

}

export default function(){

    let res = http.get("https://grafana.com/docs/k6/latest/");
    check(res, {
        'is status 200': (r) => r.status === 200
    })
}