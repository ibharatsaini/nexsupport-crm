import React from "react";
import { useForm } from "react-hook-form";
import { Ticket, ArrowRight } from "lucide-react";
import { useOnboardingStore } from "../../../stores/onboardingStore";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";

interface TicketFormData {
  title: string;
  description: string;
}

const CreateFirstTicket = () => {
  const { submitFirstTicket, isLoading, error, setStep } = useOnboardingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    defaultValues: {
      title: "",
      description: "",
      // priority
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    await submitFirstTicket(data.title, data.description);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSkip = () => {
    submitFirstTicket("Getting Started", "My first ticket with NexSupport");
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary-100 p-3 rounded-full">
          <Ticket className="h-8 w-8 text-primary-600" />
        </div>
      </div>

      <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
        Create Your First Ticket
      </h2>

      <p className="text-center text-sm text-gray-600 mb-6">
        Let's create a sample ticket to get you started
      </p>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Ticket Title"
          fullWidth
          placeholder="E.g., Setup account permissions"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
        />

        <TextArea
          label="Description"
          fullWidth
          placeholder="Describe the issue or task in detail..."
          rows={5}
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleBack}>
            Back
          </Button>

          <div className="space-x-3">
            <Button type="button" variant="ghost" onClick={handleSkip}>
              Skip
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Finish Setup
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateFirstTicket;
