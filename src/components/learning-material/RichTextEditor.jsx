"use client";

import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// Extensions
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import { TextStyle } from "@tiptap/extension-text-style"; // ✅ default
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";

import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Document from "@tiptap/extension-document";

import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";

import TextAlign from "@tiptap/extension-text-align";
import { CodeBlock } from "@tiptap/extension-code-block"; // ✅ using named export
import HardBreak from "@tiptap/extension-hard-break";

// Fixed table imports - remove destructuring
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";

import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";

// MUI
import {
  Box,
  IconButton,
  Divider,
  Select,
  MenuItem,
  Input,
  Typography,
  Tooltip,
} from "@mui/material";
import {
  Undo,
  Redo,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  Code as CodeIcon,
  FormatListBulleted,
  FormatListNumbered,
  CheckBox,
  FormatQuote,
  HorizontalRule as HrIcon,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  TableChart,
  InsertLink,
  Image as ImageIcon,
  YouTube as YouTubeIcon,
  Clear,
  Superscript as SupIcon,
  Subscript as SubIcon,
} from "@mui/icons-material";

function EditorInner({ content, onUpdate }) {
  console.log("content",content)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      TextStyle,
      Highlight,
      Color,
      Superscript,
      Subscript,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Blockquote,
      HorizontalRule,
      Document,
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlock.configure({ HTMLAttributes: { class: "plain-code-block" } }),
      HardBreak,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Link,
      Image,
      Youtube,
      Placeholder.configure({ placeholder: "Start typing…" }),
      CharacterCount.configure(),
    ],
    content: "",
    immediatelyRender:false,
    editorProps: { attributes: { class: "ProseMirror custom-editor" } },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML()); 
    },
  });


  const [heading, setHeading] = useState("paragraph");
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#ffffff");

  // Apply heading change
  useEffect(() => {
    if (!editor) return;
    if (heading === "paragraph") editor.chain().focus().setParagraph().run();
    else
      editor
        .chain()
        .focus()
        .toggleHeading({ level: parseInt(heading) })
        .run();
  }, [heading, editor]);

  // Apply color
  useEffect(() => {
    if (editor) editor.chain().focus().setColor(color).run();
  }, [color, editor]);


  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content, false); // false = don't lose history/cursor
    }
  }, [content]);

  if (!editor) return null;

  return (
    <Box>
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mb: 2,
          p: 1,
          backgroundColor: "#D3DAD9",
          borderRadius: 1,
          border: "1px solid #e1e5e9",
          flexWrap: "wrap",
        }}
      >
        {/* Text style controls */}
        <Tooltip title="Heading">
          <Select
            size="small"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            sx={{
              minWidth: 90,
              height: 32,
              fontSize: "14px",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              color: "#333",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiSelect-select": {
                padding: "4px 8px",
                color: "#333",
              },
            }}
          >
            <MenuItem value="paragraph">Normal</MenuItem>
            <MenuItem value="1">Heading 1</MenuItem>
            <MenuItem value="2">Heading 2</MenuItem>
            <MenuItem value="3">Heading 3</MenuItem>
            <MenuItem value="4">Heading 4</MenuItem>
            <MenuItem value="5">Heading 5</MenuItem>
            <MenuItem value="6">Heading 6</MenuItem>
          </Select>
        </Tooltip>

        <Tooltip title="Text Color">
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            sx={{
              width: 40,
              height: 32,
              p: 0,
              minWidth: "25px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "white",
              cursor: "pointer",
              "& input": {
                cursor: "pointer",
                border: "none",
                borderRadius: "4px",
              },
            }}
          />
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24 }} />

        {/* Text formatting */}
        <Tooltip title="Bold">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBold().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("bold") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("bold")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatBold fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Italic">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("italic") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("italic")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatItalic fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Underline">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("underline") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("underline")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatUnderlined fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Strikethrough">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("strike") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("strike")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <StrikethroughS fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Inline Code">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleCode().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("code") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("code")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <CodeIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Superscript">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("superscript") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("superscript")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <SupIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Subscript">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("subscript") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("subscript")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <SubIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Clear Formatting">
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Clear fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24 }} />

        {/* Lists */}
        <Tooltip title="Bullet List">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("bulletList") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("bulletList")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatListBulleted fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Ordered List">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("orderedList") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("orderedList")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatListNumbered fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Task List">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("taskList") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("taskList")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <CheckBox fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Blockquote">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("blockquote") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("blockquote")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatQuote fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Horizontal Rule">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <HrIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24 }} />

        {/* Alignment */}
        <Tooltip title="Align Left">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive({ textAlign: "left" })
                ? "#1976d2"
                : "#666",
              backgroundColor: editor.isActive({ textAlign: "left" })
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatAlignLeft fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Center">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive({ textAlign: "center" })
                ? "#1976d2"
                : "#666",
              backgroundColor: editor.isActive({ textAlign: "center" })
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatAlignCenter fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Align Right">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive({ textAlign: "right" })
                ? "#1976d2"
                : "#666",
              backgroundColor: editor.isActive({ textAlign: "right" })
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatAlignRight fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Justify">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive({ textAlign: "justify" })
                ? "#1976d2"
                : "#666",
              backgroundColor: editor.isActive({ textAlign: "justify" })
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <FormatAlignJustify fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24 }} />

        {/* Media & Tables */}
        <Tooltip title="Insert Table">
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
            }
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <TableChart fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Link">
          <IconButton
            size="small"
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            sx={{
              width: 32,
              height: 32,
              color: editor.isActive("link") ? "#1976d2" : "#666",
              backgroundColor: editor.isActive("link")
                ? "#e3f2fd"
                : "transparent",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <InsertLink fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert Image">
          <IconButton
            size="small"
            onClick={() => {
              const url = prompt("Enter image URL");
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }}
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <ImageIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Insert YouTube Video">
          <IconButton
            size="small"
            onClick={() => {
              const url = prompt("Enter YouTube URL");
              if (url)
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }}
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <YouTubeIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem sx={{ mx: 0.5, height: 24 }} />

        {/* History */}
        <Tooltip title="Undo">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().undo().run()}
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Undo fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Redo">
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().redo().run()}
            sx={{
              width: 32,
              height: 32,
              color: "#666",
              "&:hover": { backgroundColor: "#f5f5f5" },
            }}
          >
            <Redo fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Editor Content */}
      <Box
        sx={{
          border: "1px solid #333",
          borderRadius: 2,
          height: "70vh", // ✅ fixed height
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#1a1a1a",
          p: 2,
          overflowY: "auto", // ✅ outer scroll
          "& .ProseMirror": {
            flex: 1,
            outline: "none",
            border: "none",
            height: "100%", // ✅ fill parent
            overflowY: "auto", // ✅ scroll inside if needed
            caretColor: "#fff",
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>

      {/* Word count */}
      <Typography variant="caption" sx={{ color: "gray", mt: 1 }}>
        {editor.storage.characterCount?.characters?.()} chars |{" "}
        {editor.storage.characterCount?.words?.()} words
      </Typography>
    </Box>
  );
}

export default function RichTextEditor(props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <EditorInner {...props} />;
}
