import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
    marginBottom: 20,
  },

  text: {
    margin: 5,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
  },

  questionContainer: {
    width: "100%",
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,

    display: "flex",
    flexDirection: "row",
    padding: "50px 10px 10px 10px",
  },
  question: {
    fontWeight: "bold",
    width: "100px",
  },
  questionContent: {
    width: "500",
    wordWrap: "break-word",
  },

  answerContainer: {
    width: "100%",
    borderBottom: "0.5px thin grey",
    fontSize: 12,
    fontFamily: "Times-Roman",
    lineHeight: 1.5,
    color: "grey",

    display: "flex",
    flexDirection: "row",
    padding: "10px 10px 50px 10px",
  },
  answer: {
    fontWeight: "bold",
    color: "black",
    width: "100px",
  },
  answerContent: {
    width: "500",
    wordWrap: "break-word",
  },

  header: {
    fontSize: 12,
    marginBottom: 25,
    textAlign: "center",
    color: "grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  link: {
    // fontSize: 11,
    // marginTop: 10,
    // color: 'black',
    marginBottom: 20,
    // textAlign: 'center',
    color: "grey",
    textDecoration: "none",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export const ToolsPDFExport = (response: string, title: string) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header} fixed>
          <Link style={styles.link} src="https://askyourpdf.com">
            {" "}
            ~ Visit AskYourPDF.com ~{" "}
          </Link>
        </View>
        <Text style={styles.title}>{title} Generated From AskYourPDF</Text>
        <View>
          <View style={styles.answerContainer}>
            <Text style={styles.answerContent}>{response}</Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
