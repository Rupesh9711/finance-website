// src/pages/MainHomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EMICalculator from '../components/EMICalculator';

function FocusCard({ title, items, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`bg-gray-100 rounded-2xl shadow p-8 flex-1 px-4 py-2 transition ${
        hovered ? 'bg-gray-200 shadow-2xl scale-105' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900">{title}</h3>
      <ul className="space-y-3 transition rounded px-2 py-1">
        {items.map((item, idx) => (
          <li key={idx}>{icon} {item}</li>
        ))}
      </ul>
    </div>
  );
}

// Receive isLoggedIn and handleLogout as props
function MainHomePage({ isLoggedIn, handleLogout }) {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div>
            <div className="text-2xl font-bold text-gray-900">Finsight</div>
            <div className="text-sm text-gray-500 font-medium">Clarity Through Systems</div>
          </div>
          <nav className="flex space-x-8">
            <a href="#home" className="text-gray-700 font-semibold hover:text-blue-500 transition">Home</a>
            <a href="#who" className="text-gray-700 font-semibold hover:text-blue-500 transition">Who We Help</a>
            <a href="#tools" className="text-gray-700 font-semibold hover:text-blue-500 transition">Tools</a>
            <a href="#blog" className="text-gray-700 font-semibold hover:text-blue-500 transition">Blog</a>
            {/* Conditionally render Login or Logout button */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout} // Calls handleLogout on click
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Login
                </button>
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white" id="home">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
          Stop Guessing.<br />Start Systemizing Your Wealth.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl">
          Finsight is your calm, intelligent command center to defeat debt, build wealth, and achieve financial clarity in India.
        </p>
        <a href="#tools">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-600 transition">
            Try Our Free Tools
          </button>
        </a>
      </section>

      {/* Focus Section (no changes) */}
      <section className="max-w-5xl mx-auto py-16 px-4" id="who">
        <h2 className="text-3xl font-bold text-center mb-2">Our Focus</h2>
        <p className="text-center text-gray-500 text-lg mb-8">Designed for the Modern Indian Professional</p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <FocusCard
            title="The Struggle is Real"
            icon="✗"
            items={[
              "Feeling trapped by debt & confusing EMIs",
              "Overwhelmed by financial news & advice",
              "Lacking a personalized plan you can trust"
            ]}
          />
          <FocusCard
            title="Your Desired Future"
            icon="✓"
            items={[
              "Achieving true financial stability & freedom",
              "Building a predictable, automated wealth system",
              "Making confident money decisions with clarity"
            ]}
          />
        </div>
      </section>

      {/* Toolkit Section */}
      <section className="py-16 px-4 bg-white" id="tools">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">MVP Toolkit</h2>
          <p className="text-lg text-gray-500 mb-1">Your Financial Toolkit</p>
          <p className="text-lg text-gray-500">Practical tools to help you make informed decisions. More coming soon.</p>
        </div>
        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 rounded-2xl shadow p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-2 text-gray-900">EMI Calculator</h3>
            <p className="text-gray-700 mb-2">Access the EMI calculator by logging in.</p>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section - CONDITIONAL RENDERING */}
      <section className="max-w-5xl mx-auto py-16 px-4 flex justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            {isLoggedIn ? ( // Render EMICalculator only if logged in
              <EMICalculator />
            ) : (
              <div className="text-center p-8 bg-blue-50 rounded-lg shadow-inner">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Login to use the EMI Calculator!</h3>
                <p className="text-blue-700 mb-6">Unlock powerful financial tools by logging into your Finsight account.</p>
                <Link to="/login">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                    Go to Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section (no changes) */}
      <section className="bg-white py-16 px-4" id="blog">
        <h2 className="text-3xl font-bold text-center mb-2">Insights & Strategies</h2>
        <p className="text-center text-gray-500 text-lg mb-8">
          From the Blog<br />Actionable advice to help you build your financial system.
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <div className="bg-gray-100 rounded-2xl shadow-lg p-8 flex-1 max-w-lg">
            <img src="https://images.unsplash.com/photo-1515165562835-cf7747d3bdfc?auto=format&fit=crop&w=600&q=80" alt="Debt Trap" className="rounded-xl w-full h-48 object-cover mb-4" />
            <div className="text-gray-700 font-bold text-sm mb-2">DEBT ELIMINATION</div>
            <div className="text-xl font-semibold mb-2">How to Escape the Debt Trap: A Step-by-Step Guide</div>
            <div className="text-gray-700">
              Struggling with debt? Learn actionable steps to break free from the debt cycle. Understand your loans, prioritize repayments, and build habits that keep you out of debt for good. This guide walks you through practical strategies to regain control and achieve financial peace.
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl shadow-lg p-8 flex-1 max-w-lg">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Salary Use" className="rounded-xl w-full h-48 object-cover mb-4" />
            <div className="text-gray-700 font-bold text-sm mb-2">SALARY USE</div>
            <div className="text-xl font-semibold mb-2">Smart Salary Use: A Framework for Your First Paycheck</div>
            <div className="text-gray-700">
              Just started earning? Discover how to divide your salary for needs, wants, and savings. Build a strong foundation for your financial journey by making smart choices from your very first paycheck. Learn the 50/30/20 rule and how to automate your savings.
            </div>
          </div>
          <div className="bg-gray-100 rounded-2xl shadow-lg p-8 flex-1 max-w-lg">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80" alt="Investing" className="rounded-xl w-full h-48 object-cover mb-4" />
            <div className="text-gray-700 font-bold text-sm mb-2">INVESTING</div>
            <div className="text-xl font-semibold mb-2">First-Time Investing: Where to Begin Without Feeling Overwhelmed</div>
            <div className="text-gray-700">
              New to investing? This article helps you start with confidence. Learn the basics of mutual funds, SIPs, and how to set realistic goals. Avoid common mistakes and take your first steps toward building long-term wealth, even if you have no prior experience.
            </div>
          </div>
        </div>
      </section>

      {/* Footer (no changes) */}
      <footer className="bg-white border-t mt-16 py-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Finsight. All rights reserved.
      </footer>
    </div>
  );
}

export default MainHomePage;