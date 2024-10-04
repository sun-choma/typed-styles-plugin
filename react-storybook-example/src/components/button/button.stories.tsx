import { PlusIcon } from "lucide-react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button.tsx";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click Me",
    onClick: fn(),
  },
};

export const Variants: Story = {
  args: {
    onClick: fn(),
  },
  render: (args) => (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button {...args}>Contained</Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="texted">
        Texted
      </Button>
      <Button {...args} variant="unstyled">
        Unstyled
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    children: "Disabled",
    onClick: fn(),
  },
};

export const WithIcon: Story = {
  args: {
    children: "With Icon",
    onClick: fn(),
    Icon: PlusIcon,
  },
};

export const IconOnly: Story = {
  args: {
    onClick: fn(),
    Icon: PlusIcon,
    "aria-label": "Add button",
  },
};

export const Unstyled: Story = {
  args: {
    onClick: fn(),
    variant: "unstyled",
    children: "Click Me",
  },
};
