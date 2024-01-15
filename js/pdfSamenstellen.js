const { PDFDocument, StandardFonts, degrees, rgb } = require('pdf-lib');
const { insertDOCDDPSQL } = require("./pdfDB.js"); 
const fs = require('fs');

 	


async function  samenstellenPDF(setletter, filiaalnummer, documentnummer, oorsprongcode, checklistnummer,  pdfJSON){

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
//samenstellenPDF('{}')
module.exports = {
  samenstellenPDF: samenstellenPDF
  
  };