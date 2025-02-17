'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo, { LogoMobile } from "./Logo"
import { Button, buttonVariants } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"

function Navbar() {
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    )
}

const items = [
    { label: "Dashboard", link: '/' },
    { label: "Transactions", link: '/transactions' },
    { label: "Manage", link: '/manage' },
]

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="container flex items-center justify-between">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant={"ghost"} size={"icon"}>
                            <Menu />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="w-[400px] sm:w-[540px]" side={"left"}>
                        <Logo />
                        <div className="flex flex-col gap-1 pt-4">
                            {items.map(item => (
                                <NavbarItem
                                    key={item.label}
                                    label={item.label}
                                    link={item.link}
                                    clickCallback={() => setIsOpen(!isOpen)}
                                />
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <LogoMobile />
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    <UserButton afterSwitchSessionUrl="/sign-in" />
                </div>
            </nav>
        </div>
    )
}

function DesktopNavbar() {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between">
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <Logo />
                    <div className="flex h-full">
                        {items.map(item => (
                            <NavbarItem
                                key={item.label}
                                label={item.label}
                                link={item.link}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcher />
                    <UserButton afterSwitchSessionUrl="/sign-in" />
                </div>
            </nav>
        </div>
    )
}

function NavbarItem({ label, link, clickCallback }: { label: string, link: string, clickCallback?: () => void }) {
    const pathname = usePathname()
    const isActive = pathname === link

    return (
        <div className="relative flex items-center">
            <Link href={link} className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
                isActive && "text-foreground"
            )}
                onClick={() => {
                    if (clickCallback) clickCallback()
                }}
            >
                {label}
            </Link>
            {
                isActive && (
                    <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl bg-card-foreground md:block"></div>
                )
            }
        </div>
    )
}

export default Navbar
