import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
    const newsRef = useRef(null);
    const admissionRef = useRef(null);

    const scrollToSection = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth',
        });
    };

    return (
        <StyledContainer>
            <Header>
                <Logo>SEARAMONO SCHOOL</Logo>
                <Nav>
                    <NavItem onClick={() => scrollToSection(aboutRef)}>About</NavItem>
                    <NavItem onClick={() => scrollToSection(contactRef)}>Contact</NavItem>
                    <NavItem onClick={() => scrollToSection(newsRef)}>News</NavItem>
                    <NavItem onClick={() => scrollToSection(admissionRef)}>Admission</NavItem>
                </Nav>
            </Header>

            <HeroSection>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <HeroImage src={Students} alt="students" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <HeroContent>
                            <HeroTitle>
                                Welcome to
                                <br />
                                School Management
                                <br />
                                System
                            </HeroTitle>
                            <HeroText>
                                Streamline school management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </HeroText>
                            <ButtonGroup>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                            </ButtonGroup>
                            <HeroText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{ color: "#550080" }}>
                                    Sign up
                                </Link>
                            </HeroText>
                        </HeroContent>
                    </Grid>
                </Grid>
            </HeroSection>

            <AboutSection ref={aboutRef}>
                <SectionTitle>About Us</SectionTitle>
                <SectionText>
                    Welcome to our School Management System! Our platform is designed to streamline the administration of educational institutions. 
                    With our system, you can easily manage student data, track attendance, organize classes, and much more. 
                    We aim to simplify the management process so that educators can focus on what they do best: teaching.
                </SectionText>
                {/* Add more content here */}
            </AboutSection>

            <NewsSection ref={newsRef}>
                <SectionTitle>Latest News</SectionTitle>
                <SectionText>
                    Stay updated with the latest news and events happening in our school. 
                    From academic achievements to extracurricular activities, 
                    our News section keeps you informed about everything happening in the school community.
                </SectionText>
                {/* Add more content here */}
            </NewsSection>

            <ContactSection ref={contactRef}>
                <SectionTitle>Contact Us</SectionTitle>
                <SectionText>
                    For any inquiries or support, please feel free to reach out to us:
                </SectionText>
                <ContactDetails>
                    <ContactItem>Email: support@schoolmanagementsystem.com</ContactItem>
                    <ContactItem>Phone: +123-456-7890</ContactItem>
                    <ContactItem>Address: 123 Education Lane, Knowledge City, Country</ContactItem>
                </ContactDetails>
                <SocialMediaContainer>
                    <SocialMediaLink href="https://facebook.com">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </SocialMediaLink>
                    <SocialMediaLink href="https://twitter.com">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </SocialMediaLink>
                    <SocialMediaLink href="https://linkedin.com">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </SocialMediaLink>
                    <SocialMediaLink href="https://tiktok.com">
                        <FontAwesomeIcon icon={faTiktok} size="2x" />
                    </SocialMediaLink>
                    <SocialMediaLink href="mailto:support@schoolmanagementsystem.com">
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                    </SocialMediaLink>
                </SocialMediaContainer>
            </ContactSection>

            <AdmissionSection ref={admissionRef}>
                <SectionTitle>Admission</SectionTitle>
                <SectionText>
                    Admission to our school is open for the academic year 2024-2025. 
                    Please visit our Admission page for detailed information on the application process, 
                    required documents, and deadlines. We look forward to welcoming new students to our community.
                </SectionText>
                {/* Add more content here */}
            </AdmissionSection>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f8; /* Light background color */
`;

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #550080; /* Dark background color for header */
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    color: #7f56da;
  }
`;

const HeroSection = styled(Box)`
  display: flex;
  align-items: center;
  padding: 50px 0;
  background-color: #ffffff;
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
`;

const HeroContent = styled(Box)`
  padding: 20px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: #252525;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HeroText = styled.p`
  margin-bottom: 20px; 
  color: #333;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Section = styled(Box)`
  padding: 70px 20px;
  text-align: center;
  width: 100%;
  margin: 20px 0;
  min-height: 600px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #252525;
`;

const SectionText = styled.p`
  color: #333;
`;

const AboutSection = styled(Section)`
  background: linear-gradient(120deg, #f093fb, #f5576c);
  color: #fff;
`;

const NewsSection = styled(Section)`
  background: linear-gradient(120deg, #a1c4fd, #c2e9fb);
  color: #000;
`;

const ContactSection = styled(Section)`
  background: linear-gradient(120deg, #84fab0, #8fd3f4);
  color: #000;
`;

const AdmissionSection = styled(Section)`
  background: linear-gradient(120deg, #fbd3e9, #bb377d);
  color: #fff;
`;

const ContactDetails = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const ContactItem = styled.li`
  margin: 10px 0;
`;

const SocialMediaContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SocialMediaLink = styled.a`
  color: #fff;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }
`;
