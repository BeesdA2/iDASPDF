const { samenstellenPDF_Checklist } = require("./pdfSamenstellen.js"); 
const { samenstellenPDF_Handtekening } = require("./pdfSamenstellen.js"); 
const { mergePDFdocumenten } = require("./pdfSamenstellen.js"); 
const { getPDFfile } = require("./pdfDB.js"); 
 



async function  aanmakenPDF (setletter, pdfGUID){
   
   console.log("aanmakenPDF")
 //  Haal onder ander uit json de pdf configuratie op
    const respPDFfile = await getPDFfile(setletter, pdfGUID);
    let   jsonPDFfile = await respPDFfile;
   
    console.log('pdffile_kenmerk: ' + jsonPDFfile[0].PDFFILE_KENMERK);
     
    if ((jsonPDFfile[0].PDFFILE_KENMERK).trim() === 'CHECKLIST')
  {		 
 // samestellen PDF document tbv Checklist
   console.log("samenstellen PDF CHECKLIST");
   const respSamenstellenPDF_Checklist = await samenstellenPDF_Checklist (setletter, jsonPDFfile[0].PDFFILE_FILIAAL, jsonPDFfile[0].PDFFILE_DOCUMENT, jsonPDFfile[0].PDFFILE_OORSPRONG, jsonPDFfile[0].PDFFILE_CHKLSTNR, jsonPDFfile[0].PDFFILE_JSON);
   let   response  = await respSamenstellenPDF_Checklist;
  }
  
   if ((jsonPDFfile[0].PDFFILE_KENMERK).trim() === 'HANDTEKENING')
  {		 
 // samestellen PDF document tbv Handtekening
   console.log("samenstellen PDF HANDTEKENING");
   const respSamenstellenPDF_Handtekening = await samenstellenPDF_Handtekening (setletter, jsonPDFfile[0].PDFFILE_FILIAAL, jsonPDFfile[0].PDFFILE_DOCUMENT, jsonPDFfile[0].PDFFILE_OORSPRONG, jsonPDFfile[0].PDFFILE_JSON);
   let   response  = await respSamenstellenPDF_Handtekening;
  }
  
   if ((jsonPDFfile[0].PDFFILE_KENMERK).trim() === 'MERGE_PDF_DOCUMENTEN')
  {		 
 // samestellen PDF document tbv Handtekening
   console.log("merge 1 document");
   const respMergPDF_Document = await mergePDFdocumenten (setletter, jsonPDFfile[0].PDFFILE_FILIAAL, jsonPDFfile[0].PDFFILE_DOCUMENT, jsonPDFfile[0].PDFFILE_OORSPRONG, jsonPDFfile[0].PDFFILE_JSON);
   let   response  = await respMergPDF_Document;
  }
    

  // samestellen PDF document
   // console.log("samenstellen PDF");
  //  const respSamenstellenPDF = await samenstellenPDF (setletter, jsonPDFfile[0].PDFFILE_FILIAAL, jsonPDFfile[0].PDFFILE_DOCUMENT, jsonPDFfile[0].PDFFILE_OORSPRONG, jsonPDFfile[0].PDFFILE_CHKLSTNR, jsonPDFfile[0].PDFFILE_JSON);
  //  let   response  = await respSamenstellenPDF;
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
