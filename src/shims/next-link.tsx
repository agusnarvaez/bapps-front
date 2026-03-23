import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { isExternalHref, navigateTo } from "@/lib/router";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

function shouldHandleAsClientNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  target?: string
) {
  if (event.defaultPrevented) {
    return false;
  }

  if (event.button !== 0) {
    return false;
  }

  if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) {
    return false;
  }

  if (target && target !== "_self") {
    return false;
  }

  if (href.startsWith("#") || href.includes("#")) {
    return false;
  }

  return !isExternalHref(href);
}

export default function Link({
  href,
  onClick,
  target,
  children,
  ...props
}: LinkProps) {
  return (
    <a
      href={href}
      target={target}
      onClick={(event) => {
        onClick?.(event);

        if (!shouldHandleAsClientNavigation(event, href, target)) {
          return;
        }

        event.preventDefault();
        navigateTo(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
