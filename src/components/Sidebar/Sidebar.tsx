const menus = [
  'ダッシュボード',
  'チーム',
  'プロジェクト',
  'カレンダー',
  'ドキュメント',
  'レポート'
]


export const Sidebar = () => {
  return <aside className="w-[16rem] border-r">
    <nav>
      <ul className="py-3 px-2">
        {
          menus.map((menu) =>
            <li key={menu} className="px-3 py-2 hover:bg-gray-100 rounded-md text-sm text-gray-600">{menu}</li>
          )
        }
      </ul>
    </nav>
  </aside>
}