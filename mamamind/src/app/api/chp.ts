
import { NextResponse } from 'next/server';

export async function fetchCHPsAPI() {
  const chpResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/');
  const chpData = await chpResponse.json();

  const userResponse = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/users/');
  const userData = await userResponse.json();

  return { chpData, userData };
}

export async function addCHPAPI(chpData: any) {
  const response = await fetch('https://mamamind-db02af72f48f.herokuapp.com/api/chps/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chpData),
  });
  
  return response;
}



