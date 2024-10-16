
import { useState } from 'react';
import { Mother as MotherType, NextOfKin } from '../utils/types'; 

const useSelectedMother = () => {
  const [selectedMother, setSelectedMother] = useState<MotherType | null>(null);
  const [selectedKin, setSelectedKin] = useState<NextOfKin | null>(null); 

  return { selectedMother, setSelectedMother, selectedKin, setSelectedKin };
};

export default useSelectedMother;
