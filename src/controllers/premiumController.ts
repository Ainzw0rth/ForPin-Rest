import { Request, Response } from "express";
import { DOMParser } from 'xmldom';
import axios from 'axios';

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

export async function premiumList( req : Request, res : Response ) {
    let data: any = null;
    const reqBody = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<premiumList xmlns="http://interfaces/">' +
    '</premiumList>' +
    '</soap:Body>' +
    '</soap:Envelope>';

    return axios.post(`${process.env.SOAP_URL}/premium?wsdl`,
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

export async function updatePremium( req : Request, rep : Response ) {
    const { creator_username, status } = req.body;
    const reqBody = 
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
    '<soap:Body>' +
    '<updatePremiumUser xmlns="http://interfaces/">' +
    `<creator_username>${creator_username}</creator_username>` + 
    `<status>${status}</status>` + 
    '</updatePremiumUser>' +
    '</soap:Body>' +
    '</soap:Envelope>';

    return axios.post(`${process.env.SOAP_URL}/premium?wsdl`,
                      reqBody,
                      header
                    ).then((res) => {
                        console.log("SOAP Response: ", res.data)
                        if (res.status === 200) {
                            rep.status(200).send({
                                status: rep.statusCode,
                                message: 'Successfully change premium status'
                            });
                        } else {
                            rep.status(500).send({
                                status: rep.statusCode,
                                message: 'Failed changing premium status'
                            })
                        }
                    })
}


