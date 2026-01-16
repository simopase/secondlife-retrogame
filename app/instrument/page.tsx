import { createClient } from "../utils/supabase/server";

export default async function Page() {
  const supabase = await createClient()

  const { data: instruments } = await supabase.from("instruments").select();
  
  return (
    <p>
      ciao
    </p>
  )
}
