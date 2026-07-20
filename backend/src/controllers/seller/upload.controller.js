export const uploadSingle = async (req, res) => {
  try {
    const isCloudinary = req.file.path.startsWith("http");
    const url = isCloudinary ? req.file.path : `/uploads/products/${req.file.filename}`;

    res.json({
      success: true,
      url,
      publicId: req.file.filename,
    });
  } catch (error) {
    console.error("uploadSingle error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export const uploadMultiple = async (req, res) => {
  try {
    const files = req.files.map((file) => {
      const isCloudinary = file.path.startsWith("http");
      const url = isCloudinary ? file.path : `/uploads/products/${file.filename}`;
      return {
        url,
        publicId: file.filename,
      };
    });

    res.json({
      success: true,
      data: files,
    });
  } catch (error) {
    console.error("uploadMultiple error:", error);
    res.status(500).json({
      success: false,
    });
  }
};
