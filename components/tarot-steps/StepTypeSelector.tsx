"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import AdSenseHeaderBanner from "@/components/adsense/AdSenseHeaderBanner";

const READING_TYPES = [
	{
		value: "three_card",
		label: "Tirada de 3 cartas",
		description: "Pasado, presente y futuro. Ideal para respuestas rápidas o situaciones simples.",
		premium: false,
	},
	{
		value: "celtic_cross",
		label: "Cruz Celta",
		description: "Análisis profundo de una situación compleja. 10 cartas.",
		premium: true,
	},
	{
		value: "yes_no",
		label: "Lectura del sí o no",
		description: "Responde a preguntas cerradas. 1 carta.",
		premium: false,
	},
	{
		value: "love_relationship",
		label: "Relación de pareja",
		description: "Sentimientos, intenciones, obstáculos, potencial. 4 cartas.",
		premium: false,
	},
	{
		value: "soulmate",
		label: "Alma gemela",
		description: "Conexión espiritual, bloqueos, caminos para sanar. 3 cartas.",
		premium: false,
	},
	{
		value: "life_purpose",
		label: "Propósito de vida",
		description: "Dones, misión, bloqueos, próximos pasos. 4 cartas.",
		premium: false,
	},
	{
		value: "shadow_work",
		label: "Sombras",
		description: "Inconsciente, miedo, sanación. 3 cartas.",
		premium: false,
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
					>					{READING_TYPES.map((type, idx) => {
						const isPremiumReading = type.premium;
						const isLocked = isPremiumReading && !isPremiumUser;
						
						return (
							<SwiperSlide key={type.value}>
								<div className={`transition-all duration-500 ${idx === carouselIndex ? "scale-100" : "scale-95 opacity-70"}`}
									style={{ width: 240, margin: '0 auto', position: 'relative' }}>
									<div className="bg-black/70 rounded-2xl border border-amber-400/30 shadow-xl p-4 flex flex-col items-center">
										<div className="flex items-center gap-2 mb-2">
											<h3 className="font-cinzel text-xl text-amber-300 text-center">{type.label}</h3>
											{isPremiumReading && (
												<span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs px-2 py-1 rounded-full font-bold">
													✨ PREMIUM
												</span>
											)}
										</div>
										<p className="font-cormorant text-base text-slate-200/90 text-center mb-4">{type.description}</p>
										{isLocked ? (
											<>
												<Button
													className="mt-2 bg-gray-500/60 text-white cursor-not-allowed opacity-60"
													disabled
												>
													Requiere Premium
												</Button>
												<div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-2xl z-10 p-4">
													<span className="text-amber-300 font-bold mb-2">{type.label}</span>
													<span className="text-xs text-slate-200 mb-3 text-center">Disponible solo para usuarios Premium</span>
													<Button 
														size="sm"
														className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
														asChild
													>
														<a href="#premium">✨ Upgrade a Premium</a>
													</Button>
												</div>
											</>
										) : (
											<Button
												className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-all font-cinzel"
												onClick={() => onSelectType(type.value)}
											>
												Elegir este tipo
											</Button>
										)}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
					</Swiper>
				</div>
				{/* Desktop: Card centrado */}
				<div className="mx-12 w-full hidden md:block">
					{(() => {
						const currentType = READING_TYPES[carouselIndex];
						const isPremiumReading = currentType.premium;
						const isLocked = isPremiumReading && !isPremiumUser;
						
						return (
							<div className="bg-black/70 rounded-2xl border border-amber-400/30 shadow-xl p-8 flex flex-col items-center transition-all duration-500 relative">
								<div className="flex items-center gap-3 mb-3">
									<h3 className="font-cinzel text-2xl text-amber-300 text-center">{currentType.label}</h3>
									{isPremiumReading && (
										<span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm px-3 py-1 rounded-full font-bold">
											✨ PREMIUM
										</span>
									)}
								</div>
								<p className="font-cormorant text-lg text-slate-200/90 text-center mb-6">{currentType.description}</p>
								{isLocked ? (
									<>
										<Button
											className="mt-2 bg-gray-500/60 text-white cursor-not-allowed opacity-60"
											size="lg"
											disabled
										>
											Requiere Premium
										</Button>
										<div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-2xl z-10 p-8">
											<span className="text-amber-300 font-bold text-xl mb-3">{currentType.label}</span>
											<span className="text-sm text-slate-200 mb-4 text-center">Disponible solo para usuarios Premium</span>
											<Button 
												className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
												asChild
											>
												<a href="#premium">✨ Upgrade a Premium</a>
											</Button>
										</div>
									</>
								) : (
									<Button
										className="mt-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-lg transition-all font-cinzel"
										size="lg"
										onClick={() => onSelectType(currentType.value)}
									>
										Elegir este tipo
									</Button>
								)}
							</div>
						);
					})()}
				</div>
				<button
					className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 p-2 text-amber-200/70 hover:text-amber-400 text-3xl"
					onClick={() => setCarouselIndex((i) => (i === READING_TYPES.length - 1 ? 0 : i + 1))}
					aria-label="Siguiente"
				>
					&#8594;
				</button>
			</div>
			
			{/* AdSense Header Banner - Movido abajo para no interferir en móviles */}
			{!isPremiumUser && <AdSenseHeaderBanner className="mt-8" />}
		</div>
	);
}