import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { LoadingButton, Paragraph, Spinner } from "~/components/Shared";

export type ProviderButtonProps = { provider: string; src?: string; customImage?: React.ReactNode };
export const ProviderButton = (props: ProviderButtonProps) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const handleClick = async () => {
    try {
      setLoading(true);
      await signIn(props.provider, { callbackUrl: "/" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <StyledLoadingButton
      color="secondary"
      variant="outlined"
      isLoading={loading}
      customSpinner={<Spinner size="sm" color={theme.palette.black} />}
      onClick={() => void handleClick()}
    >
      {props.customImage ? (
        props.customImage
      ) : (
        <Image src={props.src!} height={40} width={40} alt={`${props.provider} logo`} />
      )}
      <Paragraph>Kontynuuj za pomocą {props.provider}</Paragraph>
    </StyledLoadingButton>
  );
};

const StyledLoadingButton = styled(LoadingButton)`
  padding: 32px 0px;
  width: 100%;
  gap: ${props => props.theme.spacing.lg};
`;
