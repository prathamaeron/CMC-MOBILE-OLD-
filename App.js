import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from "react-native-paper"

import AuthCheck from "./AuthCheck"


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f21d1d',
    accent: '#1df21d',
  },
};

export default function App() {
  return(
    <PaperProvider theme={theme}>
      <AuthCheck />
    </PaperProvider>
  )
}
