# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ac2bd4f9-405e-483a-9623-5bef286d720e

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


# Trade Sage

## Overview

Trade Sage is an advanced, AI-powered trading analysis platform designed to give traders a competitive edge. It leverages a powerful REST API backend to deliver a suite of tools that help users identify optimal entry and exit points, analyze market conditions, and act on real-time insights. The platform combines technical analysis, trading signals, pattern recognition, and market sentiment data with economic calendar integration and personalized trading setups. With a modern, intuitive UI that puts actionable intelligence at the forefront, Trade Sage is built to disrupt traditional trading paradigms by empowering users with data-driven decision-making.

## Table of Contents

- [Features](#features)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Core Analytics](#core-api)
  - [Signals](#signals-api)
  - [Insights](#insights-api)
  - [Calendar](#calendar-api)
  - [Setups](#setups-api)
  - [Notifications](#notifications-api)
  - [Dashboard](#dashboard-api)
- [External Integrations](#external-integrations)
- [Development](#development)

## Features

### Core Trading Features

- **Trading Pairs Management**: Track and analyze numerous forex trading pairs
- **User Accounts & Profiles**: Personalized trading preferences and settings
- **Trade Management**: Record and analyze trading history

### Technical Analysis

- **Customizable Indicator Sets**: Create sets of weighted technical indicators for signal generation
- **Backtesting Engine**: Test indicator performance on historical data
- **Performance Analytics**: Win rate, profit factor, Sharpe ratio, and other metrics

### Pattern Recognition

- **Chart Pattern Detection**: Identify key patterns like Head & Shoulders, Double Tops/Bottoms, etc.
- **Candlestick Patterns**: Recognize and interpret candlestick formations
- **Trend Analysis**: Automated trend identification and analysis

### AI-Powered Insights

- **Trading Recommendations**: AI-generated entry/exit points with confidence scores
- **Risk Assessment**: Stop loss and take profit recommendations with risk/reward analysis
- **Market Analysis**: Contextual analysis of market conditions

### Market Sentiment Analysis

- **News Sentiment**: Analysis of financial news coverage for trading pairs
- **Social Media Sentiment**: Monitoring of social media sentiment indicators
- **Institutional Positioning**: Tracking of institutional investment positions
- **Composite Sentiment**: Combined sentiment scores from multiple sources

### Economic Calendar

- **Economic Events Tracking**: Comprehensive calendar of market-moving economic releases
- **Impact Analysis**: Rating system for event impact on specific currency pairs
- **Customizable Alerts**: User-defined notification settings for important events

### Trading Setups

- **Custom Setup Creation**: Save personal trading strategies and setups
- **Setup Sharing**: Community sharing of successful trading approaches
- **Setup Categorization**: Organization by pattern type, timeframe, and strategy

### Notifications System

- **Signal Alerts**: Notifications for new trading signals
- **Price Alerts**: Customizable price movement notifications
- **Economic Calendar Alerts**: Reminders for upcoming economic events
- **Multi-Channel Delivery**: Email and push notification support


### Project Structure

```
trade_sage_backend/
├── trade_sage_backend/        # Project package
│   ├── core/                  # Core functionality
│   ├── signals/               # Trading signals
│   ├── insights/              # AI insights and analysis
│   ├── calendar/              # Economic calendar
│   ├── setups/                # Saved trading setups
│   ├── notifications/         # Notifications system
│   ├── settings.py            # Project settings
│   ├── urls.py                # Main URL routing
│   ├── celery.py              # Celery configuration
│   └── wsgi.py                # WSGI configuration
├── manage.py                  # Django management script
└── requirements.txt           # Project dependencies
```

### Background Tasks

Trade Sage uses Celery for background tasks:

- Periodic backtesting of indicator sets
- Economic calendar synchronization
- Sentiment analysis updates
- Price alert monitoring
- Notification sending


## License

This project is proprietary and confidential. All rights reserved. This Project utilizes BUSL-1.1.

For questions or support, contact: agbanusijohn@gmail.com
