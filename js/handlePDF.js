
const { aanmakenPDF } = require("./createPDF.js");
 


async function verwerkenPDF (setletter, pdfGUID)
 {
    
	 console.log('Verwerken PDF');
   console.log('Verwerken PDF setletter: ' + setletter);
   console.log('Verwerken PDF pdfGUID: ' + pdfGUID);
   const respAanmakenPDF  =  await aanmakenPDF (setletter, pdfGUID);
   let   response =  await respAanmakenPDF;
   
   
  
  

 return response;  
    


}



module.exports = {
  verwerkenPDF: verwerkenPDF
  
  };