"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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

// Validation schema
const validationSchema = Yup.object({
  title: Yup.string().required("Please enter a name for the learning material."),
  description: Yup.string(),
});

export default function LearningMaterialPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const materialId = params?.slug?.[1] || null;
  const isEditMode = materialId && materialId !== "add";

  // Initial form values
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const [originalContent, setOriginalContent] = useState("");

  // Editor configuration
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
    content: "Type here...",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  // Memoized toolbar buttons
  const toolbarButtons = useMemo(() => [
    { label: "B", actionName: "bold", action: () => editor?.chain().focus().toggleBold().run(), title: "Bold" },
    { label: "I", actionName: "italic", action: () => editor?.chain().focus().toggleItalic().run(), title: "Italic" },
    { label: "H", actionName: "highlight", action: () => editor?.chain().focus().toggleMark("highlight").run(), title: "Highlight" },
    { label: "• List", actionName: "bulletList", action: () => editor?.chain().focus().toggleBulletList().run(), title: "Bullet List" },
    { label: "1. List", actionName: "orderedList", action: () => editor?.chain().focus().toggleOrderedList().run(), title: "Ordered List" },
    { label: "</>", actionName: "codeBlock", action: () => editor?.chain().focus().toggleCodeBlock().run(), title: "Code Block" },
    { label: "H1", actionName: "heading1", action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(), title: "Heading 1" },
    { label: "H2", actionName: "heading2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), title: "Heading 2" },
    { label: "H3", actionName: "heading3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), title: "Heading 3" },
    { label: "¶", actionName: "paragraph", action: () => editor?.chain().focus().setParagraph().run(), title: "Paragraph" },
    { iconClass: "fas fa-eraser", actionName: null, action: () => editor?.chain().focus().clearNodes().unsetAllMarks().run(), title: "Clear" },
    { label: "↺", actionName: null, action: () => editor?.chain().focus().undo().run(), title: "Undo" },
    { label: "↻", actionName: null, action: () => editor?.chain().focus().redo().run(), title: "Redo" },
  ], [editor]);

  // Fetch material data for edit mode
  const fetchMaterial = useCallback(async () => {
    if (!isEditMode || !editor) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/learningMaterials/${materialId}`);
      if (!res.ok) throw new Error("Failed to fetch material");
      
      const data = await res.json();
      setInitialValues({
        title: data.title || "",
        description: data.description || "",
      });
      
      const content = data.content || "Type here...";
      setOriginalContent(content);
      editor.commands.setContent(content);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error loading material", "error");
    } finally {
      setLoading(false);
    }
  }, [materialId, editor, isEditMode]);

  // Effects
  useEffect(() => {
    fetchMaterial();
  }, [fetchMaterial]);

  // Handle form submission
  const handleSubmit = async (values) => {
    if (!editor) return;
    
    const html = editor.getHTML();
    setLoading(true);

    try {
      const payload = {
        title: values.title,
        description: values.description,
        content: html,
      };

      const url = isEditMode 
        ? `/api/learningMaterials/${materialId}`
        : `/api/learningMaterials`;
      
      const method = isEditMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Save failed");

      await Swal.fire("Success", "Learning material saved successfully!", "success");
      
      if (!isEditMode) {
        router.push("/notes-dashboard/learning-materials/list");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Error saving material", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel action
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
        if (!isEditMode) {
          history.back();
        } else {
          editor?.commands.setContent(originalContent || "Type here...");
          resetForm();
          Swal.fire("Cleared!", "All content has been restored.", "success");
        }
      }
    });
  };

  // Render toolbar button
  const renderToolbarButton = (btn, idx) => {
    const isActive = btn.actionName ? editor?.isActive(btn.actionName) : false;
    
    return (
      <button
        key={idx}
        type="button"
        onClick={btn.action}
        title={btn.title}
        className={`toolbar-button ${isActive ? 'active' : ''}`}
      >
        {btn.iconClass ? (
          <i className={btn.iconClass}></i>
        ) : (
          <span>{btn.label}</span>
        )}
      </button>
    );
  };

  if (loading && isEditMode) {
    return (
      <Container fluid className="learning-material-wrapper">
        <div className="loading-container">
          Loading material...
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="learning-material-wrapper">
      <h2 className="title">
        {isEditMode ? "Edit Learning Material" : "Add Learning Material"}
      </h2>
      <p className="subtitle">
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
              <div className="error-message">{errors.title}</div>
            )}

            <Field
              as="textarea"
              name="description"
              placeholder="Description"
              rows={3}
              className="input-field"
            />

            <div className="editor-container">
              {/* Toolbar */}
              <div className="editor-toolbar">
                {editor && toolbarButtons.map(renderToolbarButton)}
              </div>

              {/* Editor with scroll */}
              <div className="editor-content-wrapper">
                <EditorContent 
                  editor={editor} 
                  spellCheck={false}
                />
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className={`btn-save ${loading ? 'loading' : ''}`}
              >
                {loading ? "Saving..." : "Save Material"}
              </button>
              <button
                type="button"
                onClick={() => handleCancel(resetForm)}
                disabled={loading}
                className="btn-cancel"
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