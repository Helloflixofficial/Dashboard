import { CRMLayout } from "@/components/crm-layout"
import { HelpCenter } from "@/components/pages/help-center"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function HelpPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <HelpCenter />
    </CRMLayout>
  )
}
