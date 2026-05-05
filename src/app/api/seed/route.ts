import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { Service } from "@/models/Service";
import { Category } from "@/models/Category";
import { Faq } from "@/models/Faq";
import { Testimonial } from "@/models/Testimonial";
import { Settings } from "@/models/Settings";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();

  // 1. Admin user
  const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "Admin@123", 12);
    await Admin.create({
      email: process.env.ADMIN_EMAIL ?? "admin@prvsbusiness.in",
      passwordHash,
      name: "Super Admin",
      role: "super_admin",
    });
  }

  // 2. Categories
  const categories = [
    { name: "Startup", slug: "startup", icon: "Rocket", order: 1 },
    { name: "Income Tax", slug: "income-tax", icon: "FileText", order: 2 },
    { name: "GST", slug: "gst", icon: "Receipt", order: 3 },
    { name: "Compliance", slug: "compliance", icon: "Shield", order: 4 },
    { name: "Trademark", slug: "trademark", icon: "Award", order: 5 },
    { name: "Other", slug: "other", icon: "Folder", order: 6 },
  ];
  for (const cat of categories) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
  }

  // 3. Services
  const services = [
    {
      title: "Private Limited Company Registration",
      slug: "private-limited-company-registration",
      shortDescription:
        "Register your private limited company with us — fastest, cheapest and most reliable in India.",
      description:
        "A Private Limited Company is the most popular business structure in India for startups. It offers limited liability protection, easier funding access and corporate credibility. Our team handles end-to-end registration including DIN, DSC, name approval and incorporation certificate from MCA.",
      category: "Startup",
      icon: "Building2",
      price: 6999,
      startingFrom: true,
      features: [
        "DSC for 2 directors",
        "DIN for 2 directors",
        "MOA & AOA drafting",
        "PAN & TAN of company",
        "Bank account opening assistance",
        "Free expert consultation",
      ],
      documents: [
        "PAN card of all directors",
        "Aadhaar card of all directors",
        "Address proof (electricity bill / bank statement)",
        "Passport size photo",
        "Office address proof",
        "NOC from property owner",
      ],
      process: [
        { step: "Free Consultation", description: "Talk to our experts about your business needs." },
        { step: "Document Collection", description: "Submit documents online via our portal." },
        { step: "Name Approval", description: "We file RUN form for company name approval." },
        { step: "Incorporation", description: "We file SPICe+ form and obtain incorporation certificate." },
        { step: "Done!", description: "You receive Certificate of Incorporation, PAN, TAN — ready to operate." },
      ],
      isFeatured: true,
      isActive: true,
      order: 1,
    },
    {
      title: "GST Registration",
      slug: "gst-registration",
      shortDescription:
        "Get GST registered in 3-7 days. Mandatory if turnover exceeds ₹40 lakh (₹20 lakh for services).",
      description:
        "Goods and Services Tax (GST) registration is mandatory for businesses with turnover above the threshold limits. Our experts handle the entire process — from document preparation to filing the application and following up with the department.",
      category: "GST",
      icon: "Receipt",
      price: 1999,
      startingFrom: true,
      features: [
        "GSTIN within 7 days",
        "All documentation handled",
        "Free filing assistance for first month",
        "Expert support",
      ],
      documents: [
        "PAN card of business",
        "Aadhaar of authorized signatory",
        "Bank account details",
        "Address proof of business",
      ],
      isFeatured: true,
      isActive: true,
      order: 2,
    },
    {
      title: "Income Tax Return (ITR) Filing",
      slug: "income-tax-return-filing",
      shortDescription:
        "File your ITR with experts. Get maximum refunds and stay compliant. Plans starting ₹499.",
      description:
        "Filing your Income Tax Return on time is mandatory. Our CA-assisted ITR filing ensures you claim every eligible deduction, file accurately and avoid IT department notices.",
      category: "Income Tax",
      icon: "FileText",
      price: 499,
      startingFrom: true,
      features: [
        "CA-assisted filing",
        "Maximum tax savings",
        "All ITR forms covered",
        "Year-round support",
      ],
      documents: ["Form 16", "Bank statements", "Investment proofs", "PAN & Aadhaar"],
      isFeatured: true,
      isActive: true,
      order: 3,
    },
    {
      title: "Trademark Registration",
      slug: "trademark-registration",
      shortDescription:
        "Protect your brand with trademark registration. Valid for 10 years, renewable forever.",
      description:
        "Trademark registration gives you exclusive rights to use your brand name, logo or tagline. Prevents others from using your brand and adds value to your business.",
      category: "Trademark",
      icon: "Award",
      price: 5999,
      startingFrom: true,
      features: [
        "Free trademark search",
        "Class selection guidance",
        "Application filing",
        "Government fee included",
      ],
      documents: ["Logo / brand name", "Business documents", "Power of Attorney"],
      isFeatured: true,
      isActive: true,
      order: 4,
    },
    {
      title: "MSME / Udyam Registration",
      slug: "msme-udyam-registration",
      shortDescription:
        "Register as MSME and unlock benefits like easy loans, subsidies and tax exemptions.",
      description:
        "MSME (Udyam) registration is free but the process is technical. We help you classify your business correctly and get the certificate fast.",
      category: "Compliance",
      icon: "Shield",
      price: 999,
      startingFrom: true,
      features: ["Same day registration", "Lifetime validity", "Expert classification"],
      documents: ["Aadhaar", "PAN", "Bank details"],
      isActive: true,
      order: 5,
    },
    {
      title: "FSSAI Food License",
      slug: "fssai-food-license",
      shortDescription:
        "Mandatory for food businesses. Get your FSSAI license — Basic, State or Central — fast.",
      description:
        "FSSAI license is mandatory for any business dealing with food products. We handle Basic Registration, State License and Central License applications.",
      category: "Compliance",
      icon: "Utensils",
      price: 1499,
      startingFrom: true,
      features: ["All license types", "Fast approval", "Renewal support"],
      documents: ["PAN", "Address proof", "Business proof"],
      isActive: true,
      order: 6,
    },
    {
      title: "ROC Annual Compliance",
      slug: "roc-annual-compliance",
      shortDescription:
        "Stay compliant with MCA. Annual filing of AOC-4 and MGT-7 by qualified CS professionals.",
      description:
        "Every Private Limited Company must file annual returns with ROC. Our CS team handles AOC-4, MGT-7 and other mandatory filings to keep you compliant.",
      category: "Compliance",
      icon: "FileCheck",
      price: 7999,
      startingFrom: true,
      features: ["AOC-4 filing", "MGT-7 filing", "Director KYC", "Compliance calendar"],
      documents: ["Financial statements", "Board resolutions"],
      isActive: true,
      order: 7,
    },
    {
      title: "Digital Signature Certificate (DSC)",
      slug: "digital-signature-certificate",
      shortDescription:
        "Get Class 3 DSC for tendering, MCA filings, GST, ITR and more. Valid 1-3 years.",
      description:
        "DSC is required for digitally signing electronic documents. We provide Class 3 DSC tokens with USB device — valid for company filings, e-tenders and tax filings.",
      category: "Other",
      icon: "Key",
      price: 999,
      startingFrom: true,
      features: ["Class 3 Certificate", "USB token included", "1-3 year validity"],
      documents: ["PAN", "Aadhaar", "Photo"],
      isActive: true,
      order: 8,
    },
    {
      title: "ISO Certification",
      slug: "iso-certification",
      shortDescription:
        "Get ISO 9001, 14001, 27001 and other certifications to boost credibility.",
      description:
        "ISO certification proves your business meets international quality standards. We help you choose the right ISO certification and guide through the entire process.",
      category: "Other",
      icon: "BadgeCheck",
      price: 4999,
      startingFrom: true,
      features: ["Multiple ISO standards", "Audit support", "Certificate in 7-15 days"],
      documents: ["Business proof", "Quality manual (we draft)"],
      isActive: true,
      order: 9,
    },
  ];
  for (const svc of services) {
    await Service.findOneAndUpdate({ slug: svc.slug }, svc, { upsert: true });
  }

  // 4. FAQs
  const faqs = [
    {
      question: "How long does company registration take?",
      answer:
        "Typically, Private Limited Company registration takes 7-15 working days from the date of document submission. We handle name approval, DSC, DIN and incorporation in parallel to speed things up.",
      category: "Startup",
      order: 1,
      isActive: true,
    },
    {
      question: "Is GST registration mandatory for me?",
      answer:
        "GST registration is mandatory if your annual turnover exceeds ₹40 lakh (for goods) or ₹20 lakh (for services). E-commerce sellers, inter-state suppliers and certain other categories must register regardless of turnover.",
      category: "GST",
      order: 2,
      isActive: true,
    },
    {
      question: "What documents do I need to register a company?",
      answer:
        "You need PAN, Aadhaar, address proof, passport-size photos of all directors, and proof of registered office address. We provide a detailed checklist after consultation.",
      category: "Startup",
      order: 3,
      isActive: true,
    },
    {
      question: "Do you provide refund if my application is rejected?",
      answer:
        "Yes! We offer a 100% money-back guarantee if your application is rejected due to our error. Government fees are non-refundable.",
      category: "general",
      order: 4,
      isActive: true,
    },
    {
      question: "Can I file ITR without Form 16?",
      answer:
        "Yes, you can file ITR using your salary slips, bank statements and other income proofs. Our CA team helps you compile everything accurately.",
      category: "Income Tax",
      order: 5,
      isActive: true,
    },
    {
      question: "How is PRVS different from competitors?",
      answer:
        "We focus on three things: Quality (CA/CS-reviewed filings), Affordability (no hidden charges), and Speed (most services done in 5-10 days). Plus, you get dedicated support throughout.",
      category: "general",
      order: 6,
      isActive: true,
    },
  ];
  for (const f of faqs) {
    await Faq.findOneAndUpdate({ question: f.question }, f, { upsert: true });
  }

  // 5. Testimonials
  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Founder",
      company: "TechStart Solutions",
      message:
        "PRVS made company registration so easy! Their team handled everything — from name approval to incorporation. I got my Certificate in just 10 days. Highly recommended!",
      rating: 5,
      isActive: true,
      order: 1,
    },
    {
      name: "Priya Patel",
      role: "CEO",
      company: "Patel Foods",
      message:
        "Got my GST registration and FSSAI license through PRVS. Process was smooth and team was very responsive. Pricing is also very reasonable compared to others.",
      rating: 5,
      isActive: true,
      order: 2,
    },
    {
      name: "Amit Kumar",
      role: "Director",
      company: "Kumar Trading Co.",
      message:
        "Their ROC compliance service is excellent. Never missed a deadline since I started using PRVS. The dashboard makes tracking very easy.",
      rating: 5,
      isActive: true,
      order: 3,
    },
    {
      name: "Sneha Verma",
      role: "Founder",
      company: "Verma Boutique",
      message:
        "Got my trademark registered without any hassle. The team did a free search first to ensure my brand was unique. Great experience overall!",
      rating: 5,
      isActive: true,
      order: 4,
    },
  ];
  for (const t of testimonials) {
    await Testimonial.findOneAndUpdate({ name: t.name }, t, { upsert: true });
  }

  // 6. Settings
  await Settings.findOneAndUpdate({}, {}, { upsert: true, setDefaultsOnInsert: true });

  return NextResponse.json({
    success: true,
    message: "Database seeded successfully!",
    admin: {
      email: process.env.ADMIN_EMAIL,
      note: "Use this email and the password from .env.local to login",
    },
    counts: {
      services: services.length,
      categories: categories.length,
      faqs: faqs.length,
      testimonials: testimonials.length,
    },
  });
}
