import PDFDocument from "pdfkit";

class InternshipOfferLetterGenerator {
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
        primary: "#005A9C",
        secondary: "#2C7BB6",
        text: "#333333",
        background: "#F0F4F8",
      },
      fonts: {
        regular: "Helvetica",
        bold: "Helvetica-Bold",
        italic: "Helvetica-Oblique",
      },
      fontSize: {
        title: 22,
        subtitle: 16,
        body: 12,
        small: 10,
      },
    };
  }

  _getInternshipOfferContent(candidateDetails) {
    const {
      name,
      email,
      departmentName,
      startDate,
      endDate,
      tenure = 1,
    } = candidateDetails;

    const style = this._generateStyleConfig();

    return {
      subject: `Online Internship Offer`,
      congratulatoryMessage: `Congratulations, ${name}!`,
      mainContent: `We are excited to extend an official online internship offer to you at ${this.companyDetails.name}. 

Internship Details:
• Department: ${departmentName}
• Start Date: ${startDate}
• End Date: ${endDate}
• Duration: ${tenure} months
• Internship Type: 100% Remote/Online

This offer is contingent upon:
1. Submission of required academic and personal documents
2. Completion of a virtual orientation session
3. Adherence to our internship code of conduct
4. Maintaining satisfactory academic performance
5. Signing the internship agreement`,

      learningObjectives: `During this internship, you will:
• Gain hands-on experience in your field of study
• Develop professional skills relevant to healthcare education
• Work on innovative projects
• Build a strong professional network
• Create a portfolio of impactful work
• Receive guidance from experienced mentors`,

      internshipExpectations: `Internship Expectations:
• Commitment to 15-20 hours per week
• Participation in weekly virtual team meetings
• Timely completion of assigned projects
• Maintain professional communication
• Submit weekly progress reports
• Engage in continuous learning and skill development`,

      closingContent: `To accept this internship offer, please:
1. Review the attached internship agreement
2. Complete the online onboarding form within 5 business days
3. Submit required documents electronically
4. Confirm your participation via email
5. Attend the mandatory virtual orientation`,

      legalDisclaimer: `This internship offer is made in good faith and is subject to the terms outlined in the internship agreement. ${this.companyDetails.name} reserves the right to modify or withdraw the offer if any information is found to be incorrect or misrepresented.`,

      finalMessage:
        "We are thrilled to support your professional growth and look forward to your contributions to healthcare education. This is the beginning of an exciting learning journey!",

      footerContent: {
        companyName: this.companyDetails.name,
        address: this.companyDetails.address,
        contact: `Contact: ${this.companyDetails.contactNumber}`,
        email: `Email: ${this.companyDetails.email}`,
        website: `Website: ${this.companyDetails.website}`,
      },
    };
  }

  async generateInternshipOfferLetter(candidateDetails) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const buffers = [];

      // Collect the PDF data into buffers
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(buffers); // Combine all chunks into a single buffer
        console.log("Internship offer letter generated in memory.");
        resolve(pdfBuffer); // Resolve with the buffer
      });

      doc.on("error", (error) => {
        console.error("Error generating PDF:", error.message);
        reject(error);
      });

      const style = this._generateStyleConfig();
      const template = this._getInternshipOfferContent(candidateDetails);

      // PDF Content
      doc
        .fillColor(style.colors.primary)
        .fontSize(style.fontSize.title)
        .font(style.fonts.bold)
        .text(this.companyDetails.name, { align: "center" });

      doc.moveDown();

      // Date and Personalization
      doc
        .fillColor(style.colors.text)
        .fontSize(style.fontSize.body)
        .font(style.fonts.regular)
        .text(`Date: ${new Date().toLocaleDateString()}`, { align: "right" })
        .moveDown();

      // Main Content Sections
      doc
        .fillColor(style.colors.text)
        .fontSize(style.fontSize.subtitle)
        .font(style.fonts.bold)
        .text("Online Internship Offer", { align: "center" })
        .moveDown();

      doc
        .fontSize(style.fontSize.body)
        .font(style.fonts.regular)
        .text(template.congratulatoryMessage)
        .moveDown()
        .text(template.mainContent, { align: "left", lineGap: 5 })
        .moveDown();

      doc
        .font(style.fonts.bold)
        .text("Learning Objectives:", { align: "left" })
        .font(style.fonts.regular)
        .text(template.learningObjectives, { align: "left", lineGap: 3 })
        .moveDown();

      doc
        .font(style.fonts.bold)
        .text("Internship Expectations:", { align: "left" })
        .font(style.fonts.regular)
        .text(template.internshipExpectations, { align: "left", lineGap: 3 })
        .moveDown();

      doc
        .font(style.fonts.bold)
        .text("Next Steps:", { align: "left" })
        .font(style.fonts.regular)
        .text(template.closingContent, { align: "left", lineGap: 3 })
        .moveDown();

      doc
        .font(style.fonts.italic)
        .fontSize(style.fontSize.small)
        .text(template.legalDisclaimer, { align: "left", lineGap: 2 })
        .moveDown();

      doc
        .fillColor(style.colors.secondary)
        .font(style.fonts.bold)
        .text(template.finalMessage, { align: "center", lineGap: 3 });

      // Footer
      doc
        .fontSize(style.fontSize.small)
        .fillColor(style.colors.text)
        .moveDown(2)
        .text(
          `${template.footerContent.companyName} | ${template.footerContent.address}`,
          { align: "center" }
        )
        .text(
          `${template.footerContent.contact} | ${template.footerContent.email}`,
          {
            align: "center",
          }
        )
        .text(template.footerContent.website, {
          align: "center",
          link: template.footerContent.website,
        });

      doc.end(); // Finalize the PDF
    });
  }
}

export default InternshipOfferLetterGenerator;
