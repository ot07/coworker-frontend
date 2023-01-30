import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
// import { useForm, zodResolver } from "@mantine/form";
import { useForm, SubmitHandler } from "react-hook-form";
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

export const RHFMantineForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <TextInput
          withAsterisk
          label="Name"
          placeholder="John Doe"
          mt="sm"
          error={errors.name?.message}
          {...register("name")}
        />

        {/*<NumberInput*/}
        {/*  withAsterisk*/}
        {/*  label="Age"*/}
        {/*  placeholder="Your age"*/}
        {/*  mt="sm"*/}
        {/*  {...register("age")}*/}
        {/*/>*/}

        <Group position="right" mt="xl">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
