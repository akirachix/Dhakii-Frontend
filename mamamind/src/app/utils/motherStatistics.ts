

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
  if (age >= 26 && age <= 35) return '26-35';
  if (age >= 36 && age <= 45) return '36-45';
  return '46+'; // For ages 46 and above
};

export const getMothersStatistics = (mothers: Mother[]) => {
  const villages: Set<string> = new Set();
  const ageGroups: { [key: string]: number } = {};

  mothers.forEach((mother) => {
    if (mother.mother) {
      villages.add(mother.mother.village);
      const age = calculateAge(mother.mother.date_of_birth);
      const ageGroup = getAgeGroup(age);
      ageGroups[ageGroup] = (ageGroups[ageGroup] || 0) + 1; 
    }
  });

  return {
    villages: Array.from(villages), 
    ageGroups, 
  };
};
