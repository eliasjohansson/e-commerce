import { thunk, action } from 'easy-peasy';

const authStore = {
  isAuthenticated: false,
  isLoading: true,
  accessToken: null,
  authenticatedUser: null,
  modalOpen: false,

  setLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  setAuthStatus: action((state, payload) => {
    state.isAuthenticated = payload;
  }),
  setToken: action((state, payload) => {
    state.accessToken = payload;
  }),
  setAuthenticatedUser: action((state, payload) => {
    state.authenticatedUser = payload;
  }),
  setModalOpen: action((state, payload) => {
    state.modalOpen = payload;
  }),

  tokenAuthenticate: thunk(async (actions, payload, { getState }) => {
    const {
      setAuthenticatedUser,
      setAuthStatus,
      setLoading,
      setToken
    } = actions;

    try {
      const accesstoken = getState().accessToken;
      const res = await fetch(`${process.env.REACT_APP_API_URI}/users/me`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accesstoken}` }
      });
      const user = await res.json();

      setAuthenticatedUser(user);
      setAuthStatus(true);
      setLoading(false);
    } catch (e) {
      console.log(e);
      /*  localStorage.removeItem('access_token'); */
      setToken(null);
      setLoading(false);
    }
  }),
  logout: thunk(async (actions, payload) => {
    const { setAuthenticatedUser, setAuthStatus, setToken } = actions;

    setAuthStatus(false);
    setToken(null);
    setAuthenticatedUser(null);
    localStorage.removeItem('access_token');
  })
};

export default authStore;
