import { StatusBar } from 'expo-status-bar'; // Only used if you explicitly need the status bar
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Platform, Pressable, TextInput, KeyboardAvoidingView, ScrollView, Modal } from 'react-native'; // Add Modal to imports
import React, { useState, useEffect } from 'react';
import { Video } from 'expo-av';
import { Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAk5JKCIi8vrp8x6d6-hlWdDMEL095-Ko",
  authDomain: "feedback-spillet.firebaseapp.com",
  databaseURL: "https://feedback-spillet-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "feedback-spillet",
  storageBucket: "feedback-spillet.firebasestorage.app",
  messagingSenderId: "716762882047",
  appId: "1:716762882047:web:c6382deb261ae2db5e91ca",
  measurementId: "G-JSCZGRJL4Y"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const VideoPlayer = ({ videoSource, styles, onHideVideo }) => {
  return (
    <View style={styles.videoContainer}>
      <Video
        source={videoSource}
        style={styles.video}
        useNativeControls={true}
        resizeMode="contain" // Ensures the video fits within the container
        isLooping={false}
        shouldPlay={true}
        onPlaybackStatusUpdate={(status) => {
          if (status.didJustFinish) {
            onHideVideo(); // Automatically hide the video when it finishes
          }
        }}
        onReadyForDisplay={videoData => {
          videoData.srcElement.style.position = "initial"
        }}
      />
      <TouchableOpacity
        style={styles.hideVideoButton}
        onPress={onHideVideo}
      >
        <Text style={styles.hideVideoButtonText}>
          {Platform.OS === "ios" || Platform.OS === "android"
            ? "Skjul video"
            : "Hide Video"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const storyData = {
  norwegian: {
    welcome: {
      text: "Velkommen til 'Konsekvens i trafikken'!",
      info: (
        <Text>
          Dette er et interaktivt spill hvor du tar valg i ulike trafikksituasjoner. Valgene dine påvirker historien og avgjør hvordan det ender.{"\n\n"}
          <Text style={{ fontWeight: "bold"}}>
            Brukerveiledning:
          </Text>{" "}
          <Text>
            For at spillet skal gi mening er det viktig at du svarer ærlig. Trykk på valgalternativet du ville ha gjort. Etter videoen er ferdig, kommer det informasjon om casen. Det anbefales å spille spillet to ganger; andre gangen velger du motsatt påstand av første gang. Ønsker du kun å se på en case av gangen? Trykk på knappen «casene».{"\n\n"}</Text>Lykke til!
        </Text>
      ),
      choices: [
        { text: "Start", next: "Case 1" },
        { text: "Casene", next: "caseOverview" }, // Navigate to case overview
      ],
    },
    caseOverview: {
      text: "Velg en case for å gå direkte til den:",
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
      text: "Skal bare en kort tur til butikken. Du sitter i baksetet. Hva gjør du?",
      image: require('./assets/case1.png'),
      choices: [
        { text: "Tar på beltet", next: "Case 1 Video Good" },
        { text: "Tar ikke på beltet", next: "Case 1 Video Bad" },
      ],
    },
    "Case 1 Video Good": {
      video: require('./assets/case1_good.mp4'),
      explanation: (
        <Text>
        Det er smart å alltid bruke bilbelte – selv om du bare skal en kort tur til butikken. Bilen kan lett komme opp i 60 km/t på veien dit. Havner du i en kollisjon i den farten, kan kroppen din ha en kraft tilsvarende 1 tonn i kollisjonsøyeblikket. Hvordan tror du det går med vennen din i setet foran? Trykk på lenken under for å se dine krefter i ulike hastigheter.{"\n\n"} Et bilbelte kan være forskjellen på liv og død. Tar du sjansen?{"\n\n"}{' '}
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
        </Text>
      ),
      next: "Case 2",
    },
    "Case 1 Video Bad": {
      video: require('./assets/case1_bad.mp4'),
      explanation: (
        <Text>
        Det er smart å alltid bruke bilbelte – selv om du bare skal en kort tur til butikken. Bilen kan lett komme opp i 60 km/t på veien dit. Havner du i en kollisjon i den farten, kan kroppen din ha en kraft tilsvarende 1 tonn i kollisjonsøyeblikket. Hvordan tror du det går med vennen din i setet foran? Trykk på lenken under for å se dine krefter i ulike hastigheter.{"\n\n"} Et bilbelte kan være forskjellen på liv og død. Tar du sjansen?{"\n\n"}{' '}
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
        </Text>
      ),
      next: "Case 2",
    },
    "Case 2": {
      text: "Du (grønn ring) kjører på en travel parkeringsplass og oppdager en ryggende bil (rød ring). Hva gjør du?",
      image: require('./assets/case2.png'),
      choices: [
        { text: "Stanser for bilen", next: "Case 2 Video Good" },
        { text: "Kjører forbi bilen", next: "Case 2 Video Bad" },
      ],
    },
    "Case 2 Video Good": {
      video: require('./assets/case2_good.mp4'),
      explanation: (
        <Text>
          Den som rygger eller vender, har vikeplikt for annen trafikant ifølge trafikkreglene §11 om rygging og vending. Selv om dette er tilfelle, kan det i henhold til vegtrafikklovens §3, som er hovedregelen for trafikk, være hensiktsmessig å slippe ut den røde bilen.{"\n\n"}Hva mener du kan være grunnen til dette?{"\n\n"}Vegtrafikkloven §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
          {"\n"} Trafikkregler §11:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A711#%C2%A711';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 3",
    },
    "Case 2 Video Bad": {
      video: require('./assets/case2_bad.mp4'),
      explanation: (
        <Text>
          Den som rygger eller vender, har vikeplikt for annen trafikant ifølge trafikkreglene §11 om rygging og vending. Selv om dette er tilfelle, kan det i henhold til vegtrafikklovens §3, som er hovedregelen for trafikk, være hensiktsmessig å slippe ut den røde bilen.{"\n\n"}Hva mener du kan være grunnen til dette?{"\n\n"}Vegtrafikkloven §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
          {"\n"} Trafikkregler §11:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A711#%C2%A711';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 3",
    },
    "Case 3": {
      text: "Du skal passere en buss på holdeplass. Hva gjør du?",
      image: require('./assets/case3.png'),
      choices: [
        { text: "Jeg reduserer farten og inntar bremseberedskap", next: "Case 3 Video Good" },
        { text: "Jeg inntar bremseberedskap og beholder samme farten", next: "Case 3 Video Bad" },
      ],
    },
    "Case 3 Video Good": {
      video: require('./assets/case3_good.mp4'),
      explanation: (
        <Text>
          Ifølge trafikreglenes § 13. Særlige bestemmelser om kjørefarten, står det at «kjørende må kunne stanse på den vegstrekning som den kjørende har oversikt over, og foran enhver påregnelig hindring». I tillegg står det at kjørende plikter å holde tilstrekkelig lav fart ved passering av blant annet buss. {"\n\n"}Hva mener du kan være grunnen til dette?{"\n\n"}Trafikkregler §13:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A713#%C2%A713';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 4",
    },
    "Case 3 Video Bad": {
      video: require('./assets/case3_bad.mp4'),
      explanation: (
        <Text>
          Ifølge trafikreglenes § 13. Særlige bestemmelser om kjørefarten, står det at «kjørende må kunne stanse på den vegstrekning som den kjørende har oversikt over, og foran enhver påregnelig hindring». I tillegg står det at kjørende plikter å holde tilstrekkelig lav fart ved passering av blant annet buss. {"\n\n"}Hva mener du kan være grunnen til dette?{"\n\n"}Trafikkregler §13:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A713#%C2%A713';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 4",
    },
    "Case 4": {
      text: "Du kjører den røde bilen (grønn ring) og oppdager en bil i ett kryss (rød ring). Hva gjør du?",
      image: require('./assets/case4.png'),
      choices: [
        { text: "Jeg slipper gasspedalen og lar bilen passere", next: "Case 4 Video Good" },
        { text: "Jeg øker farten litt og tar luken", next: "Case 4 Video Bad" },
      ],
    },
    "Case 4 Video Good": {
      video: require('./assets/case4_good.mp4'),
      explanation: (
        <Text>
          Ifølge trafikkreglenes §7 om vikeplikt, har du i dette tilfellet vikeplikt ettersom den svarte bilen kommer fra din høyre side. Videre står det i trafikkreglene at den som har vikeplikt, skal tydelig vise dette ved i god tid å sette ned farten eller stanse.{"\n\n"}Hva kunne vært konsekvensene dersom den svarte bilen hadde kjørt for fort?{"\n\n"}Trafikkregler §7:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A77#%C2%A77';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 5",
    },
    "Case 4 Video Bad": {
      video: require('./assets/case4_bad.mp4'),
      explanation: (
        <Text>
          Ifølge trafikkreglenes §7 om vikeplikt, har du i dette tilfellet vikeplikt ettersom den svarte bilen kommer fra din høyre side. Videre står det i trafikkreglene at den som har vikeplikt, skal tydelig vise dette ved i god tid å sette ned farten eller stanse.{"\n\n"}Hva kunne vært konsekvensene dersom den svarte bilen hadde kjørt for fort?{"\n\n"}Trafikkregler §7:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A77#%C2%A77';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 5",
    },
    "Case 5": {
      text: "Du kommer kjørende (grønn ring) og oppdager en fotgjenger (rød ring) et stykke unna et gangfelt. Hva gjør du?",
      image: require('./assets/case5.png'),
      choices: [
        { text: "Jeg senker farten", next: "Case 5 Video Good" },
        { text: "Jeg holder flyten og forbereder meg for å bremse", next: "Case 5 Video Bad" },
      ],
    },
    "Case 5 Video Good": {
      video: require('./assets/case5_good.mp4'),
      explanation: (
        <Text>
          I følge trafikkreglenes § 9 «Særlige plikter overfor gående», har kjørende vikeplikt for gående som er i ferd med å gå ut i gangfeltet. Selv om føreren ikke kan vite med sikkerhet om den gående skal krysse veien, skal vilføreren unngå stans på gangfelt eller på annen måte forstyrre den gående. Dette kan oppfattes som en forstyrrelse dersom farten ikke reduseres i god tid.{"\n\n"}Hva kunne konsekvensene vært dersom den gående gikk uten å sjekke, og du beholdt farten?{"\n\n"}Trafikkregler §9:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A79#%C2%A79';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 6",
    },
    "Case 5 Video Bad": {
      video: require('./assets/case5_bad.mp4'),
      explanation: (
        <Text>
          I følge trafikkreglenes § 9 «Særlige plikter overfor gående», har kjørende vikeplikt for gående som er i ferd med å gå ut i gangfeltet. Selv om føreren ikke kan vite med sikkerhet om den gående skal krysse veien, skal vilføreren unngå stans på gangfelt eller på annen måte forstyrre den gående. Dette kan oppfattes som en forstyrrelse dersom farten ikke reduseres i god tid.{"\n\n"}Hva kunne konsekvensene vært dersom den gående gikk uten å sjekke, og du beholdt farten?{"\n\n"}Trafikkregler §9:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A79#%C2%A79';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 6",
    },
    "Case 6": {
      text: "Du skal på trening og har parkert på en parkeringsplass. Du har forlatt bilen (grønn ring) og skal gå over parkeringsplassen (grønn pil). Hva gjør du?",
      image: require('./assets/case6.png'),
      choices: [
        { text: "Skaper overblikk over plassen", next: "Case 6 Video Good" },
        { text: "Tar frem mobilen og gjør klar musikken", next: "Case 6 Video Bad" },
      ],
    },
    "Case 6 Video Good": {
      video: require('./assets/case6_good.mp4'),
      explanation: (
        <Text>
          I henhold til vegtrafikklovens §3 "grunnregler for trafikk" kan det være hensiktsmessig å se seg godt for og vente med å bruke mobiltelefonen til man har krysset område der det forventes trafikk. På lik linje bør også bilføreren forvente at gående kan være distraherte.{"\n\n"}Hvilke konsekvenser kan oppstå hvis jeg bruker mobilen i trafikken?{"\n\n"}Vegtrafikkloven §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
        </Text>
      ),
      next: "Case 7",
    },
    "Case 6 Video Bad": {
      video: require('./assets/case6_bad.mp4'),
      explanation: (
        <Text>
          I henhold til vegtrafikklovens §3 "grunnregler for trafikk" kan det være hensiktsmessig å se seg godt for og vente med å bruke mobiltelefonen til man har krysset område der det forventes trafikk. På lik linje bør også bilføreren forvente at gående kan være distraherte.{"\n\n"}Hvilke konsekvenser kan oppstå hvis jeg bruker mobilen i trafikken?{"\n\n"}Vegtrafikkloven §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
        </Text>
      ),
      next: "Case 7",
    },
    "Case 7": {
      text: "Du skal parkere. Hva gjør du?",
      image: require('./assets/case7.png'),
      choices: [
        { text: "Bruker litt ekstra tid for å rygge inn", next: "Case 7 Video Good" },
        { text: "Bruker kort tid og kjører rett inn", next: "Case 7 Video Bad" },
      ],
    },
    "Case 7 Video Good": {
      video: require('./assets/case7_good.mp4'),
      explanation: (
        <Text>
          Ryggeparkering gir bedre sikt når du skal forlate parkeringsplassen, da du har bedre oversikt over trafikken rundt deg. Hvis du parkerer med fronten inn, kan sikten bli begrenset når du skal rygge ut, noe som kan gjøre det vanskeligere å se farer og skape farlige situasjoner.{"\n\n"}Hvordan kan ditt valg av parkering gjøre trafikkmiljøet tryggere?
        </Text>
      ),
      next: "Case 8",
    },
    "Case 7 Video Bad": {
      video: require('./assets/case7_bad.mp4'),
      explanation: (
        <Text>
          Ryggeparkering gir bedre sikt når du skal forlate parkeringsplassen, da du har bedre oversikt over trafikken rundt deg. Hvis du parkerer med fronten inn, kan sikten bli begrenset når du skal rygge ut, noe som kan gjøre det vanskeligere å se farer og skape farlige situasjoner.{"\n\n"}Hvordan kan ditt valg av parkering gjøre trafikkmiljøet tryggere?
          </Text>
      ),
      next: "Case 8",
    },
    "Case 8": {
      text: "Du er på vei til skole/jobb med kameratene dine i bilen. Dere kjører på en landevei og det er god stemning i bilen. Hva vektlegger du mest?",
      image: require('./assets/case8.png'),
      choices: [
        { text: "Jeg vektlegger miljøet og behovene rundt", next: "Case 8 Video Good" },
        { text: "Jeg vektlegger fremkommelighet og spenning", next: "Case 8 Video Bad" },
      ],
    },
    "Case 8 Video Good": {
      video: require('./assets/case8_good.mp4'),
      explanation: (
        <Text>
          Ifølge trafikkopplæringsforskriften §11-1. "Hovedmål for klasse B" står det at eleven skal ha de kunnskaper og ferdigheter, den selvinnsikt og risikoforståelse, som er nødvendig for å kjøre på en måte som er:
          {"\n"}- trafikksikker
          {"\n"}- gir god samhandling
          {"\n"}- fører til god trafikkavvikling
          {"\n"}- tar hensyn til helse, miljø og andres behov
          {"\n"}- er i samsvar med gjeldende regelverk.
          {"\n\n"}Hvordan ønsker du å være som bilfører?
          {"\n\n"}Trafikkopplæringsforskriften §11-1:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/2004-10-01-1339/KAPITTEL_11#KAPITTEL_11';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
            >
            https://lovdata.no/forskrift/2004-10-01-1339
          </Text>
        </Text>
      ),
      next: "end",
    },
    "Case 8 Video Bad": {
      video: require('./assets/case8_bad.mp4'),
      explanation: (
        <Text>
          Ifølge trafikkopplæringsforskriften §11-1. "Hovedmål for klasse B" står det at eleven skal ha de kunnskaper og ferdigheter, den selvinnsikt og risikoforståelse, som er nødvendig for å kjøre på en måte som er:
          {"\n"}- trafikksikker
          {"\n"}- gir god samhandling
          {"\n"}- fører til god trafikkavvikling
          {"\n"}- tar hensyn til helse, miljø og andres behov
          {"\n"}- er i samsvar med gjeldende regelverk.
          {"\n\n"}Hvordan ønsker du å være som bilfører?
          {"\n\n"}Trafikkopplæringsforskriften §11-1:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/2004-10-01-1339/KAPITTEL_11#KAPITTEL_11';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
            >
            https://lovdata.no/forskrift/2004-10-01-1339
          </Text>
        </Text>
      ),
      next: "end",
    },
  },
  english: {
    welcome: {
      text: "Welcome to 'Consequences in Traffic'!",
      info: (
        <Text>
          This is an interactive game where you make choices in various traffic situations. Your choices affect the story and determine how it ends.{"\n\n"}
          <Text style={{ fontWeight: "bold"}}>
            User Guide:
          </Text>{" "}
          <Text>
            You will be presented with various cases where you must choose the statement you believe is correct. For the game to make sense, it is important that you answer honestly. Click on the information box for each case after you have made your choice and watch the corresponding video. It is recommended to play the game twice; the second time, choose the opposite statement from the first time. Do you only want to look at one case at a time? Click the "Cases" button.{"\n\n"}
          </Text>
          Good luck!
        </Text>
      ),
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
      explanation: (
        <Text>
        It’s smart to always wear a seatbelt – even if you're just going on a short trip to the store. The car can easily reach 60 km/h on the way there. If you're in a collision at that speed, your body can experience a force equivalent to 1 ton at the moment of impact. How do you think it will go for your friend in the front seat? Click the link below to see the forces you experience at different speeds.{"\n\n"}A seatbelt could be the difference between life and death. Will you take the chance?{"\n\n"}{' '}
        <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => {
            const url = 'https://www.ungitrafikken.no/kollisjonskalkulator';
            if (Platform.OS === 'web') {
              window.open(url, '_blank');
              } else {
              Linking.openURL(url).catch((err) =>
                console.error("Failed to open URL:", err)
            );
          }
        }}
      >
        https://www.ungitrafikken.no/kollisjonskalkulator
      </Text>{' '}
     </Text>
      ),
      next: "Case 2", // Skip explanation and go directly to Case 2
    },
    "Case 1 Video Bad": {
      video: require('./assets/case1_bad.mp4'),
      explanation: (
        <Text>
        It’s smart to always wear a seatbelt – even if you're just going on a short trip to the store. The car can easily reach 60 km/h on the way there. If you're in a collision at that speed, your body can experience a force equivalent to 1 ton at the moment of impact. How do you think it will go for your friend in the front seat? Click the link below to see the forces you experience at different speeds.{"\n\n"}A seatbelt could be the difference between life and death. Will you take the chance?{"\n\n"}{' '}
          <Text
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => {
            const url = 'https://www.ungitrafikken.no/kollisjonskalkulator';
            if (Platform.OS === 'web') {
              window.open(url, '_blank');
              } else {
              Linking.openURL(url).catch((err) =>
                console.error("Failed to open URL:", err)
            );
          }
        }}
      >
        https://www.ungitrafikken.no/kollisjonskalkulator
      </Text>{' '}
     </Text>
      ),
      next: "Case 2", // Skip explanation and go directly to Case 2
    },
    "Case 2": {
      text: "You (green circle) are driving in a busy parking lot and you notice a reversing car (red circle). What do you do?",
      image: require('./assets/case2.png'),
      choices: [
        { text: "Stop for the car", next: "Case 2 Video Good" },
        { text: "Drive past the car", next: "Case 2 Video Bad" },
      ],
    },
    "Case 2 Video Good": {
      video: require('./assets/case2_good.mp4'),
      explanation: (
        <Text>
          The person who is reversing or turning has a duty to yield to other road users according to Section 11 of the Traffic Regulations on reversing and turning. Even though this is the case, it may, in accordance with Section 3 of the Road Traffic Act – which is the fundamental rule of traffic – be appropriate to let the red car out.{"\n\n"}What do you think could be the reason for this?{"\n\n"}The Road Traffic Act:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/lov/1965-06-18-4';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
          {"\n"} Trafic Regulations:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/forskrift/1986-03-21-747';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 3",
    },
    "Case 2 Video Bad": {
      video: require('./assets/case2_bad.mp4'),
      explanation: (
        <Text>
          The person who is reversing or turning has a duty to yield to other road users according to Section 11 of the Traffic Regulations on reversing and turning. Even though this is the case, it may, in accordance with Section 3 of the Road Traffic Act – which is the fundamental rule of traffic – be appropriate to let the red car out.{"\n\n"}What do you think could be the reason for this?{"\n\n"}The Road Traffic Act:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/lov/1965-06-18-4';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
          {"\n"} Trafic Regulations:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/forskrift/1986-03-21-747';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 3",
    },
    "Case 3": {
      text: "You are about to pass a bus at a bus stop. What do you do?",
      image: require('./assets/case3.png'),
      choices: [
        { text: "I reduce my speed and prepare to brake", next: "Case 3 Video Good" },
        { text: "I prepare to brake but maintain the same speed", next: "Case 3 Video Bad" },
      ],
    },
    "Case 3 Video Good": {
      video: require('./assets/case3_good.mp4'),
      explanation: (
        <Text>
          According to traffic regulation § 13. Special provisions on driving speed, it states that "drivers must be able to stop within the stretch of road they can see, and in front of any foreseeable obstacle." In addition, it states that drivers are obliged to maintain a sufficiently low speed when passing, among other things, a bus. {"\n\n"}What do you think could be the reason for this?{"\n\n"}Traffic regulations §13:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A713#%C2%A713';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 4",
    },
    "Case 3 Video Bad": {
      video: require('./assets/case3_bad.mp4'),
      explanation: (
        <Text>
          According to traffic regulation § 13. Special provisions on driving speed, it states that "drivers must be able to stop within the stretch of road they can see, and in front of any foreseeable obstacle." In addition, it states that drivers are obliged to maintain a sufficiently low speed when passing, among other things, a bus. {"\n\n"}What do you think could be the reason for this?{"\n\n"}Traffic regulations §13:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A713#%C2%A713';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 4",
    },
    "Case 3 Video Bad (English)": {
      video: require('./assets/case3_bad.mp4'),
      explanation: (
        <Text>
          According to Traffic Rules § 13.Special provisions on driving speed, it states that "drivers must be able to stop within the distance they can see ahead and in front of any foreseeable obstacle." Not reducing speed when passing a bus can lead to dangerous situations (Traffic Rules, 1986, §13). See link:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/dokument/SF/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 4",
    },
    "Case 4": {
      text: "You are driving the red car (green circle) and notice a car at an intersection (red circle). What do you do?",
      image: require('./assets/case4.png'),
      choices: [
        { text: "I release the gas pedal and let the car pass", next: "Case 4 Video Good" },
        { text: "I speed up a bit and take the gap", next: "Case 4 Video Bad" },
      ],
    },
    "Case 4 Video Good": {
      video: require('./assets/case4_good.mp4'),
      explanation: (
        <Text>
          According to traffic regulation §7 on the right of way, you are required to yield in this case, as the black car is coming from your right side. Furthermore, the traffic regulations state that the person who must yield should clearly show this by reducing speed or stopping well in advance.{"\n\n"}What could have been the consequences if the black car had been driving too fast?{"\n\n"}Traffic regulations §7:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A77#%C2%A77';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 5",
    },
    "Case 4 Video Bad": {
      video: require('./assets/case4_bad.mp4'),
      explanation: (
        <Text>
          According to traffic regulation §7 on the right of way, you are required to yield in this case, as the black car is coming from your right side. Furthermore, the traffic regulations state that the person who must yield should clearly show this by reducing speed or stopping well in advance.{"\n\n"}What could have been the consequences if the black car had been driving too fast?{"\n\n"}Traffic regulations §7:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A77#%C2%A77';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 5",
    },
    "Case 5": {
      text: "You are driving (green circle) and notice a pedestrian (red circle) some distance away near a crosswalk. What do you do?",
      image: require('./assets/case5.png'),
      choices: [
        { text: "I slow down", next: "Case 5 Video Good" },
        { text: "I maintain speed and prepare to brake", next: "Case 5 Video Bad" },
      ],
    },
    "Case 5 Video Good": {
      video: require('./assets/case5_good.mp4'),
      explanation: (
        <Text>
          According to traffic regulation § 9 "Special duties toward pedestrians", drivers must yield to pedestrians who are about to enter a pedestrian crossing. Even if the driver cannot be certain that the pedestrian intends to cross the road, the driver must avoid stopping on the crossing or otherwise disturbing the pedestrian. This may be perceived as a disturbance if the speed is not reduced in good time.{"\n\n"}What could have been the consequences if the pedestrian stepped out without checking, and you maintained your speed?{"\n\n"}Traffic regulations §9:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A79#%C2%A79';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 6",
    },
    "Case 5 Video Bad": {
      video: require('./assets/case5_bad.mp4'),
      explanation: (
        <Text>
          According to traffic regulation § 9 "Special duties toward pedestrians", drivers must yield to pedestrians who are about to enter a pedestrian crossing. Even if the driver cannot be certain that the pedestrian intends to cross the road, the driver must avoid stopping on the crossing or otherwise disturbing the pedestrian. This may be perceived as a disturbance if the speed is not reduced in good time.{"\n\n"}What could have been the consequences if the pedestrian stepped out without checking, and you maintained your speed?{"\n\n"}Traffic regulations §9:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/1986-03-21-747/%C2%A79#%C2%A79';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/forskrift/1986-03-21-747
          </Text>
        </Text>
      ),
      next: "Case 6",
    },
    "Case 6": {
      text: "You are heading to training and have parked in a parking lot. You have left the car (green circle) and are about to walk across the parking lot (green arrow). What do you do?",
      image: require('./assets/case6.png'),
      choices: [
        { text: "Make eye contact with passing cars", next: "Case 6 Video Good" },
        { text: "Take out your phone and prepare the music", next: "Case 6 Video Bad" },
      ],
    },
    "Case 6 Video Good": {
      video: require('./assets/case6_good.mp4'),
      explanation: (
        <Text>
          According to the Road Traffic Act §3 "General traffic rules," it may be advisable to look carefully and wait to use a mobile phone until you have crossed areas where traffic is expected. Similarly, the driver should also expect that pedestrians may be distracted. {"\n\n"}What consequences could arise if I use my mobile phone in traffic?{"\n\n"}Road Traffic Act §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
        </Text>
      ),
      next: "Case 7",
    },
    "Case 6 Video Bad": {
      video: require('./assets/case6_bad.mp4'),
      explanation: (
        <Text>
          According to the Road Traffic Act §3 "General traffic rules," it may be advisable to look carefully and wait to use a mobile phone until you have crossed areas where traffic is expected. Similarly, the driver should also expect that pedestrians may be distracted. {"\n\n"}What consequences could arise if I use my mobile phone in traffic?{"\n\n"}Road Traffic Act §3:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/NL/lov/1965-06-18-4/KAPITTEL_2#%C2%A73';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
          >
            https://lovdata.no/lov/1965-06-18-4
          </Text>
        </Text>
      ),
      next: "Case 7",
    },
    "Case 7": {
      text: "You are on your way to school/work with your friends in the car. You are driving on a country road, and the mood in the car is great. What do you prioritize the most?",
      image: require('./assets/case7.png'),
      choices: [
        { text: "I prioritize the environment and the needs around me", next: "Case 7 Video Good" },
        { text: "I prioritize speed and excitement", next: "Case 7 Video Bad" },
      ],
    },
    "Case 7 Video Good": {
      video: require('./assets/case7_good.mp4'),
      explanation: (
        <Text>
          According to the Traffic Training Regulations §11-1. Main goals for class B, the student must be able to drive a car responsibly. It also states that "The student must have the knowledge and skills, self-awareness, and risk understanding necessary to drive in a way that is:
          {"\n"}- traffic safe
          {"\n"}- promotes good interaction
          {"\n"}- ensures smooth traffic flow
          {"\n"}- considers health, the environment, and the needs of others
          {"\n"}- complies with current regulations.
          {"\n"}(Traffic Training Regulations, 2004, §11-1.)
          {"\n\n"}How do you want to be as a driver?
        </Text>
      ),
      next: "Case 8",
    },
    "Case 7 Video Bad": {
      video: require('./assets/case7_bad.mp4'),
      explanation: (
        <Text>
          According to the Traffic Training Regulations §11-1. Main goals for class B, the student must be able to drive a car responsibly. It also states that "The student must have the knowledge and skills, self-awareness, and risk understanding necessary to drive in a way that is:
          {"\n"}- traffic safe
          {"\n"}- promotes good interaction
          {"\n"}- ensures smooth traffic flow
          {"\n"}- considers health, the environment, and the needs of others
          {"\n"}- complies with current regulations.
          {"\n"}(Traffic Training Regulations, 2004, §11-1.)
          {"\n\n"}How do you want to be as a driver?
        </Text>
      ),
      next: "Case 8",
    },
    "Case 8": {
      text: "You're going to park. What do you do?",
      image: require('./assets/case8.png'),
      choices: [
        { text: "Use a bit of extra time to reverse in.", next: "Case 8 Video Good" },
        { text: "Use little time and drives straight in", next: "Case 8 Video Bad" },
      ],
    },
    "Case 8 Video Good": {
      video: require('./assets/case8_good.mp4'),
      explanation: (
        <Text>
          According to the Traffic Training Regulations §11-1, "Main objectives for category B", it states that the student shall have the knowledge and skills, the self-awareness and risk understanding necessary to drive in a manner that is:
          {"\n"}- traffic safe
          {"\n"}- promotes good interaction
          {"\n"}- ensures efficient traffic flow
          {"\n"}- takes into account health, the environment, and the needs of others
          {"\n"}- complies with applicable regulations.
          {"\n\n"}How do you want to be as a driver?
          {"\n\n"}Traffic Training Regulations §11-1:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/2004-10-01-1339/KAPITTEL_11#KAPITTEL_11';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
            >
            https://lovdata.no/forskrift/2004-10-01-1339
          </Text>
        </Text>
      ),
      next: "end", // Leads to the end
    },
    "Case 8 Video Bad": {
      video: require('./assets/case8_bad.mp4'),
      explanation: (
        <Text>
          According to the Traffic Training Regulations §11-1, "Main objectives for category B", it states that the student shall have the knowledge and skills, the self-awareness and risk understanding necessary to drive in a manner that is:
          {"\n"}- traffic safe
          {"\n"}- promotes good interaction
          {"\n"}- ensures efficient traffic flow
          {"\n"}- takes into account health, the environment, and the needs of others
          {"\n"}- complies with applicable regulations.
          {"\n\n"}How do you want to be as a driver?
          {"\n\n"}Traffic Training Regulations §11-1:{' '}
          <Text
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => {
              const url = 'https://lovdata.no/dokument/SF/forskrift/2004-10-01-1339/KAPITTEL_11#KAPITTEL_11';
              if (Platform.OS === 'web') {
                window.open(url, '_blank');
              } else {
                Linking.openURL(url).catch((err) =>
                  console.error("Failed to open URL:", err)
                );
              }
            }}
            >
            https://lovdata.no/forskrift/2004-10-01-1339
          </Text>
        </Text>
      ),
      next: "end", // Leads to the end
    },
  },
};

const App = () => {
  const [feedback, setFeedback] = useState(""); // State for general feedback
  const [caseSuggestions, setCaseSuggestions] = useState(""); // State for case suggestions
  const [theme, setTheme] = useState("light"); // Default to light mode
  const [currentCase, setCurrentCase] = useState("welcome");
  const [language, setLanguage] = useState("norwegian");
  const [showVideo, setShowVideo] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('window'));
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [history, setHistory] = useState([]);
  const [choices, setChoices] = useState([]);
  const [preloadedVideos, setPreloadedVideos] = useState({}); // Store preloaded video objects
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [isQrVisible, setIsQrVisible] = useState(false); // State for QR code visibility

  const { width, height } = screenDimensions;
  const styles = getStyles(width, height, orientation, theme);

  // Define submitFeedback at the top level
  const submitFeedback = async () => {
    if (feedback.trim() || caseSuggestions.trim()) {
      setIsSubmitting(true); // Start submission
      try {
        await addDoc(collection(db, "feedback"), {
          feedback: feedback,
          caseSuggestions: caseSuggestions,
          timestamp: new Date(),
        });
        alert(
          language === "norwegian"
            ? "Takk for tilbakemeldingen! Vi setter pris på din tid."
            : "Thank you for your feedback! We appreciate your time."
        );
        setFeedback(""); // Clear the feedback field
        setCaseSuggestions(""); // Clear the case suggestions field
      } catch (error) {
        console.error("Error submitting feedback:", error);
        alert(
          language === "norwegian"
            ? "Kunne ikke sende tilbakemelding. Prøv igjen senere."
            : "Could not submit feedback. Please try again later."
        );
      } finally {
        setIsSubmitting(false); // End submission
      }
    } else {
      alert(
        language === "norwegian"
          ? "Vennligst skriv noe før du sender."
          : "Please write something before submitting."
      );
    }
  };

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

  const preloadVideos = async (caseData) => {
    if (!caseData || !caseData.choices) return;

    const videoPromises = caseData.choices.map(async (choice) => {
      const nextCase = storyData[language][choice.next];
      if (nextCase && nextCase.video) {
        const videoObject = new Video();
        await videoObject.loadAsync(nextCase.video);
        return { [choice.next]: videoObject };
      }
      return null;
    });

    const loadedVideos = await Promise.all(videoPromises);
    const videoMap = loadedVideos.reduce((acc, video) => {
      if (video) {
        return { ...acc, ...video };
      }
      return acc;
    }, {});

    setPreloadedVideos((prev) => ({ ...prev, ...videoMap }));
  };

  const handleChoice = async (next) => {
    setHistory((prevHistory) => [...prevHistory, currentCase]);

    // Add the current choice to the choices array
    setChoices((prevChoices) => [
      ...prevChoices,
      { case: currentCase, next },
    ]);

    const caseData = storyData[language][next];
    if (caseData && caseData.video) {
      setShowVideo(true);
    } else {
      setShowVideo(false);
    }

    setCurrentCase(next);

    // Preload videos for the next case
    await preloadVideos(caseData);
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

    const goodChoices = Object.values(uniqueChoices).filter((next) => {
      return next.includes("Video Good");
    }).length;

    const totalCases = 8; // Total number of cases
    const stars = Math.round((goodChoices / totalCases) * 5);

    const endText = language === "norwegian" ? "Spillet er over" : "Game Over";
    const resultText =
      language === "norwegian"
        ? `Du gjorde ${goodChoices} gode valg av ${totalCases}.`
        : `You made ${goodChoices} good choices out of ${totalCases}.`;

    // Feedback based on stars
    const feedbackText =
      stars === 5
        ? language === "norwegian"
          ? "Fantastisk! Du tok alle de riktige valgene. Du er en mester i trafikksikkerhet! Prøv igjen for å se om du kan gjøre det like bra en gang til!"
          : "Amazing! You made all the right choices. You're a traffic safety master! Try again to see if you can do just as well one more time!"
        : stars === 4
        ? language === "norwegian"
          ? "Veldig bra! Du gjorde nesten alle riktige valg. Du er så nær perfeksjon! Prøv igjen for å nå toppen!"
          : "Great job! You made almost all the right choices. You're so close to perfection! Try again to reach the top!"
        : stars === 3
        ? language === "norwegian"
          ? "God innsats! Du gjorde mange gode valg. Du har et godt grunnlag! Prøv igjen for å forbedre deg enda mer!"
          : "Good effort! You made many good choices. You have a solid foundation! Try again to improve even more!"
        : stars === 2
        ? language === "norwegian"
          ? "Bra jobbet! Du har gjort noen gode valg. Du lærer raskt! Prøv igjen for å se hvor mye bedre du kan bli!"
          : "Well done! You made some good choices. You're learning quickly! Try again to see how much better you can get!"
        : stars === 1
        ? language === "norwegian"
          ? "God start! Du har tatt noen gode valg. Dette er bare begynnelsen! Prøv igjen for å bygge videre på det du har lært!"
          : "Good start! You made some good choices. This is just the beginning! Try again to build on what you've learned!"
        : language === "norwegian"
        ? "Flott innsats! Dette er en fantastisk mulighet til å lære og vokse. Prøv igjen, og se hvor mye du kan forbedre deg!"
        : "Great effort! This is a wonderful opportunity to learn and grow. Try again and see how much you can improve!";

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
          <Text style={styles.info}>{feedbackText}</Text>
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

        {/* New Feedback Reminder */}
        <View style={styles.feedbackReminderContainer}>
          <Text style={styles.feedbackReminderText}>
            {language === "norwegian"
              ? "Ikke glem å legge igjen en tilbakemelding"
              : "Don't forget to leave a feedback"}
          </Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>↓</Text> {/* Diagonal arrow pointing to the feedback icon */}
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (currentCase === "end") {
      return renderEndScreen();
    }

    if (currentCase === "feedback") {
      return (
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust offset for iOS
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              <Text style={styles.title}>
                {language === "norwegian" ? "Tilbakemelding" : "Feedback"}
              </Text>
              <TextInput
                style={styles.feedbackInput}
                placeholder={
                  language === "norwegian"
                    ? "Skriv generelle tilbakemeldinger her..."
                    : "Write general feedback here..."
                }
                placeholderTextColor="#888"
                value={feedback}
                onChangeText={setFeedback}
                multiline
              />
              <TextInput
                style={styles.feedbackInput}
                placeholder={
                  language === "norwegian"
                    ? "Skriv forslag til nye cases her..."
                    : "Write suggestions for new cases here..."
                }
                placeholderTextColor="#888"
                value={caseSuggestions}
                onChangeText={setCaseSuggestions}
                multiline
              />
              <TouchableOpacity style={styles.button} onPress={submitFeedback}>
                <Text style={styles.buttonText}>
                  {language === "norwegian" ? "Send tilbakemelding" : "Submit Feedback"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.goBackButton]}
                onPress={() => setCurrentCase("welcome")}
              >
                <Text style={styles.buttonText}>
                  {language === "norwegian" ? "Gå tilbake" : "Go Back"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    }

    const caseData = storyData[language][currentCase];
    if (!caseData) {
      return null; // Ensure no rendering errors occur
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

          {/* Feedback Reminder on Welcome Page */}
          <View style={styles.feedbackReminderContainer}>
            <Text style={styles.feedbackReminderText}>
              {language === "norwegian"
                ? "Ikke glem å legge igjen en tilbakemelding"
                : "Don't forget to leave a feedback"}
            </Text>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>↓</Text> {/* Arrow pointing to the feedback icon */}
            </View>
          </View>

          {/* QR Code Reminder on Welcome Page */}
          <View style={styles.qrReminderContainer}>
            <Text style={styles.qrReminderText}>
              {language === "norwegian" ? "QR-kode" : "QR-code"}
            </Text>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>↓</Text> {/* Arrow pointing to the QR code icon */}
            </View>
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
            <VideoPlayer videoSource={caseData.video} styles={styles} onHideVideo={() => setShowVideo(false)} />
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
                {language === "norwegian" ? "Neste case" : "Next Case"}
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

      {/* Home Button */}
      <Pressable
        style={styles.homeButton}
        onPress={() => setCurrentCase("welcome")} // Navigate to the home menu
      >
        <Ionicons
          name="home" // House icon
          size={24}
          color={theme === "light" ? "#333" : "#FFD700"} // Adjust color based on theme
        />
      </Pressable>

      {/* Theme Toggle Button */}
      <Pressable
        style={styles.themeToggleButton}
        onPress={() => {
          const newTheme = theme === "light" ? "dark" : "light";
          setTheme(newTheme);
        }}
      >
        <Ionicons
          name={theme === "light" ? "moon" : "sunny"}
          size={24}
          color={theme === "light" ? "#333" : "#FFD700"}
        />
      </Pressable>

      {/* Feedback Button */}
      <Pressable
        style={styles.feedbackButton}
        onPress={() => {
          // Navigate to the feedback section or open a modal
          setCurrentCase("feedback");
        }}
      >
        <Ionicons
          name="chatbubble-ellipses" // Feedback icon
          size={24}
          color={theme === "light" ? "#333" : "#FFD700"} // Adjust color based on theme
        />
      </Pressable>

      {/* QR Code Icon */}
      <Pressable
        style={styles.qrButton}
        onPress={() => setIsQrVisible(true)} // Show the QR code pop-up
      >
        <Ionicons
          name="qr-code" // QR code icon
          size={24}
          color={theme === "light" ? "#333" : "#FFD700"} // Adjust color based on theme
        />
      </Pressable>

      {/* QR Code Pop-Up */}
      <Modal
        visible={isQrVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsQrVisible(false)} // Close the pop-up
      >
        <ScrollView contentContainerStyle={styles.qrModalContainer}>
          <View style={styles.qrModal}>
            <Text style={styles.qrModalText}>
              {language === "norwegian" ? "Skann QR-koden med kameraet for å åpne" : "Scan the QR code with the camera to open"}
            </Text>
            <View style={styles.qrCodeWrapper}>
              <Image
                source={require('./assets/qr-code.png')} // Replace with your QR code image
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>
            <TouchableOpacity
              style={styles.qrCloseButton}
              onPress={() => setIsQrVisible(false)} // Close the pop-up
            >
              <Text style={styles.qrCloseButtonText}>
                {language === "norwegian" ? "Lukk" : "Close"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* Render the rest of the app */}
      {renderContent()}
    </View>
  );
};

const getStyles = (width, height, orientation, theme) => {
  return StyleSheet.create({
    // ...existing styles...

    qrButton: {
      position: "absolute",
      bottom: 20, // Position at the bottom
      left: 20, // Position at the left
      backgroundColor: theme === "light" ? "#FFFFFF" : "#444444", // Adjust background color based on theme
      borderRadius: 25,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 10, // Ensure the button is on top of other elements
    },
    qrModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    qrModal: {
      width: "90%", // Adjust width to fit the screen
      maxWidth: 400, // Set a maximum width for larger screens
      backgroundColor: theme === "light" ? "#FFFFFF" : "#333333",
      borderRadius: 15,
      padding: 20,
      alignItems: "center",
      justifyContent: "center", // Center content inside the modal
    },
    qrModalText: {
      fontSize: 16,
      color: theme === "light" ? "#333" : "#FFFFFF",
      marginBottom: 20,
      textAlign: "center",
    },
    qrCodeWrapper: {
      width: "100%", // Ensure the QR code takes up the full width of the modal
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20, // Add space below the QR code
    },
    qrImage: {
      width: "80%", // Adjust the size of the QR code
      aspectRatio: 1, // Maintain a square aspect ratio
    },
    qrCloseButton: {
      backgroundColor: theme === "light" ? "#2196F3" : "#BB86FC",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      alignSelf: "center", // Center the button
    },
    qrCloseButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme === "light" ? "#F5F5F5" : "#181818",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "flex-start", // Align content to the top
      alignItems: "center",
      paddingTop: orientation === "PORTRAIT" ? height * 0.1 : height * 0.05, // Add padding at the top
    },
    centeredContainer: {
      flex: 1,
      justifyContent: "flex-start", // Align content to the top
      alignItems: "center",
      backgroundColor: theme === "light" ? "#F5F5F5" : "#181818",
      padding: width * 0.03,
      paddingTop: orientation === "PORTRAIT" ? height * 0.1 : height * 0.05, // Add padding at the top
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
      marginTop: orientation === "PORTRAIT" ? height * 0.05 : height * 0.02, // Add margin to push the card down
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
      fontSize: Math.min(width, height) * 0.03, // Adjust font size dynamically
      textAlign: "center",
      color: theme === "light" ? "#444" : "#DDDDDD", // Adjust text color based on theme
      marginBottom: orientation === "PORTRAIT" ? height * 0.005 : height * 0.01, // Reduce margin in portrait mode
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
      width: "100%", // Full width of the screen
      height: Math.min(width * (9 / 16), height * 0.8), // Maintain 16:9 aspect ratio, cap at 90% of window height
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden", // Prevent content from overflowing
    },
    video: {
      width: "100%", // Full width of the container
      height: "100%", // Full height of the container
      resizeMode: "cover", // Ensure the video scales proportionally to fit within the container
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
    homeButton: {
      position: "absolute",
      top: 20, // Position at the top
      left: 20, // Position at the left
      backgroundColor: theme === "light" ? "#FFFFFF" : "#444444", // Adjust background color based on theme
      borderRadius: 25,
      padding: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      zIndex: 10, // Ensure the button is on top of other elements
    },
    feedbackButton: {
      position: "absolute",
      bottom: 20, // Position at the top
      right: 20, // Position to the left of the theme toggle button
      backgroundColor: theme === "light" ? "#FFFFFF" : "#444444", // Adjust background color based on theme
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
    hideVideoButton: {
      position: "absolute",
      bottom: 10, // Position the button at the bottom
      left: 10, // Position the button at the left
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black background
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      zIndex: 10, // Ensure the button is above the video
    },
    hideVideoButtonText: {
      color: "white", // White text for visibility
      fontSize: 14,
      fontWeight: "bold",
    },
    feedbackInput: {
      width: "90%",
      height: 100,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: theme === "light" ? "#FFFFFF" : "#333333",
      color: theme === "light" ? "#000000" : "#FFFFFF",
      textAlignVertical: "top", // Align text to the top
    },
    feedbackReminderContainer: {
      position: "absolute",
      bottom: 80, // Adjust position to align with the feedback icon
      right: 20, // Adjust position to align with the feedback icon
      alignItems: "flex-end", // Align text and arrow to the right
    },
    feedbackReminderText: {
      fontFamily: "IndieFlower-Regular", // Use the Indie Flower font
      fontSize: Math.min(width, height) * 0.03, // Scale font size dynamically
      fontWeight: "bold", // Make the text bold
      color: theme === "light" ? "#FF4500" : "#FFD700", // Bright orange for light mode, gold for dark mode
      textShadowColor: "rgba(0, 0, 0, 0.5)", // Add a subtle shadow
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset
      textShadowRadius: 4, // Shadow blur radius
      marginBottom: 5, // Space above the arrow
    },
    arrowContainer: {
      alignItems: "flex-end", // Align the arrow to the right
    },
    arrow: {
      fontSize: Math.min(width, height) * 0.05, // Scale arrow size dynamically
      color: theme === "light" ? "#FF4500" : "#FFD700", // Match the text color
      textShadowColor: "rgba(0, 0, 0, 0.5)", // Add a subtle shadow to the arrow
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset
      textShadowRadius: 4, // Shadow blur radius
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    qrReminderContainer: {
      position: "absolute",
      bottom: 80, // Adjust position to align above the QR code icon
      left: 20, // Align with the QR code icon
      alignItems: "flex-start", // Align text and arrow to the left
    },
    qrReminderText: {
      fontFamily: "IndieFlower-Regular", // Use the Indie Flower font
      fontSize: Math.min(width, height) * 0.03, // Scale font size dynamically
      fontWeight: "bold", // Make the text bold
      color: theme === "light" ? "#FF4500" : "#FFD700", // Match the feedback reminder color
      textShadowColor: "rgba(0, 0, 0, 0.5)", // Add a subtle shadow
      textShadowOffset: { width: 2, height: 2 }, // Shadow offset
      textShadowRadius: 4, // Shadow blur radius
      marginBottom: 5, // Space above the arrow
    },
  });
};

export default App;