import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";

class InternshipCompletionCertificateGenerator {
  constructor(companyDetails = {}) {
    this.companyDetails = {
      name: "Renu Sharma Healthcare Education & Foundation",
      address: "VPO Baspadmka, Teh Pataudi, Dist Gurugram (HR), Pin 122503",
      contactNumber: "9671457366",
      email: "Neha.rshefoundation@gmail.com",
      website: "www.rshefoundation.org",
      ...companyDetails,
    };
  }

  _generateStyleConfig() {
    return {
      colors: {
        primary: "#005A9C", // Professional blue
        text: "#333333", // Dark gray
        background: "#FFFFFF", // White
        accent: "#2C7BB6", // Lighter blue
      },
      fonts: {
        regular: "Helvetica",
        bold: "Helvetica-Bold",
        italic: "Helvetica-Oblique",
      },
      fontSize: {
        title: 28,
        subtitle: 16,
        body: 12,
        small: 10,
      },
    };
  }

  _getCertificateContent(candidateDetails) {
    const { name, departmentName, startDate, endDate } = candidateDetails;

    return {
      title: `Internship Completion Certificate`,
      body: `This is to certify that ${name} has successfully completed their internship in the ${departmentName} department at ${this.companyDetails.name} from ${startDate} to ${endDate}.
      
During this internship, they demonstrated exceptional dedication and professionalism, contributing significantly to the projects and learning opportunities offered. Their efforts and accomplishments have been an integral part of our organization's goals.

We wish ${name} all the best for their future endeavors and look forward to witnessing their continued success.`,
      closingNote: `Issued by ${this.companyDetails.name}`,
      footerContent: {
        companyName: this.companyDetails.name,
        address: this.companyDetails.address,
        contact: `Contact: ${this.companyDetails.contactNumber}`,
        email: `Email: ${this.companyDetails.email}`,
        website: `Website: ${this.companyDetails.website}`,
      },
    };
  }

  async generateCompletionCertificate(candidateDetails) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", (error) => {
        console.log(error.message);
        reject(error);
      });
      const style = this._generateStyleConfig();
      const template = this._getCertificateContent(candidateDetails);
      // Background and Title
      doc
        .rect(0, 0, doc.page.width, doc.page.height)
        .fill(style.colors.background);

      doc
        .fillColor(style.colors.primary)
        .fontSize(style.fontSize.title)
        .font(style.fonts.bold)
        .text(template.title, { align: "center" });

      doc.moveDown(2);

      // Main Content
      doc
        .fillColor(style.colors.text)
        .fontSize(style.fontSize.body)
        .font(style.fonts.regular)
        .text(template.body, { align: "justify", lineGap: 5 });

      doc.moveDown(2);

      // Closing Note
      doc
        .fillColor(style.colors.accent)
        .font(style.fonts.bold)
        .fontSize(style.fontSize.subtitle)
        .text(template.closingNote, { align: "center" });

      doc.moveDown(2);

      // Footer
      doc
        .fontSize(style.fontSize.small)
        .fillColor(style.colors.text)
        .text(
          `${template.footerContent.companyName} | ${template.footerContent.address}`,
          { align: "center" }
        )
        .text(
          `${template.footerContent.contact} | ${template.footerContent.email}`,
          { align: "center" }
        )
        .text(template.footerContent.website, {
          align: "center",
          link: template.footerContent.website,
        });

      doc.end();
    });
  }
}

export default InternshipCompletionCertificateGenerator;
