import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  Container,
} from "@mui/material";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";

const Homepage = () => {
  const router = useRouter();

  return (
    <>
      {/* Later on featured doctores should land here .use getServerSideProps */}
      <NextSeo
        title="Find Farsi-speaking Doctors for Iranians Abroad"
        description="Our platform connects Iranians living outside of Iran with Farsi-speaking doctors, making healthcare more accessible and personalized."
        openGraph={{
          url: "https://www.yourwebsite.com", // Replace with your homepage URL
          title: "Find Farsi-speaking Doctors for Iranians Abroad",
          description:
            "Our platform connects Iranians living outside of Iran with Farsi-speaking doctors, making healthcare more accessible and personalized.",
          images: [
            {
              url: "https://www.yourwebsite.com/images/hero-banner.jpg", // Replace with your image URL
              width: 1200,
              height: 630,
              alt: "Doctors Connecting with Iranians Abroad",
            },
          ],
          site_name: "Your Platform Name", // Replace with your platform name
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Iranian Doctors Hub", // Replace with your platform's name
          url: "https://www.iraniandoctorshub.com", // Replace with your website's URL
          logo: "https://www.iraniandoctorshub.com/logo.png", // Replace with your logo URL
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+31-123-456-7890", // Replace with your contact number
            contactType: "customer service",
            areaServed: "Worldwide", // You can change this to specific countries or regions
            availableLanguage: "Farsi, English", // Add languages available for customer support
          },
        }}
      />

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" py={10}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Find Trusted Farsi-Speaking Doctors Near You
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Connect with verified professionals for your healthcare needs.
          </Typography>
          <Box sx={{ width: "100%", position: "relative", height: 300, mt: 2 }}>
            <Image
              src="/main.jpeg"
              alt="Doctor"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Box>

        {/* Why Choose Us */}
        <Box py={5} textAlign="center">
          <Typography variant="h4" fontWeight={600} gutterBottom>
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
                    <Typography variant="h6" fontWeight={500}>
                      {item}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Doctors */}
        {/* <Box py={5}>
        <Typography
          variant="h4"
          fontWeight={600}
          textAlign="center"
          gutterBottom
        >
          Featured Doctors
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ py: 2, overflow: "visible" }}
        >
          {[1, 2, 3].map((id) => (
            <Grid item xs={12} sm={4} key={id}>
              <Card
                sx={{
                  transition: "0.3s",
                  border: "1px solid transparent",
                  height: "100%",
                  transformOrigin: "center center",
                  overflow: "visible",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
                  <Typography variant="h6">Doctor Name</Typography>
                  <Typography color="textSecondary">Specialty</Typography>
                  <Button size="small" sx={{ mt: 2 }}>
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}

        {/* Testimonials */}
        {/* <Box py={5} textAlign="center">
        <Typography variant="h4" fontWeight={600} gutterBottom>
          What Our Users Say
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ py: 2, overflow: "visible" }}
        >
          {[
            "Great platform!",
            "Helped me find a doctor!",
            "Highly recommend!",
          ].map((review, index) => (
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
                  <Typography variant="body1">"{review}"</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box> */}

        {/* How It Works */}
        <Box py={5} textAlign="center">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            How It Works
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ py: 2, overflow: "visible" }}
          >
            {[
              "Search & Find",
              "Read & Leave Reviews",
              "See Specialist Profile",
            ].map((step, index) => (
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
                    <Typography variant="h6" fontWeight={500}>
                      {step}
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
