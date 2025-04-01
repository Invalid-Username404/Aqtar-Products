import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={item.href}>
              <li
                className={`${item.active ? "font-medium text-gray-800" : "text-gray-600"}`}
              >
                {isLast || item.active ? (
                  <span aria-current={item.active ? "page" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 hover:underline transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>

              {!isLast && (
                <li aria-hidden="true" className="text-gray-400">
                  /
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
