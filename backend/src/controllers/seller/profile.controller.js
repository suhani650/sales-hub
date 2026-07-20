import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";

// Small helper: only include keys whose value was actually sent in the
// request body, so a field left out of one form's payload never
// accidentally overwrites a value saved by another form.
function pick(body, keys) {
  const data = {};
  for (const key of keys) {
    if (body[key] !== undefined) data[key] = body[key];
  }
  return data;
}

// Get Vendor Profile

export const getProfile = async (req, res) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: req.user.id,
      },
      include: {
        user: true,
      },
    });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("getProfile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Profile fetch failed",
    });
  }
};

// Update Profile
// Handles the "Company Info", "Address" and "Social Links" tabs — they all
// PUT to this same endpoint with different subsets of fields, so we only
// write the keys that were actually sent.

export const updateProfile = async (req, res) => {
  try {
    const data = pick(req.body, [
      "businessName",
      "storeName",
      "phone",
      "address",
      "description",
      "city",
      "state",
      "pincode",
      "socialLinks",
      "website",
      "registrationNumber",
      "supportHours",
      "gstNumber",
    ]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updateProfile error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Profile update failed",
    });
  }
};

// Store Branding

export const updateBranding = async (req, res) => {
  try {
    const data = pick(req.body, [
      "logo",
      "banner",
      "primaryColor",
      "secondaryColor",
      "fontFamily",
    ]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updateBranding error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Branding update failed",
    });
  }
};

// Bank Details

export const updateBankDetails = async (req, res) => {
  try {
    const data = pick(req.body, [
      "accountHolder",
      "accountNumber",
      "ifscCode",
      "bankName",
    ]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updateBankDetails error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Bank details update failed",
    });
  }
};

// GST Details

export const updateTaxDetails = async (req, res) => {
  try {
    const data = pick(req.body, ["gstNumber", "panNumber"]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updateTaxDetails error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "GST & tax update failed",
    });
  }
};

// Notification Settings

export const updatePreferences = async (req, res) => {
  try {
    const data = pick(req.body, [
      "emailNotifications",
      "smsNotifications",
      "pushNotifications",
    ]);

    const preferences = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: preferences,
    });
  } catch (error) {
    console.error("updatePreferences error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Notification preferences update failed",
    });
  }
};

// Store Policies

export const updatePolicies = async (req, res) => {
  try {
    const data = pick(req.body, ["policies"]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updatePolicies error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Policies update failed",
    });
  }
};

// Store SEO

export const updateSEO = async (req, res) => {
  try {
    const data = pick(req.body, ["seo"]);

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("updateSEO error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "SEO update failed",
    });
  }
};

// Change Password

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashed,
      },
    });

    res.json({
      success: true,
      message: "Password changed",
    });
  } catch (error) {
    console.error("changePassword error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Password change failed",
    });
  }
};

// KYC Verification

export const submitKYC = async (req, res) => {
  try {
    const data = {
      ...pick(req.body, ["aadhaar", "pan", "gst", "businessLicense"]),
      kycStatus: "PENDING",
    };

    const vendor = await prisma.vendor.update({
      where: {
        userId: req.user.id,
      },
      data,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("submitKYC error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "KYC submission failed",
    });
  }
};
