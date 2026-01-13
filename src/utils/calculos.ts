// Calcula quantos KM o carro faz com 1 Litro (km/L)
export const calcularKmPorLitro = (litros: number, km: number): number => {
  if (litros <= 0) return 0;
  return km / litros;
};

// Calcula quantos Litros o carro gasta para fazer 100 KM (L/100km)
// Esta é a medida usada para a classificação (A, B, C...)
export const calcularLitrosPor100Km = (litros: number, km: number): number => {
  if (km <= 0) return 0;
  return (litros / km) * 100;
};

// Classifica com base na eficiência (L/100km)
export const classificarConsumo = (media: number): string => {
  // A (Excelente): Menos de 5 L/100km
  if (media < 5) return 'A';
  
  // B (Bom): Entre 5 e 8 L/100km
  if (media < 8) return 'B';
  
  // C (Regular): Entre 8 e 12 L/100km
  if (media < 12) return 'C';
  
  // D (Mau): Mais de 12 (até 16, assumindo a lógica sequencial)
  if (media < 16) return 'D';
  
  // E (Péssimo): Mais de 16 L/100km
  return 'E';
};
