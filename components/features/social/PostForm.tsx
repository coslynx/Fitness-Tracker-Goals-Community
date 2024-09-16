"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSocialFeed } from "@/lib/hooks/useSocialFeed";
import { useStore } from "@/lib/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

const PostSchema = Yup.object().shape({
  content: Yup.string().min(1, "Post content is required").required("Required"),
});

export default function PostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const { createPost } = useSocialFeed();
  const store = useStore();

  const [postError, setPostError] = useState(null);

  if (!session) {
    return null;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      await createPost(values);
      router.refresh();
    } catch (error) {
      setPostError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        content: "",
      }}
      validationSchema={PostSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              What's on your mind?
            </label>
            <Field
              name="content"
              component={Input}
              id="content"
              type="text"
              placeholder="Share your fitness journey, tips, or ask questions!"
            />
            <ErrorMessage
              name="content"
              component="p"
              className="mt-1 text-xs text-red-500"
            />
          </div>
          {postError && (
            <p className="mt-1 text-xs text-red-500">{postError}</p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Post
          </Button>
        </Form>
      )}
    </Formik>
  );
}