import mongoose from "mongoose";

const offerletterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    departmentName: {
      type: String,
      required: [true, "Department is required"],
      lowercase: true,
      trim: true,
      minLength: [2, "Department must be at least 2 characters long"],
      maxLength: [50, "Department cannot exceed 50 characters"],
    },

    tenure: {
      type: Number,
      required: [true, "Tenure is required"],
      lowercase: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v) && v > this.startDate;
        },
        message: (props) => "End date must be after start date!",
      },
    },

    pdfBuffer: {
      type: Buffer,
      required: [true, "PDF buffer is required"],
    },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
offerletterSchema.index({ email: 1, phone: 1 });
offerletterSchema.index({ startDate: 1, endDate: 1 });

// Virtual for checking if the offer is currently valid
offerletterSchema.virtual("isValid").get(function () {
  const now = new Date();
  return (
    this.status === "active" && now >= this.startDate && now <= this.endDate
  );
});

// Pre-save middleware
offerletterSchema.pre("save", async function (next) {
  try {
    // Convert string dates to Date objects if they're not already
    if (typeof this.startDate === "string") {
      this.startDate = new Date(this.startDate);
    }
    if (typeof this.endDate === "string") {
      this.endDate = new Date(this.endDate);
    }

    // Validate date range
    if (this.endDate <= this.startDate) {
      throw new Error("End date must be after start date");
    }

    // Set status based on dates
    const now = new Date();
    if (now > this.endDate) {
      this.status = "expired";
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check if offer can be modified
offerletterSchema.methods.canBeModified = function () {
  return this.status === "active" && new Date() < this.startDate;
};

// Static method to find active offers


const OfferLetter = mongoose.model("OfferLetter", offerletterSchema);

export default OfferLetter;
