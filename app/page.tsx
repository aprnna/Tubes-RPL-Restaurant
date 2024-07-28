
import { title } from "@/components/primitives";
import { createClient } from "@/utils/supabase/server";
import Layout from "./(main)/Layout.1";
import { redirect } from "next/navigation";
async function getUser() {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user;

}

export default async function Home() {
  const user = await getUser();

  return redirect('auth/login')
  
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>HI&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>{user ? user?.email:'User'}&nbsp;</h1>
        </div>
      </section>
    </Layout>
  
  );
}
