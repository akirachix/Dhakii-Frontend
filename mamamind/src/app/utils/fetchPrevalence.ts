
const motherUrl = 'https://mamamind-db02af72f48f.herokuapp.com/api/mothers/';
const screeningUrl = 'https://mamamind-db02af72f48f.herokuapp.com/api/screeningtestscore/';

export async function fetchPrevalenceData() {
  try {
    const screeningResponse = await fetch(`${screeningUrl}`);
    if (!screeningResponse.ok) {
      throw new Error(`Failed to fetch screening test scores: ${screeningResponse.status} ${screeningResponse.statusText}`);
    }
    const screeningData = await screeningResponse.json();
    if (!Array.isArray(screeningData)) {
      throw new Error('Unexpected data format: expected an array of screening test scores');
    }

    const motherResponse = await fetch(`${motherUrl}`);
    if (!motherResponse.ok) {
      throw new Error(`Failed to fetch mother details: ${motherResponse.status} ${motherResponse.statusText}`);
    }
    const motherData = await motherResponse.json();
    if (!Array.isArray(motherData)) {
      throw new Error('Unexpected data format: expected an array of mothers');
    }

    // Ensure unique villages and count mothers per village
    const villageCounts: Record<string, number> = {};
    const ageGroupCounts: Record<string, number> = {};

    motherData.forEach((mother) => {
      const village = mother.village || 'Unknown';
      if (village in villageCounts) {
        villageCounts[village]++;
      } else {
        villageCounts[village] = 1;
      }

      // Calculate age groups based on date_of_birth
      if (mother.date_of_birth) {
        const birthYear = new Date(mother.date_of_birth).getFullYear();
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;

        // Only process ages 18 and older
        if (age >= 18 && age <= 100) {
          const ageGroup = `${Math.floor(age / 10) * 10}-${Math.floor(age / 10) * 10 + 9}`;
          ageGroupCounts[ageGroup] = (ageGroupCounts[ageGroup] || 0) + 1;
        }
      }
    });

    // Sort age groups in ascending order
    const sortedAgeGroups = Object.keys(ageGroupCounts).sort((a, b) => {
      const ageA = parseInt(a.split('-')[0]);
      const ageB = parseInt(b.split('-')[0]);
      return ageA - ageB;
    });

    // Create a new object for sorted age groups
    const sortedAgeGroupCounts: Record<string, number> = {};
    sortedAgeGroups.forEach(group => {
      sortedAgeGroupCounts[group] = ageGroupCounts[group];
    });

    // Return the data combined with mother details, village count, and age group count
    const combinedData = screeningData.map((screening) => {
      const mother = motherData.find((mom) => mom.id === screening.mother_id);
      return {
        ...screening,
        mother: mother || null,
      };
    });

    return { combinedData, villageCounts, ageGroupCounts: sortedAgeGroupCounts }; // Return combined data, village counts, and sorted age groups
  } catch (error) {
    console.error('Error fetching or combining PPD prevalence data with mother details:', error instanceof Error ? error.message : error);
    return { combinedData: [], villageCounts: {}, ageGroupCounts: {} }; // Return empty data in case of error
  }
}
