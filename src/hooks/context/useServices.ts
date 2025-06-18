import { useContext } from "react";
import { ServicesContext } from "../../contexts/ServicesContext";

export const useServicesContext = () => {
    const context = useContext(ServicesContext)
    if (!context) {
      throw new Error('useServicesContext must be used within a ServicesProvider')
    }
    return context
}