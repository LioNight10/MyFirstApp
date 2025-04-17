# My React Native Web App

This project is a React Native application that has been adapted to work on the web using React Native Web. It provides an interactive experience where users can make choices in various traffic situations, and their decisions affect the outcome of the story.

## Project Structure

- **assets/**: Contains images and videos used in the application for different cases.
  - `case1.png` to `case8.png`: Images for each case.
  - `case1_good.mp4` to `case8_bad.mp4`: Videos showing the outcomes of the user's choices.

- **src/**: Contains the main application code.
  - `App.js`: The main component that manages the application state and renders content based on user choices.
  - `styles.js`: Contains the styling for the components used throughout the app.

- **package.json**: Configuration file for npm, listing dependencies, scripts, and metadata for the project.

- **app.json**: Configuration settings for the React Native application, including app name and version.

- **babel.config.js**: Configures Babel for transpiling JavaScript code.

- **tsconfig.json**: Configuration file for TypeScript, specifying compiler options.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd my-react-native-web-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   For mobile:
   ```bash
   npm start
   ```
   For web:
   ```bash
   npm run web
   ```

## Deploying as a Website

To make your React Native app available as a website for free, follow these steps:

1. **Convert to React Web**: Use React Native Web to enable your components to work on the web.

2. **Set Up a Web Server**: Use services like Vercel, Netlify, or GitHub Pages for free hosting.

3. **Build the Project**: Run the build command:
   ```bash
   npm run build
   ```

4. **Deploy**: Upload the build folder to your chosen hosting service and follow their deployment instructions.

5. **Access Your Website**: Once deployed, you will receive a URL to access your app as a website.

## License

This project is licensed under the MIT License. See the LICENSE file for details.