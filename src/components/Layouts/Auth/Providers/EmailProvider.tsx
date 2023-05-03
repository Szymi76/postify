import { signIn } from "next-auth/react";
import { useRef, useState } from "react";
import { Flex, LoadingButton, TextInput } from "~/components/Shared";

export const EmailProvider = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRef.current) return;

    const email = emailRef.current.value;
    setLoading(true);
    await signIn("email", { email });
    setLoading(false);
  };

  return (
    <Flex
      as="form"
      onSubmit={e => void handleSubmit(e)}
      direction="column"
      gap="md"
      style={{ width: "100%" }}
    >
      <TextInput ref={emailRef} type="email" placeholder="Wpisz swój adres email" />
      <LoadingButton isLoading={loading} style={{ width: "100%" }}>
        Zaloguj się za pomocą emailu
      </LoadingButton>
    </Flex>
  );
};
