/** @format */

"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useMode } from "@/context/ModeContext";
import { useTheme } from "next-themes";
import { LuMoon, LuSun, LuMenu, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { resolveModeHref } from "@/lib/logic";

const emptySubscribe = () => () => {};

export function Navbar() {
	const pathname = usePathname();
	const { mode, isSubdomain } = useMode();
	const { theme, setTheme } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isNavigating, setIsNavigating] = useState(false);
	const mounted = useSyncExternalStore(
		emptySubscribe,
		() => true,
		() => false,
	);

	// Clear loading state on route change
	useEffect(() => {
		setIsNavigating(false);
	}, [pathname]);

	// Listen for internal navigation link clicks
	useEffect(() => {
		const handleAnchorClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			const anchor = target?.closest("a");
			if (
				anchor &&
				anchor.href &&
				!anchor.target &&
				!anchor.href.startsWith("mailto:") &&
				!anchor.href.startsWith("tel:") &&
				!anchor.href.startsWith("javascript:") &&
				!anchor.getAttribute("href")?.startsWith("#") &&
				anchor.origin === window.location.origin
			) {
				const targetPath = anchor.pathname;
				if (targetPath !== window.location.pathname) {
					setIsNavigating(true);
				}
			}
		};

		document.addEventListener("click", handleAnchorClick);
		return () => document.removeEventListener("click", handleAnchorClick);
	}, []);

	const isDesign = mode === "design";

	const getHref = (path: string) => resolveModeHref(path, mode, isSubdomain);

	const links = isDesign
		? [
				{ label: "About", href: getHref("/about") },
				{
					label: "Services",
					href: getHref("/#services"),
				},
				{ label: "Works", href: getHref("/works") },
				{ label: "Resume", href: getHref("/resume") },
			]
		: [
				{ label: "About", href: getHref("/about") },
				{ label: "Projects", href: getHref("/projects") },
				{ label: "Blog", href: getHref("/blog") },
				{ label: "Resume", href: getHref("/resume") },
			];

	/*
	const modeOptions: {
		key: "dev" | "design";
		label: string;
		shortLabel: string;
	}[] = [
		{ key: "dev", label: "Developer", shortLabel: "Dev" },
		{ key: "design", label: "Designer", shortLabel: "Design" },
	];
	*/

	const toggleTheme = () => {
		if (theme === "light") setTheme("dark");
		else setTheme("light");
	};

	const renderThemeIcon = () => {
		if (!mounted) return null;
		return theme === "dark" ? (
			<LuMoon className='w-4 h-4' />
		) : (
			<LuSun className='w-4 h-4' />
		);
	};

	return (
		<div className='sticky top-0 z-50 w-full h-13 flex justify-center items-start pointer-events-none px-4 md:px-12'>
			{/* DESKTOP NAV WRAPPER */}
			<div className='hidden md:flex relative items-center justify-between w-full max-w-3xl h-13 pointer-events-none'>
				{/* Left Incurve */}
				<div className='absolute top-0 -left-5 w-5 h-5 overflow-visible -scale-x-100 pointer-events-none'>
					<svg
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full text-foreground overflow-visible'
					>
						<path
							d='M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z'
							fill='currentColor'
						/>
						<path
							d='M 20 0 C 8.954 0 0 8.954 0 20'
							className='stroke-border'
							strokeWidth='0'
							fill='none'
						/>
					</svg>
				</div>

				{/* Right Incurve */}
				<div className='absolute top-0 -right-5 w-5 h-5 overflow-visible pointer-events-none'>
					<svg
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full text-foreground overflow-visible'
					>
						<path
							d='M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z'
							fill='currentColor'
						/>
						<path
							d='M 20 0 C 8.954 0 0 8.954 0 20'
							className='stroke-border'
							strokeWidth='0'
							fill='none'
						/>
					</svg>
				</div>

				<nav className='relative flex items-center justify-between w-full h-13 bg-foreground rounded-b-3xl pointer-events-auto px-4 overflow-hidden'>
					{/* Left Logo */}
					<div className='flex items-center gap-3 text-background'>
						<div className='w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0'>
							<Image
								src='/icon.png'
								alt='Nicholas Benson Portfolio'
								width={32}
								height={32}
								className='w-full h-full object-cover'
								priority
							/>
						</div>
						<Link
							href={getHref("/")}
							className='font-bold text-lg hover:text-accent transition-colors'
						>
							Nicholas
						</Link>
					</div>

					{/* Center Links */}
					<div className='flex items-center gap-8'>
						{links.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className='text-base font-semibold text-muted-foreground transition-colors hover:text-accent'
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Right Actions */}
					<div className='flex items-center gap-3 lg:gap-4'>
						{/* Mode Selector Dropdown commented out as requested */}
						{/* 
						<div className='relative'>
							<button
								onClick={() => setModeMenuOpen(!modeMenuOpen)}
								className='flex items-center gap-1.5 text-base font-semibold text-muted-foreground hover:text-accent transition-colors capitalize cursor-pointer'
							>
								{mode}{" "}
								<motion.div animate={{ rotate: modeMenuOpen ? 180 : 0 }}>
									<LuChevronDown className='w-4 h-4' />
								</motion.div>
							</button>
							<AnimatePresence>
								{modeMenuOpen && (
									<motion.div
										initial={{ clipPath: "inset(0% -25% 100% -25%)" }}
										animate={{ clipPath: "inset(0% -25% -20% -25%)" }}
										exit={{ clipPath: "inset(0% -25% 100% -25%)" }}
										transition={{
											duration: 0.4,
											ease: [0.16, 1, 0.3, 1],
										}}
										className='absolute top-9.5 left-1/2 -translate-x-1/2 w-25 flex flex-col z-40 origin-top'
									>
										<div className='relative w-full bg-foreground rounded-b-2xl flex flex-col shadow-sm'>
											<div className='flex flex-col pb-4 overflow-hidden rounded-b-3xl gap-3 pl-3'>
												{modeOptions
													.filter((option) => option.key !== mode)
													.map((option) => (
														<Link
															key={option.key}
															href={option.key === "design" ? "/design" : "/"}
															onClick={() => {
																setModeMenuOpen(false);
																setIsOpen(false);
															}}
															className='text-sm text-muted-foreground hover:text-accent transition-colors font-semibold py-1'
														>
															{option.label}
														</Link>
													))}
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
						*/}

						<div className='relative'>
							<motion.button
								whileTap={{ scale: 0.8, rotate: 180 }}
								whileHover={{ scale: 1.1 }}
								transition={{
									type: "spring",
									stiffness: 200,
									damping: 10,
								}}
								onClick={toggleTheme}
								className='flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-accent transition-colors cursor-pointer'
								aria-label='Toggle theme'
							>
								{renderThemeIcon()}
							</motion.button>
						</div>
						<Link
							href={getHref("/") + "#contact"}
							className={cn(
								buttonVariants({ variant: "secondary" }),
								"rounded-3xl font-semibold bg-background hover:bg-card text-foreground",
							)}
						>
							Contact
						</Link>
					</div>

					{/* Integrated Desktop Bottom Loading Line */}
					<AnimatePresence>
						{isNavigating && (
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: [0, 0.6, 0.95] }}
								exit={{ scaleX: 1, opacity: 0 }}
								transition={{ duration: 0.7, ease: "easeInOut" }}
								className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-accent origin-left pointer-events-none z-10'
							/>
						)}
					</AnimatePresence>
				</nav>
			</div>

			{/* MOBILE NAV WRAPPER */}
			<div className='flex md:hidden relative flex-col w-max min-w-[75%] sm:min-w-[50%]'>
				{/* Left Incurve */}
				<div className='absolute top-0 -left-5 w-5 h-5 overflow-visible -scale-x-100 pointer-events-none'>
					<svg
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full text-foreground overflow-visible'
					>
						<path
							d='M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z'
							fill='currentColor'
						/>
						<path
							d='M 20 0 C 8.954 0 0 8.954 0 20'
							className='stroke-border'
							strokeWidth='0'
							fill='none'
						/>
					</svg>
				</div>
				{/* Right Incurve */}
				<div className='absolute top-0 -right-5 w-5 h-5 overflow-visible pointer-events-none'>
					<svg
						viewBox='0 0 20 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className='w-full h-full text-foreground overflow-visible'
					>
						<path
							d='M 0 0 L 20 0 C 8.954 0 0 8.954 0 20 Z'
							fill='currentColor'
						/>
						<path
							d='M 20 0 C 8.954 0 0 8.954 0 20'
							className='stroke-border'
							strokeWidth='0'
							fill='none'
						/>
					</svg>
				</div>

				<motion.nav
					initial={false}
					animate={{ height: isOpen ? "auto" : "3.25rem" }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className='relative w-full bg-foreground rounded-b-2xl pointer-events-auto overflow-hidden flex flex-col shadow-sm'
				>
					{/* Top Bar */}
					<div className='relative flex items-center justify-between w-full h-13 p-2'>
						{/* Left */}
						<div className='flex items-center gap-3 text-background'>
							<div className='w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0'>
								<Image
									src='/icon.png'
									alt='Nicholas Benson Portfolio'
									width={32}
									height={32}
									className='w-full h-full object-cover'
									priority
								/>
							</div>
							<Link
								href={getHref("/")}
								className='font-bold text-lg hover:text-accent transition-colors'
							>
								Nicholas
							</Link>
						</div>
						{/* Right Toggles */}
						<div className='flex items-center gap-2'>
							<motion.button
								whileTap={{ scale: 0.8, rotate: 180 }}
								onClick={toggleTheme}
								className='p-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer'
								aria-label='Toggle theme'
							>
								{renderThemeIcon()}
							</motion.button>
							<motion.button
								whileTap={{ scale: 0.8 }}
								className='p-2 text-muted-foreground hover:text-accent cursor-pointer'
								onClick={() => setIsOpen(!isOpen)}
								aria-label='Toggle menu'
							>
								<AnimatePresence mode='wait'>
									{isOpen ? (
										<motion.div
											key='close'
											initial={{ rotate: -90, opacity: 0 }}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: 90, opacity: 0 }}
											transition={{ duration: 0.15 }}
										>
											<LuX className='w-5 h-5' />
										</motion.div>
									) : (
										<motion.div
											key='menu'
											initial={{ rotate: 90, opacity: 0 }}
											animate={{ rotate: 0, opacity: 1 }}
											exit={{ rotate: -90, opacity: 0 }}
											transition={{ duration: 0.15 }}
										>
											<LuMenu className='w-5 h-5' />
										</motion.div>
									)}
								</AnimatePresence>
							</motion.button>
						</div>
					</div>

					{/* Mobile Drawer */}
					<div className='flex flex-col px-6 pt-3 pb-6 gap-6 w-full'>
						<div className='flex flex-col gap-5'>
							{links.map((link) => (
								<Link
									key={link.label}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className='text-xl font-semibold text-muted-foreground hover:text-accent transition-colors'
								>
									{link.label}
								</Link>
							))}
						</div>

						{/* Mode selector commented out on mobile as requested */}
						{/* 
						<div className='grid grid-cols-2 gap-2 bg-background/10 p-1 rounded-md'>
							{modeOptions
								.filter((option) => option.key !== mode)
								.map((option) => (
									<Link
										key={option.key}
										href={option.key === "design" ? "/design" : "/"}
										onClick={() => setIsOpen(false)}
										className='text-center py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-accent'
									>
										{option.shortLabel}
									</Link>
								))}
						</div>
						*/}

						<Link
							href={getHref("/") + "#contact"}
							onClick={() => setIsOpen(false)}
							className={cn(
								buttonVariants({ variant: "secondary" }),
								"w-full rounded-md font-semibold bg-background text-foreground",
							)}
						>
							Contact
						</Link>
					</div>

					{/* Integrated Mobile Bottom Loading Line */}
					<AnimatePresence>
						{isNavigating && (
							<motion.div
								initial={{ scaleX: 0 }}
								animate={{ scaleX: [0, 0.6, 0.95] }}
								exit={{ scaleX: 1, opacity: 0 }}
								transition={{ duration: 0.7, ease: "easeInOut" }}
								className='absolute bottom-0 left-0 right-0 h-[2.5px] bg-accent origin-left pointer-events-none z-10'
							/>
						)}
					</AnimatePresence>
				</motion.nav>
			</div>
		</div>
	);
}
