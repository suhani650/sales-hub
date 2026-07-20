import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";

export async function getCustomerProfile(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
      include: {
        user: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            items: {
              include: {
                product: {
                  select: {
                    name: true,
                    slug: true,
                    images: {
                      where: { isPrimary: true },
                      take: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    res.json({
      referralCode: customer.referralCode,
      loyaltyPoints: customer.loyaltyPoints,
      walletBalance: parseFloat(customer.walletBalance),
      createdAt: customer.createdAt,
      orders: customer.orders,
      user: {
        name: customer.user.name,
        email: customer.user.email,
        phone: customer.user.phone,
        avatarUrl: customer.user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Error fetching customer profile:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function updateCustomerProfile(req, res) {
  const userId = req.user.id;
  const { name, phone, oldPassword, newPassword } = req.body;

  // 1. Text validations
  if (!name || typeof name !== "string" || name.trim().length < 3 || name.trim().length > 100) {
    return res.status(400).json({ error: "Full Name must be between 3 and 100 characters." });
  }
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return res.status(400).json({ error: "Full Name must contain only letters and spaces." });
  }

  if (!phone || typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone.trim())) {
    return res.status(400).json({ error: "Phone number must be a valid 10-digit Indian number starting with 6-9." });
  }

  try {
    // 2. Fetch current user context
    const currentUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!currentUser) {
      return res.status(404).json({ error: "User not found." });
    }

    let hashedPassword = null;

    // 3. Password reset logic
    if (newPassword) {
      if (!oldPassword) {
        return res.status(400).json({ error: "Current Password is required to set a new password." });
      }

      const match = await bcrypt.compare(oldPassword, currentUser.passwordHash);
      if (!match) {
        return res.status(400).json({ error: "Incorrect current password." });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters long." });
      }

      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // 4. Update model
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name.trim(),
        phone: phone.trim(),
        ...(hashedPassword ? { passwordHash: hashedPassword } : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
      },
    });

    res.json({
      message: "Profile updated successfully.",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: req.user.roleName,
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ error: "Failed to update profile details." });
  }
}

export async function uploadAvatar(req, res) {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ error: "No image file uploaded." });
  }

  const relativePath = `/uploads/avatars/${req.file.filename}`;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatarUrl: relativePath,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatarUrl: true,
      },
    });

    res.json({
      message: "Profile picture uploaded successfully.",
      avatarUrl: relativePath,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: req.user.roleName,
        avatarUrl: updatedUser.avatarUrl,
      },
    });
  } catch (err) {
    console.error("Upload avatar error:", err);
    res.status(500).json({ error: "Failed to update profile image path." });
  }
}

export async function getAddresses(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const addresses = await prisma.address.findMany({
      where: { customerId: customer.id },
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    });
    res.json(addresses);
  } catch (err) {
    console.error("Get addresses error:", err);
    res.status(500).json({ error: "Failed to fetch saved addresses." });
  }
}

export async function addAddress(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const { title, recipientName, phone, street, city, state, pincode, isDefault: reqDefault } = req.body;

    // Validations
    if (!title || !recipientName || !phone || !street || !city || !state || !pincode) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({ error: "Phone number must be a valid 10-digit number starting with 6-9." });
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      return res.status(400).json({ error: "Pincode must be a valid 6-digit number." });
    }

    let isDefault = !!reqDefault;
    const addressCount = await prisma.address.count({ where: { customerId: customer.id } });
    if (addressCount === 0) {
      isDefault = true;
    }

    if (isDefault) {
      await prisma.address.updateMany({
        where: { customerId: customer.id },
        data: { isDefault: false },
      });
    }

    const newAddress = await prisma.address.create({
      data: {
        customerId: customer.id,
        title: title.trim(),
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        isDefault,
      },
    });

    res.status(201).json({ message: "Address added successfully.", address: newAddress });
  } catch (err) {
    console.error("Add address error:", err);
    res.status(500).json({ error: "Failed to save address." });
  }
}

export async function updateAddress(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const addressId = parseInt(req.params.id);
    if (isNaN(addressId)) {
      return res.status(400).json({ error: "Invalid address ID." });
    }

    const { title, recipientName, phone, street, city, state, pincode, isDefault: reqDefault } = req.body;

    // Validations
    if (!title || !recipientName || !phone || !street || !city || !state || !pincode) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      return res.status(400).json({ error: "Phone number must be a valid 10-digit number starting with 6-9." });
    }

    if (!/^\d{6}$/.test(pincode.trim())) {
      return res.status(400).json({ error: "Pincode must be a valid 6-digit number." });
    }

    const existing = await prisma.address.findFirst({
      where: { id: addressId, customerId: customer.id },
    });
    if (!existing) {
      return res.status(404).json({ error: "Address not found." });
    }

    let isDefault = !!reqDefault;
    if (isDefault && !existing.isDefault) {
      await prisma.address.updateMany({
        where: { customerId: customer.id },
        data: { isDefault: false },
      });
    } else if (existing.isDefault) {
      // If it was default, it must remain default unless another default is set.
      isDefault = true;
    }

    const updated = await prisma.address.update({
      where: { id: addressId },
      data: {
        title: title.trim(),
        recipientName: recipientName.trim(),
        phone: phone.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        isDefault,
      },
    });

    res.json({ message: "Address updated successfully.", address: updated });
  } catch (err) {
    console.error("Update address error:", err);
    res.status(500).json({ error: "Failed to update address." });
  }
}

export async function deleteAddress(req, res) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { userId: req.user.id },
    });
    if (!customer) {
      return res.status(404).json({ error: "Customer profile not found." });
    }

    const addressId = parseInt(req.params.id);
    if (isNaN(addressId)) {
      return res.status(400).json({ error: "Invalid address ID." });
    }

    const existing = await prisma.address.findFirst({
      where: { id: addressId, customerId: customer.id },
    });
    if (!existing) {
      return res.status(404).json({ error: "Address not found." });
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    // If we deleted the default address, set another remaining address as default
    if (existing.isDefault) {
      const remaining = await prisma.address.findFirst({
        where: { customerId: customer.id },
      });
      if (remaining) {
        await prisma.address.update({
          where: { id: remaining.id },
          data: { isDefault: true },
        });
      }
    }

    res.json({ message: "Address deleted successfully." });
  } catch (err) {
    console.error("Delete address error:", err);
    res.status(500).json({ error: "Failed to delete address." });
  }
}

