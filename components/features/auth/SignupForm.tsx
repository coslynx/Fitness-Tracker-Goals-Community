"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useStore } from "@/lib/store";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
});

export default function SignupForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { user } = useUser();
  const store = useStore();

  if (session || user) {
    router.push("/dashboard");
  }

  const [signupError, setSignupError] = useState(null);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          const response = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });

          if (response.ok) {
            const data = await response.json();
            store.setUser(data.user);
            router.push("/dashboard");
          } else {
            const error = await response.json();
            setSignupError(error.error);
          }
        } catch (error) {
          setSignupError(error.message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Sign Up
          </h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              name="email"
              component={Input}
              id="email"
              type="email"
              placeholder="jsmith@example.com"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              name="password"
              component={Input}
              id="password"
              type="password"
              placeholder="********"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          {signupError && (
            <p className="mt-1 text-xs text-red-500">{signupError}</p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
}