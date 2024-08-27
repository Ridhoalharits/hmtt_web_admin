"use server";

import { createClient } from "@/utils/supabase/server";

import { v4 as uuidv4 } from "uuid";

interface Item {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string; // Adjust the type if this is different
}

export async function signOut() {
  "use server";
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.log("Error signing out:", error.message);
}

export async function getNews() {
  const supabase = createClient();

  try {
    let query = supabase.from("article").select("*").eq("isActive", "true");
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
      console.log("Successfully delete data");
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
      .update({ isActive: false })
      .eq("news_id", row.news_id);
    const { data, error } = await query;
    if (data) {
      console.log("Successfully delete data");
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
      console.log("Successfully delete data");
    }
  } catch (error) {
    console.log("Error fetching News: ", error);
    throw error;
  }
}
