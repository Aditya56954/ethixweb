
import { Router } from "express";
import { z } from "zod";
import Enquiry from "../models/Enquiry.js";

const router = Router();

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150).optional().default(""),
  service: z.enum([
    "Web Development",
    "Digital Marketing",
    "SEO",
    "AI & Automation",
    "Design",
    "Other",
  ]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default(""),
});

router.post("/", async (req, res) => {
  try {
    const result = enquirySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Please check your enquiry details.",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    // Honeypot: silently reject submissions from bots.
    if (result.data.website) {
      return res.status(200).json({
        success: true,
        message: "Your enquiry has been received.",
      });
    }

    const { website, ...enquiryData } = result.data;
    const enquiry = await Enquiry.create(enquiryData);

    return res.status(201).json({
      success: true,
      message: "Your enquiry has been received.",
      enquiryId: enquiry._id,
    });
  } catch (error) {
    console.error("Enquiry creation failed:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your enquiry right now. Please try again.",
    });
  }
});

export default router;
