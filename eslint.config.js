import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["dist/**/*.js"],
    },
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "module",
            ecmaVersion: "latest",
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        rules: {
            "indent": ["error", 4],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
        },
    },
];
