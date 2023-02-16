"use client";

import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Button, Group, Modal, NumberInput, TextInput } from "@mantine/core";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateMember } from "@/app/(with-header-navbar)/team-members/useMembers";
import { v4 as uuidv4 } from "uuid";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name should have at 2 letters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }).optional(),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email?: string;
};

export const CreateMemberModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const id = uuidv4();
  const { createMember } = useCreateMember();
  const {
    trigger,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const close = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [setIsOpen, reset]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createMember({ id, ...data });
    close();
  };

  return (
    <Modal opened={isOpen} onClose={close} title="メンバー編集" size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group position="center" grow align="start">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                withAsterisk
                label="姓"
                error={errors.lastName?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                withAsterisk
                label="名"
                error={errors.firstName?.message}
                {...field}
              />
            )}
          />
        </Group>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              className="mt-3"
              label="メールアドレス"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Group position="right" mt="lg">
          <Button type="submit">保存</Button>
        </Group>
      </form>
    </Modal>
  );
};
