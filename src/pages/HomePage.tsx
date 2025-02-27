import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/UI/Card";
import Button from "../components/UI/Button";
import Counter from '../components/Counter/Counter';

// Icons (import your preferred icon library)
import { FiUser, FiEdit, FiPieChart, FiArrowRight } from "react-icons/fi";

const PageContainer = styled.div`
  padding: 100px 24px 60px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 90px 16px 40px;
  }
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 60px;
`;

// Keep as regular h1 (not motion.h1)
const GradientTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #4318ff 0%, #868cff 60%, #a3aed0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #a3aed0;
  max-width: 700px;
  margin: 0 auto 32px;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Keep as regular Card (not motion)
const FeatureCard = styled(Card)`
  height: 100%;
`;

const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background: rgba(67, 24, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  color: #4318ff;
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #fff;
`;

const FeatureDescription = styled.p`
  color: #a3aed0;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const CounterSection = styled.div`
  margin: 60px 0;
  padding: 40px;
  border-radius: 24px;
  background: linear-gradient(
    120deg,
    rgba(17, 20, 39, 0.8) 0%,
    rgba(26, 31, 55, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const CounterSectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  color: #fff;
`;

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "React App - Home";
  }, []);

  return (
    <PageContainer>
      <HeroSection>
        <GradientTitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            React App Assignment
          </motion.div>
        </GradientTitle>
        <Subtitle>
          A modern React application with counter, user data form, and rich text
          editors. Utilizing Material UI, React Spring, TypeScript, and more.
        </Subtitle>
        <Link to="/dashboard">
          <Button size="lg" icon={<FiPieChart />}>
            Explore Dashboard
          </Button>
        </Link>
      </HeroSection>

      <FeaturesGrid>
        <FeatureCard variant="glass">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FeatureIcon>
              <FiUser />
            </FeatureIcon>
            <FeatureTitle>User Form</FeatureTitle>
            <FeatureDescription>
              Create and manage user profiles with our intuitive form. Data is
              stored locally and protected against accidental closing for easy access.
            </FeatureDescription>
            <Link to="/form">
              <Button
                variant="secondary"
                icon={<FiArrowRight />}
                fullWidth
              >
                Go to Form
              </Button>
            </Link>
          </motion.div>
        </FeatureCard>

        <FeatureCard variant="glass">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <FeatureIcon>
              <FiEdit />
            </FeatureIcon>
            <FeatureTitle>Rich Text Editor</FeatureTitle>
            <FeatureDescription>
              Format and style your text with our powerful rich text editor.
              Includes bold, italic, underline, and list formatting options.
            </FeatureDescription>
            <Link to="/editor">
              <Button
                variant="secondary"
                icon={<FiArrowRight />}
                fullWidth
              >
                Try Editor
              </Button>
            </Link>
          </motion.div>
        </FeatureCard>

        <FeatureCard variant="glass">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FeatureIcon>
              <FiPieChart />
            </FeatureIcon>
            <FeatureTitle>Data Visualization</FeatureTitle>
            <FeatureDescription>
              View your data with beautiful charts and visualizations. The
              dashboard provides insights on user profiles and counter usage.
            </FeatureDescription>
            <Link to="/dashboard">
              <Button
                variant="secondary"
                icon={<FiArrowRight />}
                fullWidth
              >
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </FeatureCard>
      </FeaturesGrid>

      <CounterSection>
        <CounterSectionTitle>Try the Counter Component</CounterSectionTitle>
        <Counter />
      </CounterSection>
    </PageContainer>
  );
};

export default HomePage;