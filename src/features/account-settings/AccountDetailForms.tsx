import { Control, Controller, FieldErrors } from 'react-hook-form'
import { NumberInput, TextInput } from '@mantine/core'
import { FC } from 'react'
import { FormValues } from '@/features/account-settings/types'

type Props = {
  control: Control<FormValues, any>
  errors: FieldErrors<FormValues>
}

export const AccountDetailForms: FC<Props> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Name"
            error={errors.name?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextInput
            className="mt-3"
            withAsterisk
            label="Email"
            error={errors.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <NumberInput
            className="mt-3"
            withAsterisk
            label="Age"
            min={0}
            error={errors.age?.message}
            {...field}
          />
        )}
      />
    </>
  )
}
