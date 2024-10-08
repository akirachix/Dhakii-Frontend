import { Mother } from "../types/mothers";

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getAgeGroup = (age: number): string => {
  if (age >= 18 && age <= 25) return '18-25';
  if (age >= 26 && age <= 30) return '26-30';
  if (age >= 31 && age <= 35) return '31-35';
  if (age >= 36 && age <= 40) return '36-40';
  return '40+';
};

export const getMothersStatistics = (mothers: Mother[]) => {
  // Filter out undefined or null villages
  const villages = Array.from(new Set(mothers.map((mother) => mother.village).filter(Boolean)));
  console.log("Villages:", villages);

  const ageGroups: Record<string, number> = {
    '18-25': 0,
    '26-30': 0,
    '31-35': 0,
    '36-40': 0,
    '40+': 0,
  };

  const villageCounts: Record<string, number> = {};

  mothers.forEach((mother) => {
    const age = calculateAge(mother.date_of_birth);
    const ageGroup = getAgeGroup(age);
    ageGroups[ageGroup]++;

    if (mother.village) { // Ensure village is defined
      villageCounts[mother.village] = (villageCounts[mother.village] || 0) + 1;
    }
  });

  return { villages, ageGroups, villageCounts };
};
