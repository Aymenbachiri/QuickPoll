import type { MyLinkProps } from "@/src/lib/types/reusableComponentsTypes";
import { Link } from "expo-router";

export default function MyLink({ children, href, ...props }: MyLinkProps) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
