import React, { forwardRef } from "react";
import { Avatar, Box, Button, Flex, Name } from "./";
import { convertToUrl } from "~/utils/other";
import styled from "styled-components";
import Image from "next/image";

type HTMLInputProps = Omit<React.ComponentProps<"input">, "ref">;

type FileInputProps = HTMLInputProps & {
  onClear?: () => void;
  previewFile?: File | string;
  placeholderText?: string;
  previewType?: "avatar" | "background";
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
  const {
    type,
    className,
    previewFile,
    placeholderText,
    previewType,
    onClear,
    defaultValue,
    ...inputProps
  } = props;

  const url = convertToUrl(previewFile);
  const preview = previewType ?? "avatar";

  return (
    <Flex direction={previewType == "avatar" ? "row" : "column"}>
      {preview == "avatar" ? (
        <Avatar placeholderText={props?.placeholderText} src={url} size={62} />
      ) : (
        <BackgroundPreviewWrapper>
          {url && <StyledImage src={url} height={120} width={380} alt="Zdjęcie w tle" />}
        </BackgroundPreviewWrapper>
      )}
      <Flex gap="lg" items="center" style={{ marginTop: 8 }}>
        <Box style={{ position: "relative" }}>
          <HiddenFileInput ref={ref} type="file" {...inputProps} />
          <Button color="secondary" type="button">
            Zmień
          </Button>
        </Box>
        <Name style={{ cursor: "pointer" }} onClick={props.onClear}>
          Usuń
        </Name>
      </Flex>
    </Flex>
  );
});

FileInput.displayName = "FileInput";

const BackgroundPreviewWrapper = styled(Box)`
  height: 120px;
  width: 380px;
  overflow: hidden;
  border-radius: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.palette.gray[200]};
`;

const StyledImage = styled(Image)`
  width: 100%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
`;
