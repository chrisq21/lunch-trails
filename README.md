## Overview
Welcome! Below is some general information about the repo and a guide for building the project locally. If you have any questions feel free to email me at chrisqueen10@gmail.com.
* A live version of the site is currently being hosted by Netlify at the following url:
    * https://main--benevolent-pika-05fce4.netlify.app/
* This project uses the [Gatsby](https://www.gatsbyjs.com/) framework and started out using the  [gatsby-starter-default](https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-default) boilerplate.
* The homepage is setup in the `src/pages/index.tsx` file.
* State management:
    * The homepage contains the majority of the application state, which is then passed to child components as props. I initially didn't think there would be a lot of state to manage, but in hindsight I would have integrated a state management library like redux if I were to build this again.

## Build Guide

1.  **Install node modules**

    This repo contains a `yarn.lock` file, so using `yarn` is recommended.

    ```shell
    yarn install
    ```

1.  **Add environment variables**

    The Places API key is accessed via environment variables stored in `.env.development` and `.env.production` files. You'll need to create these files in the root directory. The contents of both files should consist of the following:
    
    ```shell
    PLACES_API_KEY=add-key-value-here
    ```
    Replace `add-key-value-here` with the api key without quotation marks.
    More info on Gatsby's env variable setup can be found here: https://www.gatsbyjs.com/docs/how-to/local-development/environment-variables/

1.  **Start a build**

    To start a development build, run `yarn start`. The site will start running at `http://localhost:8000`.
    
    ```shell
    yarn start
    ```
    
    To start a production build, run `yarn build`. This will generate bundle files via webpack which will be added to a folder named `public` in the root directory. 
    Then run `yarn serve` to serve the `public` folder at `http://localhost:9000`.
       ```shell
    yarn build
    yarn serve
    ```