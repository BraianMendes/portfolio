import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import clsx from "clsx";

import { Github } from "@/components/icons/index";
import { siteConfig } from "@/config/site";

const navItems = [...siteConfig.navItems];

export const Navbar = () => {
  return (
    <HeroUINavbar className="h-12 py-0" maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-2 max-w-fit">
          <NextLink className="flex items-center gap-1" href="/">
            <span className="font-semibold text-sm tracking-tight text-inherit">
              Braian&apos;s Portfolio
            </span>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-2 justify-start ml-2">
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "text-sm font-normal",
                  "data-[active=true]:text-primary data-[active=true]:font-semibold",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
            rel="noopener noreferrer"
          >
            <Github className="text-default-500 w-5 h-5" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal px-3 py-1 h-8 min-h-0 rounded bg-default-100"
            href={siteConfig.links.whatsapp}
            variant="flat"
          >
            Contact Me
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link
          isExternal
          aria-label="Github"
          href={siteConfig.links.github}
          rel="noopener noreferrer"
        >
          <Github className="text-default-500 w-5 h-5" />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                className="font-normal"
                color="foreground"
                href={item.href}
                size="sm"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
