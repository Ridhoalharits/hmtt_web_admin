import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/navbar/Navbar";

import { getNews } from "./actions";

import News from "./components/News";

// import { Icons } from "@/components/icons";

export async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <News />
    </div>
  );
}

export default Home;
