import React, { useState } from "react";
import { Users, UserPlus, X, ArrowRight } from "lucide-react";
import { useOnboardingStore } from "../../../stores/onboardingStore";
import { useForm } from "react-hook-form";
import { OnboardingUser, UserRole } from "../../../types";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";
import Alert from "../../../components/ui/Alert";
import Badge from "../../../components/ui/Badge";

interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
}

const roleOptions = [
  { value: UserRole.ADMIN, label: "Admin" },
  { value: UserRole.AGENT, label: "Agent" },
  { value: UserRole.CUSTOMER, label: "Customer" },
];

const AddUsers = () => {
  const {
    users,
    addUser,
    removeUser,
    submitUsers,
    isLoading,
    error,
    setStep,
    organization,
  } = useOnboardingStore();

  const [isAddingUser, setIsAddingUser] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: UserRole.AGENT,
    },
  });

  const onSubmit = (data: UserFormData) => {
    // We only need email and role for invitations
    addUser({
      email: data.email,
      role: data.role,
      name: data.name,
    });
    setIsAddingUser(false);
    reset();
  };

  const handleNext = async () => {
    await submitUsers();
  };

  const handleBack = () => {
    setStep(0);
  };

  const handleSkip = async () => {
    setStep(2);
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <div className="bg-primary-100 p-3 rounded-full">
          <Users className="h-8 w-8 text-primary-600" />
        </div>
      </div>

      <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
        Add Team Members
      </h2>

      <p className="text-center text-sm text-gray-600 mb-6">
        Invite people to join {organization.name || "your organization"}
      </p>

      {error && (
        <Alert variant="error" className="mb-4">
          {error}
        </Alert>
      )}

      {isAddingUser ? (
        <div className="bg-gray-50 p-4 rounded-md mb-6 animate-fade-in">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Name"
              fullWidth
              placeholder="Jane Doe"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

            <Input
              label="Email"
              fullWidth
              type="email"
              placeholder="jane@example.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <Select
              label="Role"
              fullWidth
              options={roleOptions}
              error={errors.role?.message}
              value={watch("role")}
              onChange={(value) =>
                register("role").onChange({ target: { value } } as any)
              }
              // {...register('role')}
            />

            <div className="flex space-x-3 pt-2">
              <Button type="submit" className="flex-1">
                Add User
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingUser(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-6">
          {users.length === 0 ? (
            <div className="text-center py-6 bg-gray-50 rounded-md">
              <p className="text-gray-500 mb-4">No team members added yet</p>
              <Button
                variant="outline"
                leftIcon={<UserPlus className="h-4 w-4" />}
                onClick={() => setIsAddingUser(true)}
              >
                Add Team Member
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Team Members
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<UserPlus className="h-4 w-4" />}
                  onClick={() => setIsAddingUser(true)}
                >
                  Add More
                </Button>
              </div>

              <div className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
                {users.map((user, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-white hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          user.role === UserRole.ADMIN
                            ? "primary"
                            : user.role === UserRole.AGENT
                            ? "secondary"
                            : "default"
                        }
                      >
                        {user.role}
                      </Badge>
                      <button
                        className="text-gray-400 hover:text-error-500 transition-colors"
                        onClick={() => removeUser(index)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          Back
        </Button>

        <div className="space-x-3">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button
            onClick={handleNext}
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            disabled={isAddingUser}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
