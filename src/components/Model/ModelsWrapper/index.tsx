import React from "react";

import ModelsContext, { CarModel } from "../ModelsContext";

import { Container } from "./styles";

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = React.useState<CarModel[]>(
    []
  );

  const registerModel = React.useCallback((model: CarModel) => {
    setRegisteredModels((state) => [...state, model]);
  }, []);

  const unregisterModel = React.useCallback((modelName: string) => {
    setRegisteredModels((state) =>
      state.filter((model) => model.modelName !== modelName)
    );
  }, []);

  const getModelByName = React.useCallback(
    (modelName: string) => {
      return (
        registeredModels.find((item) => item.modelName === modelName) || null
      );
    },
    [registeredModels]
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName
      }}
    >
      <Container ref={wrapperRef}>{children}</Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
