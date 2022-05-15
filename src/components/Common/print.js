
const pdf = require('pdfkit')
const fs = require('fs')


const print = (data) => {
    const doc = new pdf()
    doc.pipe(fs.createWriteStream('test.pdf'))
    doc.fontSize(25).text('Hello world!')
    doc.end()
  
}

export default print