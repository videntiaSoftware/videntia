"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

const READING_TYPES = [
	{
		value: "three_card",
		label: "Tirada de 3 cartas",
		description: "Pasado, presente y futuro. Ideal para respuestas rápidas o situaciones simples.",
	},
	{
		value: "celtic_cross",
		label: "Cruz Celta",
		description: "Análisis profundo de una situación compleja. 10 cartas.",
	},
	{
		value: "yes_no",
		label: "Lectura del sí o no",
		description: "Responde a preguntas cerradas. 1 carta.",
	},
	{
		value: "love_relationship",
		label: "Relación de pareja",
		description: "Sentimientos, intenciones, obstáculos, potencial. 4 cartas.",
	},
	{
		value: "soulmate",
		label: "Alma gemela",
		description: "Conexión espiritual, bloqueos, caminos para sanar. 3 cartas.",
	},
	{
		value: "life_purpose",
		label: "Propósito de vida",
		description: "Dones, misión, bloqueos, próximos pasos. 4 cartas.",
	},
	{
		value: "shadow_work",
		label: "Sombras",
		description: "Inconsciente, miedo, sanación. 3 cartas.",
	},
];

interface StepTypeSelectorProps {
	onSelectType: (type: string) => void;
	isPremiumUser?: boolean;
}

export default function StepTypeSelector({ onSelectType, isPremiumUser = false }: StepTypeSelectorProps) {
	const [carouselIndex, setCarouselIndex] = useState(0);

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center animate-fade-in-up">
			<h2
				className="font-cinzel text-3xl md:text-4xl text-amber-200 mb-3 mt-8 text-center drop-shadow-2xl tracking-wide"
			>
				Elige tu tipo de lectura
			</h2>
			<p className="text-base md:text-lg text-amber-200 w-10/12 font-cormorant text-center mb-8 max-w-xl">
				Selecciona el método de tirada que mejor se adapte a tu pregunta o situación. Cada tipo de lectura te dará una perspectiva diferente.
			</p>
			{/* Desktop: Carousel clásico, Mobile: Scrollable con cards parcialmente visibles */}
			<div className="relative w-full max-w-xl flex items-center justify-center">
				{/* Flechas solo en desktop */}
				<button
					className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 p-2 text-amber-200/70 hover:text-amber-400 text-3xl"
					onClick={() => setCarouselIndex((i) => (i === 0 ? READING_TYPES.length - 1 : i - 1))}
					aria-label="Anterior"
				>
					&#8592;
				</button>
				{/* Mobile: Swiper carousel */}
				<div className="w-full md:hidden flex justify-center">
					<Swiper
						modules={[EffectCoverflow]}
						effect="coverflow"
						slidesPerView={1.25}
						centeredSlides
						spaceBetween={8}
						loop
						coverflowEffect={{ rotate: 0, stretch: 0, depth: 80, modifier: 2, slideShadows: false }}
						onSlideChange={swiper => setCarouselIndex(swiper.realIndex)}
						initialSlide={carouselIndex}
						style={{ width: '100%', maxWidth: 340, paddingBottom: 24 }}
					>
						{READING_TYPES.map((type, idx) => (
							<SwiperSlide key={type.value}>
								<div className={`transition-all duration-500 ${idx === carouselIndex ? "scale-100" : "scale-95 opacity-70"}`}
									style={{ width: 240, margin: '0 auto', position: 'relative' }}>
									<div className="bg-black/70 rounded-2xl border border-amber-400/30 shadow-xl p-4 flex flex-col items-center">
										<h3 className="font-cinzel text-xl text-amber-300 mb-2 text-center">{type.label}</h3>
										<p className="font-cormorant text-base text-slate-200/90 text-center mb-4">{type.description}</p>
										{type.value === 'celtic_cross' && !isPremiumUser ? (
											<>
												<button
													className="mt-2 px-4 py-2 rounded-lg bg-gray-500/60 text-white font-semibold shadow-lg font-cinzel text-base cursor-not-allowed opacity-60"
													disabled
												>
													Solo premium
												</button>
												<div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-2xl z-10">
													<span className="text-amber-300 font-bold mb-2">Cruz Celta</span>
													<span className="text-xs text-slate-200 mb-2">Disponible solo para usuarios premium</span>
													<button className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold">Hazte premium</button>
												</div>
											</>
										) : (
											<button
												className="mt-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-all font-cinzel text-base"
												onClick={() => onSelectType(type.value)}
											>
												Elegir este tipo
											</button>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				{/* Desktop: Card centrado */}
				<div className="mx-12 w-full hidden md:block">
					<div className="bg-black/70 rounded-2xl border border-amber-400/30 shadow-xl p-8 flex flex-col items-center transition-all duration-500">
						<h3 className="font-cinzel text-2xl text-amber-300 mb-2 text-center">{READING_TYPES[carouselIndex].label}</h3>
						<p className="font-cormorant text-lg text-slate-200/90 text-center mb-4">{READING_TYPES[carouselIndex].description}</p>
						{READING_TYPES[carouselIndex].value === 'celtic_cross' && !isPremiumUser ? (
							<>
								<button
									className="mt-2 px-6 py-2 rounded-lg bg-gray-500/60 text-white font-semibold shadow-lg font-cinzel text-lg cursor-not-allowed opacity-60"
									disabled
								>
									Solo premium
								</button>
								<div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-2xl z-10">
									<span className="text-amber-300 font-bold mb-2">Cruz Celta</span>
									<span className="text-xs text-slate-200 mb-2">Disponible solo para usuarios premium</span>
									<button className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold">Hazte premium</button>
								</div>
							</>
						) : (
							<button
								className="mt-2 px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-all font-cinzel text-lg"
								onClick={() => onSelectType(READING_TYPES[carouselIndex].value)}
							>
								Elegir este tipo
							</button>
						)}
					</div>
				</div>
				<button
					className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 p-2 text-amber-200/70 hover:text-amber-400 text-3xl"
					onClick={() => setCarouselIndex((i) => (i === READING_TYPES.length - 1 ? 0 : i + 1))}
					aria-label="Siguiente"
				>
					&#8594;
				</button>
			</div>
			<style jsx global>{`
				@keyframes fade-in-up {
					from { opacity: 0; transform: translateY(40px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-fade-in-up {
					animation: fade-in-up 0.8s cubic-bezier(.4,0,.2,1);
				}
			`}</style>
		</div>
	);
}