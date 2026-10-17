/** @format */

import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    object-src 'none';
    base-uri 'self';
    form-action 'self' https://forms.gle https://docs.google.com;
    frame-ancestors 'none';
    connect-src 'self' https:;
`
	.replace(/\s{2,}/g, " ")
	.trim();

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: cspHeader,
	},
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
	{
		key: "X-Frame-Options",
		value: "DENY",
	},
	{
		key: "X-Content-Type-Options",
		value: "nosniff",
	},
	{
		key: "Referrer-Policy",
		value: "strict-origin-when-cross-origin",
	},
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
];

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "enque.live",
			},
			{
				protocol: "https",
				hostname: "esvigy.vercel.app",
			},
			{
				protocol: "https",
				hostname: "uniscore.vercel.app",
			},
			{
				protocol: "https",
				hostname: "ttenda.vercel.app",
			},
			{
				protocol: "https",
				hostname: "nickspay.com.ng",
			},
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "yoruba-lexicon.vercel.app",
			},
			{
				protocol: "https",
				hostname: "dummyimage.com",
			},
		],
	},
};

export default nextConfig;
