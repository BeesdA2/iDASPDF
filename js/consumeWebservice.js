
const { verwerkenPDF } = require("./handlePDF.js");
 


	 
	 

async function startConsumeWebservicePDF (setletter, pdfGUID ) {
   try{
   
    
     
    
   let resolve = await consumePDF(setletter, pdfGUID);
   let resultResolve = await resolve; 
    } catch (e) {
        console.error(e);
		 
    } finally {
        console.log('consumePDF ready');
		return ({ message: 'consumePDF succesvol uitgevoerd'});
    }
}



async function consumePDF(setletter, pdfGUID) {
	try{
	//console.log('createAndSendRequest ' + JSON.stringify(jsonApilog));
	
    const respVerwerkenPDF = await verwerkenPDF(setletter, pdfGUID);
	let resultVewerkenPDF = await respVerwerkenPDF;
	//console.log('resultCreateAndSendRequest: ' + resultCreateAndSendRequest);
	//logger.info('createAndSendRequestWebservice ' );
    return 'geslaagd';
	} catch (e) {
        console.error(e);
		 
    }
}

	
//startConsumeWebserviceAskAI (setletter, guid, applicatie);
 
async function handleConsumeWebservicePDF (setletter, pdfGUID)
{
    try{	
	//console.log('setletter:' + setletter);
	//logger.info('handleConsumeWebserviceApiWeb');
	
	var resolve = await startConsumeWebservicePDF (setletter, pdfGUID);
	return (resolve);
    }
	catch(err) { console.error('foutmelding startConsumeWebservicePDF ' + err);}
	
}


module.exports = {
    handleConsumeWebservicePDF: handleConsumeWebservicePDF
  }; 