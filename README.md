# Cyber Guardian Africa

A gamified cybersecurity education platform designed specifically for autistic children in Sub-Saharan Africa, focusing on cultural relevance, accessibility, and engaging learning experiences.

## Project Overview

Cyber Guardian Africa aims to teach essential cybersecurity skills through:

- Age-appropriate, culturally-relevant storytelling
- Interactive quizzes and challenges
- Comprehensive accessibility features for autistic children
- Culturally specific illustrations and narratives

The platform is built with React, TypeScript, and Tailwind CSS, using Redux for state management and Framer Motion for smooth, accessible animations.

## Features

- **Culturally Relevant Content**: Stories and visuals set in familiar African contexts
- **Autism-Friendly Design**: Customizable sensory settings including reduced animations, high contrast mode, and font sizing
- **Age-Appropriate Learning**: Content tailored for 6-10 and 11-15 age groups
- **Interactive Missions**: Engaging storylines followed by knowledge-checking quizzes
- **Progress Tracking**: Visual indicators of mission completion and learning progress

## Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/masneltef/cyber-guardian-africa.git
   cd cyber-guardian-africa
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
cyber-guardian-africa/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── common/      # Shared components like buttons, loaders
│   │   ├── layout/      # Layout components (headers, navigation)
│   │   ├── missions/    # Mission-related components
│   │   ├── quiz/        # Quiz components
│   │   ├── rewards/     # Reward system components
│   │   └── settings/    # Accessibility settings components
│   ├── context/         # React context providers
│   ├── features/        # Redux sl
