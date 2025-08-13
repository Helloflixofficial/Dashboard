import { CRMLayout } from "@/components/crm-layout"
import { Projects } from "@/components/pages/projects"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Projects />
    </CRMLayout>
  )
}
