import { Router, useRouter } from "next/router"
import { useEffect } from "react";

export default function Loans() {
  const router = useRouter();
  const { projectId } = router.query;

  useEffect(() => {
    if (projectId) router.push("/projects/" + projectId);
  }, [projectId]);
}