import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    username: {
      type: String,
      required: true
    },
    departementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    completedWeek: {
      type: [Number], // Array of weeks that have been submitted
      default: [],
    },
    images: {
      type: [{
        url: String,
        publicId: String
      }],
      default: [],
    },
    pdf: {
      type: [{
        url: String,
        publicId: String
      }],
      default: [],
    },
    links: {
      type: [String], // Array of additional resource links
      default: [],
    },
    notes: {
      type: [String], // Array of notes
      default: [],
    },
  },
  { timestamps: true }
);

// Add virtual for backwards compatibility
submissionSchema.virtual('imageUrls').get(function() {
  return this.images.map(img => img.url);
});

submissionSchema.virtual('pdfUrls').get(function() {
  return this.pdf.map(pdf => pdf.url);
});

// Ensure virtuals are included when converting document to JSON
submissionSchema.set('toJSON', { virtuals: true });
submissionSchema.set('toObject', { virtuals: true });

export default mongoose.model("Submission", submissionSchema);