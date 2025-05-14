import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useOnboardingStore } from "../../../stores/onboardingStore";
import Button from "../../../components/ui/Button";

const OnboardingComplete = () => {
  const { completeOnboarding, organization } = useOnboardingStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Mark onboarding as completed in localStorage
    completeOnboarding();
  }, [completeOnboarding]);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-success-50 p-3 rounded-full">
          <CheckCircle className="h-8 w-8 text-success-500" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2">Setup Complete!</h2>

      <p className="text-sm text-gray-600 mb-6">
        {organization.name || "Your organization"} is now ready to use NexSupport
      </p>

      <div className="bg-gray-50 rounded-md p-6 mb-8">
        <h3 className="font-medium text-gray-900 mb-3">What's next?</h3>
        <ul className="text-left text-sm space-y-2 mb-4">
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Explore your dashboard
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Manage your tickets
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Customize your organization settings
          </li>
          <li className="flex items-start">
            <span className="text-primary-500 mr-2">•</span>
            Browse the knowledge base
          </li>
        </ul>
      </div>

      <Button
        fullWidth
        rightIcon={<ArrowRight className="h-4 w-4" />}
        onClick={handleGoToDashboard}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default OnboardingComplete;
