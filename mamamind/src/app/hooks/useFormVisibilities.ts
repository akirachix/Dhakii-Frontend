"use client";
import { useState } from 'react';

export const useNurseFormVisibility = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => setShowForm((prev) => !prev);

  return { showForm, toggleFormVisibility };
};
