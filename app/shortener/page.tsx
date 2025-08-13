import { CRMLayout } from "@/components/crm-layout"
import { URLShortener } from "@/components/pages/url-shortener"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ShortenerPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <URLShortener />
    </CRMLayout>
  )
}
