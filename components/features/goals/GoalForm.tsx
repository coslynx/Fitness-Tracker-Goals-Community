"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useGoals } from "@/lib/hooks/useGoals";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useStore } from "@/lib/store";

const GoalSchema = Yup.object().shape({
  name: Yup.string().min(1, "Goal name is required").required("Required"),
  targetValue: Yup.number()
    .min(1, "Target value must be at least 1")
    .required("Required"),
  targetDate: Yup.date()
    .min(new Date(), "Target date must be in the future")
    .required("Required"),
});

export default function GoalForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { createGoal, updateGoal } = useGoals();
  const store = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [goalId, setGoalId] = useState<number | null>(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    targetValue: 1,
    targetDate: new Date(),
  });

  useEffect(() => {
    if (!session) return;
    const goal = store.goals.find((g) => g.id === goalId);
    if (goal) {
      setInitialValues({
        name: goal.name,
        targetValue: goal.targetValue,
        targetDate: new Date(goal.targetDate),
      });
      setIsEditing(true);
    }
  }, [goalId, session, store.goals]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (isEditing) {
        await updateGoal(goalId!, values);
      } else {
        await createGoal(values);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={GoalSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            {isEditing ? "Edit Goal" : "Create New Goal"}
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Goal Name
            </label>
            <Field
              name="name"
              component={Input}
              id="name"
              type="text"
              placeholder="e.g. Lose 10 pounds"
            />
            <ErrorMessage
              name="name"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="targetValue"
              className="block text-sm font-medium text-gray-700"
            >
              Target Value
            </label>
            <Field
              name="targetValue"
              component={Input}
              id="targetValue"
              type="number"
              placeholder="e.g. 10"
            />
            <ErrorMessage
              name="targetValue"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <label
              htmlFor="targetDate"
              className="block text-sm font-medium text-gray-700"
            >
              Target Date
            </label>
            <Field
              name="targetDate"
              component={Input}
              id="targetDate"
              type="date"
            />
            <ErrorMessage
              name="targetDate"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? "Save Goal" : "Create Goal"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}