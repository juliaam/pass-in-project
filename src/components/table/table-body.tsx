import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableBodyProps extends ComponentProps<"th"> {}

export function TableBody(props: TableBodyProps) {
  return (
    <td {...props} className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className)} />
  );
}
