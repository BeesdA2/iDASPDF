const { samenstellenPDF } = require("./pdfSamenstellen.js"); 
const { getPDFfile } = require("./pdfDB.js"); 
 



async function  aanmakenPDF (setletter, pdfGUID){
   
   console.log("aanmakenPDF")
 //  Haal onder ander uit json de pdf configuratie op
    const respPDFfile = await getPDFfile(setletter, pdfGUID);
    let   jsonPDFfile = await respPDFfile;
   
  // console.log('setletter: '+ setletter);	
  // console.log('pdfJSON: ' + jsonPDFfile[0].PDFFILE_JSON.trim());
  // console.log('pdfGUID: ' + jsonPDFfile[0].PDFFILE_GUID.trim());
  
   
    

  // samestellen PDF document
    console.log("samenstellen PDF");
    const respSamenstellenPDF = await samenstellenPDF (setletter, jsonPDFfile[0].PDFFILE_FILIAAL, jsonPDFfile[0].PDFFILE_DOCUMENT, jsonPDFfile[0].PDFFILE_OORSPRONG, jsonPDFfile[0].PDFFILE_CHKLSTNR, jsonPDFfile[0].PDFFILE_JSON);
    let   response  = await respSamenstellenPDF;
//  Maak de samenvatting via OpenAI LLM
 //  const  respSamenvatting =  await get_completion(jsonPythonlog[0].PYTHONJSON.trim()) ;
 //  let    samenvatting =  await respSamenvatting;

  // console.log("SAMENVATTING : " + samenvatting);//


 // const respInsertPythonlog = await insertPythonLog('antwoord', pythonGUID,  samenvatting);
 // let   antwoord = await respInsertPythonlog;
  
  //console.log('antwoord: ' + antwoord);
  

}
// Schrijf de samenvatting terug naar IDAS
//ophalenClaim('10454017-bb2e-1aa9-b76f-0004ac1db2db');
//ophalenClaim(pythonGUID)
module.exports = {
  aanmakenPDF: aanmakenPDF
 };
