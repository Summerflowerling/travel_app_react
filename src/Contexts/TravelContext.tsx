import React, { useState, createContext } from 'react';

type TravelInfoContextProviderProps = {
  children: React.ReactNode;
};

export type TravelInfo = {
  destination: string;
  tripStart: string;
  tripEnd: string;
  travelDuration: number;
};

type Values = {
  values: TravelInfo;
  setValues: React.Dispatch<React.SetStateAction<TravelInfo>>;
};

export const TravelInfoContext = createContext<Values | null>(null);

export const TravelInfoContextProvider = ({ children }: TravelInfoContextProviderProps): React.ReactElement => {
  const [values, setValues] = useState<TravelInfo>({
    destination: '',
    tripStart: '',
    tripEnd: '',
    travelDuration: 0,
  });
  return <TravelInfoContext.Provider value={{ values, setValues }}>{children}</TravelInfoContext.Provider>;
};
