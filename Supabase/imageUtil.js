import { supabase } from './supabaseClient.js'; 

const BUCKET = "prop_images";

/* =========================
   UPLOAD IMAGE
========================= */
export const uploadImage = async (file, folder = "") => {
  if (!file) throw new Error("No file provided");

  const ext = file.name.split(".").pop();
  const fileName = `${folder}${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
};

/* =========================
   DELETE IMAGE
========================= */
export const deleteImage = async (url) => {
  const path = url.split(`${BUCKET}/`)[1];

  if (!path) throw new Error("Invalid image URL");

  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([path]);

  if (error) throw error;
  else {
    console.log("Image deleted successfully");
  }
};

/* =========================
   UPLOAD MULTIPLE IMAGES
========================= */
export const uploadImages = async (files, folder = "") => {
  const urls = [];

  for (const file of files) {
    const url = await uploadImage(file, folder);
    urls.push(url);
  }

  return urls;
};
