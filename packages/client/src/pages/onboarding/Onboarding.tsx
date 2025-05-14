import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { OnboardingStep } from '../../types';
import { useAuthStore } from '../../stores/authStore';

// Step components
import CreateOrganization from './steps/CreateOrganization';
import AddUsers from './steps/AddUsers';
import CreateFirstTicket from './steps/CreateFirstTicket';
import OnboardingComplete from './steps/OnboardingComplete';

const Onboarding = () => {
  const { currentStep, isCompleted } = useOnboardingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(`Here`)
    // If onboarding is completed, redirect to dashboard
    if (isCompleted) {
      navigate('/dashboard');
    }
    
    // If user is not logged in, redirect to login
    // if (!user) {
    //   navigate('/login');
    // }
  }, [isCompleted, user, navigate]);
  
  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case OnboardingStep.SETUP_ORGANIZATION:
        return <CreateOrganization />;
      case OnboardingStep.ADD_USERS:
        return <AddUsers />;
      case OnboardingStep.CREATE_FIRST_TICKET:
        return <CreateFirstTicket />;
      case OnboardingStep.COMPLETED:
        return <OnboardingComplete />;
      default:
        return <CreateOrganization />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to NexSupport
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's get your account set up in just a few steps
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {currentStep === OnboardingStep.COMPLETED 
                  ? 'Completed!' 
                  : `Step ${currentStep + 1} of 3`
                }
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(((currentStep) / 3) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                style={{ width: `${Math.round(((currentStep) / 3) * 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Current step */}
          <div className="animate-fade-in">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;