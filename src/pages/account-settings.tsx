import { MainLayout } from '@/components/Layout'
import { AccountSettingsForms } from '@/features/account-settings'

export default function AccountSettings() {
  return (
    <MainLayout title="アカウント設定">
      <AccountSettingsForms />
    </MainLayout>
  )
}
