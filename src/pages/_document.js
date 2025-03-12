import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Favicon Link */}
          <link rel="icon" href="/logo.png" type="image/x-icon" />
          {/* Optional: You can add multiple sizes/formats for better compatibility */}
          <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
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
