export async function fetchPrevalenceData() {
  try {
    // Fetch screening test scores
    const screeningResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/screeningtestscore/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!screeningResponse.ok) {
      const errorData = await screeningResponse.json(); 
      console.error('Error fetching screening test scores:', errorData);
      throw new Error(`Failed to fetch screening test scores: ${screeningResponse.status} ${screeningResponse.statusText}`);
    }

    const screeningData = await screeningResponse.json();
    console.log('Fetched screening data:', screeningData);  

    if (!Array.isArray(screeningData)) {
      throw new Error('Unexpected data format: expected an array of screening test scores');
    }

    
    const motherResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/mothers/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!motherResponse.ok) {
      const errorData = await motherResponse.json(); 
      console.error('Error fetching mother details:', errorData);
      throw new Error(`Failed to fetch mother details: ${motherResponse.status} ${motherResponse.statusText}`);
    }

    const motherData = await motherResponse.json();
    console.log('Fetched mother data:', motherData); 

    if (!Array.isArray(motherData)) {
      throw new Error('Unexpected data format: expected an array of mothers');
    }

    
    const combinedData = screeningData.map((screening) => {
      const mother = motherData.find((mom) => mom.id === screening.mother_id);

     
      if (mother) {
        console.log(`Mother ID: ${mother.id} has date_of_birth: ${mother.date_of_birth}`);
      }

      return {
        ...screening,
        mother: mother || null,  
      };
    });

    console.log('Combined data:', combinedData); 
    const ppdMothers = combinedData.filter(data => data.total_score > 10);
    console.log('Mothers with PPD (score > 10):', ppdMothers);

    return combinedData;

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching or combining PPD prevalence data with mother details:', error.message);
    } else {
      console.error('Error fetching or combining PPD prevalence data with mother details:', error);
    }
    return []; 
  }
}
