import { MainLayout } from '@/components/Layout'
import { MembersTable } from '@/features/members'

export default function Members() {
  return (
    <MainLayout title="メンバー一覧">
      <MembersTable />
    </MainLayout>
  )
}
