import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableColumn } from './Table'
import { FC } from 'react'

// type Person = {
//   id: string
//   name: string
//   company: string
//   email: string
// }
//
// type Column = {
//   field: Extract<keyof Person, string>
// }
//
// const columns: Column[] = [
//   {
//     field: 'name',
//   },
//   {
//     field: 'company',
//   },
//   {
//     field: 'email',
//   },
// ]
//
// const data: Person[] = [
//   {
//     id: '1',
//     name: 'Athena Weissnat',
//     company: 'Little - Rippin',
//     email: 'Elouise.Prohaska@yahoo.com',
//   },
//   {
//     id: '2',
//     name: 'Deangelo Runolfsson',
//     company: 'Greenfelder - Krajcik',
//     email: 'Kadin_Trantow87@yahoo.com',
//   },
//   {
//     id: '3',
//     name: 'Danny Carter',
//     company: 'Kohler and Sons',
//     email: 'Marina3@hotmail.com',
//   },
//   {
//     id: '4',
//     name: 'Trace Tremblay PhD',
//     company: 'Crona, Aufderhar and Senger',
//     email: 'Antonina.Pouros@yahoo.com',
//   },
//   {
//     id: '5',
//     name: 'Derek Dibbert',
//     company: 'Gottlieb LLC',
//     email: 'Abagail29@hotmail.com',
//   },
//   {
//     id: '6',
//     name: 'Viola Bernhard',
//     company: 'Funk, Rohan and Kreiger',
//     email: 'Jamie23@hotmail.com',
//   },
//   {
//     id: '7',
//     name: 'Austin Jacobi',
//     company: 'Botsford - Corwin',
//     email: 'Genesis42@yahoo.com',
//   },
//   {
//     id: '8',
//     name: 'Hershel Mosciski',
//     company: 'Okuneva, Farrell and Kilback',
//     email: 'Idella.Stehr28@yahoo.com',
//   },
//   {
//     id: '9',
//     name: 'Mylene Ebert',
//     company: 'Kirlin and Sons',
//     email: 'Hildegard17@hotmail.com',
//   },
//   {
//     id: '10',
//     name: 'Lou Trantow',
//     company: 'Parisian - Lemke',
//     email: 'Hillard.Barrows1@hotmail.com',
//   },
//   {
//     id: '11',
//     name: 'Dariana Weimann',
//     company: 'Schowalter - Donnelly',
//     email: 'Colleen80@gmail.com',
//   },
//   {
//     id: '12',
//     name: 'Dr. Christy Herman',
//     company: 'VonRueden - Labadie',
//     email: 'Lilyan98@gmail.com',
//   },
//   {
//     id: '13',
//     name: 'Katelin Schuster',
//     company: 'Jacobson - Smitham',
//     email: 'Erich_Brekke76@gmail.com',
//   },
//   {
//     id: '14',
//     name: 'Melyna Macejkovic',
//     company: 'Schuster LLC',
//     email: 'Kylee4@yahoo.com',
//   },
//   {
//     id: '15',
//     name: 'Pinkie Rice',
//     company: 'Wolf, Trantow and Zulauf',
//     email: 'Fiona.Kutch@hotmail.com',
//   },
//   {
//     id: '16',
//     name: 'Brain Kreiger',
//     company: 'Lueilwitz Group',
//     email: 'Rico98@hotmail.com',
//   },
// ]

type Item = {
  name: string
  price: number
  quantity: number
}

const columns: TableColumn<Item>[] = [
  {
    header: 'Name',
    cell: (row) => row.renderValue(),
    accessorKey: 'name',
  },
  {
    header: 'Price',
    cell: (row) => row.renderValue(),
    accessorKey: 'price',
  },
  {
    header: 'Quantity',
    cell: (row) => row.renderValue(),
    accessorKey: 'quantity',
  },
]

const dummyData = () => {
  const items = []
  for (let i = 0; i < 10; i++) {
    items.push({
      id: i,
      name: `Item ${i}`,
      price: 100,
      quantity: 1,
    })
  }
  return items
}

const Wrapper: FC = () => {
  return <Table data={dummyData()} columns={columns} />
}

const meta: Meta<typeof Wrapper> = {
  title: 'Example/Table',
  component: Wrapper,
  tags: ['autodocs'],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof Wrapper>

export const Basic: Story = {
  args: {},
}
