/** @format */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
	LuSend,
	LuLoaderCircle,
	LuCircleCheck,
	LuCircleX,
} from "react-icons/lu";
import { socialLinks } from "@/lib/data";

interface ContactPayload {
	name: string;
	email: string;
	subject: string;
	category: string;
	message: string;
	website?: string;
	fileData?: string | ArrayBuffer | null;
	fileName?: string;
	fileMimeType?: string;
}

export function Contact() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string>("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (status === "loading") return;

		const form = e.currentTarget;
		const attachment = (
			form.elements.namedItem("attachment") as HTMLInputElement
		).files?.[0];

		// File Size Validation (50MB limit)
		if (attachment && attachment.size > 50 * 1024 * 1024) {
			setErrorMessage("File size exceeds 10MB limit. Please upload a smaller file.");
			setStatus("error");
			return;
		}

		setStatus("loading");
		setErrorMessage("");

		const name = (form.elements.namedItem("name") as HTMLInputElement).value;
		const email = (form.elements.namedItem("email") as HTMLInputElement).value;
		const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
		const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
		const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
		const website = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

		const payload: ContactPayload = { name, email, subject, category, message, website };

		try {
			if (attachment) {
				// Convert file to base64
				const reader = new FileReader();
				reader.onload = async () => {
					payload.fileData = reader.result;
					payload.fileName = attachment.name;
					payload.fileMimeType = attachment.type;
					await sendData(payload, form);
				};
				reader.onerror = () => {
					console.error("FileReader error:", reader.error);
					setErrorMessage("Failed to read the attachment file. Please try again.");
					setStatus("error");
				};
				reader.readAsDataURL(attachment);
			} else {
				await sendData(payload, form);
			}
		} catch (error: unknown) {
			console.error("Submission failed:", error);
			const msg =
				error instanceof Error
					? error.message
					: "Failed to send message. Please try again or use direct email.";
			setErrorMessage(msg);
			setStatus("error");
		}
	};

	const sendData = async (payload: ContactPayload, form: HTMLFormElement) => {
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json().catch(() => ({}));

			if (!res.ok || !data.success) {
				throw new Error(data.error || "Failed to send message. Please try again.");
			}

			setStatus("success");
			form.reset();

			setTimeout(() => {
				setStatus((prev) => (prev === "success" ? "idle" : prev));
			}, 10000);
		} catch (err: unknown) {
			console.error("Submission error:", err);
			const msg =
				err instanceof Error
					? err.message
					: "Failed to send message. Please try again or use direct email.";
			setErrorMessage(msg);
			setStatus("error");
		}
	};

	return (
		<section id='contact' className='w-full py-20 bg-background overflow-hidden'>
			<div className='container px-4 md:px-6 w-full max-w-6xl mx-auto'>
				<motion.div 
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{ duration: 0.5 }}
					className='text-center space-y-2 mb-12'
				>
					<h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
						Get In <span className='text-accent'>Touch</span>
					</h2>
					<p className='text-muted-foreground font-medium max-w-2xl mx-auto'>
						Have a project in mind? Let&apos;s build something great together.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8'>
					{/* Form Card (70%) */}
					<motion.div 
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className='bg-card border border-border rounded-3xl p-4 md:p-8'
					>
						<form
							name='contact_form'
							aria-label='Contact Nicholas Benson'
							data-webmcp-tool='submit_contact_form'
							data-webmcp-description='Submit a message, inquiry, or project proposal to Nicholas Benson.'
							className='space-y-3'
							onSubmit={handleSubmit}
						>
							{/* Honeypot field for bot spam prevention */}
							<div className='hidden' aria-hidden='true'>
								<label htmlFor='website'>Leave this field blank</label>
								<input
									id='website'
									name='website'
									type='text'
									tabIndex={-1}
									autoComplete='off'
								/>
							</div>
							{/* Row 1: Name & Email */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										htmlFor='name'
										className='text-sm font-medium text-foreground'
									>
										Name
									</label>
									<input
										id='name'
										name='name'
										type='text'
										autoComplete='name'
										placeholder='Jane Doe'
										className='form-input'
										required
										disabled={status === "loading"}
									/>
								</div>
								<div>
									<label
										htmlFor='email'
										className='text-sm font-medium text-foreground'
									>
										Email
									</label>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										placeholder='john@example.com'
										className='form-input'
										required
										disabled={status === "loading"}
									/>
								</div>
							</div>

							{/* Row 2: Subject */}
							<div>
								<label
									htmlFor='subject'
									className='text-sm font-medium text-foreground'
								>
									Subject
								</label>
								<input
									id='subject'
									name='subject'
									type='text'
									autoComplete='off'
									placeholder='What is this regarding?'
									className='form-input'
									required
									disabled={status === "loading"}
								/>
							</div>

							{/* Row 3: Category & File */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div>
									<label
										htmlFor='category'
										className='text-sm font-medium text-foreground'
									>
										Category
									</label>
									<select
										id='category'
										name='category'
										className='form-input cursor-pointer'
										required
										defaultValue=''
										disabled={status === "loading"}
									>
										<option value=''>Select a category</option>
										<option value='freelance'>
											Freelance Project
										</option>
										<option value='fulltime'>Full-time Role</option>
										<option value='mentorship'>Mentorship</option>
										<option value='other'>Other</option>
									</select>
								</div>
								<div>
									<label
										htmlFor='attachment'
										className='text-sm font-medium text-foreground'
									>
										Attachment (Optional, Max 50MB)
									</label>
									<input
										id='attachment'
										name='attachment'
										type='file'
										accept='.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp'
										className='form-input file:border-0 file:bg-transparent file:text-sm file:font-medium text-muted-foreground cursor-pointer'
										disabled={status === "loading"}
									/>
								</div>
							</div>

							{/* Row 4: Message */}
							<div>
								<label
									htmlFor='message'
									className='text-sm font-medium text-foreground'
								>
									Message (Max 2000 characters)
								</label>
								<textarea
									id='message'
									name='message'
									rows={5}
									placeholder='Tell me more about your project...'
									className='form-input resize-none'
									required
									maxLength={2000}
									disabled={status === "loading"}
								/>
							</div>

							{status === "error" && (
								<div className='flex items-center gap-2 text-red-500 text-sm mt-2 font-medium'>
									<LuCircleX className='w-4 h-4 shrink-0' />
									<span>
										{errorMessage ||
											"Failed to send message. Please try again or reach out directly via email."}
									</span>
								</div>
							)}

							{status === "success" && (
								<div className='flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl mb-4'>
									<LuCircleCheck className='w-5 h-5 shrink-0' />
									<p className='text-sm font-medium'>
										Message sent successfully! I will reply to you in
										a jiffy.
									</p>
								</div>
							)}

							{/* Submit */}
							<div className='pt-2'>
								<Button
									type='submit'
									className='w-full cursor-pointer h-12 text-base'
									disabled={status === "loading"}
								>
									{status === "loading" ? (
										<>
											<LuLoaderCircle className='w-4 h-4 animate-spin mr-2' />{" "}
											Sending...
										</>
									) : (
										<>
											Send Message <LuSend className='w-4 h-4 ml-2' />
										</>
									)}
								</Button>
							</div>
						</form>
					</motion.div>

					{/* Socials Card (30%) */}
					<div className='flex flex-col gap-8 h-full'>
						<motion.div 
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className='bg-card border border-border rounded-3xl p-6 flex-1 text-sm'
						>
							<h3 className='text-lg font-bold text-foreground mb-4'>
								Connect
							</h3>
							<div className='flex flex-col gap-4'>
								{socialLinks
									.filter((social) => Boolean(social.url?.trim()))
									.map((social) => {
										const Icon = social.icon;
										return (
											<a
												key={social.name}
                                    href={social.url}
                                    title={social.url}
												target='_blank'
												rel='noreferrer'
												className='group flex items-center gap-2'
											>
												<Icon className='w-5 h-5 group-hover:text-accent transition-colors' />
												<span className='font-medium text-base text-foreground group-hover:text-accent transition-colors'>
													{social.name}
												</span>
											</a>
										);
									})}
							</div>
						</motion.div>
						<motion.div 
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className='bg-card border border-border rounded-3xl p-6 space-y-4'
						>
							<div>
								<p className='text-sm text-muted-foreground leading-relaxed mb-2'>
									Prefer direct emails? Feel free to reach out anytime. I
									usually respond within 24 hours.
								</p>
								<a
									href='mailto:nb.nicholasbenson@gmail.com'
									className='font-medium text-sm text-foreground hover:text-accent transition-colors font-mono underline underline-offset-2 break-all'
								>
									nb.nicholasbenson@gmail.com
								</a>
							</div>
							<span className='block py-0.5 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/50 text-center w-full'>
								Status - Available
							</span>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
