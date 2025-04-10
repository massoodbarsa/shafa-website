import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
} from "@mui/material";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useBreakpointDown from "../hooks/useBreakpointDown.hook";

const Homepage = () => {
  const router = useRouter();
  const isMobile = useBreakpointDown();

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Iranian Doctors Hub",
              url: "https://www.iraniandoctorshub.com", // Replace with your homepage URL
              logo: "https://www.iraniandoctorshub.com/logo.png", // Replace with your logo URL
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                areaServed: "Worldwide", // You can change this to specific countries or regions
                availableLanguage: "Farsi, English", // Add languages available for customer support
              },
              sameAs: ["https://www.instagram.com/i.dr.hub"],
            }),
          }}
        />
      </Head>
      {/* Later on featured doctores should land here .use getServerSideProps */}
      <NextSeo
        title="Find Verified Farsi-Speaking Doctors for Iranians Abroad"
        description="Quickly find trusted, verified Farsi-speaking Iranian doctors worldwide. Connect to the right medical professional for your needs."
        openGraph={{
          url: "https://www.iraniandoctorshub.com", // Replace with your homepage URL
          title: "Find Farsi-speaking doctors for Iranians abroad",
          description:
            "Our platform connects Iranians living outside of Iran with Farsi-speaking doctors, making healthcare more accessible and personalized.",
          images: [
            {
              url: "https://www.iraniandoctorshub.com/logo.jpg", // Replace with your image URL
              width: 1200,
              height: 630,
              alt: "Doctors Connecting with Iranians Abroad",
            },
          ],
          site_name: "Iranian doctors hub", // Replace with your platform name
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          name: "Iranian Doctors Hub",
          url: "https://www.iraniandoctorshub.com",
          logo: "https://www.iraniandoctorshub.com/logo.png",
          sameAs: ["https://www.instagram.com/i.dr.hub"],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Support",
            areaServed: "Worldwide",
            availableLanguage: ["Farsi", "English"],
          },
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              "farsi-speaking doctors, doctor directory, healthcare, medical professionals, find doctors, persian doctors,iranian doctors,persian speaking doctors,iranian outside,iranian abroad",
          },
          {
            name: "robots",
            content: "index, follow",
          },
        ]}
      />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" py={10}>
          <Typography
            variant="h1"
            fontWeight={700}
            gutterBottom
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" }, // Smaller: 28px mobile, 40px desktop
            }}
          >
            Find Trusted Farsi-Speaking Doctors Near You
          </Typography>
          <Typography
            variant="h2"
            color="textSecondary"
            gutterBottom
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" }, // Smaller: 18px mobile, 24px desktop
            }}
          >
            Connect with verified professionals for your healthcare needs.
          </Typography>
          <Box
            sx={{
              width: "100%",
              position: "relative",
              height: 300,
              mt: 2,
              p: 2,
            }}
          >
            <Image
              src="/main.webp"
              alt="Doctor"
              fill
              style={{
                objectFit: "cover",
              }}
            />

            <Image
              src="/logo.png" // Replace with "/logo.webp" if pre-converted
              alt="Contact Us Image"
              loading="lazy"
              width={isMobile ? 50 : 150}
              height={isMobile ? 50 : 150}
              quality={85}
              style={{
                borderRadius: "50%",
                position: "absolute",
                top: 10,
                left: 10,
                boxShadow: "0px 0px 20px 5px rgb(45, 185, 206)",
                // animation: "glow 2s infinite alternate",
                // "@keyframes glow": {
                //   "0%": { boxShadow: "0px 0px 10px 2px rgb(62, 209, 214)" },
                //   "50%": { boxShadow: "0px 0px 20px 5px rgb(54, 216, 94)" },
                //   "100%": { boxShadow: "0px 0px 30px 8px rgb(74, 161, 211)" },
                // },
              }} // Circular like Avatar
            />
          </Box>
        </Box>

        {/* Why Choose Us */}
        <Box py={5} textAlign="center">
          <Typography
            variant="h2"
            fontWeight={600}
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", md: "1.75rem" }, // Smaller: 20px mobile, 28px desktop
            }}
          >
            Why Choose Us?
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ py: 2, overflow: "visible" }}
          >
            {[
              "Verified Doctors",
              "Read & Leave Reviews",
              "Farsi-Speaking Specialists",
            ].map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    p: 3,
                    transition: "0.3s",
                    border: "1px solid transparent",
                    height: "100%",
                    transformOrigin: "center center",
                    overflow: "visible",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 10px 20px rgb(59, 216, 221)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      zIndex: 1,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h3"
                      fontWeight={500}
                      sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }} // 16px mobile, 20px desktop
                    >
                      {item}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box textAlign="center" py={5}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push("/list")}
            sx={{ fontSize: "1.1rem", py: 2, px: 4 }}
          >
            See the List of Doctors
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
