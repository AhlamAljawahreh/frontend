//initial state
const initialState = {
    services: [],
  };
  
  //reducer function
  const servicesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case "SET_SERVICES":
        return { services: payload };
  
      case "ADD_SERVICE":
        return { services: [...state.services, payload] };
      case "UPDATE_SERVICE":
        return {
            services: state.services.map((element) => {
            if (payload.id === element.id) {
              return payload;
            } else {
              return element;
            }
          }),
        };
      case "DELETE_SERVICE":
        return {
            services: state.services.filter((element) => {
            return element.id !== payload;
          }),
        };
      default:
        return state;
  
    }
  };
  export default servicesReducer; 
  //actions
  export const setServices = (services) => {
    return { type: "SET_SERVICES", payload: services };
  };
  
  export const addServices = (newServices) => {
    return { type: "ADD_SERVICE", payload: newServices };
  };
  
  export const updateServices = (updatedServices) => {
    return { type: "UPDATE_SERVICE", payload: updatedServices };
  };
  
  export const deleteService = (id) => {
    return { type: "DELETE_SERVICE", payload: id };
  }