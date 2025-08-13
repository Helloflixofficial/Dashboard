import { CRMLayout } from "@/components/crm-layout"
import { Employees } from "@/components/pages/employees"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function EmployeesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <CRMLayout>
      <Employees />
    </CRMLayout>
  )
}
