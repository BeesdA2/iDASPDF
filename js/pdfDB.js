

const querystring = require("querystring");
const odbc = require("odbc");
 
 
function getPDFfile (setletter, pdfGUID) {
	 
   return new Promise(function(resolve)
  {  
	
	//const sSql = 'SELECT * from idad239014.pdffile where PDFGUID = \'' + pdfGUID + '\' with NONE ' ; 
  const sSql = 'SELECT * from DASFP' + setletter + '.pdffile where PDFGUID = \'' + pdfGUID + '\' with NONE ' ;
  // const sSql = 'SELECT * from dasfpa.apilog order by log_create_date desc limit 1';
	//const conn =  await odbc.connect('DSN=*LOCAL;NAM=1;CMT=0;');
	const conn = odbc.connect('DSN=*LOCAL;NAM=1;CMT=0;',  (error, connection) => { 
	//console.log('sSQL '+sSql); 
    
     connection.query( sSql, (error, result) => {
	 if (error) {
       throw error;
     }	
	 
	 //console.log(`Result Set: ${JSON.stringify(result)}`);
	  
     // let resultaat = result; 
	//  console.log('Resultaat:' +JSON.stringify(result));
	 resolve(result);
	  connection.close().then(() => {
        console.log('closed');
    });
}); 
     
});
     
	 	
 });   
 }
 

 function insertDOCDDPSQL (setletter, filiaal, ordernummer, oorsprong, type, filename, pathname, pdfBlob) {
	 
  return new Promise(function(resolve)
 {  
 
 
 
 const sSql = 'insert into dasfp'+ setletter + '.DOCDDPSQL  ( filiaal_nummer, document_nummer, oorsprong_code, document_type, file_naam, path_naam, file_blob) ' +  
              'select ' + filiaal + ', '  +ordernummer+ ', '+ oorsprong + ', \''  +type+ '\', \'' +filename+ '\', \'' +pathname+ '\', ' + pdfBlob +' from sysibm.sysdummy1 with NONE';
 

   //const sSql = 'SELECT * from DASFP' + setletter + 'pdffile where PDFGUID = \'' + pdfGUID + '\' with NONE ' ;
 // const sSql = 'SELECT * from dasfpa.apilog order by log_create_date desc limit 1';
 //const conn =  await odbc.connect('DSN=*LOCAL;NAM=1;CMT=0;');
 const conn = odbc.connect('DSN=*LOCAL;NAM=1;CMT=0;',  (error, connection) => { 
// console.log('sSQL '+sSql); 
   
    connection.query( sSql, (error, result) => {
  if (error) {
      throw error;
    }	
  
  //console.log(`Result Set: ${JSON.stringify(result)}`);
   
    // let resultaat = result;
 //  console.log('Resultaat:' +JSON.stringify(result));
  resolve(result);
   connection.close().then(() => {
       console.log('closed');
   });
}); 
    
});
    
    
});   
}




 
 module.exports = {
  getPDFfile: getPDFfile,
  insertDOCDDPSQL: insertDOCDDPSQL,
  
 };

