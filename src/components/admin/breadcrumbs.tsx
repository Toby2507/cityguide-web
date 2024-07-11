'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const AdminBreadcrumbs = () => {
  let routeName = usePathname();
  if (routeName === '/admin') routeName = '/admin/dashboard';
  const crumbs = useMemo(() => routeName.split('/').filter((crumb) => crumb), [routeName]);

  return (
    <Breadcrumbs variant="solid" underline="hover">
      {crumbs.map((crumb, idx) => (
        <BreadcrumbItem className="capitalize" key={idx}>
          <Link href={`/${crumbs.slice(0, idx + 1).join('/')}`}>{crumb}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default AdminBreadcrumbs;
