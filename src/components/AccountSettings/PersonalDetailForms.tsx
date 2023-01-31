import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormValues } from "./AccountSettings";
import { NumberInput, TextInput } from "@mantine/core";
import { FC } from "react";

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
