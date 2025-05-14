import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { Building2 } from "lucide-react";
import { useOnboardingStore } from "../../../stores/onboardingStore";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import { OrganizationSize } from "../../../types";

interface OrganizationFormData {
  domain: string;
  size: OrganizationSize;
}

const sizeOptions = [
  { value: OrganizationSize.SMALL, label: "Small (1-10 employees)" },
  { value: OrganizationSize.MEDIUM, label: "Medium (11-50 employees)" },
  { value: OrganizationSize.LARGE, label: "Large (51-200 employees)" },
  { value: OrganizationSize.ENTERPRISE, label: "Enterprise (201+ employees)" },
];

const CreateOrganization = () => {
  const {
    setOrganization,
    submitOrganization,
    isLoading,
    error,
    organization,
  } = useOnboardingStore();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationFormData>({
    defaultValues: {
      domain: organization.domain || "",
      size: OrganizationSize.SMALL,
    },
  });

  const onSubmit = async (data: OrganizationFormData) => {
    setOrganization(data);
    await submitOrganization();
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary-100 p-3 rounded-full">
          <Building2 className="h-8 w-8 text-primary-600" />
        </div>
      </div>

      <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
        Complete Organization Setup
      </h2>

      <p className="text-center text-sm text-gray-600 mb-6">
        Let's set up your organization in NexSupport
      </p>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Organization Domain"
          fullWidth
          placeholder="acme.com"
          helperText="This will be used for identifying your organization"
          error={errors.domain?.message}
          {...register("domain", {
            required: "Domain is required",
            pattern: {
              value: /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid domain (e.g., example.com)",
            },
          })}
        />

        <Select
          label="Organization Size"
          fullWidth
          options={sizeOptions}
          error={errors.size?.message}
          value={watch("size")}
          onChange={(value) =>
            register("size").onChange({ target: { value } } as any)
          }
          // {...register('size', {
          //   required: 'Please select your organization size',
          // })}
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Continue
        </Button>
      </form>
    </div>
  );
};

export default CreateOrganization;
