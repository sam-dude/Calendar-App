import { createContext, useState } from "react";

const CalendarContext = createContext();

const authConfig = {
    clientId: "9fcf9072-2400-4380-bab3-7c2953d7605c",
    authority:
      "https://login.microsoftonline.com/e3e2f1c4-a96d-4180-98d0-4d6697f4b7b9",
    tenantId: "e3e2f1c4-a96d-4180-98d0-4d6697f4b7b9",
    redirectUri: "msal9fcf9072-2400-4380-bab3-7c2953d7605c://auth",
    scopes: ["openid", "profile", "offline_access", "Calendars.Read"],
};

const CalendarContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [events, setEvents] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
    const [token, setToken] = useState(null);
  
    const discovery = AuthSession.useAutoDiscovery(
      `https://login.microsoftonline.com/${authConfig.tenantId}/v2.0`
    );
  
    const [request, result, promptAsync] = AuthSession.useAuthRequest(
      {
        clientId: authConfig.clientId,
        redirectUri: authConfig.redirectUri,
        scopes: authConfig.scopes,
      },
      discovery
    );
  
    useEffect(() => {
      if (result && result.type === "success") {
        const { code } = result.params;
        AuthSession.exchangeCodeAsync(
          {
            clientId: authConfig.clientId,
            code,
            redirectUri: authConfig.redirectUri,
            extraParams: request.codeVerifier
              ? { code_verifier: request.codeVerifier }
              : undefined,
          },
          discovery
        )
          .then((response) => {
            setToken(response.accessToken);
            fetchEvents(response.accessToken);
          })
          .catch((error) => {
            console.error("Token exchange failed", error);
          });
      }
    }, [result]);
  
    const fetchEvents = async (accessToken) => {
      console.log("Fetching events with access token:", accessToken);
      try {
        const response = await axios.get(
          "https://graph.microsoft.com/v1.0/me/events",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const events = response.data.value;
        setEvents(events);
        markEventDates(events);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
  
    const markEventDates = (events) => {
      const dates = {};
      events.forEach((event) => {
        const date = event.start.dateTime.split("T")[0];
        if (dates[date]) {
          dates[date].dots.push({ color: "blue" });
        } else {
          dates[date] = {
            dots: [{ color: "blue" }],
            marked: true,
          };
        }
      });
      setMarkedDates(dates);
    };
  
    const signOut = () => {
      setUserInfo(null);
      setEvents([]);
      setMarkedDates({});
    };
  
    // Google Sign-In Configuration
    const configGoogleSignIn = () => {
      GoogleSignin.configure({
        webClientId: "1086673457628-qpef55k08d8b0g237i916odm5bg7e66e.apps.googleusercontent.com",
        scopes: ["https://www.googleapis.com/auth/calendar"],
        iosClientId: "1086673457628-45e341jj19p2pfe48quge3ctpvj68ka2.apps.googleusercontent.com",
      });
    };
  
    useEffect(() => {
      configGoogleSignIn();
      GoogleSignin.signInSilently()
        .then((userInfo) => {
          setUserInfo(userInfo);
          GoogleSignin.getTokens().then(({ accessToken }) => {
            console.log(accessToken);
            fetchGoogleEvents(accessToken);
          });
        })
        .catch((error) => {
          if (error.code !== statusCodes.SIGN_IN_REQUIRED) {
            console.error(error);
          }
        });
    }, []);
  
    const signInWithGoogle = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
        setUserInfo(userInfo);
        const { accessToken } = await GoogleSignin.getTokens();
        fetchGoogleEvents(accessToken);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
          console.error(error);
        }
      }
    };
  
    const fetchGoogleEvents = async (idToken) => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/calendar/v3/calendars/primary/events",
          {
            headers: { Authorization: `Bearer ${idToken}` },
          }
        );
        console.log(response.data.items[0]);
        setEvents(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
  
    const logout = () => {
      GoogleSignin.revokeAccess();
      setUserInfo(null);
    };

    const values = {
        user,
        events,
        markedDates,
        token,
        request,
        promptAsync,
        signOut,
    };
    return (
        <CalendarContext.Provider value={values}>
        {children}
        </CalendarContext.Provider>
    );
}

export { CalendarContext, CalendarContextProvider };