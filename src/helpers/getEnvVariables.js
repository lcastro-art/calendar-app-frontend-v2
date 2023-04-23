export const getEnvVariables = () => {

    //import.meta.env;

    return {
        VITE_API_URL: import.meta.env.VIRE_API_URL,
        //...import.meta.env
    }

}