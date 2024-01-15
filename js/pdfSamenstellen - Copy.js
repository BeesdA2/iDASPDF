const { PDFDocument, StandardFonts, degrees } = require('pdf-lib');
const fs = require('fs');
 	


async function  samenstellenPDF(pdfJSON){

// Create a new PDFDocument
const pdfDoc = await PDFDocument.create()

const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)





//const pagesPDF = {}
console.log('samenstellenPDF pdfjson: ' + pdfJSON);
//const pagesPDF = { pages: [ { pageNbr : 1 ,  page_width: 500, page_height: 750 , pdfRow: [ { pdfText: [{ textfield_text: "1.Testrit", textfield_xas: 50 , textfield_yas: 700, textfield_width: 200, textfield_height: 30, textfield_size: 14, textfield_border: 0, textfield_rotate: 0,  textfield_titel: "checklistTitel"},{ textfield_text: "OK", textfield_xas: 43 , textfield_yas: 670, textfield_width: 35, textfield_height: 15, textfield_size: 12, textfield_border: 0, textfield_rotate: 90, textfield_titel: "checklistOk"}], pdfCheckbox: [{ checkbox_xas: 10, checkbox_yas: 650, checkbox_width: 10, checkbox_height: 10 , checkbox_titel: "checkboxTitel" , checkbox_check: 1, checkbox_enableReadOnly: 1}]}]}]}
//const pagesPDF =  {"pages":[{"pageNbr":"1","page_width":"500","page_height":"500","pdfRow":[{"pdfText":[{"textfield_text":"1.Test","textfield_xas":"50","textfield_yas":"700","textfield_width":"10","textfield_height":"15","textfield_size":"0","textfield_border":"0","textfield_rotate":"0","textfield_titel":"Text1"},{"textfield_text":"2.Test","textfield_xas":"50","textfield_yas":"400","textfield_width":"10","textfield_height":"15","textfield_size":"0","textfield_border":"0","textfield_rotate":"0","textfield_titel":"Text2"}],"pdfCheckbox":[]}]}]}
var pagesPDF = JSON.parse(pdfJSON);

//const pagesPDF =  {"pages":[{"pageNbr":1, "page_width":500,"page_height":750,"pdfRow":[{"pdfText":[{"textfield_text":"1.Test","textfield_xas":50,"textfield_yas":700,"textfield_width":10,"textfield_height":15,"textfield_size":14,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text1"},{"textfield_text":"2.Test","textfield_xas":50,"textfield_yas":400,"textfield_width":10,"textfield_height":15,"textfield_size":12,"textfield_border":0,"textfield_rotate":0,"textfield_titel":"Text2"}],"pdfCheckbox":[]}]}]}
for (i = 0; i < pagesPDF.pages.length; i++) {
    const pageJSON = pagesPDF.pages[i];
    // Add a blank page to the document

    

    const page = pdfDoc.addPage([Number(pageJSON.page_width), Number(pageJSON.page_height)])

    // Get the form so we can add fields to it
    const form = pdfDoc.getForm()

    
    for (x = 0; x < pageJSON.pdfRow.length; x++) {
    const pageRow = pageJSON.pdfRow[x];  

    // pdfText 
      for (y = 0; y < pageRow.pdfText.length; y++) {
      const rowPdfText = pageRow.pdfText[y]
      const testTextField = form.createTextField(rowPdfText.textfield_titel)
      testTextField.enableMultiline();
      testTextField.setText(rowPdfText.textfield_text)
      if (testTextField.isMultiline()){
        rowPdfText.textfield_height = rowPdfText.textfield_height + rowPdfText.textfield_height
      }
      console.log('pageRow '+ x + ' pdfText ' + y + ' textfield_text ' +rowPdfText.textfield_text + '  textfield.yas ' + rowPdfText.textfield_yas )
    //page.drawText('Controleren vóór de testrit ' +[i], { x:200, y: item.yas, size: 14 })
    testTextField.addToPage(page, {
      x: Number(rowPdfText.textfield_xas),
      y: Number(rowPdfText.textfield_yas),
      width: Number(rowPdfText.textfield_width),
      height: Number(rowPdfText.textfield_height),
      size: Number(rowPdfText.textfield_size),
      font: timesRomanFont,
      borderWidth: Number(rowPdfText.textfield_border),
      rotate: degrees(Number(rowPdfText.textfield_rotate)),
      
       
    
    })

    if (Number(rowPdfText.textfield_enableReadOnly) === 1)
    {
     testTextField.enableReadOnly()
    }
    
    }
     
    // pdfCheckbox
    for (y = 0; y < pageRow.pdfCheckbox.length; y++) 
    {
      const rowPdfCheckBox = pageRow.pdfCheckbox[y]
      const checkboxField = form.createCheckBox(rowPdfCheckBox.checkbox_titel)
      checkboxField.addToPage(page,{
         x: Number(rowPdfCheckBox.checkbox_xas),
         y: Number(rowPdfCheckBox.checkbox_yas),
         width: Number(rowPdfCheckBox.checkbox_width),
         height: Number(rowPdfCheckBox.checkbox_height), 
         font: timesRomanFont,
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




 


// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

// For example, `pdfBytes` can be:
//   • Written to a file in Node
const filePath = `${__dirname}/testPDF.pdf`;
fs.writeFileSync(filePath, pdfBytes);
//   • Downloaded from the browser
//   • Rendered in an <iframe>
}

//samenstellenPDF('{}')
module.exports = {
  samenstellenPDF: samenstellenPDF
  
  };