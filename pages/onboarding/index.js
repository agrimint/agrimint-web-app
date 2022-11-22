import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) router.push("/signin");
  else router.push("/onboarding/mint");
}