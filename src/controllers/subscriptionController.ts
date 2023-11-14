import { Request, Response } from "express";
import axios from 'axios';

const header =  {
    headers: {
        'SOAPAction': '""',
        Authorization: `Basic ${process.env.SOAP_API_KEY}`,
        'Content-Type': 'text/xml',
        'X-Forwarded-For': `${process.env.ADDRESS}`,
        Date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
};

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
                            data = res.data;
                        }
                    }).catch((err) => {
                        console.log("HERE")
                        console.info(err);
                    }).then(async() =>
                        res.status(200).json({
                            data: data 
                        }))
}