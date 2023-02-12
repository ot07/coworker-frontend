import { Control, Controller, FieldErrors } from "react-hook-form";
import { TextInput } from "@mantine/core";
import { FC } from "react";
import { FormValues } from "@/app/(with-header-navbar)/account-settings/types";

type Props = {
  control: Control<FormValues, any>;
  errors: FieldErrors<FormValues>;
};

export const PersonalDetailForms: FC<Props> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextInput
            withAsterisk
            label="Full Name"
            error={errors.fullName?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <TextInput
            className="mt-3"
            withAsterisk
            label="Country"
            error={errors.country?.message}
            {...field}
          />
        )}
      />
    </>
  );
};
