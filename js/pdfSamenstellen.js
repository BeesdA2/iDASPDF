const { PDFDocument, StandardFonts, degrees, rgb } = require('pdf-lib');
const { insertDOCDDPSQL } = require("./pdfDB.js"); 
const fs = require('fs');
const path = require('path');
const merge = require('easy-pdf-merge');
const async = require('async');
const request = require('request');
const PDFKitDocument = require("pdfkit");
const imageSize = require('image-size').imageSize || require('image-size');

 	


async function  samenstellenPDF_Checklist(setletter, filiaalnummer, documentnummer, oorsprongcode, checklistnummer,  pdfJSON){

// Create a new PDFDocument
const document = await PDFDocument.create()

const idasFont = await document.embedFont(StandardFonts.Helvetica);





//const pagesPDF = {}
//console.log('samenstellenPDF pdfjson: ' + pdfJSON);
//const pagesPDF = { pages: [ { pageNbr : 1 ,  page_width: 500, page_height: 750 , pdfRow: [ { pdfText: [{ textfield_text: "1.Testrit", textfield_xas: 50 , textfield_yas: 700, textfield_width: 200, textfield_height: 30, textfield_size: 14, textfield_border: 0, textfield_rotate: 0,  textfield_titel: "checklistTitel"},{ textfield_text: "OK", textfield_xas: 43 , textfield_yas: 670, textfield_width: 35, textfield_height: 15, textfield_size: 12, textfield_border: 0, textfield_rotate: 90, textfield_titel: "checklistOk"}], pdfCheckbox: [{ checkbox_xas: 10, checkbox_yas: 650, checkbox_width: 10, checkbox_height: 10 , checkbox_titel: "checkboxTitel" , checkbox_check: 1, checkbox_enableReadOnly: 1}]}]}]}
//const pagesPDF =  {"pages":[{"pageNbr":"1","page_width":"500","page_height":"500","pdfRow":[{"pdfText":[{"textfield_text":"1.Test","textfield_xas":"50","textfield_yas":"700","textfield_width":"10","textfield_height":"15","textfield_size":"0","textfield_border":"0","textfield_rotate":"0","textfield_titel":"Text1"},{"textfield_text":"2.Test","textfield_xas":"50","textfield_yas":"400","textfield_width":"10","textfield_height":"15","textfield_size":"0","textfield_border":"0","textfield_rotate":"0","textfield_titel":"Text2"}],"pdfCheckbox":[]}]}]}
console.log('Net voor Parse json: pdfJSON');
var pagesPDF = JSON.parse(pdfJSON);
console.log('Net na Parse json: pdfJSON');

//const pagesPDF =  {"pages":[{"pageNbr":1, "page_width":500,"page_height":750,"pdfRow":[{"pdfText":[{"textfield_text":"1.Test","textfield_xas":50,"textfield_yas":700,"textfield_width":10,"textfield_height":15,"textfield_size":14,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text1"},{"textfield_text":"2.Test","textfield_xas":50,"textfield_yas":400,"textfield_width":10,"textfield_height":15,"textfield_size":12,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text2"}],"pdfCheckbox":[]}]}]}
for (i = 0; i < pagesPDF.pages.length; i++) {
    const pageJSON = pagesPDF.pages[i];
    // Add a blank page to the document

    

    const page = document.addPage([Number(pageJSON.page_width), Number(pageJSON.page_height)]);
	

    // Get the form so we can add fields to it
    const form = document.getForm()

    
    for (x = 0; x < pageJSON.pdfRow.length; x++) {
    const pageRow = pageJSON.pdfRow[x];  

    // pdfText 
      //for (y = 0; y < pageRow.pdfText.length; y++) {
      //const rowPdfText = pageRow.pdfText[y]
      //const testTextField = form.createTextField(rowPdfText.textfield_titel)
      //testTextField.enableMultiline();
      //testTextField.setText(rowPdfText.textfield_text)
      //if (testTextField.isMultiline()){
       // rowPdfText.textfield_height = rowPdfText.textfield_height + rowPdfText.textfield_height
      //}
      //console.log('pageRow '+ x + ' pdfText ' + y + ' textfield_text ' +rowPdfText.textfield_text + '  textfield.yas ' + rowPdfText.textfield_yas )
    //page.drawText('Controleren vóór de testrit ' +[i], { x:200, y: item.yas, size: 14 })
    //testTextField.addToPage(page, {
      //x: Number(rowPdfText.textfield_xas),
      //y: Number(rowPdfText.textfield_yas),
      //width: Number(rowPdfText.textfield_width),
      //height: Number(rowPdfText.textfield_height),
      //size: Number(rowPdfText.textfield_size),
      //font: idasFont,
      //borderWidth: Number(rowPdfText.textfield_border),
      //rotate: degrees(Number(rowPdfText.textfield_rotate)),
      
       
    
    //})

    //if (Number(rowPdfText.textfield_enableReadOnly) === 1)
    //{
    // testTextField.enableReadOnly()
    //}
    
    //}
     
// pdfText 
for (y = 0; y < pageRow.pdfText.length; y++) {
  const rowPdfText = pageRow.pdfText[y]

 // page.drawText(fillParagraph(rowPdfText.textfield_text, idasFont, Number(rowPdfText.textfield_size) , 275), {

      // x: Number(rowPdfText.textfield_xas),
      // y: Number(rowPdfText.textfield_yas),
      // width: Number(rowPdfText.textfield_width),
     //  height: Number(rowPdfText.textfield_height),
    //   size: Number(rowPdfText.textfield_size),
    //   font: idasFont,
    //   borderWidth: Number(rowPdfText.textfield_border),
    //   rotate: degrees(Number(rowPdfText.textfield_rotate)),

  //})

  // var textfield_textUTF = filterCharSet(rowPdfText.textfield_text, idasFont)
  //console.log('textfield.text string:  ' +rowPdfText.textfield_text);
  
  //let bufferOriginal = Buffer.from(rowPdfText.textfield_text);
  //console.log(bufferOriginal);
  
  //let textnogeenkeer = bufferOriginal.toString('utf8');
  //console.log('buffer: ' + bufferOriginal.toString('utf8'));
  //console.log('textnogeenkeer ' + textnogeenkeer);
  
  
  // let buff = new Buffer(rowPdfText.textfield_text, 'base64');
  // let textfield_textUTF2 = buff.toString('ascii');
   let colortext_rgb_red = ('0.95');
   let colortext_rgb_green = ('0.10');
   let colortext_rgb_blue = ('0.10');
   
   let textfield_textUTF = Buffer.from(rowPdfText.textfield_text, 'base64').toString('utf8');
  
   // console.log('decode base64: '+textfield_textUTF);


   page.drawText(textfield_textUTF, {

    x: Number(rowPdfText.textfield_xas),
    y: Number(rowPdfText.textfield_yas),
    width: Number(rowPdfText.textfield_width),
    height: Number(rowPdfText.textfield_height),
    size: Number(rowPdfText.textfield_size),
    color: rgb(Number(rowPdfText.textfield_color_rgb_red), Number(rowPdfText.textfield_color_rgb_green), Number(rowPdfText.textfield_color_rgb_blue)),
	font: idasFont,
    borderWidth: Number(rowPdfText.textfield_border),
    rotate: degrees(Number(rowPdfText.textfield_rotate)),
    

})

}


    // pdfCheckbox
    for (y = 0; y < pageRow.pdfCheckbox.length; y++) 
    {
      
	  const rowPdfCheckBoxArray = pageRow.pdfCheckbox[y]
	  for (x = 0; x< rowPdfCheckBoxArray.length; x++)
	  {	
      const rowPdfCheckBox = rowPdfCheckBoxArray[x]  
      const checkboxField = form.createCheckBox(rowPdfCheckBox.checkbox_titel)
      checkboxField.addToPage(page,{
         x: Number(rowPdfCheckBox.checkbox_xas),
         y: Number(rowPdfCheckBox.checkbox_yas),
         width: Number(rowPdfCheckBox.checkbox_width),
         height: Number(rowPdfCheckBox.checkbox_height),
         textColor: rgb(Number(rowPdfCheckBox.checkbox_textColor_rgb_red), Number(rowPdfCheckBox.checkbox_textColor_rgb_green), Number(rowPdfCheckBox.checkbox_textColor_rgb_blue)),
         backgroundColor: rgb(Number(rowPdfCheckBox.checkbox_bgColor_rgb_red), Number(rowPdfCheckBox.checkbox_bgColor_rgb_green), Number(rowPdfCheckBox.checkbox_bgColor_rgb_blue)),    		 
		 borderColor: rgb(Number(rowPdfCheckBox.checkbox_borderColor_rgb_red), Number(rowPdfCheckBox.checkbox_borderColor_rgb_green), Number(rowPdfCheckBox.checkbox_borderColor_rgb_blue)),
		 borderWidth: Number(rowPdfCheckBox.checkbox_borderWidth),
         font: idasFont,
                     })   
                  
       if (Number(rowPdfCheckBox.checkbox_check) === 1)
       {
        checkboxField.check()
       }
       if (Number(rowPdfCheckBox.checkbox_enableReadOnly) === 1)
       {
        checkboxField.enableReadOnly()
       }
	  }
    }
  }
    

  
 
  
 
  


}




 


// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await document.save()


let filename = 'CHECKLIST_'+filiaalnummer.toString() + documentnummer.toString() +'_' + checklistnummer.toString() +'.PDF';




// For example, `pdfBytes` can be:
//   • Written to a file in Node
const filePath = '../../../../../../Volvo/temp/' + filename;

fs.writeFileSync(filePath, pdfBytes);
//   • Downloaded from the browser
//   • Rendered in an <iframe>
}

async  function  samenstellenPDF_Handtekening(setletter, filiaalnummer, documentnummer, oorsprongcode, pdfJSON){
  // Maak een nieuw PDF document
  const pdfDoc = await PDFDocument.create();

console.log('Net voor Parse json: pdfJSON');
var pagesPDF = JSON.parse(pdfJSON);
console.log('Net na Parse json: pdfJSON');
let filenamePDF = '';
//const pagesPDF =  {"pages":[{"pageNbr":1, "page_width":500,"page_height":750,"pdfRow":[{"pdfText":[{"textfield_text":"1.Test","textfield_xas":50,"textfield_yas":700,"textfield_width":10,"textfield_height":15,"textfield_size":14,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text1"},{"textfield_text":"2.Test","textfield_xas":50,"textfield_yas":400,"textfield_width":10,"textfield_height":15,"textfield_size":12,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text2"}],"pdfCheckbox":[]}]}]}
for (i = 0; i < pagesPDF.pages.length; i++) {
  const pageJSON = pagesPDF.pages[i];
  // Add a blank page to the document

  
  
  const page = pdfDoc.addPage([Number(pageJSON.page_width), Number(pageJSON.page_height)]);


  
  
  for (x = 0; x < pageJSON.pdfArray.length; x++) {
  const pageArray = pageJSON.pdfArray[x];  

  console.log('pageArray naam: ' + pageArray.naam); 
filenamePDF = pageArray.handtekening_png_naam;


  // Stel de standaard lettertype en grootte in
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontSize = 18;

  // Teken een veldset (rectangular box) op de pagina
  const fieldsetX = 50;
  const fieldsetY = 150;
  const fieldsetWidth = 500;
  const fieldsetHeight = 550;

  page.drawRectangle({
      x: fieldsetX,
      y: fieldsetY,
      width: fieldsetWidth,
      height: fieldsetHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 2,
  });

  // Voeg de titel "Ondertekenen" toe boven de veldset
  page.drawText('Ondertekenen PDF document', {
      x: fieldsetX + 10,
      y: fieldsetY + fieldsetHeight + 10,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });


  // Label rectangle :
const labelWidth = 420;
  const labelHeight = 30;

  // Teken een label (naam) met de tekst "John Doe" binnen de veldset
  const labelX1 = fieldsetX + 20;
  const labelY1 = fieldsetY + fieldsetHeight - 70;
 

// Naam label
  page.drawText('Naam: ', {
      x: labelX1 ,
      y: labelY1 + 35,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

  // Tekst achtergrond
  page.drawRectangle({
      x: labelX1 ,
      y: labelY1 ,
      width: labelWidth,
      height: labelHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
  });

  // Tekst label
  page.drawText( pageArray.naam, {
      x: labelX1 + 10,
      y: labelY1 + 10,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

// Teken een label (email) met de tekst "geen@mail.nl" binnen de veldset
  const labelX2 = fieldsetX + 20;
  const labelY2 = fieldsetY + fieldsetHeight - 140;
 

// Naam label
  page.drawText('E-mail: ', {
      x: labelX2 ,
      y: labelY2 + 35,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

  // Tekst achtergrond
  page.drawRectangle({
      x: labelX2 ,
      y: labelY2 ,
      width: labelWidth,
      height: labelHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
  });

  // Tekst label
  page.drawText(pageArray.email, {
      x: labelX2 + 10,
      y: labelY2 + 10,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });


    // Teken een label (Type auto) met de tekst "XC40 T4" binnen de veldset
  const labelX3 = fieldsetX + 20;
  const labelY3 = fieldsetY + fieldsetHeight - 210;
 

// Naam label
  page.drawText('Documentnaam: ', {
      x: labelX3 ,
      y: labelY3 + 35,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

  // Tekst achtergrond
  page.drawRectangle({
      x: labelX3 ,
      y: labelY3 ,
      width: labelWidth,
      height: labelHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
  });

  // Tekst label
  page.drawText(pageArray.documentnaam, {
      x: labelX3 + 10,
      y: labelY3 + 10,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

   // Teken een label (Kenteken) met de tekst "X-999-XX" binnen de veldset
  const labelX4 = fieldsetX + 20;
  const labelY4 = fieldsetY + fieldsetHeight - 280;
 

   

// Naam label
  page.drawText('Datum en tijd:', {
      x: labelX4 ,
      y: labelY4 + 35,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

  // Tekst achtergrond
  page.drawRectangle({
      x: labelX4 ,
      y: labelY4 ,
      width: labelWidth,
      height: labelHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
  });

  // Tekst label
  page.drawText(pageArray.datumtijd, {
      x: labelX4 + 10,
      y: labelY4 + 10,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

   // Teken een label (Handtekening) met de plaatje binnen de veldset
  const labelX5 = fieldsetX + 20;
  const labelY5= fieldsetY + fieldsetHeight - 400;
 

// Naam label
  page.drawText('Handtekening: ', {
      x: labelX5 ,
      y: labelY5 + 80,
      size: fontSize - 4,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
  });

  // Vierkant achtergrond
  page.drawRectangle({
      x: labelX5 ,
      y: labelY5 - 110,
      width: labelWidth,
      height: labelHeight + 150,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
  });

  // Read the image file from the file system
const imagePath = '../../../../../../www/profoundui/htdocs/signatures/' + pageArray.handtekening_png_naam + '_signature.png'; // Change this to your image path
console.log('imagePath ' + imagePath);
const imageBytes = fs.readFileSync(imagePath);

// Determine the image extension to use the correct method
const ext = path.extname(imagePath).toLowerCase();
let embeddedImage;

// Embed the image in the PDF document
if (ext === '.jpg' || ext === '.jpeg') {
  embeddedImage = await pdfDoc.embedJpg(imageBytes);
} else if (ext === '.png') {
  embeddedImage = await pdfDoc.embedPng(imageBytes);
} else {
  throw new Error('Unsupported image format. Only JPEG and PNG are supported.');
}



// Get the dimensions of the image
const { width, height } = embeddedImage.scale(0.6);

// Place the image on the page
page.drawImage(embeddedImage, {
  x: labelX5 + 10, // X coordinate on the page
  y: labelY5 - 60, // Y coordinate on the page
  width,      // Width of the image
  height,     // Height of the image
});



}
}

  // Sla het PDF document op
  const pdfBytes = await pdfDoc.save();
 let filename = filenamePDF + '.pdf';




// For example, `pdfBytes` can be:
//   • Written to a file in Node
const filePath = '../../../../../../www/profoundui/htdocs/signatures/' + filename;
fs.writeFileSync(filePath, pdfBytes);
  console.log('PDF succesvol gegenereerd: ' + filename);
} ;



 

async function mergePDFdocumenten(setletter, filiaalnummer, documentnummer, oorsprongcode, pdfJSON) {
  console.log('Net voor Parse json: pdfJSON');
  const mergePDF = JSON.parse(pdfJSON);

  console.log('Net na Parse json: pdfJSON ' + mergePDF.merge.length);

  for (let i = 0; i < mergePDF.merge.length; i++) {
    const mergeJSON = mergePDF.merge[i];

    // Bouw array van documenten die je wilt samenvoegen
    const resultArray = mergeJSON.mergeArray.map(item => item.toMergePDFdocument);

    console.log(resultArray);

    try {
      await mergeAsync(resultArray, mergeJSON.nieuwPDFdocument);
      console.log('Successfully merged!');
    } catch (err) {
      console.error('Error merging PDF:', err);
    }
  }
}


// Promise-wrapper maken
function mergeAsync(files, dest) {
  return new Promise((resolve, reject) => {
    merge(files, dest, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function fillParagraph(text, font, fontSize, maxWidth) {
  var paragraphs = text.split('\n');
  for (let index = 0; index < paragraphs.length; index++) {
      var paragraph = paragraphs[index];
      if (font.widthOfTextAtSize(paragraph, fontSize) > maxWidth) {
          var words = paragraph.split(' ');
          var newParagraph = [];
          var i = 0;
          newParagraph[i] = [];
          for (let k = 0; k < words.length; k++) {
              var word = words[k];
              newParagraph[i].push(word);
              if (font.widthOfTextAtSize(newParagraph[i].join(' '), fontSize) > maxWidth) {
                  newParagraph[i].splice(-1); // retira a ultima palavra
                  i = i + 1;
                  newParagraph[i] = [];
                  newParagraph[i].push(word);
              }
          }
          paragraphs[index] = newParagraph.map(p => p.join(' ')).join('\n');
      }
  }
  return paragraphs.join('\n');
}


function filterCharSet (string, font) {
  const charSet = font.getCharacterSet()
  for (let i = 0; i < string.length; i++) {
    if (string[i] && !charSet.includes(string[i])) string[i] = '?'
  }
  string = string.replace(/[\uE000-\uF8FF]/g, '?')
  string = string.replace(/[^\w\s!?{}()-;:"'*@#$%&+=]/g, '?')
  return string
}

async function samenstellenPDF_Voorblad(setletter, filiaalnummer, documentnummer, oorsprongcode, pdfJSON) {
  console.log('Net voor Parse json: pdfJSON');
  const pagesPDF = JSON.parse(pdfJSON);
  console.log('pagesPDF voorblad json : ' + JSON.stringify(pagesPDF));

  const voorblad = pagesPDF.voorblad.offerteInfo;
  const voorbladConfig = pagesPDF.voorblad.pdfConfig;
  const pathPDF = pagesPDF.voorblad.pdfPath;
  const path = pathPDF[1].voorbladPath.voorblad;

  let doc = new PDFKitDocument({ size: "A4", margin: 0 });
  registerFonts(doc);

  try {
    console.log("Start images downloaden en plaatsen...");
    const results = await generateVoorbladImages(doc, voorblad, voorbladConfig, path);
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.warn(`Error in image batch ${index}: ${result.reason}`);
      }
    });
    console.log("Alle images geplaatst");

    generateVoorbladKlantInformatie(doc, voorblad, voorbladConfig);

    // ⚠️ Eerst de output-stream starten
    const writeStream = fs.createWriteStream(path);
    doc.pipe(writeStream);

    // ⚠️ Pas na ALLE afbeeldingen en tekst het document sluiten
    doc.end();

    // Optioneel wachten tot het schrijven naar schijf klaar is
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    console.log("PDF succesvol geschreven:", path);
  } catch (err) {
    console.error("Fout tijdens PDF-generatie:", err);
    throw err;
  }
}


function generateHeader(doc, voorblad) {
	try {
  if (fs.existsSync(voorblad.overlayImage)) {
    doc
    .image(voorblad.overlayImage, 1, 1 ,{width: 600} );
  }
} catch(err) {
  //console.error(err)
}  
  
    
}

function generateVoorbladKlantInformatie(doc, voorblad, voorbladConfig) {
   
  
  const klantInformatieTop = voorbladConfig[1].offerteInfoConst.tekstTop;
  const klantInformatieTekst = voorbladConfig[1].offerteInfoConst.tekst;
  const klantInformatieVariabele = voorbladConfig[1].offerteInfoConst.variabele;

  doc
    .font('novumreg')
    .fontSize(10)
	.text(voorbladConfig[0].offerteInfoText.klant, klantInformatieTekst, klantInformatieTop)
	.text(voorblad.klant, klantInformatieVariabele, klantInformatieTop)
	
    .text(voorbladConfig[0].offerteInfoText.offerte, klantInformatieTekst, klantInformatieTop + 15)
	.text(voorblad.offerte, klantInformatieVariabele, klantInformatieTop + 15)
	
    .text(voorbladConfig[0].offerteInfoText.datum, klantInformatieTekst, klantInformatieTop + 30) 
    .text(voorblad.datum, klantInformatieVariabele, klantInformatieTop + 30)
	.rect(voorbladConfig[2].offerteRectangle.xOffset,
          voorbladConfig[2].offerteRectangle.yOffset,
		  voorbladConfig[2].offerteRectangle.width,
		  voorbladConfig[2].offerteRectangle.height,
		 { color: '808080'})
    .strokeColor("#aaaaaa")
    .stroke();
    
	doc
	.font('novumbold')
	.fontSize(18)
	.text(voorblad.auto, voorbladConfig[1].offerteInfoConst.autoXoffset, voorbladConfig[1].offerteInfoConst.autoYoffset, {color: '00008B'});
   
    //.moveDown();

  //generateHr(doc, 252);
}

function generateVoorbladImages(doc, voorblad, voorbladConfig, path, callback) {
	console.log('generateVoorbladImages');
var exterieurUrl = [voorblad.exterieurUrl] ;
console.log('exterieurUrl: ' + exterieurUrl);	
var interieurUrl = [voorblad.interieurUrl] ;
console.log('interieurUrl: ' + interieurUrl);	
var achterkantUrl = [voorblad.achterkantUrl] ;
console.log('achterkantUrl: ' + achterkantUrl);	
var wheelsUrl = [voorblad.wheelsUrl] ;	
console.log('wielen url: ' + wheelsUrl);


//console.log(voorblad.imagesUrls.exterieurUrl);
//var Urls = ['https://qacas.volvocars.com/image/vbsnext-v4/exterior/MY19_1817/525/33/12/61400/R141/_/JF02/TG02/_/_/_/SR05/_/_/JB18_f12_fJF02/T20M/default.jpg?market=nl&w=320'];
console.log('voorbladConfig[3].imageExterieur.xOffset' +voorbladConfig[3].imageExterieur.xOffset );

// helper: async.each in een Promise wrappen
  function runEach(urls, iterator) {
    return new Promise((resolve, reject) => {
      async.each(
        urls,
        (url, callback) => {
        if (!url || url.trim() === "") {
          console.log("Lege URL overgeslagen");
          return callback(); // sla over, maar geen fout
        }
        iterator(url, callback);
      },
        (err) => (err ? reject(err) : resolve("done"))
      );
    });
  }


function imageExterieurtoPDF(url, callback ){
	console.log('url ext ' +url);
	request({
    url: url,
    encoding: null,
    headers: {
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "sec-ch-ua": `"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"`,
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": `"Windows"`,
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Accept": "image/png,*/*;q=0.8",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "nl-NL,nl;q=0.9"
    }
  }, function(error, response, body){
		console.log('imageExterieurtoPDF statusCode ' + response.statusCode); 
		if(!error && response.statusCode == 200){
			drawImageInBox(doc, body, voorbladConfig[3].imageExterieur, voorblad.newOrUsed, (err) => {
          if (err) return callback(err);
          callback(null, "done");
        });
			
		//	doc.image(body,
		//	voorbladConfig[3].imageExterieur.xOffset,
	//		voorbladConfig[3].imageExterieur.yOffset,
     //       {width: voorbladConfig[3].imageExterieur.width,
	//		 height: voorbladConfig[3].imageExterieur.height} )
           
  

//doc.image(body, 350, 265, { width: 200, height: 100})
//   .text('Stretch', 350, 250)
            
			 
	//	callback(error, "done");
    } else {
      callback(error || new Error("Status " + response.statusCode));
    }	
		 
	});
}

 
 


 

function imageInterieurtoPDF(url, callback) {
	console.log('imageInterieur url ext ' +url);
  request({
    url: url,
    encoding: null,
    headers: {
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "sec-ch-ua": `"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"`,
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": `"Windows"`,
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Accept": "image/png,*/*;q=0.8",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "nl-NL,nl;q=0.9"
    }
  }, function (error, response, body) {
    console.log('imageInterieurtoPDF statusCode ' + response.statusCode);
    if (!error && response.statusCode === 200) {
			drawImageInBox(doc, body, voorbladConfig[4].imageInterieur, voorblad.newOrUsed, (err) => {
          if (err) return callback(err);
          callback(null, "done");
        });
      
    } else {
      callback(error || new Error("Status " + response.statusCode));
    }
  });
}

function imageAchterkantToPDF(url, callback ){
	request({
    url: url,
    encoding: null,
    headers: {
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "sec-ch-ua": `"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"`,
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": `"Windows"`,
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Accept": "image/png,*/*;q=0.8",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "nl-NL,nl;q=0.9"
    }
  },function(error, response, body){
		console.log('imageAchterkantToPDF statusCode ' + response.statusCode); 
		if(!error && response.statusCode == 200){
				drawImageInBox(doc, body, voorbladConfig[5].imageAchterkant, voorblad.newOrUsed, (err) => {
          if (err) return callback(err);
          callback(null, "done");
        });
  

 
			
		} else {
			callback(error || new Error("Status " + response.statusCode + ' url: ' + url)); 
		}
	});
} 
 

 


 
function imageWheelstoPDF(url, callback ){
	request({
    url: url,
    encoding: null,
    headers: {
      "Connection": "keep-alive",
      "Cache-Control": "max-age=0",
      "sec-ch-ua": `"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"`,
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": `"Windows"`,
      "Upgrade-Insecure-Requests": "1",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
      "Accept": "image/png,*/*;q=0.8",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-User": "?1",
      "Sec-Fetch-Dest": "document",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "nl-NL,nl;q=0.9"
    }
  },function(error, response, body){
		console.log('imageWheelstoPDF statusCode ' + response.statusCode); 
		if(!error && response.statusCode == 200){
				drawImageInBox(doc, body, voorbladConfig[6].imageWheels, voorblad.newOrUsed, (err) => {
          if (err) return callback(err);
          callback(null, "done");
        });
			
		} else {
			callback(error || new Error("Status " + response.statusCode + ' url: ' + url)); 
		}
	});
} 
 
 
 // Promise.allSettled over alle batches
  return Promise.allSettled([
    runEach(exterieurUrl, imageExterieurtoPDF),
    runEach(interieurUrl, imageInterieurtoPDF),
	runEach(achterkantUrl, imageAchterkantToPDF),
    runEach(wheelsUrl, imageWheelstoPDF),
  ]);
 
 
 
}

 

function drawImageInBox(doc, imageBuffer, box, newOrUsed, callback) {
  try {
	console.log('drawImageInBox function');
	doc.moveTo(0, 0);
	//doc.text('Marco', 0, 0); // verplaats cursor naar absolute 0,0
	
    const dimensions = imageSize(imageBuffer);
    const originalWidth = dimensions.width;
    const originalHeight = dimensions.height;
	
	console.log('originalWidth: ' + originalWidth);
	console.log('originalHeight: ' + originalHeight);

    // Verhouding bepalen om binnen box te passen
    const ratio = Math.min(
      box.width / originalWidth,
      box.height / originalHeight
    );
	
	 let scaledWidth = box.width;
     let scaledHeight = box.height;	
	console.log('newOrUsed: ' +newOrUsed);
    if (newOrUsed === 'G') {
      scaledWidth = originalWidth * ratio;
      scaledHeight = originalHeight * ratio;
	}	
	
	console.log('scaledWidth: ' +scaledWidth);
	console.log('scaledHeight: ' +scaledHeight);
	

    // Centrerings-offsets berekenen
   //  const x = box.xOffset + (box.width - scaledWidth) / 2;
 	const x = box.xOffset;
   //  const y = box.yOffset + (box.height - scaledHeight) / 2;
	const y = box.yOffset;
	
	

     console.log('x: '+ x);
	 console.log('y: '+ y);
    // Afbeelding tekenen
    doc.image(imageBuffer, x, y, {
      width: scaledWidth,
	  height: scaledHeight 
    });

    if (callback) callback(null);
  } catch (err) {
    if (callback) callback(err);
  }
}




	

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}



function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}
function registerFonts(doc){
	doc.registerFont('novumbold', '/apf3812home/fonts/NOVUMBOLD.TTF');
	doc.registerFont('novumlight', '/apf3812home/fonts/NOVUMLIGHT.TTF');
	doc.registerFont('novumreg', '/apf3812home/fonts/NOVUMREG.TTF');
}


function fillParagraph(text, font, fontSize, maxWidth) {
  var paragraphs = text.split('\n');
  for (let index = 0; index < paragraphs.length; index++) {
      var paragraph = paragraphs[index];
      if (font.widthOfTextAtSize(paragraph, fontSize) > maxWidth) {
          var words = paragraph.split(' ');
          var newParagraph = [];
          var i = 0;
          newParagraph[i] = [];
          for (let k = 0; k < words.length; k++) {
              var word = words[k];
              newParagraph[i].push(word);
              if (font.widthOfTextAtSize(newParagraph[i].join(' '), fontSize) > maxWidth) {
                  newParagraph[i].splice(-1); // retira a ultima palavra
                  i = i + 1;
                  newParagraph[i] = [];
                  newParagraph[i].push(word);
              }
          }
          paragraphs[index] = newParagraph.map(p => p.join(' ')).join('\n');
      }
  }
  return paragraphs.join('\n');
}


function filterCharSet (string, font) {
  const charSet = font.getCharacterSet()
  for (let i = 0; i < string.length; i++) {
    if (string[i] && !charSet.includes(string[i])) string[i] = '?'
  }
  string = string.replace(/[\uE000-\uF8FF]/g, '?')
  string = string.replace(/[^\w\s!?{}()-;:"'*@#$%&+=]/g, '?')
  return string
}


async function mergeOverlayWithDocument(setletter, filiaalnummer, documentnummer, oorsprongcode,  pdfJSON){
 

  var mergePDF = JSON.parse(pdfJSON);
  console.log('mergePDF json : ' + JSON.stringify(mergePDF));
  let pathPDF = mergePDF.mergeOverlay.pdfPath;
  console.log('Wat is path 1:' +JSON.stringify(pathPDF)); 
  let overlayPath = pathPDF[0].overlayPath.overlayDocument;
  console.log('Wat is overlayPath : ' +overlayPath);
  let pdfDocumentPath = pathPDF[1].pdfDocumentPath.pdfDocument;
  console.log('Wat is pdfDocumentPath : ' +pdfDocumentPath);
  let mergedPath = pathPDF[2].mergePath.mergeDocument;
  console.log('Wat is mergedPath : ' +mergedPath); 
  
  const bytes1 = fs.readFileSync(overlayPath);
  const bytes2 = fs.readFileSync(pdfDocumentPath);

  const src1 = await PDFDocument.load(bytes1);
  const src2 = await PDFDocument.load(bytes2);

  const out = await PDFDocument.create();

  const [page1] = src1.getPages();
  const [page2] = src2.getPages();

  const e1 = await out.embedPage(page1);
  const e2 = await out.embedPage(page2);

  // Kies formaat van basispagina (bijv. die van doc1)
  const width = e1.width;
  const height = e1.height;

  const newPage = out.addPage([width, height]);

  // Tekenen bovenop elkaar → allebei op (0,0), zelfde grootte
  newPage.drawPage(e1, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  newPage.drawPage(e2, {
    x: 0,
    y: 0,
    width: width,
    height: height,
  });

  const pdfBytes = await out.save();
  fs.writeFileSync(mergedPath, pdfBytes);

  console.log("✅ Klaar! Overlay is 1 pagina:", out.getPageCount());
}

//overlay('doc1.pdf', 'doc2.pdf', 'overlay.pdf');

 
//samenstellenPDF('{}')
module.exports = {
  samenstellenPDF_Checklist: samenstellenPDF_Checklist,
  samenstellenPDF_Handtekening : samenstellenPDF_Handtekening,
  mergePDFdocumenten: mergePDFdocumenten,
  samenstellenPDF_Voorblad: samenstellenPDF_Voorblad,
  mergeOverlayWithDocument: mergeOverlayWithDocument,
  
  };