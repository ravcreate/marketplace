/**
 *	This class is needed to convert the tip tap editor description ot text
 */

"use client";

import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const ProductDescription = ({ content }: { content: JSONContent }) => {
    const editor = useEditor({
        editable: false,
        extensions: [StarterKit],
        content: content,
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose-base",
            },
        },
    });

    if (!editor) {
        return null;
    }

    return (
        <>
            <EditorContent editor={editor} />
        </>
    );
};
