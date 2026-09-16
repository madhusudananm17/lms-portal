const cloudinary = {
  config: () => {
    return {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo_cloud',
      api_key: process.env.CLOUDINARY_API_KEY || 'demo_key',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'demo_secret'
    };
  },
  uploader: {
    upload: async (filePath) => {
      return {
        secure_url: filePath || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
        public_id: `lms_${Date.now()}`
      };
    }
  }
};

module.exports = cloudinary;
