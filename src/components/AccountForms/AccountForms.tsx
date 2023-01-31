import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IFormInputs {
  name: string;
  email: string;
  age: number;
}

const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
  email: z.string().email({ message: "Invalid email" }),
  age: z
    .number()
    .min(18, { message: "You must be at least 18 to create an account" }),
});

export const AccountForms = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      age: undefined,
    },
  });

  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              withAsterisk
              label="Email"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextInput
              className="mt-3"
              withAsterisk
              label="Name"
              error={errors.name?.message}
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

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
