import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Description,
  FileInput,
  Flex,
  Headline,
  InputField,
  LoadingButton,
  Paper,
  QuestionMarkTooltip,
  TextInput,
} from "~/components/Shared";
import { type PageLayout } from "~/layouts/PageLayoutHandler";
import { api } from "~/utils/api";
import { uploadFile } from "~/utils/other";

type Data = { name: string; image: File | string | null };
type NameError = { text: string; show: boolean };

function validUserName(name: string) {
  if (name.length < 3) return "Twoja nazwa jest za krótka.";
  if (name.length > 16) return "Twoja nazwa jest za długa.";
  return "";
}

const CompleteTheConfiguration = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { mutateAsync: updateUserData } = api.user.update.useMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<NameError>({ text: "", show: false });
  const [data, setData] = useState<Data>({ name: "", image: null });

  const currentUser = session?.user;

  const handleUpdateUser = async () => {
    try {
      setIsLoading(true);
      const isImageFile = data.image && typeof data.image != "string";
      const imageUrl = isImageFile ? await uploadFile(data.image as File) : null;
      await updateUserData({ name: data.name, image: imageUrl });
      location.reload();
      setIsLoading(false);
    } catch (err) {
      console.warn("Nie udało się dokończyć konfiguracji");
      setNameError({ text: validUserName(data.name), show: true });
      setIsLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setNameError({ ...nameError, text: validUserName(newName) });
    setData({ ...data, name: newName });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    setData({ ...data, image: files[0]! });
  };

  useEffect(() => {
    if (Boolean(currentUser?.name)) void router.push({ pathname: "/" });
    else if (status == "unauthenticated") void router.push({ pathname: "/auth/signin" });
    setData({ name: currentUser?.name ?? "", image: currentUser?.image ?? null });
  }, [currentUser, status]);

  return (
    <CompleteTheConfigurationWrapper>
      <Headline>Dokończ konfiguracje konta</Headline>
      <Description>Wypełnij wymagane pola, aby ukończyć logowanie.</Description>
      <Flex direction="column" gap="xl" style={{ marginTop: 16 }}>
        <Flex direction="column" gap="sm">
          <InputField label="Twoja widoczna nazwa *" error={nameError.text}>
            <TextInput
              minLength={3}
              value={data.name}
              onChange={handleNameChange}
              style={{ maxWidth: 325 }}
            />
          </InputField>
        </Flex>
        <InputField label="Zdjęcie profilowe">
          <FileInput
            previewFile={data.image ?? undefined}
            onChange={handleImageChange}
            onClear={() => setData({ ...data, image: null })}
            placeholderText={currentUser?.name ?? undefined}
          />
        </InputField>
        <Flex justify="flex-end" gap="md" style={{ marginTop: 16 }}>
          <Button color="secondary" onClick={() => void signOut()}>
            Wyloguj się
          </Button>
          <LoadingButton isLoading={isLoading} onClick={() => void handleUpdateUser()}>
            Zapisz
          </LoadingButton>
        </Flex>
      </Flex>
      <QuestionMarkTooltip
        id="CompleteTheConfiguratio"
        content="* - pole jest wymagane"
        bottom={16}
        left={16}
      />
    </CompleteTheConfigurationWrapper>
  );
};

const pageLayout: PageLayout = {
  auth: "only-authenticated",
  header: false,
};

CompleteTheConfiguration.pageLayout = pageLayout;
export default CompleteTheConfiguration;

const CompleteTheConfigurationWrapper = styled(Paper)`
  margin: 20vh auto;
  width: 90%;
  max-width: 500px;
  position: relative;
`;
