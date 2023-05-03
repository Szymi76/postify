import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Box, Flex, Icon, List, ListItem, Name, Paper } from "~/components/Shared";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import { useOnClickOutside } from "~/hooks";

type SelectProps = {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
};
export const Select = (props: SelectProps) => {
  const [open, setOpen] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useOnClickOutside<HTMLDivElement>(() => setOpen(false), [triggerRef]);

  const handleOptionClick = (option: string) => {
    props.onChange(option);
    setOpen(false);
  };

  return (
    <SelectWrapper>
      <SelectTrigger onClick={() => setOpen(!open)} ref={triggerRef}>
        <Flex justify="space-between" items="center">
          <Name>{props.selected}</Name>
          <Icon style={{ height: 24, width: 24 }}>
            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Icon>
        </Flex>
      </SelectTrigger>
      {open && (
        <OptionsWrapper ref={optionsRef}>
          <List>
            {props.options.map((option, index) => (
              <ListItem key={`select-${index}`} onClick={() => handleOptionClick(option)}>
                {option}
              </ListItem>
            ))}
          </List>
        </OptionsWrapper>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled(Box)`
  position: relative;
  width: 250px;
  white-space: nowrap;
  z-index: 20;
`;

const SelectTrigger = styled(Paper)`
  cursor: pointer;
  padding: ${props => props.theme.spacing.md};
`;

const OptionsWrapper = styled(Paper)`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  padding: 0;
  width: 100%;
`;
