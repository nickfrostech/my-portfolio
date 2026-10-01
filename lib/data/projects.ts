/** @format */

import { Project } from "@/types";

// --- PROJECTS DATA (DEVELOPER VIEW) ---
// Ordered newest-first by dateVal (YYYYMM). `id` is unique and used only as a React key.
// Status values: "Ongoing" | "Completed" | "Archived".
export const projects: Project[] = [
	{
		id: 1,
		title: "Enque",
		description:
			"A full-stack queue management platform for medical and service organizations. Supports digital queue creation, registration, and real-time queue tracking, with offline-first functionality, notifications, and reusable organization-based workflows.",
		image: "https://enque.live/og.png",
		link: "https://enque.live",
		status: "Ongoing",
		mode: "dev",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "PWA"],
		dateVal: 202608,
		featured: true,
	},
	{
		id: 2,
		title: "NicksPay",
		description:
			"A secure and seamless payment gateway and financial technology platform.",
		image: "https://nickspay.com.ng/og.png",
		link: "https://nickspay.com.ng",
		status: "Ongoing",
		mode: "dev",
		tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
		dateVal: 202608,
		featured: true,
	},
	{
		id: 3,
		title: "Signature Verification",
		description:
			"This repository contains tools for building and evaluating a signature verification pipeline. It includes preprocessing utilities for cleaning handwritten signature scans, dataset auditing helpers, and a FastAPI-ready application scaffold.",
		image: "https://dummyimage.com/1600x900/000000/fff.png&text=Signature-verification",
		link: "https://github.com/nickfrostech/signature-verification",
		status: "Completed",
		mode: "dev",
		tech: ["Python", "ML", "FastAPI", "JavaScript"],
		dateVal: 202606,
		source: "https://github.com/nickfrostech/signature-verification",
	},
	{
		id: 4,
		title: "Yoruba Lexicon",
		description:
			"A full-stack web application designed to help users browse Yorùbá words, view their phonetic transcriptions, definitions, and examples in both Yorùbá and English. The platform also allows authenticated users to contribute new entries, which administrators can review, approve, or manage.",
		image: "/projects/yoruba.png",
		link: "https://yoruba-lexicon.vercel.app",
		status: "Completed",
		mode: "dev",
		tech: ["React.js", "JavaScript", "Supabase", "Vite"],
		dateVal: 202603,
		source: "https://github.com/nickfrostech/Yoruba-Lexicon",
	},
	{
		id: 5,
		title: "Uniscore",
		description:
			"Estimate admission aggregate scores for Nigerian universities, polytechnics, and colleges of education. Calculate your chances with JAMB scores and O'Level grades.",
		image: "https://uniscore.vercel.app/og.png",
		link: "https://uniscore.vercel.app",
		status: "Ongoing",
		mode: "dev",
		tech: ["Next.js", "TypeScript", "Tailwind CSS"],
		dateVal: 202505,
		featured: true,
	},
	{
		id: 6,
		title: "Ttenda",
		description:
			"Smart attendance management system for general use. Location-based attendance tracking, geofencing verification, real-time session management, and Excel reporting.",
		image: "https://ttenda.vercel.app/og_image.png",
		link: "https://ttenda.vercel.app",
		status: "Ongoing",
		mode: "dev",
		tech: ["React", "Node.js", "Tailwind"],
		dateVal: 202502,
	},
	{
		id: 8,
		title: "Dictionary",
		description:
			"A lightweight, interactive JavaScript dictionary web app built with HTML, CSS, and vanilla JS. Search for word definitions instantly with a clean, responsive interface and seamless dark mode toggle for enhanced usability. Perfect for developers, learners, and anyone building online dictionary tools.",
		image: "https://dummyimage.com/1600x900/000000/fff.png&text=Dictionary",
		link: "https://nickfrostech.github.io/Dictionary/",
		status: "Completed",
		mode: "dev",
		tech: ["JavaScript", "CSS"],
		dateVal: 202404,
		source: "https://github.com/nickfrostech/Dictionary",
	},
	{
		id: 9,
		title: "JSPlayz",
		description:
			"JSPlayz is an open-source growing collection of fun, beginner-friendly JavaScript projects and micro-tutorials built to sharpen beginners skills, one playful line at a time.",
		image: "https://dummyimage.com/1600x900/000000/fff.png&text=JSPlayz",
		link: "https://nickfrostech.github.io/JSPlayz/",
		status: "Completed",
		mode: "dev",
		tech: ["JavaScript"],
		dateVal: 202403,
		source: "https://github.com/nickfrostech/JSPlayz",
	},
];

// ---- UPCOMING PROJECTS ---
export const upcomingProjects = [
	{
		id: 1,
		title: "Rotnem",
		description:
			"A tree and graph connections where every body is a mentor and a mentee.",
	},
	{
		id: 2,
		title: "Bookish",
		description: "A free pdf library for reading",
	},
	{
		id: 3,
		title: "Memy",
		description: "A JavaScript library of reusable illustration components",
	},
];
