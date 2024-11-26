"use server";

import { createClient } from "@/utils/supabase/server";

import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string; // Adjust the type if this is different
}

async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log("Error signing out:", error.message);
}

export async function getNews() {
  const supabase = createClient();

  try {
    let query = supabase.from("article").select("*").eq("isActive", true);
    const { data, error } = await query;
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}

export async function newArticle(article: any) {
  const supabase = createClient();
  try {
    const { data, error }: any = await supabase
      .from("article")
      .insert([article])
      .select();

    if (data) {
      console.log("Successfully add new data");
    }

    if (error) console.log("Failed delete data");
  } catch (error) {
    console.error("Error: ", error);
  }
}

export async function deleteNews(row: any) {
  const supabase = createClient();

  try {
    let query = supabase
      .from("article")
      .update({ isActive: false, isPublished: false })
      .eq("news_id", row.news_id);
    const { data, error } = await query;
    if (data) {
      console.log("Successfully delete news");
    }
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}

export async function setToPublish(row: any) {
  const supabase = createClient();

  try {
    let query = supabase
      .from("article")
      .update({ isPublished: true })
      .eq("news_id", row.news_id);
    const { data, error } = await query;
    if (data) {
      console.log("Successfully publish news");
      return "Successfully publish news";
    }
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}

export async function setToUnpublish(row: any) {
  const supabase = createClient();

  try {
    let query = supabase
      .from("article")
      .update({ isPublished: false })
      .eq("news_id", row.news_id);
    const { data, error } = await query;
    if (data) {
      console.log("Successfully Unpublish data");
      return data;
    }
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}

export async function updateNews(row: any) {
  const supabase = createClient();

  try {
    let query = supabase.from("article").update(row).eq("news_id", row.news_id);
    const { data, error } = await query;
    if (data) {
      console.log("Successfully Unpublish data");
      return data;
    }
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}

// type User = {
//   username: string;
//   password: string;
//   email: string;
// };

// export function registerUser(user: User): string {
//   if (!user.username || user.username.length < 3) {
//     return "Username must be at least 3 characters long"; // Correct validation
//   }

//   if (!user.password || user.password.length < 8) {
//     return "Password must be at least 8 characters long"; // Correct validation
//   }

//   if (!user.email.includes("@") || !user.email.includes(".com")) {
//     return "Email is invalid"; // Incorrect validation: Should check for a valid email format, not just ".com"
//   }

//   // Intentional bug: Returning success even if validation failed
//   return "User registered successfully!";
// }
