import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { organizationRoutes } from './routes/organization.routes';
import { ticketRoutes } from './routes/ticket.routes';
import { knowledgeBaseRoutes } from './routes/knowledgeBase.routes';
import { onboardingRoutes } from './routes/onboading.routes';
import { invitationRoutes } from './routes/invitation.routes';

// Load environment variables
config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/knowledge-base', knowledgeBaseRoutes);
app.use('/api/onboarding', onboardingRoutes);
app.use('/api/invitations', invitationRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});