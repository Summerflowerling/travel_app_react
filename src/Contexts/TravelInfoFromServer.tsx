import React, { useState, createContext } from 'react';

type TravelInfoFromServerContextProviderProps = {
  children: React.ReactNode;
};

export type TravelInfoFromServer = {
  data: Record<string, unknown>[];
  city_name: string;
  timezone: string;
};

type ValuesFromServer = {
  valuesFromServer: TravelInfoFromServer;
  setValuesFromServer: React.Dispatch<React.SetStateAction<TravelInfoFromServer>>;
};

export const TravelInfoFromServerContext = createContext<ValuesFromServer | null>(null);

export const TravelInfoFromServerProvider = ({
  children,
}: TravelInfoFromServerContextProviderProps): React.ReactElement => {
  const [valuesFromServer, setValuesFromServer] = useState<TravelInfoFromServer>({
    data: [],
    city_name: 'No data yet',
    timezone: 'no data yet',
  });
  return (
    <TravelInfoFromServerContext.Provider value={{ valuesFromServer, setValuesFromServer }}>
      {children}
    </TravelInfoFromServerContext.Provider>
  );
};
