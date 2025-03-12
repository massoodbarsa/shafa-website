import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Iranian Doctors Hub</title>
          {/* Favicon Link */}
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          {/* Optional: You can add multiple sizes/formats for better compatibility */}
          <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
