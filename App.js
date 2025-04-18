import { StatusBar } from 'expo-status-bar'; // Only used if you explicitly need the status bar
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { WebView } from 'react-native-webview';
import { YouTubePlayer } from './components/YouTubePlayer';

const YouTubePlayer = ({ videoId }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          width="100%"
          height="315"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </View>
    );
  }

  return (
    <WebView
      style={styles.webview}
      javaScriptEnabled
      domStorageEnabled
      source={{ uri: embedUrl }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 800,
    height: 315,
    alignSelf: 'center',
    marginVertical: 20,
  },
  webview: {
    width: '100%',
    height: 315,
    marginVertical: 20,
  },
});

export { YouTubePlayer };


const storyData = {
  norwegian: {
    welcome: {
      text: "Velkommen til 'Konsekvens i trafikken'!",
      info: "Dette er et interaktivt spill hvor du tar valg i ulike trafikksituasjoner. Valgene dine påvirker historien og avgjør hvordan det ender. Trykk på 'Start' for å begynne.",
      choices: [
        { text: "Start", next: "Case 1" },
        { text: "Casene", next: "caseOverview" }, // Navigate to case overview
      ],
    },
    caseOverview: {
      text: "Velg en sak for å gå direkte til den:",
      cases: [
        { text: "Case 1", image: require('./assets/case1.png'), next: "Case 1" },
        { text: "Case 2", image: require('./assets/case2.png'), next: "Case 2" },
        { text: "Case 3", image: require('./assets/case3.png'), next: "Case 3" },
        { text: "Case 4", image: require('./assets/case4.png'), next: "Case 4" },
        { text: "Case 5", image: require('./assets/case5.png'), next: "Case 5" },
        { text: "Case 6", image: require('./assets/case6.png'), next: "Case 6" },
        { text: "Case 7", image: require('./assets/case7.png'), next: "Case 7" },
        { text: "Case 8", image: require('./assets/case8.png'), next: "Case 8" },
      ],
    },
    "Case 1": {
      text: "Skal bare en kort tur til butikken, og sitte i baksetet. Hva gjør du?",
      image: require('./assets/case1.png'),
      choices: [
        { text: "Ta på beltet", next: "Case 1 Video Good" },
        { text: "Ta ikke på beltet", next: "Case 1 Video Bad" },
      ],
    },
    "Case 1 Video Good": {
      video: require('./assets/case1_good.mp4'),
      explanation: (
        <Text>
          Godt valg! Det er hensiktsmessig å alltid bruke bilbelte, selv om du bare skal en kort tur til butikken vil bilen i på vei til butikken nå en hastighet på 60 kilometer i timen. Dersom du havner i en kollisjon vil din kroppsvekt tilsvare 1,2 tonn i krefter ved kollisonsøyblikket, hvordan tror du det går med vennen din i passasjersete foran? Gå selv inn på{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://www.ungitrafikken.no/kollisjonskalkulator';
              if (Platform.OS === 'web') {
                // Open the link in a new tab for web
                window.open(url, '_blank');
              } else {
                // Use Linking for mobile
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://www.ungitrafikken.no/kollisjonskalkulator
          </Text>{' '}
          og se hva dine krefter tilsvarer i en hastighet på 60 km/t. Vil du bruke bilbeltet? Du kan også bli straffet med forenklet forelegg i henhold til paragraf §1 (forskrift om bruk av bilbelte mv, 1979 §1).
        </Text>
      ),
      next: "Case 2",
    },
    "Case 1 Video Bad": {
      videoId: "ZM64tWkpFRI",
      explanation: "Dårlig valg. Å ikke bruke bilbelte kan føre til alvorlige skader eller dødsfall i en ulykke.",
      next: "Case 2",
    },
    "Case 2": {
      text: "Du kjører den svarte bilen på en parkeringsplass og du oppdager en rød bil ryggende. Hva gjør du?",
      image: require('./assets/case2.png'),
      choices: [
        { text: "Stanser for bilen", next: "Case 2 Video Good" },
        { text: "Kjører forbi bilen", next: "Case 2 Video Bad" },
      ],
    },
    "Case 2 Video Good": {
      video: require('./assets/case2_good.mp4'),
      explanation: "Godt valg! Å stoppe på rødt lys forhindrer ulykker.",
      next: "Case 3",
    },
    "Case 2 Video Bad": {
      video: require('./assets/case2_bad.mp4'),
      explanation: "Dårlig valg. Å kjøre på rødt lys kan føre til alvorlige ulykker.",
      next: "Case 3",
    },
    "Case 3": {
      text: "Passering av buss. Hva gjør du?",
      image: require('./assets/case3.png'),
      choices: [
        { text: "Jeg reduserer farten og inntar bremseberedskap", next: "Case 3 Video Good" },
        { text: "Jeg inntar bremseberedskap og beholder samme farten", next: "Case 3 Video Bad" },
      ],
    },
    "Case 3 Video Good": {
      video: require('./assets/case3_good.mp4'),
      explanation: "Godt valg! Å la fotgjengere krysse er trygt og påbudt ved lov.",
      next: "Case 4",
    },
    "Case 3 Video Bad": {
      video: require('./assets/case3_bad.mp4'),
      explanation: "Dårlig valg. Å ignorere fotgjengere kan føre til ulykker.",
      next: "Case 4",
    },
    "Case 4": {
      text: "Du kjører den røde bilen og oppdager den svarte bilen i ett kryss. Hva gjør du?",
      image: require('./assets/case4.png'),
      choices: [
        { text: "Jeg slipper gasspedalen og lar bilen passere", next: "Case 4 Video Good" },
        { text: "Jeg øker farten litt og tar luken", next: "Case 4 Video Bad" },
      ],
    },
    "Case 4 Video Good": {
      video: require('./assets/case4_good.mp4'),
      explanation: "Godt valg! Å senke farten i regn reduserer risikoen for å miste kontrollen.",
      next: "Case 5",
    },
    "Case 4 Video Bad": {
      video: require('./assets/case4_bad.mp4'),
      explanation: "Dårlig valg. Å øke farten i regn kan føre til farlige situasjoner.",
      next: "Case 5",
    },
    "Case 5": {
      text: "Du kommer kjørende og oppdager en fotgjenger et stykke unna et gangfelt. Hva gjør du?",
      image: require('./assets/case5.png'),
      choices: [
        { text: "Jeg senker farten", next: "Case 5 Video Good" },
        { text: "Jeg holder flyten og forbereder meg for å bremse", next: "Case 5 Video Bad" },
      ],
    },
    "Case 5 Video Good": {
      video: require('./assets/case5_good.mp4'),
      explanation: "Godt valg! Helping others in need is important and can save lives.",
      next: "Case 6", // Progress to Case 6
    },
    "Case 5 Video Bad": {
      video: require('./assets/case5_bad.mp4'),
      explanation: "Bad choice. Ignoring others in need can lead to serious consequences.",
      next: "Case 6", // Progress to Case 6
    },
    "Case 6": {
      text: "Du skal på trening og har parkert på en parkeringsplass og skal gå over veien. Hva gjør du?",
      image: require('./assets/case6.png'),
      choices: [
        { text: "Søker kontakt med passerende biler", next: "Case 6 Video Good" },
        { text: "Tar frem mobilen og gjør klar musikken", next: "Case 6 Video Bad" },
      ],
    },
    "Case 6 Video Good": {
      video: require('./assets/case6_good.mp4'),
      explanation: "Godt valg! Å senke farten i en skolevei sikrer barnas sikkerhet.",
      next: "Case 7", // Gå direkte til Case 7
    },
    "Case 6 Video Bad": {
      video: require('./assets/case6_bad.mp4'),
      explanation: "Dårlig valg. Å holde farten i en skolevei kan føre til ulykker.",
      next: "Case 7", // Gå direkte til Case 7
    },
    "Case 7": {
      text: "Du er på vei til skolen med kameratene dine i bilen. Hva vektlegger du mest?",
      image: require('./assets/case7.png'),
      choices: [
        { text: "Jeg vektlegger miljøet og behovene rundt", next: "Case 7 Video Good" },
        { text: "Jeg vektlegger fremkommelighet og spenning", next: "Case 7 Video Bad" },
      ],
    },
    "Case 7 Video Good": {
      video: require('./assets/case7_good.mp4'),
      explanation: "Godt valg! Å gi syklisten plass sikrer deres sikkerhet på veien.",
      next: "Case 8", // Updated to go to Case 8
    },
    "Case 7 Video Bad": {
      video: require('./assets/case7_bad.mp4'),
      explanation: "Dårlig valg. Å kjøre forbi en syklist mens de svinger kan føre til ulykker.",
      next: "Case 8", // Updated to go to Case 8
    },
    "Case 8": {
      text: "Du skal parkere. Hva gjør du?",
      image: require('./assets/case8.png'),
      choices: [
        { text: "Bruker litt ekstra tid for å rygge inn", next: "Case 8 Video Good" },
        { text: "Bruker kort tid og kjører rett inn", next: "Case 8 Video Bad" },
      ],
    },
    "Case 8 Video Good": {
      video: require('./assets/case8_good.mp4'),
      explanation: "Godt valg! Å holde avstand sikrer tryggheten for alle på veien.",
      next: "end",
    },
    "Case 8 Video Bad": {
      video: require('./assets/case8_bad.mp4'),
      explanation: "Dårlig valg. Å kjøre forbi kan føre til farlige situasjoner.",
      next: "end",
    },
  },
  english: {
    welcome: {
      text: "Welcome to 'Consequences in Traffic'!",
      info: "This is an interactive game where you make choices in various traffic situations. Your choices affect the story and determine how it ends. Press 'Start' to begin.",
      choices: [
        { text: "Start", next: "Case 1" },
        { text: "Cases", next: "caseOverview" }, // Navigate to case overview
      ],
    },
    caseOverview: {
      text: "Choose a case to go directly to it:",
      cases: [
        { text: "Case 1", image: require('./assets/case1.png'), next: "Case 1" },
        { text: "Case 2", image: require('./assets/case2.png'), next: "Case 2" },
        { text: "Case 3", image: require('./assets/case3.png'), next: "Case 3" },
        { text: "Case 4", image: require('./assets/case4.png'), next: "Case 4" },
        { text: "Case 5", image: require('./assets/case5.png'), next: "Case 5" },
        { text: "Case 6", image: require('./assets/case6.png'), next: "Case 6" },
        { text: "Case 7", image: require('./assets/case7.png'), next: "Case 7" },
        { text: "Case 8", image: require('./assets/case8.png'), next: "Case 8" },
      ],
    },
    "Case 1": {
      text: "Just a short trip to the store, and sitting in the back seat. What do you do?",
      image: require('./assets/case1.png'),
      choices: [
        { text: "Put on the seatbelt", next: "Case 1 Video Good" },
        { text: "Don't put on the seatbelt", next: "Case 1 Video Bad" },
      ],
    },
    "Case 1 Video Good": {
      video: require('./assets/case1_good.mp4'),
      explanation: "Good choice! Wearing a seatbelt reduces the risk of serious injury in an accident.",
      next: "Case 2", // Skip explanation and go directly to Case 2
    },
    "Case 1 Video Bad": {
      video: require('./assets/case1_bad.mp4'),
      explanation: "Bad choice. Not wearing a seatbelt can lead to serious injury or death in an accident.",
      next: "Case 2", // Skip explanation and go directly to Case 2
    },
    "Case 2": {
      text: "You see a red light at the intersection. What do you do?",
      image: require('./assets/case2.png'),
      choices: [
        { text: "Stop", next: "Case 2 Video Good" },
        { text: "Run the red light", next: "Case 2 Video Bad" },
      ],
    },
    "Case 2 Video Good": {
      video: require('./assets/case2_good.mp4'),
      explanation: "Good choice! Stopping at a red light prevents accidents.",
      next: "Case 3", // Skip explanation and go directly to Case 3
    },
    "Case 2 Video Bad": {
      video: require('./assets/case2_bad.mp4'),
      explanation: "Bad choice. Running a red light can lead to serious accidents.",
      next: "Case 3", // Skip explanation and go directly to Case 3
    },
    "Case 3": {
      text: "You encounter a pedestrian crossing the road. What do you do?",
      image: require('./assets/case3.png'),
      choices: [
        { text: "Let them cross", next: "Case 3 Video Good" },
        { text: "Ignore them", next: "Case 3 Video Bad" },
      ],
    },
    "Case 3 Video Good": {
      video: require('./assets/case3_good.mp4'),
      explanation: "Good choice! Letting pedestrians cross is safe and required by law.",
      next: "Case 4", // Skip explanation and go directly to Case 4
    },
    "Case 3 Video Bad": {
      video: require('./assets/case3_bad.mp4'),
      explanation: "Bad choice. Ignoring pedestrians can lead to accidents.",
      next: "Case 4", // Skip explanation and go directly to Case 4
    },
    "Case 4": {
      text: "You are driving in heavy rain. What do you do?",
      image: require('./assets/case4.png'),
      choices: [
        { text: "Slow down", next: "Case 4 Video Good" },
        { text: "Speed up", next: "Case 4 Video Bad" },
      ],
    },
    "Case 4 Video Good": {
      video: require('./assets/case4_good.mp4'),
      explanation: "Good choice! Slowing down in the rain reduces the risk of losing control.",
      next: "Case 5", // Skip explanation and go directly to Case 5
    },
    "Case 4 Video Bad": {
      video: require('./assets/case4_bad.mp4'),
      explanation: "Bad choice. Speeding up in the rain can lead to dangerous situations.",
      next: "Case 5", // Skip explanation and go directly to Case 5
    },
    "Case 5": {
      text: "You see a car that has broken down on the road. What do you do?",
      image: require('./assets/case5.png'),
      choices: [
        { text: "Help out", next: "Case 5 Video Good" },
        { text: "Ignore the car", next: "Case 5 Video Bad" },
      ],
    },
    "Case 5 Video Good": {
      video: require('./assets/case5_good.mp4'),
      explanation: "Good choice! Helping others in need is important and can save lives.",
      next: "Case 6", // Progress to Case 6
    },
    "Case 5 Video Bad": {
      video: require('./assets/case5_bad.mp4'),
      explanation: "Bad choice. Ignoring others in need can lead to serious consequences.",
      next: "Case 6", // Progress to Case 6
    },
    "Case 6": {
      text: "You are approaching a school zone. What do you do?",
      image: require('./assets/case6.png'),
      choices: [
        { text: "Slow down", next: "Case 6 Video Good" },
        { text: "Maintain speed", next: "Case 6 Video Bad" },
      ],
    },
    "Case 6 Video Good": {
      video: require('./assets/case6_good.mp4'),
      explanation: "Good choice! Slowing down in a school zone ensures the safety of children.",
      next: "Case 7", // Skip explanation and go directly to Case 7
    },
    "Case 6 Video Bad": {
      video: require('./assets/case6_bad.mp4'),
      explanation: "Bad choice. Maintaining speed in a school zone can lead to accidents.",
      next: "Case 7", // Skip explanation and go directly to Case 7
    },
    "Case 7": {
      text: "You see a cyclist signaling to turn left. What do you do?",
      image: require('./assets/case7.png'),
      choices: [
        { text: "Give way", next: "Case 7 Video Good" },
        { text: "Overtake the cyclist", next: "Case 7 Video Bad" },
      ],
    },
    "Case 7 Video Good": {
      video: require('./assets/case7_good.mp4'),
      explanation: "Good choice! Giving way to cyclists ensures their safety on the road.",
      next: "Case 8", // Updated to go to Case 8
    },
    "Case 7 Video Bad": {
      video: require('./assets/case7_bad.mp4'),
      explanation: "Bad choice. Overtaking a cyclist while they turn can cause accidents.",
      next: "Case 8", // Updated to go to Case 8
    },
    "Case 8": {
      text: "You see a car driving very slowly in front of you. What do you do?",
      image: require('./assets/case8.png'),
      choices: [
        { text: "Keep your distance", next: "Case 8 Video Good" },
        { text: "Overtake the car", next: "Case 8 Video Bad" },
      ],
    },
    "Case 8 Video Good": {
      video: require('./assets/case8_good.mp4'),
      explanation: "Good choice! Keeping your distance ensures safety for everyone on the road.",
      next: "end", // Leads to the end
    },
    "Case 8 Video Bad": {
      video: require('./assets/case8_bad.mp4'),
      explanation: "Bad choice. Overtaking can lead to dangerous situations.",
      next: "end", // Leads to the end
    },
  },
};

// Removed duplicate declaration of App

const App = () => {
  const [theme, setTheme] = useState("light"); // Default to light mode
  const [currentCase, setCurrentCase] = useState("welcome");
  const [language, setLanguage] = useState("norwegian");
  const [showVideo, setShowVideo] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [history, setHistory] = useState([]);
  const [choices, setChoices] = useState([]);

  const { width, height } = screenDimensions;
  const styles = getStyles(width, height, orientation, theme);
  console.log("Current theme:", theme); // Debugging log

  // Handle screen orientation changes
  useEffect(() => {
    ScreenOrientation.unlockAsync(); // Allow both portrait and landscape modes

    const onChange = ({ window }) => {
      setScreenDimensions(window);
      setOrientation(window.width > window.height ? 'LANDSCAPE' : 'PORTRAIT');
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove(); // Clean up the listener
  }, []);

  useEffect(() => {
    console.log("Theme changed to:", theme); // Debugging log
  }, [theme]);

  const handleChoice = (next) => {
    // Normal progression logic for other cases
    setHistory((prevHistory) => [...prevHistory, currentCase]);

    setChoices((prevChoices) => {
      const filteredChoices = prevChoices.filter((choice) => choice.case !== currentCase);
      const updatedChoices = [...filteredChoices, { case: currentCase, next }];
      console.log("Updated choices:", updatedChoices); // Debugging log
      return updatedChoices;
    });

    const caseData = storyData[language][next];
    if (caseData && caseData.video) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }
    setCurrentCase(next);
  };

  const handleVideoStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setShowVideo(false);
    }
  };

  const renderEndScreen = () => {
    if (!choices || choices.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            {language === "norwegian" ? "Ingen valg gjort" : "No choices made"}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCurrentCase("welcome")}
          >
            <Text style={styles.buttonText}>
              {language === "norwegian" ? "Start på nytt" : "Restart Game"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  
    const uniqueChoices = choices.reduce((acc, choice) => {
      acc[choice.case] = choice.next;
      return acc;
    }, {});
  
    console.log("Choices state:", choices);
    console.log("Unique choices:", uniqueChoices);
  
    Object.values(uniqueChoices).forEach((next) => {
      const caseData = storyData[language][next];
      console.log("Case data for next:", next, caseData);
    });
  
    const goodChoices = Object.values(uniqueChoices).filter((next) => {
      const caseData = storyData[language][next];
      if (caseData && typeof caseData.explanation === "string") {
        const explanation = caseData.explanation.toLowerCase();
        if (language === "norwegian") {
          return explanation.includes("godt valg");
        } else {
          return explanation.includes("good choice");
        }
      }
      return false; // Skip cases without a valid explanation
    }).length;
  
    const totalCases = 8;
    const stars = Math.round((goodChoices / totalCases) * 5);
  
    const endText = language === "norwegian" ? "Spillet er over" : "Game Over";
    const resultText =
      language === "norwegian"
        ? `Du gjorde ${goodChoices} gode valg av ${totalCases}.`
        : `You made ${goodChoices} good choices out of ${totalCases}.`;
  
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{endText}</Text>
          <Text style={styles.info}>{resultText}</Text>
          <View style={styles.starsContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Text
                key={index}
                style={index < stars ? styles.starFilled : styles.starEmpty}
              >
                ★
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCurrentCase("welcome");
              setChoices([]);
              setHistory([]);
            }}
          >
            <Text style={styles.buttonText}>
              {language === "norwegian" ? "Start på nytt" : "Restart Game"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  

  const renderContent = () => {
    if (currentCase === "end") {
      return renderEndScreen();
    }

    const caseData = storyData[language][currentCase];
    if (!caseData) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No data available</Text>
        </View>
      );
    }

    // Render the welcome slide
    if (currentCase === "welcome") {
      return (
        <View style={styles.centeredContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{caseData.text}</Text>
            <Text style={styles.info}>{caseData.info}</Text>
            <View style={styles.choicesRow}>
              {caseData.choices.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.choiceButton}
                  onPress={() => handleChoice(choice.next)}
                >
                  <Text style={styles.buttonText}>{choice.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Add "Change Language" button */}
            <TouchableOpacity
              style={[styles.button, styles.smallButton]}
              onPress={() => setLanguage(language === "norwegian" ? "english" : "norwegian")}
            >
              <Text style={styles.buttonText}>
                {language === "norwegian" ? "Change to English" : "Bytt til Norsk"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // Render the caseOverview
    if (currentCase === "caseOverview") {
      return (
        <View style={styles.card}>
          <Text style={styles.title}>{caseData.text}</Text>
          <View style={styles.caseOverviewContainer}>
            {caseData.cases.map((caseItem, index) => (
              <TouchableOpacity
                key={index}
                style={styles.caseOverviewItem}
                onPress={() => handleChoice(caseItem.next)}
              >
                <Image
                  source={caseItem.image}
                  style={styles.caseOverviewImage}
                  resizeMode="contain"
                />
                <Text style={styles.caseOverviewText}>{caseItem.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Add "Gå tilbake" button */}
          <TouchableOpacity
            style={[styles.button, styles.goBackButton]}
            onPress={() => {
              const previousCase = history[history.length - 1] || "welcome"; // Default to "welcome" if no history
              setHistory((prevHistory) => prevHistory.slice(0, -1));
              setCurrentCase(previousCase);
            }}
          >
            <Text style={styles.buttonText}>
              {language === "norwegian" ? "Gå tilbake" : "Go Back"}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Render other cases as they were
    return (
      <View style={styles.contentContainer}>
        {caseData.text && (
          <View style={styles.card}>
            <Text style={styles.caseText}>{caseData.text}</Text>
          </View>
        )}
        {caseData.image && (
          <View style={styles.imageContainer}>
            <Image
              source={caseData.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
        {caseData.video && showVideo && (
          <View style={styles.videoContainer}>
            <Video
              source={caseData.video}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping={false}
              shouldPlay={true}
              onPlaybackStatusUpdate={handleVideoStatusUpdate}
            />
          </View>
        )}
        {caseData.explanation && !showVideo && (
          <View style={styles.card}>
            <Text style={styles.info}>{caseData.explanation}</Text>
          </View>
        )}
        <View style={styles.buttonRow}>
          {caseData.video && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowVideo(!showVideo)}
            >
              <Text style={styles.buttonText}>
                {showVideo
                  ? language === "norwegian"
                    ? "Skjul video"
                    : "Hide Video"
                  : language === "norwegian"
                  ? "Vis video"
                  : "Show Video"}
              </Text>
            </TouchableOpacity>
          )}
          {caseData.next && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (history[history.length - 1] === "caseOverview") {
                  // Return to "caseOverview" if accessed from there
                  setCurrentCase("caseOverview");
                  setHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove the flag from history
                } else {
                  // Normal progression
                  handleChoice(caseData.next);
                }
              }}
            >
              <Text style={styles.buttonText}>
                {language === "norwegian" ? "Neste sak" : "Next Case"}
              </Text>
            </TouchableOpacity>
          )}
          {history.length > 0 && (
            <TouchableOpacity
              style={[styles.button, styles.goBackButton]}
              onPress={() => {
                const previousCase = history[history.length - 1];
                setHistory((prevHistory) => prevHistory.slice(0, -1));
                setCurrentCase(previousCase);
                setShowVideo(false);
              }}
            >
              <Text style={styles.buttonText}>
                {language === "norwegian" ? "Gå tilbake" : "Go Back"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {caseData.choices && (
          <View style={styles.choicesRow}>
            {caseData.choices.map((choice, index) => (
              <TouchableOpacity
                key={index}
                style={styles.choiceButton}
                onPress={() => handleChoice(choice.next)}
              >
                <Text style={styles.buttonText}>{choice.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme === "light" ? "#F5F5F5" : "#121212" }}>
      <StatusBar style="auto" />

      {/* Theme Toggle Button */}
      <Pressable
        style={styles.themeToggleButton}
        onPress={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          console.log("Switching to theme:", newTheme); // Debugging log
          setTheme(newTheme);
        }}
      >
        <Ionicons
          name={theme === "light" ? "moon" : "sunny"} // Moon for light mode, Sun for dark mode
          size={24}
          color={theme === "light" ? "#333" : "#FFD700"} // Icon color
        />
      </Pressable>

      {/* Render the rest of the app */}
      {renderContent()}
    </View>
  );
};

const getStyles = (width, height, orientation, theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#F5F5F5" : "#181818",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    centeredContainer: {
      flex: 1,
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      backgroundColor: theme === "light" ? "#F5F5F5" : "#181818", // Match the theme
      padding: width * 0.03,
    },
    card: {
      backgroundColor: theme === "light" ? "white" : "#242424",
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      width: "90%",
      alignItems: "center",
    },
    title: {
      fontSize: Math.min(width, height) * 0.035,
      fontWeight: "bold",
      textAlign: "center",
      color: theme === "light" ? "#333" : "#FFFFFF", // White text for dark mode
      marginBottom: height * 0.01,
    },
    info: {
      fontSize: Math.min(width, height) * 0.03, // Smaller info text
      textAlign: "center",
      color: theme === "light" ? "#555" : "#CCCCCC", // Lighter text for dark mode
      marginBottom: height * 0.01, // Reduced margin
    },
    caseText: {
      fontSize: Math.min(width, height) * 0.03, // Smaller case text
      textAlign: "center",
      color: theme === "light" ? "#444" : "#DDDDDD", // Lighter text for dark mode
      marginBottom: height * 0.01, // Reduced margin
    },
    imageContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: height * 0.02, // Space below the image
      flex: 1, // Allow the image to take up more space
    },
    image: {
      width: "100%",
      height: "100%", // Allow the image to fill the container
      resizeMode: "contain", // Ensure the image scales proportionally
    },
    videoContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: height * 0.015, // Reduced margin
    },
    video: {
      width: "100%", // Full width for video
      aspectRatio: 16 / 9,
      borderRadius: 10,
      backgroundColor: "black",
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      marginTop: height * 0.015, // Reduced margin
    },
    button: {
      backgroundColor: theme === "light" ? "#2196F3" : "#BB86FC", // Light or dark button color
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.07,
      borderRadius: 25,
      alignItems: "center",
      marginHorizontal: width * 0.015,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    smallButton: {
      paddingVertical: height * 0.005,
      paddingHorizontal: width * 0.035,
    },
    buttonText: {
      color: theme === "light" ? "white" : "#000000", // Light or dark button text color
      fontSize: Math.min(width, height) * 0.03,
      textAlign: "center",
      fontWeight: "bold",
    },
    choicesRow: {
      flexDirection: "row", // Align choices side by side
      flexWrap: "wrap", // Allow wrapping to multiple lines
      justifyContent: "space-evenly", // Distribute choices evenly
      alignItems: "center",
      width: "100%", // Ensure the row takes up the full width
      marginTop: height * 0.02, // Space above the choices
    },
    choiceButton: {
      backgroundColor: "#4CAF50", // Green background for both themes
      paddingVertical: height * 0.015, // Button padding
      paddingHorizontal: width * 0.05, // Reduced button width
      borderRadius: 25,
      alignItems: "center",
      marginHorizontal: width * 0.02, // Space between buttons
      marginVertical: height * 0.01, // Space between rows of buttons
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    starsContainer: {
      flexDirection: "row", // Align stars horizontally
      justifyContent: "center", // Center the stars
      alignItems: "center",
      marginVertical: height * 0.02, // Add space above and below the stars
    },
    starFilled: {
      fontSize: Math.min(width, height) * 0.08, // Bigger star size
      color: "#FFD700", // Gold color for filled stars
      marginHorizontal: width * 0.01, // Space between stars
    },
    starEmpty: {
      fontSize: Math.min(width, height) * 0.08, // Bigger star size
      color: "#CCCCCC", // Gray color for empty stars
      marginHorizontal: width * 0.01, // Space between stars
    },
    goBackButton: {
      backgroundColor: "#FF5722", // Distinct orange-red color
      borderWidth: 2, // Add a border
      borderColor: "#E64A19", // Slightly darker border color
      paddingVertical: height * 0.01, // Same padding as other buttons
      paddingHorizontal: width * 0.07,
      borderRadius: 25, // Rounded corners
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3, // Slightly stronger shadow
      shadowRadius: 5,
      elevation: 4, // Slightly higher elevation for a raised effect
    },
    themeToggleButton: {
      position: "absolute",
      top: 20, // Use a fixed value for better compatibility
      right: 20, // Use a fixed value for better compatibility
      backgroundColor: theme === "light" ? "#FFFFFF" : "#444444", // Slightly lighter toggle button for dark mode
      borderRadius: 25,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 10, // Ensure the button is on top of other elements
    },
    caseOverviewContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginTop: 20,
    },
    caseOverviewItem: {
      width: orientation === "LANDSCAPE" ? "22%" : "40%", // Adjust width for landscape mode
      marginBottom: 20,
      alignItems: "center",
    },
    caseOverviewImage: {
      width: "100%",
      height: orientation === "LANDSCAPE" ? 80 : 100, // Adjust height for landscape mode
      borderRadius: 10,
      marginBottom: 10,
    },
    caseOverviewText: {
      fontSize: 16,
      textAlign: "center",
      color: theme === "light" ? "#333" : "#FFFFFF",
    },
  });
};

export default App;