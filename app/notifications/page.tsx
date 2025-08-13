import { CRMLayout } from "@/components/crm-layout"
import { Notifications } from "@/components/pages/notifications"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function NotificationsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Notifications />
    </CRMLayout>
  )
}
