import { CRMLayout } from "@/components/crm-layout"
import { Performance } from "@/components/pages/performance"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function PerformancePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Performance />
    </CRMLayout>
  )
}
