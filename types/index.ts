import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";
import type { IconType } from "react-icons";

export type Mode = "dev" | "design";
export type ModeType = "dev" | "design" | "general";

type ContentType = "text" | "image" | "video";

export interface Testimonial {
	id: number;
	name: string;
	role: string;
	avatar: string;
	rating: number;
	type: ContentType;
	content: string;
	mode: ModeType;
}

export interface Experience {
	id: number;
	role: string;
	company: string;
	date: string;
	dateVal: number;
	description: string;
	mode: ModeType;
	logo?: string;
}

export interface Project {
	id: number;
	title: string;
	description: string;
	image: string | StaticImageData;
	link?: string;
	status: string;
	mode: ModeType;
	tech: string[];
	dateVal: number; // YYYYMM, used for date sorting (matches Experience.dateVal)
	field?: string; // Design category (e.g. "Logo Design"); used in design mode only
   featured?: boolean; // Pins a project into the home-page "Featured" section
   source?: string;
}

export interface Work {
	id: number;
	title: string;
	image: string | StaticImageData;
	field: string;
	tech: string[];
	dateVal: number;
}

export interface SocialLink {
	name: string;
	url: string;
	icon: IconType | ComponentType<{ className?: string }>;
}

export interface Certificate {
	id: number;
	type: string;
	issuer: string;
	title: string;
	desc: string;
	progress: string;
	mode: ModeType;
	image?: string;
}

export interface Award {
	id: number;
	title: string;
	issuer: string;
	date: string;
	description: string;
	link?: string;
	mode: ModeType;
	image?: string;
}

export interface Education {
	id: number;
	title: string;
	subtitle: string;
	date: string;
	description: string;
	mode: ModeType;
}

interface SkillItem {
	name: string;
	icon: IconType | ComponentType<{ className?: string }>;
}

export interface SkillGroup {
	category: string;
	type: "hard" | "soft";
	mode: ModeType;
	skills: SkillItem[];
}

export interface TechCategory {
	category: string;
	items: string;
}

export interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	image: string;
	link: string;
	date: string;
	mode: ModeType;
	category: string[];
	platform: string;
}

export interface Language {
	name: string;
	proficiency: string;
}

