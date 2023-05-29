import React, { useEffect, useState } from "react";
import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui";
import { Routes, Route,  } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import { setToasts } from "./app/slices/MeetingSlice";
import MyMeetings from "./pages/MyMeetings";


function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(zoom=>zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };

  useEffect(()=>{
    const theme = localStorage.getItem("zoom-theme");
      if (theme) {
        setTheme(theme as EuiThemeColorMode);
      } else {
        localStorage.setItem("zoom-theme", "light");
      }
  }, []);

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
  }, [isDarkTheme]);

  const overrides ={
    colors:{
      LIGHT:{primary:"#0b5cff"},
      DARK:{primary:"#0b5cff"},
    }
  }
  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify = {overrides}>
        <Routes>
          <Route path ="/login" element={<Login />} />
          <Route path ="/create" element={<CreateMeeting/>} />
          <Route path ="/mymeetings" element={<MyMeetings/>} />
          <Route path ="/" element={<Dashboard/>} />
          <Route path ="*" element={<Dashboard/>} />
        </Routes>
        <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />
      </EuiThemeProvider>
    </EuiProvider> 
    </ThemeSelector>
  );
}

export default App;