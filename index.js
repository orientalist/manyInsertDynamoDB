const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const fetch = require('node-fetch');

const dynamo = new DynamoDB({
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    },
    apiVersion: '',
    region: ''
});
exports.handler = async (event) => {
    const body = event.body;
        
    const SVID = body.split('&')[0].split('=')[1];
    const HASH = body.split('&')[1].split('=')[1];;
    await main(SVID,HASH);
    return {
        statusCode: 200,
        body: "Success"
    };
};

const main = async (svid, hash) => {
    try {
        const decryptor_url = `https://abc.com?svid=${svid}&hash=${hash}`;
        const surveyResp = await fetch(decryptor_url);
        const surveyData = await surveyResp.json();
        const surveyResult=[];
        

        for(let i=0;i<surveyData.result.length;i++){
            const r=surveyData.result[i];
            if (r.type !== 'STATEMENT' && r.type !== 'QUOTE') {
                const obj={
                    M:{}
                };
                if(r.type==='NEST'){
                    const property=r.subject
                    obj.M[property]={L:[]};
                    let o=i+1;
                    
                    while(surveyData.result[o].type==='NESTCHILD'){
                        const innerObj={M:{}};
                        innerObj.M[surveyData.result[o].subject]={S:surveyData.result[o].answer[0]};
                        obj.M[property].L.push(innerObj);
                        i=o;
                        o+=1;
                    }
                }else if(r.type==='ITEMSORT'){
                    obj.M[r.subject]={L:r.answer.map((as,i)=>{
                        const j={M:{}};
                        j.M[`${i+1}`]={S:as};
                        return j;
                    })};
                }
                else{
                    obj.M[r.subject]={S:r.answer[0]||''}; 
                }
                surveyResult.push(obj)
            }
        }

        const randomString = Math.random().toString(36).substring(2, 12);
        
        const params = {
            TableName: "demoMany",
            Item: {
                surveyId: { S: `${surveyData.svid}${randomString}` },
                submitTime:{S:surveyData.submitTime},
                svid:{S:surveyData.svid},
                title:{S:surveyData.title},
                clientId:{S:surveyData.result.find(r=>r.alias==='client_id').answer[0]},
                clietnName:{S:surveyData.result.find(r=>r.alias==='client_name').answer[0]},
                surveyResult:{L:surveyResult}
            }
        };
        
        const result = await dynamo.putItem(params);
        return result;
    } catch (err) {
        console.log(err);
        return err;
    }
}