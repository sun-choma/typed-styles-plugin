import {
  ComponentPropsWithoutRef,
  ComponentRef,
  FC,
  forwardRef,
  ReactNode,
} from "react";

import type { LucideProps } from "lucide-react";

import { Spinner } from "@/components/spinner";
import { joinClassNames } from "@/utils/styles";
import { getClassNames } from "@/utils/styleProps";

import styles from "./button.module.pcss";
import type { StyleProps } from "./button.module.pcss";

type LegacyButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "disabled" | "aria-disabled" | "children"
>;

export interface ButtonProps extends LegacyButtonProps, StyleProps {
  /** Button label */
  children?: string | string[];
  /** Label for screen readers */
  "aria-label"?: string;
  /** Icon component to display before text. If icon is present label can be omitted */
  Icon?: FC<LucideProps>;
  /** Custom element to be displayed to the right of button */
  endElement?: ReactNode;
  /** Making button unclickable and less accented. Use when certain conditions are not yet met */
  isDisabled?: boolean;
}

/**
 * Common button component to use across the application
 */
export const Button = forwardRef<ComponentRef<"button">, ButtonProps>(
  (
    {
      children,
      className,
      isDisabled,
      isLoading = false,
      variant = "contained",
      size = "md",
      Icon,
      endElement,
      ...props
    },
    ref,
  ) => {
    const classes = getClassNames<StyleProps>({
      props: {
        variant,
        size,
        isLoading,
      },
      styles,
    });

    return (
      <button
        className={joinClassNames(...classes, className)}
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading}
        ref={ref}
        data-has-icon={!!Icon || isLoading}
        {...props}
      >
        {isLoading && <Spinner className={styles["icon"]} />}
        {!isLoading && Icon && <Icon className={styles["icon"]} />}
        {children && <p>{children}</p>}
        {endElement}
      </button>
    );
  },
);
