import mongoose from "mongoose";

const { Schema } = mongoose;

const localizedStringSchema = new Schema(
  {
    en: { type: String },
    fr: { type: String },
  },
  { _id: false },
);

const localizedParagraphsSchema = new Schema(
  {
    en: [{ type: String }],
    fr: [{ type: String }],
  },
  { _id: false },
);

const articleSectionSchema = new Schema(
  {
    heading: localizedStringSchema,
    body: localizedParagraphsSchema,
    items: localizedParagraphsSchema,
  },
  { _id: false },
);

const articleSchema = new Schema(
  {
    slug: {
      en: { type: String, required: true, unique: true },
      fr: { type: String, required: true, unique: true },
    },
    title: localizedStringSchema,
    excerpt: localizedStringSchema,
    category: { type: String },
    published: { type: Boolean, default: false },
    sections: [articleSectionSchema],
  },
  { timestamps: true },
);

export default mongoose.models.articles || mongoose.model("articles", articleSchema);
