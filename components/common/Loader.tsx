"use client";

import { useState, useEffect } from "react";

const Loader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLoading && (
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-opacity-75" />
      )}
    </div>
  );
};

export default Loader;