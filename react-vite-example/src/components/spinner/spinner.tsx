import { ComponentPropsWithoutRef } from "react";
import { LoaderCircle } from "lucide-react";

import { joinClassNames } from "@/utils/styles.ts";

import styles from "./spinner.module.css";

export function Spinner({
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "children">) {
  return (
    <span className={joinClassNames(styles.spinner, className)} {...props}>
      <LoaderCircle />
    </span>
  );
}
