// Central Theme Configuration for the App
export const theme = {
  // Primary Colors
  colors: {
    primary: {
      light: "blue",
      main: "blue",
      dark: "blue",
      gradient: "from-blue-600 to-purple-600",
      lightGradient: "from-blue-50 to-purple-50",
      darkGradient: "from-blue-900 to-purple-900",
    },
    secondary: {
      gradient: "from-green-400 to-blue-500",
    },
    accent: {
      success: "green",
      error: "red",
      warning: "yellow",
    },
    text: {
      primary: "gray-800",
      secondary: "gray-600",
      light: "gray-500",
    },
    border: "gray-300",
    background: "white",
  },

  typography: {
    pageTitle: "text-5xl font-bold",
    sectionTitle: "text-4xl font-bold",
    cardTitle: "text-3xl sm:text-4xl font-bold",
    heading: "text-2xl font-bold",
    subHeading: "text-lg sm:text-xl font-semibold",
    body: "text-base sm:text-lg",
    small: "text-sm",
    label: "text-base font-semibold",
  },

  spacing: {
    xs: "p-2",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
    margin: {
      sm: "m-2",
      md: "m-4",
      lg: "m-8",
      xl: "m-10",
    },
  },

  shadows: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    "3xl": "shadow-3xl",
    hover: "hover:shadow-lg",
    "hover-xl": "hover:shadow-xl",
    "hover-2xl": "hover:shadow-2xl",
  },

  borderRadius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    xl: "rounded-3xl",
    full: "rounded-full",
  },

  components: {
    navbar: {
      bg: "bg-gradient-to-r from-blue-600 to-purple-600",
      text: "text-white",
      shadow: "shadow-lg",
    },
    button: {
      primary: "btn bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none font-bold hover:shadow-lg",
      secondary: "btn btn-outline border-2",
      success: "btn bg-gradient-to-r from-green-400 to-blue-500 text-white border-none font-bold hover:shadow-lg",
      error: "btn btn-outline btn-error hover:bg-red-100",
      lg: "btn-lg",
      sm: "btn-sm",
    },
    input: {
      base: "input input-bordered rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500",
      wrapper: "form-control w-full",
      label: "label label-text font-bold text-base",
    },
    card: {
      base: "card bg-white shadow-2xl rounded-3xl",
      body: "card-body p-8",
      hover: "hover:shadow-3xl transition-shadow duration-300",
    },
    container: {
      light: "min-h-screen bg-gradient-to-br from-blue-50 to-purple-50",
      padding: "py-12 px-4",
    },
    list: {
      item: "flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:gap-8 sm:p-8 border border-gray-300 my-5 rounded-3xl bg-white hover:shadow-2xl transition-shadow duration-300",
      image: "h-28 w-28 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-blue-400 shadow-lg",
    },
  },

  transitions: {
    smooth: "transition-all duration-300",
    shadow: "transition-shadow duration-300",
    colors: "transition-colors duration-200",
  },

  breakpoints: {
    mobile: "max-w-sm",
    tablet: "max-w-2xl",
    desktop: "max-w-6xl",
  },
};

export const buildClass = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const useTheme = () => {
  return theme;
};
