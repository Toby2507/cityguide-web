import { footerLinks } from '@/data';
import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="bg-primary py-28">
      <div className="container px-10 mx-auto max-w-7xl">
        <div className="flex justify-between gap-10 pb-20">
          <div className="flex flex-col">
            <h1 className="text-xl text-white font-semibold">CityGuideX</h1>
            <p className="text-xs text-white font-light">Simplifying experiences</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
          <div className="flex flex-col gap-2">
            <p className="text-white font-bold">Follow us on</p>
            <div className="flex items-center gap-2">
              <Link href="#">
                <IoLogoTwitter
                  className="text-white transition-all duration-300 ease-in-out hover:text-bgLightBlue hover:scale-125"
                  size={20}
                />
              </Link>
              <Link href="#">
                <IoLogoFacebook
                  className="text-white transition-all duration-300 ease-in-out hover:text-bgLightBlue hover:scale-125"
                  size={20}
                />
              </Link>
              <Link href="#">
                <IoLogoInstagram
                  className="text-white transition-all duration-300 ease-in-out hover:text-bgLightBlue hover:scale-125"
                  size={20}
                />
              </Link>
              <Link href="#">
                <IoLogoYoutube
                  className="text-white transition-all duration-300 ease-in-out hover:text-bgLightBlue hover:scale-125"
                  size={20}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-bgLightBlue" />
        <div className="flex flex-col gap-6 pt-14">
          <div className="flex items-center gap-6">
            <Link className="text-white text-sm hover:text-bgLightBlue hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="text-white text-sm hover:text-bgLightBlue hover:underline" href="#">
              Terms and Condition
            </Link>
            <Link className="text-white text-sm hover:text-bgLightBlue hover:underline" href="#">
              Compliance
            </Link>
          </div>
          <p className="text-xs text-white">&copy;{new Date().getFullYear()} Cityguidex inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
