import { footerLinks } from '@/data';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-primary py-20">
      <div className="container px-10 mx-auto max-w-7xl">
        <div className="flex justify-between gap-10 pb-20">
          {footerLinks.map(({ category, links }) => (
            <div key={category} className="flex flex-col gap-3">
              <p className="font-bold text-bgLightBlue">{category}</p>
              <ul className="flex flex-col gap-2">
                {links.map(({ title, href }, idx) => (
                  <li key={`${title}-${idx}`} className="text-white text-sm hover:text-bgLightBlue hover:underline">
                    <Link href={href}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="h-[1px] w-full bg-bgLightBlue" />
        <p className="text-xs text-white text-center pt-6">
          Copyright &copy; {new Date().getFullYear()} Cityguidex.com&trade;. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
