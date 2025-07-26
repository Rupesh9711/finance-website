# finance-website
# React Finance Website – EMI Calculator

A modern finance website built using **React.js**, featuring an interactive and accurate EMI (Equated Monthly Installment) calculator. This tool allows users to compute monthly loan payments and understand the total cost of borrowing with ease.

## Features

- Clean and responsive UI using React
- Real-time EMI calculations
- Instant update of:
  - Monthly EMI
  - Total Interest Payable
  - Total Payment (Principal + Interest)

## Tech Stack

- **React.js** – component-based architecture
- **JavaScript (ES6+)** – for logic and state management
- **CSS3** – custom styling and responsiveness
- **Vite / Create React App** – for setup and fast development

## EMI Formula

The EMI is calculated using the formula:

\[
EMI = \frac{P \cdot R \cdot (1+R)^N}{(1+R)^N - 1}
\]

Where:  
- `P` = Principal amount  
- `R` = Monthly interest rate (Annual Rate / 12 / 100)  
- `N` = Total number of monthly installments (years × 12)


