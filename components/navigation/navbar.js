"use client";

import { Fragment } from "react";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, Transition, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { cx } from "@/utils/all"
import LangSwitcher from "../generalUse/lang-switcher";
import { urlForImage } from "@/lib/sanity/image";

export default  function Navbar(props) {
    const { lang, data } = props;


    return (
        <header className="inset-0 z-20 px-2 py-1 border-b sticky bg-white/25 backdrop-blur-sm">
            <nav className="main-nav">
                <Disclosure>

                    {({ open, close }) => (
                        <>
                            <div className="flex flex-wrap justify-between md:flex-nowrap md:gap-10">
                                <div className="order-1 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:justify-end">
                                    {/* LEFT MENU */}
                                    {data?.slice(0, 3).map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                    lang={lang}
                                                />
                                            ) : (
                                                <Link
                                                    href={"/" + lang + item.href}
                                                    key={`${item.label}${index}`}
                                                    className="px-5 py-2 text-md font-medium text-gray-900 hover:text-red-500 dark:text-gray-400"
                                                    target={item.external ? "_blank" : ""}
                                                    rel={item.external ? "noopener" : ""}>
                                                    {item.label}
                                                </Link>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>

                                {/* LOGO SECTION */}
                                <div className="flex w-full items-center justify-between md:w-auto">
                                    <Link href={`/${lang}`} className="w-28 dark:hidden">
                                        {props.logo ? (
                                            <Image
                                                {...urlForImage(props.logo)}
                                                alt="Logo"
                                                priority={true}
                                                sizes="(max-width: 640px) 100vw, 200px"
                                            // src={Logo}
                                            />
                                        ) : (
                                            <span className="block text-center">
                                                FUNDACIÓN CENTRO EDUCATIVO PANAMÁ
                                            </span>

                                        )}
                                    </Link>
                                    <Link href={`/${lang}`} className="hidden w-28 dark:block">
                                        {props.logo ? (
                                            <Image
                                                {...urlForImage(props.logoalt)}
                                                alt="Logo"
                                                priority={true}
                                                sizes="(max-width: 640px) 100vw, 200px"
                                            // src={Logo}
                                            />
                                        ) : (
                                            <span className="block text-center text-red-700">
                                                FUNDACIÓN CENTRO EDUCATIVO PANAMÁ
                                            </span>

                                        )}
                                    </Link>
                                    {/* Toggle Menu */}
                                    <DisclosureButton
                                        aria-label="Toggle Menu"
                                        className="ml-auto rounded-md px-2 py-1 text-gray-900 focus:text-red-500 focus:outline-none dark:text-gray-300 md:hidden ">
                                        <svg
                                            className="h-6 w-6 fill-current"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24">
                                            {open && (
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                                                />
                                            )}
                                            {!open && (
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                                />
                                            )}
                                        </svg>
                                    </DisclosureButton>
                                </div>
                                

                                <div className="order-2 hidden w-full flex-col items-center justify-start md:order-none md:flex md:w-auto md:flex-1 md:flex-row">
                                    {/* LANGUAGE SWITCHET SECTION */}
                                    <LangSwitcher locale={lang} />
                                    {/* RIGHT MENU */}
                                    {data.slice(3, 7).map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}>
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                />
                                            ) : (
                                                <Link
                                                    href={item.button ? item.href : "/" + lang + item.href}
                                                    key={`${item.label}${index}`}
                                                    className={cx(
                                                        "px-5 py-2 text-md font-medium text-gray-900 hover:text-red-500 dark:text-gray-400",
                                                        item.button && "mx-5 my-2 order-last  border border-red-700 rounded-md font-medium hover:border-red-800 hover:bg-gray-600"
                                                    )}
                                                    target={item.external ? "_blank" : ""}
                                                    rel={item.external ? "noopener" : ""}>
                                                    {item.label}
                                                </Link>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>

                            <DisclosurePanel>
                                <div className="order-2 gap-2 ml-4 mt-4 flex w-full flex-col items-center justify-start md:hidden bg-white overflow-y-auto max-h-[calc(100vh-10rem)]">

                                    <div className="w-10/12 px-5 py-2 text-md font-medium text-gray-900 hover:text-red-500 dark:text-gray-400">
                                        <LangSwitcher
                                            locale={lang}
                                            onClick={() => close()} // Close the menu when the link is clicked

                                        />
                                    </div>

                                    {/* MOBILE MENU SECTION */}
                                    {data.map((item, index) => (
                                        <Fragment key={`${item.label}${index}`}  >
                                            {item.children && item.children.length > 0 ? (
                                                <DropdownMenu
                                                    closeMenu={close} // Pass the close function
                                                    menu={item}
                                                    key={`${item.label}${index}`}
                                                    items={item.children}
                                                    mobile={true}
                                                    lang={lang}
                                                />
                                            ) : (

                                                <Link
                                                    href={"/" + lang + item.href}
                                                    key={`${item.label}${index}`}
                                                    className={cx(
                                                        "px-5 py-2 w-10/12 text-md font-medium text-gray-900 hover:text-red-500 dark:text-gray-400",
                                                        item.button && " m-2 w-10/12 text-center order-last border border-red-700 rounded-md font-medium hover:border-red-800 hover:bg-gray-600"
                                                    )}
                                                    target={item.external ? "_blank" : ""}
                                                    rel={item.external ? "noopener" : ""}
                                                    onClick={() => close()} // Close the menu when the link is clicked
                                                >
                                                    {item.label}

                                                </Link>

                                            )}
                                        </Fragment>
                                    ))}

                                </div>
                            </DisclosurePanel>
                        </>
                    )}
                </Disclosure>
            </nav>

        </header>
    );
};

function DropdownMenu({ menu, items, mobile, closeMenu, lang }) {

    return (
        <Menu
            as="div"
            className={cx("relative text-left", mobile && "w-10/12")}>
            {({ open, close }) => (
                <>
                    <MenuButton
                        className={cx(
                            "flex items-center hover:text-red-500 gap-x-1 rounded-md px-5 py-2 text-md font-medium  outline-none transition-all focus:outline-none focus-visible:text-indigo-500 focus-visible:ring-1 dark:focus-visible:bg-gray-800",
                            open
                                ? "text-red-500 hover:text-red-500"
                                : " text-gray-900 dark:text-gray-400 ",
                            mobile ? "w-full px-4 py-2 " : "inline-block px-4 py-2"
                        )}>
                        <span>{menu.label}</span>
                        {!open ? <ChevronDownIcon className="mt-0.5 h-4 w-4" /> : <ChevronUpIcon className="mt-0.5 h-4 w-4 " />}
                    </MenuButton>
                    <Transition
                        as={Fragment}
                        enter="lg:transition lg:ease-out lg:duration-100"
                        enterFrom="lg:transform lg:opacity-0 lg:scale-95"
                        enterTo="lg:transform lg:opacity-100 lg:scale-100"
                        leave="lg:transition lg:ease-in lg:duration-75"
                        leaveFrom="lg:transform lg:opacity-100 lg:scale-100"
                        leaveTo="lg:transform lg:opacity-0 lg:scale-95">
                        <MenuItems
                            className={cx(
                                "z-20 origin-top-left rounded-md  focus:outline-none  lg:absolute lg:left-0  lg:w-56",
                                !mobile && "bg-white shadow-lg  dark:bg-gray-800"
                            )}>
                            <div className={cx(!mobile && "py-3")}>
                                {items.map((item, index) => (
                                    <MenuItem as="div" key={`${item.title}${index}`} className="p-2" >
                                        {({ focus }) => (
                                            <Link
                                                onClick={() => {
                                                    close()
                                                    if (closeMenu) {
                                                        closeMenu()
                                                    }

                                                }} // Close the menu when the link is clicked
                                                href={item?.path ? "/" + lang + item.path : "#"}
                                                className={cx(
                                                    "flex items-center space-x-2 px-5 py-2 text-md lg:space-x-4",
                                                    focus
                                                        ? "text-red-500"
                                                        : "text-gray-900 hover:text-red-500 focus:text-red-500 dark:text-gray-300"
                                                )}>
                                                <span> {item.title}</span>
                                            </Link>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </Transition>
                </>
            )}
        </Menu>

    );
};