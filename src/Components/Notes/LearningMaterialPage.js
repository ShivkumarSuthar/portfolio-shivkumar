"use client";
import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import TextStyle from "@tiptap/extension-text-style";
import { Mark } from "@tiptap/core";
import { Container } from "react-bootstrap";
import { useRouter, useParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

// Highlight mark
const Highlight = Mark.create({
  name: "highlight",
  addOptions() {
    return { HTMLAttributes: {} };
  },
  parseHTML() {
    return [{ tag: "span.highlight" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes, class: "highlight" }, 0];
  },
  addCommands() {
    return {
      toggleHighlight:
        () =>
        ({ commands }) =>
          commands.toggleMark("highlight"),
    };
  },
});

export default function LearningMaterialPage() {
  const [_, setUpdate] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const materialId = params?.slug?.[1] || null;

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Highlight,
    ],
    content: "type here...",
    immediatelyRender: false,
  });

  // Refresh UI when editor updates
  useEffect(() => {
    if (!editor) return;
    const updateListener = () => setUpdate((u) => u + 1);
    editor.on("update", updateListener);
    editor.on("selectionUpdate", updateListener);
    return () => {
      editor.off("update", updateListener);
      editor.off("selectionUpdate", updateListener);
    };
  }, [editor]);

  // Initial form values
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const [content, setContent] = useState("");

  // If in edit mode → fetch material and prefill
  useEffect(() => {
    if (!materialId || !editor || materialId === "add") return;

    async function fetchMaterial() {
      try {
        setLoading(true);
        const res = await fetch(`/api/learningMaterials/${materialId}`);
        if (!res.ok) throw new Error("Failed to fetch material");
        const data = await res.json();
        setInitialValues({
          title: data.title || "",
          description: data.description || "",
        });
        setContent()
        editor.commands.setContent(data.content || "");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Error loading material", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchMaterial();
  }, [materialId, editor]);

  const buttons = [
    { label: "B", actionName: "bold", action: () => editor.chain().focus().toggleBold().run(), title: "Bold" },
    { label: "I", actionName: "italic", action: () => editor.chain().focus().toggleItalic().run(), title: "Italic" },
    { label: "• List", actionName: "bulletList", action: () => editor.chain().focus().toggleBulletList().run(), title: "Bullet List" },
    { label: "1. List", actionName: "orderedList", action: () => editor.chain().focus().toggleOrderedList().run(), title: "Ordered List" },
    { label: "</>", actionName: "codeBlock", action: () => editor.chain().focus().toggleCodeBlock().run(), title: "Code Block" },
    { label: "H1", actionName: "heading1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), title: "Heading 1" },
    { label: "H2", actionName: "heading2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), title: "Heading 2" },
    { label: "H3", actionName: "heading3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), title: "Heading 3" },
    { label: "¶", actionName: "paragraph", action: () => editor.chain().focus().setParagraph().run(), title: "Paragraph" },
    { iconClass: "fas fa-eraser", actionName: null, action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(), title: "Clear" },
    { label: "↺", actionName: null, action: () => editor.chain().focus().undo().run(), title: "Undo" },
    { label: "↻", actionName: null, action: () => editor.chain().focus().redo().run(), title: "Redo" },
  ];




  const validationSchema = Yup.object({
    title: Yup.string().required("Please enter a name for the learning material."),
    description: Yup.string(),
  });

  const handleSubmit = async (values) => {
    const html = editor.getHTML();
    setLoading(true);

    try {
      const payload = {
        title: values.title,
        description: values.description,
        content: html,
      };

      let res;
      if (materialId && materialId !== "add") {
        res = await fetch(`/api/learningMaterials/${materialId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/learningMaterials`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed");

      Swal.fire("Success", "Learning material saved successfully!", "success").then(() => {
        router.push("/notes-dashboard/learning-materials/list");
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error saving material", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (resetForm) => {
    Swal.fire({
      title: "Cancel changes?",
      text: "Your current input will be cleared.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear it",
    }).then((result) => {
      if (result.isConfirmed) {

        if(materialId == "create"){
            history.back();
        }else{
            editor.commands.setContent(content || "");
            resetForm();
            Swal.fire("Cleared!", "All content has been removed.", "success");
        }
    }
    });
  };

  return (
    <Container fluid className="learning-material-wrapper">
      <h2 style={{ marginBottom: "10px", color: "#e0d7ff" }}>
        {materialId && materialId !== "add" ? "Edit Learning Material" : "Add Learning Material"}
      </h2>
      <p style={{ marginBottom: "20px", color: "#aaa" }}>
        Fill in the details and add your notes, code examples, or lists.
      </p>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, resetForm }) => (
          <Form>
            <Field
              name="title"
              placeholder="Learning Material Name"
              className="input-field"
            />
            {errors.title && touched.title && (
              <div style={{ color: "red", marginBottom: "10px" }}>{errors.title}</div>
            )}

            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              rows={3}
              className="input-field"
            />

           
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
                marginTop: "20px",
              }}
            >
              {editor &&
                buttons.map((btn, idx) => {
                  const isActive = btn.actionName ? editor.isActive(btn.actionName) : false;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={btn.action}
                      title={btn.title}
                      style={{
                        minWidth: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        border: "1px solid #444",
                        background: isActive ? "#6b46c1" : "#2e2e2e",
                        color: isActive ? "white" : "#ddd",
                        cursor: "pointer",
                        fontSize: "16px",
                        padding: "0 8px",
                      }}
                    >
                      {/* Render icon if available, otherwise label */}
                      {btn.iconClass ? (
                        <i className={btn.iconClass}></i>
                      ) : btn.label ? (
                        <span>{btn.label}</span>
                      ) : null}
                    </button>
                  );
                })}
            </div>


            <EditorContent editor={editor} spellCheck={false} />

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  background: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => handleCancel(resetForm)}
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
