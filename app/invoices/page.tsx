import { CRMLayout } from "@/components/crm-layout"
import { Invoices } from "@/components/pages/invoices"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function InvoicesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Invoices />
    </CRMLayout>
  )
}
