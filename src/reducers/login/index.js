//initial state
const initialState = {
  token: "" || localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
  user_id: "" || localStorage.getItem("user_id"),
  role: "" || localStorage.getItem("role"),

};

//reducer function
const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_id", payload.user_id);
      localStorage.setItem("role", payload.role);
      
      return {
        token: payload.token,
        user_id: payload.user_id,
        isLoggedIn: true,
      };

    case "LOG_OUT":
      localStorage.clear();
      return {
        token: "",
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;

//actions
export const login = ({ token, user_id,role }) => {
  return { type: "LOG_IN", payload: { token, user_id,role } };
};

export const logout = () => {
  return { type: "LOG_OUT" };
};
