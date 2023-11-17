import { Request, Response } from "express";
import { DOMParser } from 'xmldom';
import axios from 'axios';
import { json } from "body-parser";
const parseString = require('xml2js').parseString;

const header =  {
    headers: {
        'SOAPAction': '""',
        Authorization: `${process.env.SOAP_API_KEY}`,
        'Content-Type': 'text/xml',
        'X-Forwarded-For': `${process.env.ADDRESS}`,
        Date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
};

function getDataFromSOAP(xml: string) {
    let payload: any = []
    const xmlElement = new DOMParser().parseFromString(xml, 'text/html');
    const returnElement = xmlElement.getElementsByTagName('return');
    console.log(returnElement);
    if (returnElement[0].firstChild) {
        const data = returnElement[0].firstChild.nodeValue;
         // @ts-ignore
        payload = JSON.parse(data) ?? [];
    }
    console.log(payload);
    return payload;
}

export async function subscription( req : Request, res : Response ) {
    let data: any = null;
    const reqBody = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<subscriptionList xmlns="http://interfaces/">' +
    '</subscriptionList>' +
    '</soap:Body>' +
    '</soap:Envelope>';

    return axios.post(`${process.env.SOAP_URL}/subscription?wsdl`,
                      reqBody,
                      header
                    ).then((res) => {
                        console.log("SOAP Response: ", res.data)
                        if (res.status === 200) {
                            data = getDataFromSOAP(res.data);
                        }
                    }).catch((err) => {
                        console.info(err);
                    }).then(async() =>
                        res.status(200).json({
                            data: data 
                        }))
}

export async function notYetSubscribed( req : Request, rep : Response ) {
    const { subscriber_username } = req.body;
    let data: any = null;
    const reqBody = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<subscriptionList xmlns="http://interfaces/">' +
    `<subscriber_username>${subscriber_username}</subscriber_username>` + 
    '</subscriptionList>' +
    '</soap:Body>' +
    '</soap:Envelope>';

    let responseData;
    const axiosPromise = axios.post(`${process.env.SOAP_URL}/subscription?wsdl`, reqBody, header);

    axiosPromise.then((res) => {
        parseString(res.data, async (err: any, result: any) => {
            if (err) {
              console.error('Error parsing XML:', err);
            } else {
                const jsonData = result['S:Envelope']['S:Body'][0]['ns2:subscriptionListResponse'][0].return[0];
                responseData = JSON.parse(jsonData);
                console.log(responseData);
                let username_list = [];

                if (responseData !== undefined) {
                    for (let i = 0; i < responseData.length; i++) {
                        username_list.push(responseData[i].creator_username);
                    }
                }

                const req = {
                    usernames_list : username_list
                }

                try {
                    const response = await fetch("http://localhost:3000/user/getSearch/", {
                        method: 'POST',
                        body: JSON.stringify(req),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then(response => response.json())
                    .then(data => {
                        console.log(data);
                        return data;
                    })
                } catch (error) {
                    console.log("error: ", error);
                }
            }
        });

        if (res.status === 200) {
            // handle success
            console.log({
                status: res.status,
                message: 'Successfully change subscription status'
            });
        } else {
            // handle failure
            console.log({
                status: res.status,
                message: 'Failed changing subscription status'
            });
        }
    });

    return axiosPromise;
}

export async function updateSubscription( req : Request, rep : Response ) {
    const { creator_username, subscriber_username, status } = req.body;
    const reqBody = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<updateSubscription xmlns="http://interfaces/">' +
    `<creator_username>${creator_username}</creator_username>` + 
    `<subscriber_username>${subscriber_username}</subscriber_username>` + 
    `<status>${status}</status>` + 
    '</updateSubscription>' +
    '</soap:Body>' +
    '</soap:Envelope>';

    return axios.post(`${process.env.SOAP_URL}/subscription?wsdl`,
                      reqBody,
                      header
                    ).then((res) => {
                        console.log("SOAP Response: ", res.data)
                        if (res.status === 200) {
                            rep.status(200).send({
                                status: rep.statusCode,
                                message: 'Successfully change subscription status'
                            });
                        } else {
                            rep.status(200).send({
                                status: rep.statusCode,
                                message: 'Failed changing subscription status'
                            })
                        }
                    })
}


