"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
  ssr: false, // ⛔ disable SSR for the editor
  loading: () => <p>Loading editor...</p>,
});

const validationSchema = Yup.object({
  title: Yup.string().required(
    "Please enter a name for the learning material."
  ),
  description: Yup.string().required(
    "Please enter a description for the learning material."
  ),
});

export default function LearningMaterialPage({ slug }) {
  const router = useRouter();
  const materialId = slug && slug !== "add" ? slug : null;
  const isEditMode = !!materialId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const [editorContent, setEditorContent] = useState("");

  // Fetch material

  const fetchMaterial = useCallback(async () => {
    if (!isEditMode || !materialId) return;

    const controller = new AbortController();

    try {
      setLoading(true);

      const res = await fetch(`/api/learning-materials/${materialId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorText = await res.text(); // capture server error message
        throw new Error(errorText || "Failed to fetch material");
      }

      const data = await res.json();
      console.log("data",data)

      setInitialValues({
        title: data?.title ?? "",
        description: data?.description ?? "",
      });

      setEditorContent(data?.content ?? "");
    } catch (err) {
      if (err.name === "AbortError") return; // ignore unmounted fetch
      console.error("Fetch Material Error:", err);
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [materialId, isEditMode]);

  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = { ...values, content: editorContent };
      const url = isEditMode
        ? `/api/learning-materials/${materialId}`
        : `/api/learning-materials`;
      const method = isEditMode ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      await Swal.fire(
        "Success",
        "Learning material saved successfully!",
        "success"
      );
      if (!isEditMode) router.push("/learning-materials/list");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error saving material", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth={false} sx={{ py: 4,px: { xs: 2, sm: 3, md: 4, lg: 6 }}}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item size={12}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {isEditMode
                    ? "Edit Learning Material"
                    : "Add Learning Material"}
                </Typography>
              </Grid>

              <Grid item size={12}>
                <Field
                  name="title"
                  as={TextField}
                  placeholder="Learning Material Name"
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                {errors.title && touched.title && (
                  <Typography color="error">{errors.title}</Typography>
                )}
              </Grid>

              <Grid item size={12}>
                <Field
                  name="description"
                  as={TextField}
                  placeholder="Description"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                {errors.description && touched.description && (
                  <Typography color="error">{errors.description}</Typography>
                )}
              </Grid>

              <Grid item size={12}>
                <RichTextEditor
                  content={editorContent}
                  onUpdate={setEditorContent}
                />
              </Grid>

              <Grid item size={12} sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Material"}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  disabled={saving}
                  onClick={() => router.push("/learning-materials/list")}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
