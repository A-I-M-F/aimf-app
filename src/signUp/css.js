import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    logo: {
      width:60,
      height: 60,
    },
    inputItem: {
        marginBottom: 15,
        marginLeft: "auto",
        marginRight: "auto",
        paddingHorizontal: 10,
        paddingLeft: 5,
        width: 300,
        borderRadius: 10,
        height:45,
        backgroundColor:"#FFF"
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
    },
    input: {
        fontSize: 15,
        paddingLeft:10,
    },
    registerButton: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 150,
        borderRadius: 10,
        backgroundColor: "#cc9871",
        marginTop: 35,
        marginLeft: "auto",
        marginRight: "auto",
    },
    nextButtonText: {
        fontSize: 18,
        color: "#fff"
    },

    loginLink: {
        marginTop: 30,
        marginBottom: 50,
        marginLeft: "auto",
        marginRight: "auto",
    },

    green:  {
        color : "green"
    },
    red:  {
        color : "red"
    },

    datePicker: {
        color: "#f3aa2329"
    }
});