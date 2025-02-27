import { useState, useEffect } from 'react';

const useUnsavedChanges = (initialState: boolean = false) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(initialState);

  useEffect(() => {
    setHasUnsavedChanges(initialState);
  }, [initialState]);

  return { hasUnsavedChanges, setHasUnsavedChanges };
};

export default useUnsavedChanges;