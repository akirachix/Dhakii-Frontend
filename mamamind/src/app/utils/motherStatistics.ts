
import { Mother } from "../types/mothers";

const calculateAge = (dateOfBirth: string): number => {
  const birthDate = new Date(dateOfBirth);

  // Check if the date is valid and reasonable
  if (isNaN(birthDate.getTime()) || birthDate.getFullYear() < 1900 || birthDate > new Date()) {
    console.warn(`Invalid date: ${dateOfBirth}`);
    return 0; // Skip or return 0 if date is invalid
  }

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
  if (age >= 26 && age <= 35) return '26-35';
  if (age >= 36 && age <= 45) return '36-45';
  if (age >= 46 && age <= 55) return '46-55';
  return '56+';
};

export const getMothersStatistics = (mothers: Mother[]) => {
  const villages: Set<string> = new Set();
  const ageGroups: { [key: string]: number } = {};

  mothers.forEach((mother) => {
    if (mother.mother) {
      const dateOfBirth = mother.mother.date_of_birth;
      const age = calculateAge(dateOfBirth);

      if (age > 0) {  // Only process valid ages
        const ageGroup = getAgeGroup(age);
        villages.add(mother.mother.village);
        ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1;
      }
    }
  });

  return {
    villages: Array.from(villages),
    ageGroups,
  };
};
