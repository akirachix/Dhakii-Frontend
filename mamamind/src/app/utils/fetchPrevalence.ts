
const motherUrl = '/api/mothers';
const screeningUrl = '/api/screeningTest';
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

    const combinedData = screeningData.map((screening) => {
      const mother = motherData.find((mom) => mom.id === screening.mother_id);
      return {
        ...screening,
        mother: mother || null,
      };
    });

    return combinedData;
  } catch (error) {
    console.error('Error fetching or combining PPD prevalence data with mother details:', error instanceof Error ? error.message : error);
    return []; 
  }
}



