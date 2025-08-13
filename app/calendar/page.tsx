import { CRMLayout } from "@/components/crm-layout"
import { Calendar } from "@/components/pages/calendar"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function CalendarPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Calendar />
    </CRMLayout>
  )
}
