import xml2js = require('xml2js');

let sourceText = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <soapenv:Body>
      <HostCustomerResponse xmlns="http://pguat2.cimbniaga.co.id:8004">
         <ns1:output xmlns:ns1="http://10.25.136.152" xmlns:ns2="java:prismagateway.service.HostCustomer" xsi:type="ns2:Output">
            <ns2:bankReffNo xsi:nil="true" />
            <ns2:statusCode>008</ns2:statusCode>
            <ns2:statusMsg>Request message is expired</ns2:statusMsg>
            <ns2:txnResponseDateTime>20200918155602</ns2:txnResponseDateTime>
            <ns2:txnData>&lt;accountNameRequest&gt;
  &lt;accountNo&gt;1234567&lt;/accountNo&gt;
&lt;/accountNameRequest&gt;</ns2:txnData>
         </ns1:output>
      </HostCustomerResponse>
   </soapenv:Body>
</soapenv:Envelope>`;

let doTask = async () => {
    let xmlParser = new xml2js.Parser({
        tagNameProcessors: [xml2js.processors.stripPrefix]
    });
    let parsedText = await xmlParser.parseStringPromise(sourceText);
    console.log(JSON.stringify(parsedText, null, 2));
};
doTask();