import html2pdf from 'html2pdf.js';

const PdfGenerator = () => {
  const generatePdf = () => {
    const element = document.getElementById('pdf-content'); // The HTML content you want to convert
    const options = {
      margin:       0.5,
      filename:     'webpage.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Generate PDF
    html2pdf().from(element).set(options).save();
  };

  return (
    <article>
      <button onClick={generatePdf}>Download Page as PDF</button>
    </article>
  );
};

export default PdfGenerator;
