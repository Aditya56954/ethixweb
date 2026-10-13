
import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import Enquiry from "../models/Enquiry.js";
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();

// Every route in this file requires an authenticated admin.
router.use(requireAdmin);

// GET /api/admin/enquiries?page=1&limit=10&status=new
router.get("/enquiries", async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
    );

    const allowedStatuses = ["new", "contacted", "closed"];
    const status = req.query.status;

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const filter = status ? { status } : {};
    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter),
    ]);

    return res.json({
      success: true,
      enquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admin enquiry list error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to retrieve enquiries.",
    });
  }
});

// PATCH /api/admin/enquiries/:id/status
router.patch("/enquiries/:id/status", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID.",
      });
    }

    const validation = z
      .object({
        status: z.enum(["new", "contacted", "closed"]),
      })
      .safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid enquiry status.",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status: validation.data.status } },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.json({
      success: true,
      message: "Enquiry status updated.",
      enquiry,
    });
  } catch (error) {
    console.error("Admin enquiry update error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry.",
    });
  }
});

export default router;
