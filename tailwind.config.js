const plugin = require("tailwindcss/plugin")

module.exports = {
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    fontFamily: {
      sans: ["Inter var", "system-ui", "sans-serif"],
    },
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "group-hover"],
    display: ["responsive", "hover", "focus", "last"],
  },
  plugins: [
    plugin(function({ addComponents }) {
      const buttons = {
        ".btn": {
          padding: ".5rem 1rem",
          borderRadius: ".25rem",
          fontWeight: "600",
        },
        ".btn-blue": {
          backgroundColor: "#3490dc",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#2779bd",
          },
        },
        ".btn-red": {
          backgroundColor: "#e3342f",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#cc1f1a",
          },
        },

        ".link-1": {
          position: "relative",
          textDecoration: "none",
          display: "inline-block",
          color: "black",
          padding: "0 1px",
          transition: "color ease 0.3s",
          "&::after": {
            content: "''",
            position: "absolute",
            zIndex: "-1",
            width: "100%",
            height: "20%",
            left: "0",
            bottom: "20%",
            backgroundColor: "#a3f7bf",
            transition: "all ease 0.1s",
          },
          "&:hover": { color: "black", "&::after": { height: "60%" } },
        },
      }

      addComponents(buttons)
    }),
  ],
}
