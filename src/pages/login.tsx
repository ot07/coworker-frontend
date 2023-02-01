import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  Center,
  Flex,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const login = () => router.push("/");

  return (
    <Container className="flex h-screen items-center justify-center overflow-hidden">
      <Paper className="w-[28rem]" withBorder shadow="md" p={48} radius="md">
        <Center pb={32}>
          <Image src="logo.svg" alt="logo" width={112} height={0} />
        </Center>
        <TextInput label="メールアドレス" required />
        <PasswordInput label="パスワード" required mt="md" />
        <Group position="apart" mt="xl">
          <Checkbox label="ログインを保存する" sx={{ lineHeight: 1 }} />
        </Group>
        <Button fullWidth mt="xl" onClick={login}>
          ログイン
        </Button>
      </Paper>
    </Container>
  );
}
