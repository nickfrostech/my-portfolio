/** @format */

import Image from "next/image";
// import { ModeLink } from "@/components/shared/ModeLink";
import { LuExternalLink as ExternalLink, LuGithub } from "react-icons/lu";
import type { Project } from "@/types";

interface ProjectCardProps {
	project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
	const hasSource = Boolean(project.source && project.source.trim() !== "");
	const hasLive = Boolean(
		project.link &&
			project.link.trim() !== "" &&
			project.link !== "#" &&
			project.link !== project.source,
	);

	return (
		<article className='group flex flex-col bg-card border border-border dark:border-border/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-accent hover:shadow-lg p-3 relative h-full'>
			{/* <ModeLink href={project.link} className='absolute inset-0 z-10'>
				<span className='sr-only'>View {project.title} Project</span>
			</ModeLink> */}

			{/* Project Image */}
			<div className='relative w-full aspect-video bg-muted overflow-hidden rounded-xl'>
				<Image
					src={project.image}
					alt={`${project.title} — ${project.tech.slice(0, 3).join(", ")} project by Nicholas Benson`}
					fill
					className='object-cover transition-transform duration-700 group-hover:scale-105'
				/>
			</div>

			{/* Project Details */}
			<div className='flex flex-col flex-1 px-2 py-4 space-y-4'>
				<div className='space-y-2'>
					<div className='flex items-start justify-between gap-2'>
						<h3 className='text-xl font-semibold text-foreground leading-tight py-1'>
							{project.title}
						</h3>
						{project.status && (
							<span className='px-2 py-1 bg-accent/10 text-[10px] uppercase tracking-wider text-accent rounded-full border border-accent/20'>
								{project.status}
							</span>
						)}
					</div>
					<p className='text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-2'>
						{project.description}
					</p>
				</div>

				{/* Tech Stack Pills */}
				<div className='flex flex-wrap gap-2 pt-2'>
					{project.tech.map((t) => (
						<span
							key={t}
							className='px-2 py-1 bg-card text-xs rounded-md border border-border/50 font-mono text-accent'
						>
							{t}
						</span>
					))}
				</div>

				{/* Action Links: Source on left, Live Demo on right */}
				{(hasSource || hasLive) && (
					<div className='pt-2 mt-auto px-2 flex items-center justify-between gap-3'>
						<div>
							{hasSource && (
								<a
									href={project.source}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={`View source code for ${project.title}`}
									className='relative z-20 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors'
								>
									<LuGithub className='w-4 h-4' />
									<span>Source</span>
								</a>
							)}
						</div>

						<div>
							{hasLive && (
								<a
									href={project.link}
									target='_blank'
									rel='noopener noreferrer'
									aria-label={`View live demo and details for ${project.title}`}
									className='relative z-20 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-accent transition-colors'
								>
									<span>Live Demo</span>
									<ExternalLink className='w-4 h-4' />
								</a>
							)}
						</div>
					</div>
				)}
			</div>
		</article>
	);
}
