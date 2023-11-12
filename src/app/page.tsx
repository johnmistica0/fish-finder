"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push('/explore')

  return (
    <main className="flex flex-col items-center justify-between p-24 h-max space-y-10">
      Home
    </main>
  )
}
