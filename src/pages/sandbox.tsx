import React, { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Button, Flex, Icon, List, ListItem, Name, Paper, Select } from "~/components/Shared";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/outline/ChevronUpIcon";
import BarsArrowDownIcon from "@heroicons/react/24/outline/BarsArrowDownIcon";
import { useOnClickOutside } from "~/hooks";

type Option = "Najnowsze" | "Najpopularniejsze";

const Sandbox = () => {
  const [option, setOption] = useState<Option>("Najnowsze");

  return (
    <div className="p-5">
      <Select
        options={["Najnowsze", "Najbardzej polubione"]}
        onChange={option => setOption(option as Option)}
        selected={option}
      />
    </div>
  );
};

export default Sandbox;
