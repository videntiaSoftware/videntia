import React, { useState } from 'react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from './ui/drawer';
import { ChevronDown } from 'lucide-react';

const READING_TYPES = [
	{
		group: 'Lecturas clásicas',
		options: [
			{
				value: 'three_card',
				label: 'Tirada de 3 cartas',
				description:
					'Usos: pasado / presente / futuro, situación / obstáculo / consejo. Ideal para: respuestas rápidas o situaciones simples.',
			},
			{
				value: 'celtic_cross',
				label: 'Cruz Celta',
				description:
					'Cartas: 10. Usos: análisis profundo de una situación compleja. Incluye: situación actual, desafíos, pasado, futuro, influencias externas, esperanzas, resultado.',
			},
			{
				value: 'yes_no',
				label: 'Lectura del sí o no',
				description:
					'Usos: responder a preguntas cerradas. Método: se interpreta según cartas positivas, negativas y neutras.',
			},
		],
	},
	{
		group: '💕 Lecturas sobre el amor',
		options: [
			{
				value: 'love_relationship',
				label: 'Lectura de pareja (o relación)',
				description:
					'Cartas para cada persona: sentimientos, intenciones, obstáculos, potencial. Ideal para: relaciones amorosas o vínculos importantes.',
			},
			{
				value: 'soulmate',
				label: 'Lectura del alma gemela / llama gemela',
				description: 'Explora: conexión espiritual, bloqueos, caminos para sanar.',
			},
		],
	},
	{
		group: '🌱 Lecturas de desarrollo personal',
		options: [
			{
				value: 'life_purpose',
				label: 'Lectura del propósito de vida',
				description: 'Explora: dones, misión, bloqueos, próximos pasos.',
			},
			{
				value: 'shadow_work',
				label: 'Lectura de sombras',
				description:
					'Revela: aspectos inconscientes, miedos, heridas que necesitan sanación.',
			},
		],
	},
];

const TarotReading = ({
	readingType = 'three_card',
	onChangeType,
	...props
}: {
	readingType?: string;
	onChangeType?: (type: string) => void;
}) => {
	const [selectedType, setSelectedType] = useState(readingType);
	const [open, setOpen] = useState(false);

	const handleTypeClick = (type: string) => {
		setSelectedType(type);
		onChangeType?.(type);
		setOpen(false);
	};

	// Encuentra el label del tipo seleccionado
	const selectedLabel = (() => {
		for (const group of READING_TYPES) {
			const found = group.options.find((o) => o.value === selectedType);
			if (found) return found.label;
		}
		return '';
	})();

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-purple-400/30 bg-slate-800/80 text-white font-semibold shadow-sm hover:bg-purple-800/80 transition-all min-w-[180px] max-w-xs"
				>
					<span>{selectedLabel || 'Elegir tipo de lectura'}</span>
					<ChevronDown className="w-4 h-4 text-purple-300" />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mb-2 text-center text-lg font-bold text-amber-300">
					Tipo de lectura
				</div>
				<div className="flex flex-col gap-2">
					{READING_TYPES.map((group) => (
						<div key={group.group} className="mb-2">
							<div className="text-xs text-purple-400 font-bold mb-1">
								{group.group}
							</div>
							<div className="flex flex-col gap-2">
								{group.options.map((opt) => (
									<DrawerClose asChild key={opt.value}>
										<button
											type="button"
											className={`px-4 py-2 rounded-lg border-2 text-left shadow-sm transition-all duration-200 min-w-[180px] max-w-xs
                        ${
							selectedType === opt.value
								? 'bg-amber-300/90 border-amber-400 text-purple-900 scale-105 shadow-lg'
								: 'bg-slate-800/80 border-purple-400/30 text-white hover:bg-purple-800/80 hover:border-amber-300'
						}`}
											onClick={() => handleTypeClick(opt.value)}
										>
											<div className="font-semibold text-base mb-1">
												{opt.label}
											</div>
											<div className="text-xs text-purple-200 leading-tight">
												{opt.description}
											</div>
										</button>
									</DrawerClose>
								))}
							</div>
						</div>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default TarotReading;