-- Create tables and initial data for NovaCRM
-- This script will be executed to set up the database schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The schema will be created by Prisma migrations
-- This file serves as documentation of the database structure

-- URL Shortener Tables:
-- - links: Store shortened URLs with analytics
-- - link_analytics: Track clicks and visitor data

-- CRM Tables:
-- - users: Core user accounts
-- - employees: Employee profiles and HR data
-- - projects: Project management
-- - project_assignments: Many-to-many project assignments
-- - invoices: Financial invoicing
-- - payrolls: Payroll management
-- - leave_requests: Leave management system
-- - job_openings: Recruitment job postings
-- - candidates: Job applicants
-- - notifications: User notifications

-- Run: npm run db:push to create tables
-- Run: npm run db:seed to populate with sample data
