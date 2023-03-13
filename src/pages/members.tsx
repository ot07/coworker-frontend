import { MainLayout } from '@/components/Layout'
import { MembersTable } from '@/features/members'
import { MembersTable2 } from '@/features/members/MemberTable2'

export default function Members() {
  return (
    <MainLayout title="メンバー一覧">
      <MembersTable />
      <MembersTable2 />
    </MainLayout>
  )
}
