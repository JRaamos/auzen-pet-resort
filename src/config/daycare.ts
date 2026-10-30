export const daycareConfig = {
  dailyRate: 60,
  schedule: 'Segunda a sexta-feira, das 7h às 18h',
  opens: '07:00',
  closes: '18:00',
  plans: [
    { frequency: 1, days: 4, price: 220, description: 'Um primeiro passo para uma nova rotina.' },
    { frequency: 2, days: 8, price: 400, description: 'Mais encontros, brincadeiras e descobertas.' },
    { frequency: 3, days: 12, price: 540, description: 'Um respiro de natureza durante a semana.' },
    { frequency: 4, days: 16, price: 640, description: 'O quintal já faz parte do dia a dia.' },
    { frequency: 5, days: 20, price: 760, description: 'De segunda a sexta, uma turma para chamar de sua.' },
  ],
} as const
