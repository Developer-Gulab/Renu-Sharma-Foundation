import { v2 as cloudinary } from 'cloudinary';

class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Upload a file directly to Cloudinary
   */
  async uploadFile(file, options = {}) {
    try {
      const defaultOptions = {
        resource_type: 'auto',
        folder: 'uploads',
        use_filename: true,
        unique_filename: true,
      };

      const uploadOptions = { ...defaultOptions, ...options };

      const fileBuffer = file instanceof Buffer 
        ? file 
        : this.convertBase64ToBuffer(file);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(fileBuffer); // Directly send the file buffer
      });

      return {
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          resourceType: result.resource_type,
          size: result.bytes,
          createdAt: result.created_at,
        },
      };
    } catch (error) {
      console.error('Upload error details:', error);
      return {
        success: false,
        error: error.message || 'Upload failed',
        details: error.stack,
      };
    }
  }

  /**
   * Convert Base64 string to Buffer
   */
  convertBase64ToBuffer(base64String) {
    const base64Data = base64String.replace(/^data:.*?;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  /**
   * Upload an image with optimized settings
   */
  async uploadImage(image, options = {}) {
    const imageOptions = {
      folder: 'images',
      transformation: [
        { quality: 'auto:good' }, // Slightly reduced quality for faster uploads
        { fetch_format: 'auto' },
        { flags: 'progressive' }, // Progressive loading
      ],
      eager: [
        { width: 800, height: 800, crop: 'limit' }, // Generate thumbnail
      ],
      eager_async: true,
      ...options,
    };

    return this.uploadFile(image, imageOptions);
  }

  /**
   * Upload a PDF with optimized settings
   */
  async uploadPDF(pdf, options = {}) {
    const pdfOptions = {
      folder: 'pdfs',
      resource_type: 'auto',
      format: 'pdf',
      flags: 'attachment',
      use_filename: true,
      transformation: [{ flags: 'attachment' }],
      ...options,
    };

    try {
      const result = await this.uploadFile(pdf, pdfOptions);
      if (result.success) {
        // Transform the URL for better PDF viewing
        result.data.url = result.data.url.replace('/upload/', '/upload/fl_attachment/');
      }
      return result;
    } catch (error) {
      console.error('PDF upload error:', error);
      return {
        success: false,
        error: error.message || 'PDF upload failed',
        details: error.stack,
      };
    }
  }

  /**
   * Delete a file by public ID
   */
  async deleteFile(publicId, options = {}) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, options);
      return {
        success: result.result === 'ok',
        data: result,
      };
    } catch (error) {
      console.error('Deletion error details:', error);
      return {
        success: false,
        error: error.message || 'Deletion failed',
        details: error.stack,
      };
    }
  }
}

export default new CloudinaryService();
