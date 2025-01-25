import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import ThemeContext, { ThemeContextProps } from "../context/ThemeContext";
import Colors from "../components/style/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleText from "../components/elements/TitleText";
import FontStyles from "../components/style/fonts";
import BottomBar from "../components/elements/BottomBar";
import TitleSwitcher from "../components/compound/TitleSwitcher";
import LocalizationContext, { LocalizationContextProps } from "../context/LocalizationContext";
import BottomBarContext, { BottomBarContextProps, BottomBarProvider } from "../context/BottomBarContext";
import { TestScreenProps } from "../types/screens";
import { useTranslation } from "react-i18next";
import Button, { ModalButton } from "../components/elements/Button";

function TestScreen({
    route,
    navigation
}: TestScreenProps): React.JSX.Element {
    return (
        // Only for demo purposes. Please NEVER do this for a single screen, or like, ever.
        <BottomBarProvider>
            <TestScreenInternal route={route} navigation={navigation}/>
        </BottomBarProvider>
    )
}

function TestScreenInternal({
    route,
    navigation
}: TestScreenProps): React.JSX.Element {
    const { theme, isDark } = useContext<ThemeContextProps>(ThemeContext);
    const { locale, setLocale } = useContext<LocalizationContextProps>(LocalizationContext);
    const { setBar, controls, options, hidden } = useContext<BottomBarContextProps>(BottomBarContext);
    const { t } = useTranslation(["common", "settings"]);

    useEffect(() => {
        setBar({
            controls: [
                {
                    icon: "telephone",
                    string: "test"
                },
                {
                    icon: "telephone",
                    string: "test"
                },
                {
                    icon: "telephone",
                    string: "test",
                    disabled: true
                },
                {
                    icon: "telephone",
                    string: "test test",
                },
            ],
            options: [
                {
                    string: t("settings:settings"),
                    onPress: () => {
                        navigation.navigate("SettingsScreen");
                    }
                },
            ],
            hidden: false
        })
    }, [theme, locale])

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors[theme].background,
            height: "100%",
            width: "100%"
        },
        itemContainer: {
            padding: 15,
            paddingBottom: 0,
            flex: 1
        },
        descriptionText: {
            color: Colors[theme].primary,
        },
        accentDescriptionText: {
            color: Colors.accentColor
        }
    });

    return(
        // <BottomBarProvider>
        <View style={styles.container}>
            <View style={styles.itemContainer}>
            <StatusBar
                barStyle={isDark? "light-content": "dark-content"}
                backgroundColor={"#ffffff00"}
                translucent={true}
            />
            <SafeAreaView style={{flex: 1}}>
                <TitleSwitcher/>
                <TitleText text="test screen thingy"/>
                {/* <MetroScroll> */}
                <ScrollView>
                    <Text style={[FontStyles.info, styles.descriptionText]}>
                        This is a <Text style={{ fontWeight: 600 }}>development</Text> screen {"\n"}{"\n"}
                        If you got here, it means something probably went ~very~ wrong {"\n\n"}
                        I'll be honest, some of the things in this file are not the most efficient methods to achieve what I want to do, but they're here just so i can test out more complex situations.
                    </Text>
                    <Button
                        text="MainScreen"
                    />
                    <Button
                        text="Open Test Modal"
                        onPress={() => { navigation.navigate("ModalScreen", { title: "test", subtitle: "hai!!!" }) }}
                    />
                    <Button
                        text="Open Permission Modal"
                        onPress={() => {
                            navigation.navigate("ModalScreen", {
                                title: "Permission required",
                                subtitle: "Metro Dialer needs Phone permissions in order to be able to detect SIMs, as well as start calls.",
                                components: [
                                    <ModalButton text="grant" onPress={() => { navigation.goBack(); }}/>,
                                    <ModalButton text="exit the app" onPress={() => { navigation.goBack(); }}/>
                                ]
                            })
                        }}
                    />
                </ScrollView>
                {/* </MetroScroll> */}
                {/* <Text style={[FontStyles.info, styles.descriptionText]}>this should be <Text style={styles.accentDescriptionText}>below</Text> the scrollview</Text> */}
            </SafeAreaView>
            </View>
            <BottomBar controls={controls} options={options} hidden={hidden}/>
        </View>
        // </BottomBarProvider>
    );
}

export default TestScreen;